import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

const initialForm = {
  title: '',
  content: '',
  image: '',
};

const initialValidationError = {
  title: false,
  content: false,
  image: false,
};

const PostFormModal = ({ posts, setPosts }) => {
  const [open, setOpen] = React.useState(false);

  const [form, setForm] = useState(initialForm);
  const inputFileRef = useRef(null);
  const [validationError, setValidationError] = useState(
    initialValidationError
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setForm(initialForm);
    setValidationError(initialValidationError);
    setOpen(false);
  };

  const handleFormChange = (event) => {
    if (event.target.name === 'image') {
      setForm({ ...form, [event.target.name]: event.target.files[0] });
    } else {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('image', form.image);

    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      body: formData,
      // body: JSON.stringify(form),
      // headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setPosts([data.post, ...posts]))
      .catch((err) => console.log({ err }));
    handleClose();
  };

  const validateForm = (fieldName) => {
    setValidationError({ ...validationError, [fieldName]: !form[fieldName] });
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
        aria-description='Create new post with title, content, and an image.'
      >
        <FormControl sx={{ padding: '20px', ...style, gap: '10px' }}>
          <TextField
            error={validationError.title}
            onBlur={() => validateForm('title')}
            name='title'
            label='Title'
            variant='outlined'
            value={form.title}
            onChange={handleFormChange}
            helperText={validationError.title ? 'Required' : ''}
          />
          <Box w='100%'>
            <Button
              sx={{
                ':hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                },
                backgroundColor: 'rgba(25, 118, 210, 0.07)',
                padding: '30px 20px',
                border: validationError.image ? '1px solid red' : 'none',
                width: '100%',
              }}
              onClick={() => inputFileRef.current.click()}
              onBlur={() => validateForm('image')}
            >
              <input
                type='file'
                name='image'
                accept='image/png, image/jpeg'
                ref={inputFileRef}
                onChange={handleFormChange}
                hidden
              />
              <ImageIcon sx={{ marginRight: '5px' }} />
              Add Image
            </Button>
            {validationError.image && (
              <Typography
                color='error'
                variant='body2'
                m='3px 14px 0px 14px'
                fontSize='0.75rem'
              >
                Required
              </Typography>
            )}
          </Box>
          <TextField
            error={validationError.content}
            onBlur={() => validateForm('content')}
            name='content'
            label='Content'
            variant='outlined'
            multiline
            rows={5}
            value={form.content}
            onChange={handleFormChange}
            helperText={validationError.content ? 'Required' : ''}
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
