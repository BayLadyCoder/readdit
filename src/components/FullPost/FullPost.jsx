import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useFetch } from '../../customHooks/useFetch';
import { createPostURLByPostId } from '../../resources/URLs.js';
import { baseURL } from '../../resources/URLs';
import { timeAgo } from '../../helpers/timeAgo';
import PostActionFooter from '../../components/PostActionFooter/PostActionFooter';
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
          <Typography
            variant='body2'
            color='gray'
            sx={{
              fontSize: '12px',
            }}
          >
            Posted by : {data.post.author.username}{' '}
            {timeAgo(data.post.createdAt)}
          </Typography>
          <Typography variant='h1' sx={{ fontSize: '20px', fontWeight: 500 }}>
            {data.post.title}
          </Typography>
          {data.post.imageUrl && (
            <img src={baseURL + '/' + data.post.imageUrl} alt='Post image' />
          )}
          {data.post.content && (
            <Typography
              sx={{
                p: { sm: '5px 10px', md: '10px 20px' },
                whiteSpace: 'break-spaces',
                textAlign: 'justify',
                fontSize: '14px',
                fontFamily: 'Noto Sans',
              }}
            >
              {data.post.content}
            </Typography>
          )}
        </Stack>
        <PostActionFooter showAuthorActionIcon />
      </Paper>
    </PostContext.Provider>
  );
};

export default FullPost;
