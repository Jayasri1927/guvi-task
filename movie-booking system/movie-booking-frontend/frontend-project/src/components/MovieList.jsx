import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies from the backend
        const res = await axios.get('https://guvi-task-41.onrender.com/api/movies');
        setMovies(res.data); // Store fetched movies in the state
      } catch (error) {
        console.error('Error fetching movies:', error);
        SetError('Failed to load movies. Please try again')
      }
    };

    fetchMovies(); // Fetch movies when the component mounts
  }, []);

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue
  }

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;