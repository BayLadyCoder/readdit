import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PostForm from './components/PostForm/PostForm';

import Feed from './pages/Feed';

export default function ButtonUsage() {
  return (
    <Box>
      <Box sx={{ borderBottom: '1px solid #dddddd', width: '100%' }}>
        <Typography variant='h5' gutterBottom>
          &#129299; Readdit
        </Typography>
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PostForm />
        <Feed />
      </Container>
    </Box>
  );
}
