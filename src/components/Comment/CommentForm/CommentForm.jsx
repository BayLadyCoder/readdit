import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CommentForm = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          padding: '10px 20px',
        }}
      >
        <FormControl sx={{ gap: '10px', width: '100%' }}>
          <TextField
            name='comment'
            placeholder='What are your thoughts?'
            variant='outlined'
            multiline
            rows={5}
            value={comment}
            onChange={handleCommentChange}
          />
          <Button
            disabled={!comment}
            variant='contained'
            type='submit'
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </FormControl>
      </Paper>
    </Stack>
  );
};

export default CommentForm;
