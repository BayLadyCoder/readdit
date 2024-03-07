import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useFetch } from '../../../customHooks/useFetch';
import { baseURL } from '../../../resources/URLs.js';

const CommentCard = ({ comment }) => {
  const { fetchData: deleteComment } = useFetch({
    immediate: false,
    options: { method: 'DELETE' },
  });

  const handleDeleteComment = (e) => {
    e.preventDefault();
    deleteComment({ url: `${baseURL}/api/comments/${comment._id}` });
  };

  return (
    <Stack
      sx={{
        width: { xs: '90%', sm: '80%', md: '70%' },
        minWidth: { xs: '90%', sm: '80%', md: '70%' },
      }}
    >
      <Paper
        sx={{
          padding: '10px 20px 10px 20px',
        }}
      >
        <Typography>Comment: {comment.comment}</Typography>
        <Typography>Author: {comment.author.username}</Typography>
        <Typography>Time ago: {comment.createdAt}</Typography>
        <IconButton onClick={handleDeleteComment}>
          <DeleteIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default CommentCard;
