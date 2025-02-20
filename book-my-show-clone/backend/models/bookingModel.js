const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  seats: [{ type: String, required: true }], // Array of booked seat numbers
  user: { type: String, required: true }, // Could be user ID or name
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
