import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { PostContext } from '../../context/PostContext';
import PostActionFooter from '../PostActionFooter/PostActionFooter';
import PostVoters from '../PostVoters/PostVoters';
import PostHeader from '../PostHeader/PostHeader';
import PostTextContent from '../PostTextContent/PostTextContent';
import PostImage from '../PostImage/PostImage';
import { PostType } from '../../enums/post';

const PostCardPaperStyles = {
  width: {
    xs: 345,
    sm: 500,
    md: 600,
    marginBottom: 10,
    display: 'flex',
  },
};

const PostCard = ({ post }) => {
  return (
    <PostContext.Provider value={{ ...post, postType: PostType.CARD }}>
      <Paper sx={PostCardPaperStyles}>
        <Box sx={{ padding: '10px 0px', backgroundColor: '#f7f7f7' }}>
          <PostVoters />
        </Box>
        <Stack spacing={1} sx={{ width: '100%', padding: '10px 0px 8px 8px' }}>
          <Link
            to={`/posts/${post._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <PostHeader showAuthorActionIcon />
            {post.imageUrl ? <PostImage /> : <PostTextContent />}
          </Link>
          <PostActionFooter />
        </Stack>
      </Paper>
    </PostContext.Provider>
  );
};

export default PostCard;
