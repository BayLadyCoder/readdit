import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import postsReducer from './reducers/postsSlice';

export const store = configureStore({
  reducer: { user: userReducer, posts: postsReducer },
});
