import { useContext } from 'react';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

import { baseURL } from '../../resources/URLs.js';
import { PostContext } from '../../context/PostContext.jsx';
import placeholderImage from '../../assets/images/no-image.png';
import { PostType } from '../../enums/post.js';

const largeImageStyles = {
  objectFit: 'contain',
};

const mediumImageStyles = {
  objectFit: 'contain',
  maxWidth: { sm: 300, md: 400 },
  maxHeight: 300,
};

const smallImageStyles = {
  objectFit: 'cover',
  width: '150px',
};

const PostImage = ({ postType }) => {
  const post = useContext(PostContext);
  const styles =
    postType === PostType.FULL
      ? largeImageStyles
      : postType === PostType.CLASSIC
      ? smallImageStyles
      : mediumImageStyles;

  const image = post.imageUrl
    ? `${baseURL}/${post.imageUrl}`
    : placeholderImage;

  return (
    <Stack direction='row' justifyContent='center'>
      <CardMedia component='img' src={image} alt='Post image' sx={styles} />
    </Stack>
  );
};

export default PostImage;
