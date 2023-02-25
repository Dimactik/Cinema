import reactLogo from "./assets/react.svg";
import Filters from "./components/Filters";
import Header from "./components/Header";
import FilmList from "./components/FilmList";
import { genresData } from "./assets/genresData";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sortPopularMovies,
  sortPopularMoviesAsc,
  sortByRating,
  sortByRatingAsc,
  sortBy2020,
  sortBy2019,
  sortBy2018,
  sortBy2017,
} from "./store/movies-slice";

function App() {
  const moviesStore = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  const moviesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovies = moviesStore.slice(firstMovieIndex, lastMovieIndex);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const genres = genresData;

  const filterChange = (sortBy) => {
    if (sortBy === "Popularity") {
      dispatch(sortPopularMovies());
    } else if (sortBy === "PopularityAsc") {
      dispatch(sortPopularMoviesAsc());
    } else if (sortBy === "Rating") {
      dispatch(sortByRating());
    } else if (sortBy === "RatingAsc") {
      dispatch(sortByRatingAsc());
    } else if (sortBy === "2020") {
      dispatch(sortBy2020());
    } else if (sortBy === "2019") {
      dispatch(sortBy2019());
    } else if (sortBy === "2018") {
      dispatch(sortBy2018());
    } else if (sortBy === "2017") {
      dispatch(sortBy2017());
    }
  };

  return (
    <div className="App">
      <Header setShowModal={setShowModal} showModal={showModal} />
      <Filters genres={genres} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} filterChange={filterChange} />
      <FilmList currentMovies={currentMovies} loading={loading} filterChange={filterChange} setShowModal={setShowModal} />
    </div>
  );
}

export default App;
