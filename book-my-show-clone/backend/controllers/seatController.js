const Seat = require("../models/seatModel");

// 🎟 Get Seats by Movie ID
const getSeatsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { date } = req.query;

    if (!date) return res.status(400).json({ message: "Date is required" });

    const seats = await Seat.find({ movieId, date });

    if (seats.length === 0) return res.json({ message: "No seats found for this movie on this date" });

    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// 🎟 Add Seats for a Movie
const addSeats = async (req, res) => {
  try {
    const { movieId, seats } = req.body;

    if (!movieId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Movie ID and seats are required" });
    }

    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1); // Only 1 year instead of 30 years

    let seatsDocs = [];

    for (let d = new Date(today); d <= oneYearLater; d.setDate(d.getDate() + 1)) {
      const formattedDate = d.toISOString().split("T")[0]; // Format YYYY-MM-DD
      seats.forEach((seat) => {
        seatsDocs.push({
          movieId,
          seatNumber: seats,
          status: "available",
          date: formattedDate,
        });
      });
    }

    await Seat.insertMany(seatDocs);

    res.status(201).json({ message: "Seats added successfully for the next 1 year!" });
  } catch (error) {
    console.error("❌ Error in addSeats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {getSeatsByMovie, addSeats};