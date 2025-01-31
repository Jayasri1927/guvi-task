const Movie = require('../models/movieModel'); // Import the Movie model

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const { title, genre, releaseDate, showtimes } = req.body;

    const movie = new Movie({
      title,
      genre,
      releaseDate,
      showtimes,
    });

    await movie.save();
    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add movie' });
  }
};

// Fetch all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from the database
    res.json(movies); // Return all movies as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// Fetch a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Fetch movie by ID
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie); // Return the movie as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};




module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
};
