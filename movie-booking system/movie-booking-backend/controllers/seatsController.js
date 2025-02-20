const Seat = require('../models/seats');

// Fetch all seats for a specific movie
const getSeats = async (req, res) => {
  const { id } = req.params;
  try {
    const seats = await Seat.find({ movieId: id });

    if (!seats.length) {
      return res.status(404).json({ message: 'No seats found for this movie' });
    }

    res.json(seats);
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ message: 'Failed to fetch seats' });
  }
};

// Add multiple seats for a movie
const addSeats = async (req, res) => {
  const { id } = req.params;
  const { seats } = req.body; // Expecting an array of seats [{ seatNumber, status }]

  if (!Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ error: 'Seats data is required in an array format' });
  }

  try {
    const newSeats = seats.map(seat => ({
      movieId: id,
      seatNumber: seat.seatNumber,
      status: seat.status || 'available',
    }));

    const addedSeats = await Seat.insertMany(newSeats);

    res.status(201).json({ message: 'Seats added successfully', seats: addedSeats });
  } catch (error) {
    console.error('Error adding seats:', error);
    res.status(500).json({ message: 'Failed to add seats' });
  }
};

module.exports = { getSeats, addSeats };
