import { useContext } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { timeAgo } from '../../helpers/timeAgo';
import { PostContext } from '../../context/PostContext';
import AuthorMoreActionButton from '../AuthorMoreActionButton/AuthorMoreActionButton.jsx';

const PostTitle = ({ title }) => {
  return (
    <Typography sx={{ fontWeight: '500', fontSize: '20px' }}>
      {title}
    </Typography>
  );
};

const PostMetaData = ({ authorUsername, createdAt }) => {
  return (
    <Typography variant='body2' sx={{ fontSize: '12px', color: '#555' }}>
      {`Posted by ${authorUsername} ${timeAgo(createdAt)}`}
    </Typography>
  );
};

const PostCardHeader = () => {
  const post = useContext(PostContext);

  return (
    <Stack
      spacing={1}
      direction='row'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <Box>
        <PostMetaData
          authorUsername={post.author.username}
          createdAt={post.createdAt}
        />
        <PostTitle title={post.title} />
      </Box>
      <AuthorMoreActionButton post={post} forHeader />
    </Stack>
  );
};

export default PostCardHeader;
