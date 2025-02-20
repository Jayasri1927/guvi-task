const Movie = require('../models/movieModel');

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const { title, genre, releaseDate, showtimes } = req.body;

    if (!title || !genre || !releaseDate || !showtimes) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const movie = new Movie({ title, genre, releaseDate, showtimes });

    await movie.save();
    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (err) {
    console.error('Error adding movie:', err);
    res.status(500).json({ error: 'Failed to add movie' });
  }
};

// Fetch all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// Fetch a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};

module.exports = { addMovie, getAllMovies, getMovieById };
