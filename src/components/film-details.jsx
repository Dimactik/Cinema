import Header from "./Header";
import { useSelector } from "react-redux";

function FilmDetails() {
  const movie = useSelector((state) => state.movies.movie);

  const imagePath = movie.poster_path || movie.backdrop_path;
  const backImage = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
  const imgUrl = `https://image.tmdb.org/t/p/w500/${imagePath}`;

  return (
    <>
      <Header />
      <div className="filmDetails" style={{ backgroundImage: `url(${backImage})`, backgroundSize: "cover" }}>
        <div className="detailsCenter">
          <img id="detailsImg" src={imgUrl}></img>
          <h2 id="detailsTitle">{movie.title}</h2>
          <p id="detailsDescription">{movie.overview}</p>
        </div>
      </div>
      <div className="detailsBottom">
        <div>
          <a href="">Info</a>
        </div>
        <div>
          <a href="">Videos</a>
        </div>
        <div>
          <a href="">Pictures</a>
        </div>
      </div>
    </>
  );
}

export default FilmDetails;
