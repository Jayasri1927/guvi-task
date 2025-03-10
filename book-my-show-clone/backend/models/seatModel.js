const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  seatNumber: { type: String, required: true },
  status: { type: String, enum: ["available", "booked"], default: "available" },
  date: { type: String, required: true } 
});

module.exports = mongoose.model("Seat", seatSchema);
