import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Feed from './pages/Feed';
import Post from './pages/Post';
import PostForm from './pages/PostForm';
import LoginOrSignupForm from './pages/LoginOrSignupForm';

const App = () => {
  const [posts, setPosts] = useState([]);

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

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
        <Link to='/posts/new'>
          <Button variant='contained'>+ New Post</Button>
        </Link>
        <Link to='/login'>
          <Button variant='contained'>Login</Button>
        </Link>
      </Stack>
      <Stack alignItems='center'>
        <Routes>
          <Route
            path='/'
            element={
              <Feed posts={posts} setPosts={setPosts} deletePost={deletePost} />
            }
          />
          <Route path='/posts/:postId' element={<Post />} />
          <Route path='/login' element={<LoginOrSignupForm isLogin={true} />} />
          <Route
            path='/sign-up'
            element={<LoginOrSignupForm isLogin={false} />}
          />
          <Route
            path='/posts/:postId/edit'
            element={<PostForm posts={posts} setPosts={setPosts} />}
          />
          <Route
            path='/posts/new'
            element={<PostForm posts={posts} setPosts={setPosts} />}
          />
        </Routes>
      </Stack>
    </Stack>
  );
};

export default App;
