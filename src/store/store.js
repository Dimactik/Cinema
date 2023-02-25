import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies-slice";
import usersSlice from "./users-slice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    users: usersSlice,
  },
});
