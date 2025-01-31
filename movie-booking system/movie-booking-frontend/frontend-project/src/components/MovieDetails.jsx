import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/movies/${id}`); // GET movie by ID
        setMovie(res.data); // Set the fetched movie details to state
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

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
