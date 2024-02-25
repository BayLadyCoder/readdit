import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

import { baseURL } from '../../resources/URLs.js';
import { PostContext } from '../../context/PostContext.jsx';

const mediumImageStyles = {
  maxWidth: { sm: 300, md: 400 },
  maxHeight: 300,
};

const PostImage = ({ isFullPost }) => {
  const post = useContext(PostContext);
  const styles = isFullPost ? {} : mediumImageStyles;

  return (
    <Stack direction='row' justifyContent='center'>
      <CardMedia
        component='img'
        src={`${baseURL}/${post.imageUrl}`}
        alt='Post image'
        sx={{
          objectFit: 'contain',
          ...styles,
        }}
      />
    </Stack>
  );
};

export default PostImage;
