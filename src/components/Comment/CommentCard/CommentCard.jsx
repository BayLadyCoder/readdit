import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const CommentCard = ({ comment }) => {
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
      </Paper>
    </Stack>
  );
};

export default CommentCard;
