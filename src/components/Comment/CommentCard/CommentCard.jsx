import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';

import { useFetch } from '../../../customHooks/useFetch';
import { baseURL } from '../../../resources/URLs.js';
import { updateComment } from '../../../reducers/postsSlice.js';

const CommentCard = ({ comment }) => {
  const [showForm, setShowForm] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment.comment);
  const { fetchData: deleteComment } = useFetch({
    immediate: false,
    options: { method: 'DELETE' },
  });
  const dispatch = useDispatch();

  const { fetchData: submitUpdatedComment, isLoading } = useFetch({
    immediate: false,
    dataHandler: (data) => {
      dispatch(updateComment(data.comment));
      setShowForm(false);
    },
  });

  const userId = useSelector((state) => state.user._id);

  const handleDeleteComment = (e) => {
    e.preventDefault();
    deleteComment({ url: `${baseURL}/api/comments/${comment._id}` });
  };

  const handleChange = (e) => {
    setUpdatedComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitUpdatedComment({
      url: `${baseURL}/api/comments/${comment._id}`,
      options: {
        method: 'PUT',
        body: JSON.stringify({ comment: updatedComment }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
  };

  const handleCloseForm = () => {
    setUpdatedComment(comment.comment);
    setShowForm(false);
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
          padding: '10px 20px 10px 20px',
        }}
      >
        {showForm ? (
          <FormControl sx={{ gap: '10px', width: '100%' }}>
            <TextField
              name='comment'
              placeholder='What are your thoughts?'
              variant='outlined'
              multiline
              rows={5}
              value={updatedComment}
              onChange={handleChange}
            />
            <Box display='flex' justifyContent='flex-end'>
              {isLoading ? (
                <Box display='flex' gap={1} alignItems='center'>
                  <CircularProgress color='inherit' size={13} mr={3} />
                  <Typography>Updating comment</Typography>
                </Box>
              ) : (
                <>
                  <Button onClick={handleCloseForm}>Cancel</Button>
                  <Button
                    disabled={!updatedComment}
                    variant='contained'
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Comment
                  </Button>
                </>
              )}
            </Box>
          </FormControl>
        ) : (
          <>
            <Typography>Comment: {comment.comment}</Typography>
            <Typography>Author: {comment.author.username}</Typography>
            <Typography>Time ago: {comment.createdAt}</Typography>
          </>
        )}

        {!showForm && userId === comment.author._id && (
          <>
            <IconButton onClick={() => setShowForm(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteComment}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Paper>
    </Stack>
  );
};

export default CommentCard;
