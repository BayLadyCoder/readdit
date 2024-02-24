import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

import { baseURL } from '../../resources/URLs.js';

const PostCardImage = ({ post }) => {
  return (
    <Stack direction='row' justifyContent='center'>
      <CardMedia
        component='img'
        src={`${baseURL}/${post.imageUrl}`}
        alt='Post image'
        sx={{
          objectFit: 'contain',
          maxWidth: { sm: 300, md: 400 },
          maxHeight: 300,
        }}
      />
    </Stack>
  );
};

export default PostCardImage;
