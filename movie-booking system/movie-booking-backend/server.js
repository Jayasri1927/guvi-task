const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();


// app.post('/api/movies', async (req, res) => {
//   const { title, genre, releaseDate, showtimes } = req.body;

//   console.log(req.body);  // This logs the body of the request (for debugging)

//   try {
//     // Create a new movie document based on the received data
//     const newMovie = new Movie({
//       title,
//       genre,
//       releaseDate,
//       showtimes,
//     });

//     // Save the new movie to the database
//     await newMovie.save();

//     // Send a response with the saved movie data
//     res.status(201).json(newMovie);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving movie data' });
//   }
// });


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

app.use('/api', movieRoutes);
app.use('/api', bookingRoutes);
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
