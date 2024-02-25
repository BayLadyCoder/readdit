import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import placeholderImage from '../../assets/images/no-image.png';
import { baseURL } from '../../resources/URLs';
import { PostContext } from '../../context/PostContext';
import PostVoters from '../PostVoters/PostVoters';
import PostActionFooter from '../PostActionFooter/PostActionFooter';

const PostCardClassic = ({ post }) => {
  return (
    <PostContext.Provider value={post}>
      <Link
        to={`/posts/${post._id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Stack
          direction='row'
          spacing={2}
          sx={{ border: '1px solid #ddd', p: 1, height: '100px' }}
        >
          <PostVoters />
          <img
            style={{ objectFit: 'contain' }}
            width='100px'
            src={
              post.imageUrl ? `${baseURL}/${post.imageUrl}` : placeholderImage
            }
            alt='post-image'
          />

          <Box width='100%'>
            <Box>
              <Typography>{post.title}</Typography>
              <Typography
                color='#888'
                variant='body2'
                sx={{ fontStyle: 'italic' }}
              >
                Posted By {post.author.username}
              </Typography>
            </Box>
            <PostActionFooter isClassicStyle />
          </Box>
        </Stack>
      </Link>
    </PostContext.Provider>
  );
};

export default PostCardClassic;
