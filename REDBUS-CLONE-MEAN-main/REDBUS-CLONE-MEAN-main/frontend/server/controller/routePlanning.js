'use strict';

const Route = require('../models/route');
const Bus = require('../models/bus');
const Booking = require('../models/booking');
const { triggerEliteAlert } = require('../services/NotificationService');

/**
 * GET /route-planning/:departure/:arrival/:date
 * Returns matching routes and buses, and sends a booking-confirmed notification
 * to the authenticated user if a bookingId query parameter is provided.
 */
exports.getRoutePlan = async (req, res) => {
  try {
    const { departure, arrival, date } = req.params;
    const { bookingId } = req.query;

    // Fetch all routes and find matching one
    const routes = await Route.find().lean().exec();
    const route = routes.find(
      (r) =>
        r.departureLocation.name.toLowerCase() === departure.toLowerCase() &&
        r.arrivalLocation.name.toLowerCase() === arrival.toLowerCase()
    );

    if (!route) {
      return res.status(404).json({ error: 'No route found for the given departure and arrival' });
    }

    // Find buses for this route
    const buses = await Bus.find({ routes: route._id }).lean().exec();

    // Calculate booked seats per bus for the given date
    const bookings = await Booking.find().lean().exec();
    const busSeats = {};
    for (const bus of buses) {
      const busBookings = bookings.filter(
        (b) =>
          b.departureDetails.date === date && String(b.busId) === String(bus._id)
      );
      busSeats[String(bus._id)] = busBookings.flatMap((b) => b.seats);
    }

    // If a bookingId is provided (and user is authenticated), trigger multi-channel alert
    if (bookingId && req.user) {
      const booking = await Booking.findById(bookingId).lean().exec();
      if (booking) {
        const bookedBus = buses.find((b) => String(b._id) === String(booking.busId));
        const alertData = {
          route: `${departure} → ${arrival}`,
          date,
          busName: bookedBus?.operatorName || '',
          seats: (booking.seats || []).join(', ')
        };
        const userId = req.user.id;
        setImmediate(async () => {
          try {
            await triggerEliteAlert(userId, 'booking_confirmed', alertData);
          } catch (alertErr) {
            console.error('[routePlanning] triggerEliteAlert error:', alertErr.message);
          }
        });
      }
    }

    res.json({ route, matchedBuses: buses, busSeats });
  } catch (error) {
    console.error('getRoutePlan error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
