const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: String, ref: 'User', required: true },
  movie: { type: String, ref: 'Movie', required: true },
  showtime: { type: String, required: true },
  seats: { type: String},
  Price: {type : Number},
  totalAmount: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
