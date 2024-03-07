import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasFetchedFeedPosts: false,
  posts: [],
  fullPosts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.hasFetchedFeedPosts = true;
    },
    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
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
    addFullPost: (state, action) => {
      state.fullPosts = [...state.fullPosts, action.payload];
    },
    addComment: (state, action) => {
      state.fullPosts = state.fullPosts.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments.push(action.payload);
        }
        return post;
      });
    },
    deleteComment: (state, action) => {
      state.fullPosts = state.fullPosts.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments = post.comments.filter(
            (comment) => comment._id !== action.payload._id
          );
        }
        return post;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPosts,
  addPost,
  updatePost,
  deletePost,
  addFullPost,
  addComment,
  deleteComment,
} = postsSlice.actions;

export default postsSlice.reducer;
