import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Feed from './pages/Feed';
import Post from './pages/Post';
import PostForm from './pages/PostForm';
import LoginOrSignupForm from './pages/LoginOrSignupForm';
import UserNavMenu from './components/UserNavMenu/UserNavMenu';

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Stack>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ borderBottom: '1px solid #dddddd', width: '100%' }}
      >
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant='h5' component='h1'>
            &#129299; Readdit
          </Typography>
        </Link>
        <Link to={user.isLoggedIn ? `/posts/new` : '/login'}>
          <Button variant='contained'>+ New Post</Button>
        </Link>
        {user.isLoggedIn ? (
          <UserNavMenu />
        ) : (
          <Link to='/login'>
            <Button variant='contained'>Login</Button>
          </Link>
        )}
      </Stack>
      <Stack alignItems='center'>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/posts/:postId' element={<Post />} />
          <Route path='/login' element={<LoginOrSignupForm isLogin={true} />} />
          <Route
            path='/sign-up'
            element={<LoginOrSignupForm isLogin={false} />}
          />
          <Route path='/posts/:postId/edit' element={<PostForm />} />
          <Route path='/posts/new' element={<PostForm />} />
        </Routes>
      </Stack>
    </Stack>
  );
};

export default App;
