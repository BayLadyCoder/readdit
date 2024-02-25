import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { useFetch } from '../../customHooks/useFetch';
import { createPostURLByPostId } from '../../resources/URLs.js';
import PostActionFooter from '../../components/PostActionFooter/PostActionFooter';
import PostHeader from '../PostHeader/PostHeader.jsx';
import PostTextContent from '../PostTextContent/PostTextContent.jsx';
import PostImage from '../PostImage/PostImage.jsx';
import { PostContext } from '../../context/PostContext';

const FullPost = () => {
  const { postId } = useParams();
  const { data, isLoading, isError } = useFetch({
    url: createPostURLByPostId(postId),
    immediate: true,
  });

  if (isError) return <h1>Failed to load</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (!data) return <h1>No post found</h1>;

  return (
    <PostContext.Provider value={data.post}>
      <Paper
        sx={{
          padding: '10px 20px 10px 20px',
          width: { xs: '90%', sm: '80%', md: '70%' },
          maxWidth: '900px',
        }}
      >
        <Stack gap={1}>
          <PostHeader />
          {data.post.imageUrl && <PostImage isFullPost />}
          {data.post.content && <PostTextContent isFullPost />}
        </Stack>
        <PostActionFooter showAuthorActionIcon />
      </Paper>
    </PostContext.Provider>
  );
};

export default FullPost;
