const Booking = require("../models/bookingModel");
const Seat = require("../models/seatModel");

// 🎫 Book Seats

const bookSeats = async (req, res) => {
  try {
    const { movieId, selectedSeats, date } = req.body;

    // 🛑 Validate input
    if (!movieId || !selectedSeats || !date) {
      return res.status(400).json({ message: "Movie ID, seats, and date are required" });
    }

    // 🔍 Check if any of the selected seats are already booked
    const bookedSeats = await Seat.find({
      movieId,
      seatNumber: { $in: selectedSeats },
      date,
      status: "booked"
    });

    if (bookedSeats.length > 0) {
      return res.status(400).json({
        message: `Seats ${bookedSeats.map(seat => seat.seatNumber).join(", ")} are already booked!`
      });
    }

    // ✅ Mark the selected seats as booked
    await Seat.updateMany(
      { movieId, seatNumber: { $in: selectedSeats }, date },
      { $set: { status: "booked" } }
    );

    res.status(200).json({ message: "Seats booked successfully!" });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Booking failed!", error });
  }
};


// 🎫 Get All Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("movieId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {bookSeats, getBookings};