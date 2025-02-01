const express = require('express');
const router = express.Router();
const { getSeats, addSeats } = require('../controllers/seatsController');

// Route to fetch all seats for a movie
router.get('/movies/:id/seats', getSeats);

// Route to add seats for a movie
router.post('/movies/:id/seats', addSeats);

module.exports = router;
