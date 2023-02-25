import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, addToBookmarks, removeFromFavorites, removeFromBookmarks, movieDetails } from "../store/movies-slice";
import FilmDetails from "./film-details";

function Film({ vote_average, title, imagePath, id, fav, book, setShowModal }) {
  const dispatch = useDispatch();
  const imgUrl = `https://image.tmdb.org/t/p/w500/${imagePath}`;
  const moviesStore = useSelector((state) => state.movies.movies);
  const isLogon = useSelector((state) => state.users.logon);

  const handleFavorites = function (id, fav) {
    if (!isLogon) {
      setShowModal(true);
      return;
    }
    fav ? dispatch(removeFromFavorites(id)) : dispatch(addToFavorites(id.toString()));
  };

  const handleBookmarks = function (id, book) {
    if (!isLogon) {
      setShowModal(true);
      return;
    }
    book ? dispatch(removeFromBookmarks(id)) : dispatch(addToBookmarks(id.toString()));
  };

  return (
    <div className="filmDiv">
      <div className="img">
        <img src={imgUrl}></img>
      </div>
      <div className="description">
        <p className="rating">
          Rating: {vote_average}{" "}
          <span id="favorite" style={fav ? { color: "gold" } : { color: "black" }} onClick={() => handleFavorites(id, fav)}>
            &#10032;
          </span>
          <span id="later" style={book ? { opacity: "1" } : { opacity: "0.3" }} onClick={() => handleBookmarks(id, book)}>
            &#128278;
          </span>
        </p>
        <p className="title">
          <b>{title}</b>
        </p>
      </div>
      <Link onClick={() => dispatch(movieDetails(id))} to={`/movies/` + id} style={{ textDecoration: "none", color: "grey" }}>
        <div className="details">
          <p>Details</p>
          {/* <p>Year: {release_date.slice(0, 4)}</p> */}
        </div>
      </Link>
    </div>
  );
}

export default Film;
