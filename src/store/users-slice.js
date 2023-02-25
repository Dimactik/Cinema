import { createSlice } from "@reduxjs/toolkit";

const initialState = { combination: "Vasya@12345", logon: false };

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    checkCredentials: (state, action) => {
      if (state.combination == action.payload) {
        state.logon = true;
        console.log("Access Granted");
      } else {
        console.log("Access Denied");
        return state;
      }
    },
    logOff: (state) => {
      state.logon = false;
    },
  },
});

export const { checkCredentials, logOff } = userSlice.actions;

export default userSlice.reducer;
