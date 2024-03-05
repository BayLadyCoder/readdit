import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import PostActionFooter from '../../components/PostActionFooter/PostActionFooter';
import PostHeader from '../PostHeader/PostHeader.jsx';
import PostTextContent from '../PostTextContent/PostTextContent.jsx';
import PostImage from '../PostImage/PostImage.jsx';
import { PostContext } from '../../context/PostContext';
import { PostType } from '../../enums/post.js';

const FullPost = ({ post }) => {
  return (
    <PostContext.Provider value={post}>
      <Paper
        sx={{
          padding: '10px 20px 10px 20px',
          width: { xs: '90%', sm: '80%', md: '70%' },
          maxWidth: '900px',
        }}
      >
        <Stack gap={1}>
          <PostHeader />
          {post.imageUrl && <PostImage postType={PostType.FULL} />}
          {post.content && <PostTextContent isFullPost />}
        </Stack>
        <PostActionFooter showAuthorActionIcon />
      </Paper>
    </PostContext.Provider>
  );
};

export default FullPost;
