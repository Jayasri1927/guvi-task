const Seat = require("../models/seatModel");

// 🎟 Get Seats by Movie ID
exports.getSeatsByMovie = async (req, res) => {
  try {
    const seats = await Seat.find({ movieId: req.params.movieId });
    if (seats.length === 0) return res.json({ message: "No seats found for this movie" });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🎟 Add Seats for a Movie
exports.addSeats = async (req, res) => {
  try {
    const { movieId, seats } = req.body;
    const seatDocs = seats.map((seat) => ({ movieId, seatNumber: seat, status: "available" }));
    await Seat.insertMany(seatDocs);
    res.status(201).json({ message: "Seats added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
