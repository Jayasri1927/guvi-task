const Seat = require('../models/seats'); // Import the Seat model

// Fetch all seats for a specific movie
const getSeats = async (req, res) => {
  const { id } = req.params; // Get movieId from the URL parameter
  try {
    // Find seats for the specified movieId
    const seats = await Seat.find({ movieId: id });
    if (seats.length === 0) {
      return res.status(404).json({ message: 'No seats found for this movie' });
    }
    res.json(seats); // Send the seats as a response
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ message: 'Failed to fetch seats' });
  }
};

// Add a seat for a specific movie
const addSeats = async (req, res) => {
  const { id } = req.params; // Get movieId from the URL parameter
  const { seatNumber, status } = req.body; // Get seat details from the request body

  try {
    // Create a new seat
    const newSeat = new Seat({
      movieId: id,
      seatNumber,
      status,  // Either 'available' or 'booked'
    });

    // Save the seat to the database
    await newSeat.save();
    
    res.status(201).json(newSeat); // Return the newly added seat as a response
  } catch (error) {
    console.error('Error adding seat:', error);
    res.status(500).json({ message: 'Failed to add seat' });
  }
};

module.exports = { getSeats, addSeats };
