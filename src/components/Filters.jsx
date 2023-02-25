import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterReset, actionMovies, showFavorites, showBookmarks } from "../store/movies-slice";

function Filters({ genres, id, name, nextPage, prevPage, currentPage, filterChange }) {
  const moviesStore = useSelector((state) => state.movies.movies);
  const isLogon = useSelector((state) => state.users.logon);
  const totalPages = Math.ceil(moviesStore.length / 10);
  const [filter, setFilter] = useState("Popularity");
  const [filter2, setFilter2] = useState("2020");
  const dispatch = useDispatch();
  const [isReseted, setIsReseted] = useState(false);

  useEffect(() => {
    filterChange(filter);
  }, [filter]);

  useEffect(() => {
    filterChange(filter2);
  }, [filter2]);

  useEffect(() => {
    setIsReseted(false);
  }, [handleReset]);

  function genreFilter(e) {
    if (e.target.checked) dispatch(actionMovies(e.target.id));
    setIsReseted(false);
  }

  function handleReset() {
    dispatch(filterReset());
    setIsReseted((prev) => !prev);
    setFilter("Popularity");
    setFilter2("2020");
  }

  function handleFavorites() {
    dispatch(showFavorites());
  }
  function handleBookmarks() {
    dispatch(showBookmarks());
  }

  return (
    <div className="filters">
      <h1>Filters</h1>
      <button onClick={() => handleReset()}>Reset all filters</button>
      {isLogon && (
        <div>
          <button onClick={() => handleFavorites()}>Show Favorires</button>
          <button onClick={() => handleBookmarks()}>Show Bookmarks</button>{" "}
        </div>
      )}
      <p>
        Sort by:
        <select
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          name="select1"
          value={filter}
        >
          <option defaultValue value="Popularity">
            Popularity
          </option>
          <option value="PopularityAsc">PopularityAsc</option>
          <option value="Rating">Rating</option>
          <option value="RatingAsc">RatingAsc</option>
        </select>
      </p>
      <p>
        Year:
        <select
          onChange={(e) => {
            setFilter2(e.target.value);
          }}
          name="select2"
          value={filter2}
        >
          <option defaultValue value="2020">
            2020
          </option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
        </select>
      </p>
      <ul>
        {isReseted
          ? genres.map((item) => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    id={item.id}
                    name={item.name}
                    checked={false}
                    onChange={() => {
                      genreFilter;
                    }}
                  />
                  {item.name}
                </label>
              </li>
            ))
          : genres.map((item) => (
              <li key={item.id}>
                <label>
                  <input type="checkbox" id={item.id} name={item.name} onChange={genreFilter} />
                  {item.name}
                </label>
              </li>
            ))}
      </ul>
      <p>
        {currentPage < 2 ? (
          <button disabled onClick={prevPage}>
            Back
          </button>
        ) : (
          <button onClick={prevPage}> Back </button>
        )}

        {currentPage >= totalPages ? (
          <button disabled onClick={nextPage}>
            Forward
          </button>
        ) : (
          <button onClick={nextPage}>Forward</button>
        )}
      </p>
      <p>
        {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default Filters;
