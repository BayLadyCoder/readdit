import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const CommentCard = () => {
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
        <Typography>Comment:</Typography>
        <Typography>Author:</Typography>
        <Typography>Time ago:</Typography>
      </Paper>
    </Stack>
  );
};

export default CommentCard;
