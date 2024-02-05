import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasFetchedFeedPosts: false,
  posts: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.hasFetchedFeedPosts = true;
    },
    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPosts, addPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
