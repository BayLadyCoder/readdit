import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PostForm from './components/PostForm/PostForm';

import Feed from './pages/Feed';

export default function ButtonUsage() {
  return (
    <Stack>
      <Box sx={{ borderBottom: '1px solid #dddddd', width: '100%' }}>
        <Typography variant='h5' gutterBottom>
          &#129299; Readdit
        </Typography>
      </Box>
      <Stack alignItems='center'>
        <PostForm />
        <Feed />
      </Stack>
    </Stack>
  );
}
