const express = require('express');
const session = require('express-session');
const cors = require('cors');
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


app.use('/api', movieRoutes);
app.use('/api', bookingRoutes);
app.use('/api', userRoutes);
app.use('/api', seatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
