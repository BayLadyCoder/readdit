import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

import ImageIcon from '@mui/icons-material/Image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #333',
  boxShadow: 24,
  p: 4,
};

const PostFormModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
  });

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => console.log({ data }))
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>
        + New Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-label='Create new post modal'
        aria-describe='Create new post with title, content, and an image.'
      >
        <FormControl sx={{ padding: '20px', ...style, gap: '10px' }}>
          <TextField
            error={!form.title}
            name='title'
            label='Title'
            variant='outlined'
            value={form.title}
            onChange={handleFormChange}
            helperText={form.title ? '' : 'Required'}
          />
          <Button
            sx={{
              ':hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
              backgroundColor: 'rgba(25, 118, 210, 0.07)',
              padding: '30px 20px',
            }}
          >
            <ImageIcon sx={{ marginRight: '5px' }} />
            Add Image
          </Button>
          <TextField
            error={!form.content}
            name='content'
            label='Content'
            variant='outlined'
            multiline
            rows={5}
            value={form.content}
            onChange={handleFormChange}
            helperText={form.content ? '' : 'Required'}
          />
          <Button variant='contained' type='submit' onClick={handleSubmit}>
            Post
          </Button>
        </FormControl>
      </Modal>
    </div>
  );
};

export default PostFormModal;
