// movie_booking_system/server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
       
        console.log("Database Connected");
    } catch (error) {
        console.log("Database connection failed");
    }
};

module.exports = connectDB;

// Models
const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  genre: String,
  showTimes: [String],
});

const BookingSchema = new mongoose.Schema({
  movieId: mongoose.Schema.Types.ObjectId,
  userName: String,
  email: String,
  seats: Number,
  bookingTime: Date,
  movieName:String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const Movie = mongoose.model('Movie', MovieSchema);
const Booking = mongoose.model('Booking', BookingSchema);
const User = mongoose.model('User', UserSchema);

// Routes
// Movie routes
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/movies', async (req, res) => {
  try {
    const { title, description, duration, genre, showTimes } = req.body;
    const movie = new Movie({ title, description, duration, genre, showTimes });
    await movie.save();
    res.json({ success: true, movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Booking routes
app.post('/book', async (req, res) => {
  try {
    const { movieId, userName, email, seats } = req.body;
    const booking = new Booking({
      movieId,
      userName,
      email,
      seats,
      bookingTime: new Date(),
      movieName,
    });
    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('movieId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User routes
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, user });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
