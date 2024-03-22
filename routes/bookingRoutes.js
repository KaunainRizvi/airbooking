const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

router.post('/booking', authenticateToken, async (req, res) => {
  try {
    const { userId, flightId } = req.body;
    
    if (!userId || !flightId) {
      return res.status(400).json({ error: 'User ID and Flight ID are required' });
    }

     const user = await User.findById(userId);
    const flight = await Flight.findById(flightId);
    if (!user || !flight) {
      return res.status(404).json({ error: 'User or Flight not found' });
    }

    if (flight.seats <= 0) {
      return res.status(400).json({ error: 'No seats available on the flight' });
    }

    
    const booking = await Booking.create({ user: userId, flight: flightId });

    
    await Flight.findByIdAndUpdate(flightId, { $inc: { seats: -1 } });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('flight');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/dashboard/:id', authenticateToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { userId, flightId } = req.body;

    
    if (!userId || !flightId) {
      return res.status(400).json({ error: 'User ID and Flight ID are required' });
    }

    
    const user = await User.findById(userId);
    const flight = await Flight.findById(flightId);
    if (!user || !flight) {
      return res.status(404).json({ error: 'User or Flight not found' });
    }

    
    const booking = await Booking.findByIdAndUpdate(bookingId, { user: userId, flight: flightId }, { new: true });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/dashboard/:id', authenticateToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findByIdAndDelete(bookingId);

    await Flight.findByIdAndUpdate(booking.flight, { $inc: { seats: 1 } });

    res.status(202).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
