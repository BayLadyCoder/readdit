import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

import { PostContext } from '../../context/PostContext';
import PostActionFooter from '../PostActionFooter/PostActionFooter';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardImage from './PostCardImage';

const PostCard = ({ post }) => {
  return (
    <PostContext.Provider value={post}>
      <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
        <Paper
          sx={{
            width: {
              xs: 345,
              sm: 500,
              md: 600,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: '10px 4px 6px 12px',
            },
          }}
        >
          <PostCardHeader />
          {post.imageUrl ? <PostCardImage /> : <PostCardContent />}
          <PostActionFooter />
        </Paper>
      </Link>
    </PostContext.Provider>
  );
};

export default PostCard;
