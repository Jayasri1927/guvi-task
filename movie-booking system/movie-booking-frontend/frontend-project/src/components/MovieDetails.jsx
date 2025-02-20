import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://guvi-task-41.onrender.com/api/movies/${id}`); // GET movie by ID
        setMovie(res.data); // Set the fetched movie details to state
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details.');
      }
    };

    fetchMovie();
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>⚠ {error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Genre: {movie.genre}</p>
      <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
      <p>Showtimes: {new Date(movie.showtimes).toLocaleString()}</p>
      
    </div>
  );
};

export default MovieDetail;
