const Movie = require("../models/movieModel");

// 🎬 Get All Movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🎬 Add a New Movie
exports.addMovie = async (req, res) => {
  try {
    const { title, description, poster, showtimes } = req.body;
    if (!title || !description || !poster || !showtimes) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMovie = new Movie({ title, description, poster, showtimes });
    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
