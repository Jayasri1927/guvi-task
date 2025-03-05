const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true }, // Image URL
  showtimes: [
    {
      date: { type: String, required: true },
      time: { type: String, required: true },
    }
  ], // Array of objects (date + time)
});

module.exports = mongoose.model("Movie", movieSchema);
