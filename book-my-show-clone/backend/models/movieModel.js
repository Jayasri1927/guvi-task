const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true }, // Image URL
  showtimes: [{ type: String, required: true }], // Array of showtimes
});

module.exports = mongoose.model("Movie", movieSchema);
