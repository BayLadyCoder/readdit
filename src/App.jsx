import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PostFormModal from './components/PostForm/PostForm';

import Feed from './pages/Feed';
import Post from './pages/Post';

export default function ButtonUsage() {
  return (
    <Stack>
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{ borderBottom: '1px solid #dddddd' }}
      >
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant='h5' component='h1' gutterBottom>
            &#129299; Readdit
          </Typography>
        </Link>
        <PostFormModal />
      </Stack>
      <Stack alignItems='center'>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/post' element={<Post />} />
        </Routes>
      </Stack>
    </Stack>
  );
}
