const express = require('express');
const session = require('express-session');
const cors = require('cors');
// const mongoose = require('mongoose');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const seatRoutes = require('./routes/SeatsRoutes');

require('dotenv').config();

const app = express();

// Session configuration
app.use(session({
  secret: 'your_session_secret',  // A random string for your session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },  // Change this to `true` in production if using HTTPS
}));

app.use(express.json());
app.use(cors());

connectDB();


app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/seats', seatRoutes);

app.use('/',(req, res) => {
  res.send ('Welcome to the Movie Booking API');
});

console.log("MONGO_URI:", process.env.MONGO_URI);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
