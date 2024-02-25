import { useContext } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { PostContext } from '../../context/PostContext';

const Overlay = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom,rgba(250,250,250,0.1), white)',
        width: '100%',
        height: '100%',
        zIndex: 2,
      }}
    ></Box>
  );
};

const PostCardContent = ({ isFullPost }) => {
  const post = useContext(PostContext);

  return (
    <Stack sx={{ position: 'relative' }}>
      {!isFullPost && <Overlay />}
      <Box
        sx={{
          p: '16px',
          pt: 0,
          maxHeight: isFullPost ? 'auto' : 200,
          whiteSpace: 'break-spaces',
          overflow: 'hidden',
          textAlign: 'justify',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Noto Sans',
            fontSize: '14px',
          }}
          width='100%'
        >
          {post.content}
        </Typography>
      </Box>
    </Stack>
  );
};

export default PostCardContent;
