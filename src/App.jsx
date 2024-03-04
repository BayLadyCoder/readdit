import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';

import Feed from './pages/Feed';
import Post from './pages/Post';
import PostForm from './pages/PostForm';
import LoginOrSignupForm from './pages/LoginOrSignupForm';
import Profile from './pages/Profile';

import NotificationAlert from './components/NotificationAlert/NotificationAlert';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NavBar from './components/NavBar/NavBar';
import webSocket from './webSocket';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    webSocket.init(dispatch);
  }, []);

  return (
    <Stack>
      <NavBar />
      <Stack
        alignItems='center'
        sx={{ background: '#eee', minHeight: '100vh', pt: '60px' }}
      >
        <NotificationAlert />
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/posts/:postId' element={<Post />} />
          <Route path='/login' element={<LoginOrSignupForm isLogin={true} />} />
          <Route
            path='/sign-up'
            element={<LoginOrSignupForm isLogin={false} />}
          />
          <Route
            path='/posts/:postId/edit'
            element={<PrivateRoute Component={PostForm} />}
          />
          <Route
            path='/posts/new'
            element={<PrivateRoute Component={PostForm} />}
          />
          <Route
            path='/profile'
            element={<PrivateRoute Component={Profile} />}
          />
        </Routes>
      </Stack>
    </Stack>
  );
};

export default App;
