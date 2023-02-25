import { createSlice } from "@reduxjs/toolkit";
import { moviesData } from "../assets/moviesData";

const initialState = {
  movies: moviesData,
  movie: {},
  favorites: [],
  bookmarks: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    filterReset: (state) => {
      state.movies = moviesData;
    },
    sortPopularMovies: (state) => {
      state.movies.sort((a, b) => b.popularity - a.popularity);
    },
    sortPopularMoviesAsc: (state) => {
      state.movies.sort((a, b) => a.popularity - b.popularity);
    },
    sortByRating: (state) => {
      state.movies.sort((a, b) => b.vote_average - a.vote_average);
    },
    sortByRatingAsc: (state) => {
      state.movies.sort((a, b) => a.vote_average - b.vote_average);
    },
    sortBy2020: (state) => {
      state.movies = moviesData;
      state.movies = state.movies.filter((item) => item.release_date.slice(0, 4) === "2020");
    },
    sortBy2019: (state) => {
      state.movies = moviesData;
      state.movies = state.movies.filter((item) => item.release_date.slice(0, 4) === "2019");
    },
    sortBy2018: (state) => {
      state.movies = moviesData;
      state.movies = state.movies.filter((item) => item.release_date.slice(0, 4) === "2018");
    },
    sortBy2017: (state) => {
      state.movies = moviesData;
      state.movies = state.movies.filter((item) => item.release_date.slice(0, 4) === "2017");
    },
    actionMovies: (state, action) => {
      state.movies = state.movies.filter((item) => item.genre_ids.includes(Number(action.payload)));
    },
    addToFavorites: (state, action) => {
      state.movies = state.movies.map((item) => {
        if (item.id == Number(action.payload)) {
          console.log("net");
          return { ...item, favorite: true };
        }
        return item;
      });
    },
    removeFromFavorites: (state, action) => {
      state.movies = state.movies.map((item) => {
        if (item.id == Number(action.payload)) {
          console.log("da");
          return { ...item, favorite: false };
        }
        return item;
      });
    },
    addToBookmarks: (state, action) => {
      state.movies = state.movies.map((item) => {
        if (item.id == Number(action.payload)) {
          return { ...item, bookmark: true };
        }
        return item;
      });
    },
    removeFromBookmarks: (state, action) => {
      state.movies = state.movies.map((item) => {
        if (item.id == Number(action.payload)) {
          return { ...item, bookmark: false };
        }
        return item;
      });
    },
    showFavorites: (state) => {
      state.movies = state.movies.filter((item) => item.favorite == true);
    },
    showBookmarks: (state) => {
      state.movies = state.movies.filter((item) => item.bookmark == true);
    },
    movieDetails: (state, action) => {
      state.movie = state.movies.find((item) => item.id === action.payload);
      console.log(state.movie.title);
    },
    movieAdvisor: (state, action) => {
      state.movies = moviesData;
      state.movies = state.movies.filter((item) => item.genre_ids.includes(Number(action.payload[0])));
      if ("Top" === action.payload[1]) {
        state.movies = state.movies.filter((item) => item.vote_average >= 5);
      } else {
        state.movies = state.movies.filter((item) => item.vote_average < 5);
      }
      if ("Famous" === action.payload[2]) {
        state.movies = state.movies.filter((item) => (item.popularity >= 100) & (item.vote_count >= 200));
      } else {
        state.movies = state.movies.filter((item) => (item.popularity < 100) & (item.vote_count < 200));
      }
      state.movie = state.movies[Math.floor(Math.random() * state.movies.length)];
    },
  },
});

// state.movies = state.movies.filter((item) => item.bookmark === true);
export const {
  sortPopularMovies,
  filterReset,
  sortPopularMoviesAsc,
  sortByRating,
  sortByRatingAsc,
  sortBy2020,
  sortBy2019,
  sortBy2018,
  sortBy2017,
  actionMovies,
  addToFavorites,
  addToBookmarks,
  showFavorites,
  showBookmarks,
  removeFromFavorites,
  removeFromBookmarks,
  movieDetails,
  movieAdvisor,
} = moviesSlice.actions;

export default moviesSlice.reducer;
