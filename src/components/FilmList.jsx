import Film from "./Film";

function FilmList({ currentMovies, loading, setShowModal }) {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="filmList">
      {currentMovies.map((item) => (
        <Film
          key={item.id}
          title={item.title}
          vote_average={item.vote_average}
          imagePath={item.poster_path || item.backdrop_path}
          id={item.id}
          fav={item.favorite}
          book={item.bookmark}
          setShowModal={setShowModal}
        />
      ))}
    </div>
  );
}

export default FilmList;
