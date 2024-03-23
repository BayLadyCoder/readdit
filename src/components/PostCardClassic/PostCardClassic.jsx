import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { PostContext } from '../../context/PostContext';
import PostActionFooter from '../PostActionFooter/PostActionFooter';
import PostImage from '../PostImage/PostImage';
import { PostType } from '../../enums/post';

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
          sx={{ border: '1px solid #ddd', p: 1, maxHeight: '120px' }}
        >
          <PostImage postType={PostType.CLASSIC} />

          <Stack width='100%' justifyContent='space-between'>
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
            <PostActionFooter
              postType={PostType.CLASSIC}
              showPostVoters={true}
            />
          </Stack>
        </Stack>
      </Link>
    </PostContext.Provider>
  );
};

export default PostCardClassic;
