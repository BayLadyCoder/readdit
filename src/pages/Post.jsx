import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import { useFetch } from '../customHooks/useFetch';
import { createPostURLByPostId } from '../resources/URLs.js';
import FullPost from '../components/FullPost/FullPost';
import CommentForm from '../components/Comment/CommentForm/CommentForm';
import CommentCard from '../components/Comment/CommentCard/CommentCard';
import { addFullPost } from '../reducers/postsSlice.js';

const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.fullPosts.find((p) => p._id === postId)
  );

  const { isLoading, isError } = useFetch({
    url: createPostURLByPostId(postId),
    immediate: !post,
    dataHandler: (data) => {
      dispatch(addFullPost(data.post));
    },
  });

  if (isError) return <h1>Failed to load</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (!post) return <h1>No post found</h1>;

  return (
    <Stack spacing={2} sx={{ width: '100%' }} alignItems='center'>
      <FullPost post={post} />
      <CommentForm />
      {post.comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </Stack>
  );
};

export default Post;
