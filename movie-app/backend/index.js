const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Movie model for bookings
const bookingSchema = new mongoose.Schema({
  movieId: String,
  movieTitle: String,
  seats: Number,
  customerName: String,
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Movie API request to RapidAPI
app.get('/api/movies', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://moviedatabase8.p.rapidapi.com/movie/popular',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error: error.message });
  }
});

// Movie details API request
app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  const options = {
    method: 'GET',
    url: `https://moviedatabase8.p.rapidapi.com/movie/${id}`,
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie details', error: error.message });
  }
});

// Booking API endpoint
app.post('/api/bookings', async (req, res) => {
  const { movieId, movieTitle, seats, customerName } = req.body;

  const newBooking = new Booking({
    movieId,
    movieTitle,
    seats,
    customerName,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to book movie', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
