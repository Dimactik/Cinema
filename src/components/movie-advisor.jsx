import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import { genresData } from "../assets/genresData";
import { useDispatch, useSelector } from "react-redux";
import { movieAdvisor } from "../store/movies-slice";

function MovieAdvisor() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movie);
  const imagePath = movie.poster_path || movie.backdrop_path;
  const imgUrl = `https://image.tmdb.org/t/p/w500/${imagePath}`;

  const [genre, setGenre] = useState("28");
  const [rating, setRating] = useState("Top");
  const [popularity, setPopularity] = useState("Unknown");
  const [isSubmited, setIsSubmited] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(movieAdvisor([genre, rating, popularity]));
    setIsSubmited(true);
  }

  function handleGenre(event) {
    setGenre(event.target.value);
  }

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <h2>Movie Advisor</h2>
        <h4>Genre:</h4>
        <select value={genre} onChange={() => handleGenre(event)}>
          {genresData.map((item) => (
            <option id={item.id} key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <h4>Rating:</h4>
        <select value={rating} onChange={() => setRating(event.target.value)}>
          <option value="Top">Top rated</option>
          <option value="Low">Low rated</option>
        </select>
        <h4>Popularity:</h4>
        <select value={popularity} onChange={() => setPopularity(event.target.value)}>
          <option value="Unknown">Unknown</option>
          <option value="Famous">Famous</option>
        </select>
        <input type="submit" />
      </form>
      {isSubmited && (
        <div>
          <h1>{movie.title}</h1>
          <img src={imgUrl}></img>
          <p>{movie.overview}</p>
          <button>Not interested</button>
          <Link to={`/movies/` + movie.id}>
            <button>Interested</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MovieAdvisor;
