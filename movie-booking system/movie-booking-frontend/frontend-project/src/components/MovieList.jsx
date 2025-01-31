import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies from the backend
        const res = await axios.get('http://localhost:3000/api/movies');
        setMovies(res.data); // Store fetched movies in the state
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(); // Fetch movies when the component mounts
  }, []);

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