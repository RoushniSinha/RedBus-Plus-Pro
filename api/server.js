const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const ALLOWED_ORIGINS = [
  'https://red-bus-plus-pro.vercel.app',
  'http://localhost:4200'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});
app.use(bodyparser.json());

// Verify required environment variables on startup
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI environment variable is not set. Set it in your Vercel project settings.');
  throw new Error('MONGODB_URI environment variable is required.');
}
if (!process.env.GOOGLE_CLIENT_ID) {
  console.warn('WARNING: GOOGLE_CLIENT_ID environment variable is not set. Google login will not work.');
}
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable is not set in production.');
  throw new Error('JWT_SECRET environment variable is required in production.');
}

const customerroutes = require('../REDBUS-CLONE-MEAN-main/REDBUS-CLONE-MEAN-main/frontend/server/routes/customer');
const routesroute = require('../REDBUS-CLONE-MEAN-main/REDBUS-CLONE-MEAN-main/frontend/server/routes/route');
const bookingroute = require('../REDBUS-CLONE-MEAN-main/REDBUS-CLONE-MEAN-main/frontend/server/routes/booking');
const authroute = require('../REDBUS-CLONE-MEAN-main/REDBUS-CLONE-MEAN-main/frontend/server/routes/auth');

app.use(bookingroute);
app.use(routesroute);
app.use(customerroutes);
app.use(authroute);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

const DBURL = process.env.MONGODB_URI;

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(DBURL);
  isConnected = true;
  console.log('MongoDB connected');
};

connectDB().catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
