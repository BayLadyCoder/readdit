import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import { PostContext } from '../../context/PostContext';
import PostActionFooter from '../PostActionFooter/PostActionFooter';
import PostVoters from '../PostVoters/PostVoters';
import PostHeader from '../PostHeader/PostHeader';
import PostTextContent from '../PostTextContent/PostTextContent';
import PostCardImage from './PostCardImage';

const PostCardPaperStyles = {
  width: {
    xs: 345,
    sm: 500,
    md: 600,
    marginBottom: 10,
    display: 'flex',
    padding: '0px 4px 0px 0px',
  },
};

const PostCard = ({ post }) => {
  return (
    <PostContext.Provider value={post}>
      <Paper sx={PostCardPaperStyles}>
        <PostVoters />
        <Stack spacing={1} sx={{ width: '100%', padding: '10px 0px 8px 8px' }}>
          <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
            <PostHeader showAuthorActionIcon />
            {post.imageUrl ? <PostCardImage /> : <PostTextContent />}
          </Link>
          <PostActionFooter />
        </Stack>
      </Paper>
    </PostContext.Provider>
  );
};

export default PostCard;
