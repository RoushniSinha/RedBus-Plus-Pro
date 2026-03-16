'use strict';

const { Resend } = require('resend');
const twilio = require('twilio');
const admin = require('firebase-admin');
const Customer = require('../models/customer');

// ── Resend (email) ────────────────────────────────────────────────────────────
let resendClient = null;
function getResend() {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

// ── Twilio (SMS) ──────────────────────────────────────────────────────────────
let twilioClient = null;
function getTwilio() {
  if (!twilioClient) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (!sid || !token) {
      throw new Error('TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables are required');
    }
    twilioClient = twilio(sid, token);
  }
  return twilioClient;
}

// ── Firebase Admin (push notifications) ──────────────────────────────────────
let firebaseInitialized = false;
function getFirebaseAdmin() {
  if (!firebaseInitialized) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set');
    }
    let serviceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountKey);
    } catch {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY must be valid JSON');
    }
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    firebaseInitialized = true;
  }
  return admin;
}

// ── i18n alert templates ──────────────────────────────────────────────────────
const ALERT_TEMPLATES = {
  en: {
    booking_confirmed: {
      subject: 'Booking Confirmed – RedBus Elite',
      html: (data) =>
        `<h2>Your booking is confirmed!</h2><p>Bus: ${data.busName || ''}</p><p>Route: ${data.route || ''}</p><p>Date: ${data.date || ''}</p>`,
      sms: (data) =>
        `RedBus Elite: Booking confirmed for ${data.route || 'your journey'} on ${data.date || ''}. Seats: ${data.seats || ''}.`
    },
    journey_ended: {
      subject: 'How was your journey? – RedBus Elite',
      html: (data) =>
        `<h2>Rate your recent journey</h2><p>Route: ${data.route || ''}</p><p>Click <a href="${data.reviewLink || '#'}">here</a> to leave a review.</p>`,
      sms: (data) =>
        `RedBus Elite: How was your journey on ${data.route || ''}? Rate it here: ${data.reviewLink || ''}`
    },
    story_approved: {
      subject: 'Your travel story is live! – RedBus Elite',
      html: (data) =>
        `<h2>Your story "${data.title || ''}" has been approved!</h2><p>It is now visible to the RedBus Elite community.</p>`,
      sms: (data) =>
        `RedBus Elite: Your travel story "${data.title || ''}" is now live in the community!`
    }
  },
  hi: {
    booking_confirmed: {
      subject: 'बुकिंग की पुष्टि – RedBus Elite',
      html: (data) =>
        `<h2>आपकी बुकिंग की पुष्टि हो गई है!</h2><p>बस: ${data.busName || ''}</p><p>मार्ग: ${data.route || ''}</p><p>तारीख: ${data.date || ''}</p>`,
      sms: (data) =>
        `RedBus Elite: ${data.route || 'आपकी यात्रा'} के लिए ${data.date || ''} को बुकिंग की पुष्टि।`
    },
    journey_ended: {
      subject: 'आपकी यात्रा कैसी रही? – RedBus Elite',
      html: (data) =>
        `<h2>अपनी हालिया यात्रा को रेट करें</h2><p>मार्ग: ${data.route || ''}</p><p>समीक्षा के लिए <a href="${data.reviewLink || '#'}">यहाँ क्लिक करें</a>।</p>`,
      sms: (data) =>
        `RedBus Elite: ${data.route || ''} पर यात्रा कैसी रही? यहाँ रेट करें: ${data.reviewLink || ''}`
    },
    story_approved: {
      subject: 'आपकी यात्रा कहानी लाइव है! – RedBus Elite',
      html: (data) =>
        `<h2>आपकी कहानी "${data.title || ''}" को मंजूरी मिल गई!</h2><p>यह अब RedBus Elite समुदाय में दिखाई दे रही है।</p>`,
      sms: (data) =>
        `RedBus Elite: आपकी यात्रा कहानी "${data.title || ''}" अब समुदाय में लाइव है!`
    }
  }
};

function getTemplate(lang, type) {
  const supported = ALERT_TEMPLATES[lang] ? lang : 'en';
  return ALERT_TEMPLATES[supported][type] || ALERT_TEMPLATES['en'][type];
}

// ── Core multi-channel alert ──────────────────────────────────────────────────

/**
 * Sends a multi-channel alert (Email + SMS + Push) to the given user.
 *
 * @param {string} userId  - MongoDB customer _id
 * @param {string} type    - Alert type key (e.g. 'booking_confirmed', 'journey_ended', 'story_approved')
 * @param {object} data    - Template variables (route, date, reviewLink, title, etc.)
 * @returns {Promise<{email: object|null, sms: object|null, push: object|null}>}
 */
async function triggerEliteAlert(userId, type, data) {
  const customer = await Customer.findById(userId).lean().exec();
  if (!customer) {
    throw new Error(`Customer not found: ${userId}`);
  }

  const lang = (data.language || customer.language || 'en').toLowerCase();
  const template = getTemplate(lang, type);
  if (!template) {
    throw new Error(`Unknown alert type: ${type}`);
  }

  const results = { email: null, sms: null, push: null };

  // 1. Email via Resend
  if (customer.email) {
    try {
      const resend = getResend();
      results.email = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'alerts@redbuselite.com',
        to: customer.email,
        subject: template.subject,
        html: template.html(data)
      });
    } catch (err) {
      console.error(`[NotificationService] Email failed for user ${userId}:`, err.message);
    }
  }

  // 2. SMS via Twilio
  if (customer.phoneNumber) {
    try {
      const twilioC = getTwilio();
      const fromNumber = process.env.TWILIO_PHONE_NUMBER;
      if (!fromNumber) throw new Error('TWILIO_PHONE_NUMBER environment variable is not set');
      results.sms = await twilioC.messages.create({
        body: template.sms(data),
        from: fromNumber,
        to: customer.phoneNumber
      });
    } catch (err) {
      console.error(`[NotificationService] SMS failed for user ${userId}:`, err.message);
    }
  }

  // 3. Push via Firebase Admin
  if (customer.fcmToken) {
    try {
      const firebaseAdmin = getFirebaseAdmin();
      results.push = await firebaseAdmin.messaging().send({
        token: customer.fcmToken,
        notification: {
          title: template.subject,
          body: template.sms(data)
        },
        data: { type, userId: String(userId) }
      });
    } catch (err) {
      console.error(`[NotificationService] Push failed for user ${userId}:`, err.message);
    }
  }

  return results;
}

/**
 * Broadcasts a Firebase Push Notification to all users with an FCM token.
 *
 * @param {string} title   - Notification title
 * @param {string} body    - Notification body
 * @param {object} payload - Extra data payload
 * @returns {Promise<object>}  Firebase multicast response
 */
async function broadcastPushToAll(title, body, payload = {}) {
  const firebaseAdmin = getFirebaseAdmin();
  const customers = await Customer.find({ fcmToken: { $exists: true, $ne: null } })
    .select('fcmToken')
    .lean()
    .exec();

  if (!customers.length) {
    return { successCount: 0, failureCount: 0 };
  }

  const tokens = customers.map((c) => c.fcmToken).filter(Boolean);
  const message = {
    notification: { title, body },
    data: payload,
    tokens
  };

  return firebaseAdmin.messaging().sendEachForMulticast(message);
}

module.exports = { triggerEliteAlert, broadcastPushToAll };
