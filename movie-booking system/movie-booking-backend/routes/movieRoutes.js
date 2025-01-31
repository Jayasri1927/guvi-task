const express = require('express');
const router = express.Router();
const { addMovie, getAllMovies, getMovieById } = require('../controllers/movieController'); // Importing functions

// Route to add a new movie
router.post('/movies', addMovie);

// Route to fetch all movies
router.get('/movies', getAllMovies); // Use the getAllMovies function here

// Route to fetch a single movie by ID
router.get('/movies/:id', getMovieById);

module.exports = router;



