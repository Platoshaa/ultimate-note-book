import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../api";
const initialState = {
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.token = null;
      state.email = null;
    },
  },
});
export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;

export const asyncSignOut = () => {
  return (dispatch) => {
    authAPI.signOut().then(() => {
      dispatch(removeUser());
    });
  };
};
export const asyncSignIn = () => {
  return (dispatch) => {
    authAPI.signIn().then((response) => {
      if (response) {
        const state = { email: response.email, token: response.uid };
        dispatch(setUser(state));
      }
    });
  };
};
