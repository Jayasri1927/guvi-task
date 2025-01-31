const Booking = require('../models/bookingModel');

// Book a ticket (without session-based user)
const bookTicket = async (req, res) => {
  try {
    const { user, movie, showtime, seats, Price, totalAmount } = req.body;

    // Create a new booking instance
    const booking = new Booking({
      user, 
      movie,
      showtime,
      seats,
      Price,
      totalAmount,
    });

    // Save the booking to the database
    await booking.save();

    // Respond with a success message and the booking details
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    // Handle errors and respond with a failure message
    res.status(500).json({ error: 'Failed to book ticket' });
  }
};

module.exports = { bookTicket };
