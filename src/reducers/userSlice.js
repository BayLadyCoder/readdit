import { createSlice } from '@reduxjs/toolkit';

import {
  saveUserDataToSS,
  removeUserDataFromSS,
} from '../helpers//sessionStorage';

const initialState = {
  token: undefined,
  id: undefined,
  username: undefined,
  isLoggedIn: false,
  posts: undefined,
  cakeDay: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.cakeDay = action.payload.cakeDay;
      state.isLoggedIn = true;
      saveUserDataToSS(action.payload);
    },
    logout: () => {
      removeUserDataFromSS();
      return initialState;
    },
    setUserPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setUserPosts } = userSlice.actions;

export default userSlice.reducer;
