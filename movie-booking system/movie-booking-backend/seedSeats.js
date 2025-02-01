const mongoose = require('mongoose');
const Seat = require('./models/seats'); // Import your Seat model
const Movie = require('./models/movieModel'); // Import your Movie model

// Replace with the MongoDB URI for your database (can use from environment variables)
const mongoURI = 'mongodb+srv://jayasrig2002:fJo0IXJn6VdF4Kok@cluster0.rctd7.mongodb.net/app';

const seedSeats = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Define some example data (change accordingly)
    const movie = await Movie.findOne({ title: 'Mersal' });

    if (!movie) {
      console.log('Movie not found!');
      return;
    }

    // Array of seats to be added to the movie
    const seats = [
      { movieId: movie._id, seatNumber: 'A1', status: 'available' },
      { movieId: movie._id, seatNumber: 'A2', status: 'available' },
      { movieId: movie._id, seatNumber: 'B1', status: 'booked' },
      { movieId: movie._id, seatNumber: 'B2', status: 'available' },
      { movieId: movie._id, seatNumber: 'C1', status: 'booked' },
      { movieId: movie._id, seatNumber: 'C2', status: 'available' }
    ];

    // Insert multiple seat documents into MongoDB
    await Seat.insertMany(seats);

    console.log('Seats have been successfully seeded!');
    mongoose.connection.close(); // Close the connection
  } catch (error) {
    console.error('Error seeding seats:', error);
    mongoose.connection.close();
  }
};

seedSeats();
