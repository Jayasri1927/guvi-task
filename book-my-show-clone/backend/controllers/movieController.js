const Movie = require("../models/movieModel");

// 🎬 Get All Movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🎬 Get a Single Movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// 🎬 Add a New Movie
const addMovie = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // 🛠️ Debug log

    const { title, description, poster, showtimes } = req.body;

    // Validate request data
    if (!title || !description || !poster || !showtimes || !Array.isArray(showtimes)) {
      return res.status(400).json({ message: "All fields are required, and showtimes must be an array of objects" });
    }

    // Ensure each showtime has both `date` and `time`
    for (const showtime of showtimes) {
      if (!showtime.date || !showtime.time) {
        return res.status(400).json({ message: "Each showtime must have a date and time" });
      }
    }

    // Create new movie
    const newMovie = new Movie({
      title,
      description,
      poster,
      showtimes,
    });

    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getMovies, addMovie, getMovieById};
