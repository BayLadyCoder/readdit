import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/userSlice';
import posts from './reducers/postsSlice';
import notifications from './reducers/notificationsSlice';

export const store = configureStore({
  reducer: { user, posts, notifications },
});
