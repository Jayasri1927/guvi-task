const Booking = require("../models/bookingModel");
const Seat = require("../models/seatModel");

// 🎫 Book Seats
exports.bookSeats = async (req, res) => {
  try {
    const { movieId, seats, user } = req.body;
    await Seat.updateMany({ seatNumber: { $in: seats }, movieId }, { status: "booked" });
    const newBooking = new Booking({ movieId, seats, user });
    await newBooking.save();
    res.status(201).json({ message: "Seats booked successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🎫 Get All Bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("movieId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
