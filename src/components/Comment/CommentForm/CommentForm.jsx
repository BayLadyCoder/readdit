import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useFetch } from '../../../customHooks/useFetch';
import { baseURL } from '../../../resources/URLs.js';

const CommentForm = () => {
  const authorId = useSelector((state) => state.user._id);
  const { postId } = useParams();
  const [comment, setComment] = useState('');

  const { fetchData: submitComment } = useFetch({
    url: `${baseURL}/api/comments`,
    immediate: false,
  });
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment({
      options: {
        method: 'POST',
        body: JSON.stringify({ comment, authorId, postId }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
  };

  return (
    <Stack
      sx={{
        width: { xs: '90%', sm: '80%', md: '70%' },
        maxWidth: '900px',
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
