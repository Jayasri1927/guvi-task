const Booking = require('../models/bookingModel');

// Book a ticket
const bookTicket = async (req, res) => {
  try {
    const { user, movie, showtime, seats, price, totalAmount } = req.body;

    if (!user || !movie || !showtime || !seats || !totalAmount) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new booking instance
    const booking = new Booking({
      user, 
      movie,
      showtime,
      seats,
      price,
      totalAmount,
    });

    // Save the booking to the database
    await booking.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error('Error booking ticket:', err);
    res.status(500).json({ error: 'Failed to book ticket' });
  }
};

module.exports = { bookTicket };
