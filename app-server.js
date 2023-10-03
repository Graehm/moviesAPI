require('dotenv').config();
import { useEffect, useState } from "react";
import Form from "./components/Form";
import MovieDisplay from "./components/MovieDisplay";
import MovieList from "./components/MovieList";
import "./styles.css";
import SearchForm from "./components/SearchForm";

export default function App() {
  const apiKey = process.env.API_KEY; // this would be in .env

  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMovies = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovie("Eraserhead");
  }, []);

  return (
    <div className="App">
      <Form getMovie={getMovie} />

      <MovieDisplay movie={movie} />
      <SearchForm getMovies={getMovies} />
      <MovieList movies={movies} />
    </div>
  );
}
