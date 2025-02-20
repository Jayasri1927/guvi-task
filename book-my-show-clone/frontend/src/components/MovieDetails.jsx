import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://guvi-task-43.onrender.com/api/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div className="movie-details">
      <img src={movie.poster} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <Link to={`/movies/${movieId}/seats`}>Select Seats</Link>
    </div>
  );
};

export default MovieDetails;
