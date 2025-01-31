const express = require('express');
const router = express.Router();
const { addMovie } = require('../controllers/movieController');
const Movie = require('../models/movieModel'); // Import the Movie model

// Route to add a new movie
router.post('/movies', addMovie);

// Route to fetch all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from the database
    res.json(movies); // Send movies as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Route to fetch a single movie by ID
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Find movie by its ID
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie); // Send the movie details as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

module.exports = router;
