import { createSlice } from '@reduxjs/toolkit';

import {
  saveUserDataToSS,
  removeUserDataFromSS,
  updateUserVotesInSS,
} from '../helpers/sessionStorage';
import { createAvatarLabel } from '../helpers/createAvatarLabel';

const initialState = {
  token: undefined,
  _id: undefined,
  username: undefined,
  isLoggedIn: false,
  posts: undefined,
  cakeDay: undefined,
  votes: [],
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
      state = action.payload;
      state.isLoggedIn = true;
      state.avatarLabel = createAvatarLabel(action.payload.username);
      saveUserDataToSS(action.payload);
      return state;
    },
    logout: () => {
      removeUserDataFromSS();
      return initialState;
    },
    setUserPosts: (state, action) => {
      state.posts = action.payload;
    },
    addNewUserVote: (state, action) => {
      state.votes = [...state.votes, action.payload];
      updateUserVotesInSS(state.votes);
    },
    updateUserVote: (state, action) => {
      state.votes = state.votes.map((vote) => {
        if (vote._id === action.payload._id) {
          return action.payload;
        }
        return vote;
      });
      updateUserVotesInSS(state.votes);
    },
    deleteUserVote: (state, action) => {
      state.votes = state.votes.filter(
        (vote) => vote._id !== action.payload._id
      );
      updateUserVotesInSS(state.votes);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  setUserPosts,
  addNewUserVote,
  updateUserVote,
  deleteUserVote,
} = userSlice.actions;

export default userSlice.reducer;
