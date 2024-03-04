import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';

import Feed from './pages/Feed';
import Post from './pages/Post';
import PostForm from './pages/PostForm';
import LoginOrSignupForm from './pages/LoginOrSignupForm';
import Profile from './pages/Profile';

import UserNavMenu from './components/UserNavMenu/UserNavMenu';
import NotificationAlert from './components/NotificationAlert/NotificationAlert';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Stack>
      <AppBar position='fixed' sx={{ bgcolor: '#fff' }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          px={2}
        >
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography sx={{ color: '#000' }} variant='h5' component='h1'>
              &#129299; Readdit
            </Typography>
          </Link>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            {user.isLoggedIn ? (
              <>
                <Link to='/posts/new'>
                  <Button variant='contained'>
                    <AddIcon sx={{ mr: '5px' }} /> New Post
                  </Button>
                </Link>
                <UserNavMenu />
              </>
            ) : (
              <Link to='/login'>
                <Button variant='contained'>Login</Button>
              </Link>
            )}
          </Stack>
        </Stack>
      </AppBar>
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
