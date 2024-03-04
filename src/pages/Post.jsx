import Stack from '@mui/material/Stack';

import FullPost from '../components/FullPost/FullPost';
import CommentForm from '../components/Comment/CommentForm/CommentForm';
import CommentCard from '../components/Comment/CommentCard/CommentCard';

const Post = () => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }} alignItems='center'>
      <FullPost />
      <CommentForm />
      <CommentCard />
    </Stack>
  );
};

export default Post;
