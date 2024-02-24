import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { timeAgo } from '../../helpers/timeAgo';
import AuthorMoreActionButton from '../AuthorMoreActionButton/AuthorMoreActionButton.jsx';

const PostCardHeader = ({ post }) => {
  return (
    <Stack
      pb={1}
      spacing={1}
      direction='row'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <Box>
        <Typography sx={{ fontWeight: '500', fontSize: '20px' }}>
          {post.title}
        </Typography>
        <Typography variant='body2' sx={{ fontSize: '12px', color: '#555' }}>
          {`Posted by ${post.author.username} ${timeAgo(post.createdAt)}`}
        </Typography>
      </Box>
      <AuthorMoreActionButton post={post} forHeader />
    </Stack>
  );
};

export default PostCardHeader;
