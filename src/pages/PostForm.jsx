import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';

import { useFetch } from '../customHooks/useFetch';
import { baseURL, createGetOnePostURL } from '../resources/URLs.js';

const initialForm = {
  _id: '',
  title: '',
  content: '',
  imageUrl: '',
  imageSrc: '',
};

const initialValidationError = {
  title: false,
  content: false,
  imageUrl: false,
};

const PostForm = ({ posts, setPosts }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const inputFileRef = useRef(null);
  const [validationError, setValidationError] = useState(
    initialValidationError
  );

  const { data, isLoading, isError } = useFetch(createGetOnePostURL(postId));

  useEffect(() => {
    if (data?.post) {
      setForm({
        _id: data.post._id,
        title: data.post.title,
        content: data.post.content,
        imageUrl: data.post.imageUrl,
        imageSrc: `${baseURL}/${data.post.imageUrl}`,
      });
    }
  }, [data]);

  const handleFormChange = (event) => {
    if (event.target.name === 'imageUrl') {
      const imageFile = event.target.files[0];
      const imageSrc = URL.createObjectURL(imageFile);

      setForm({
        ...form,
        [event.target.name]: event.target.files[0],
        imageSrc,
      });
    } else {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('image', form.imageUrl);

    const url = form._id
      ? `${baseURL}/api/posts/${form._id}`
      : `${baseURL}/api/posts`;

    const method = form._id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (method === 'POST') {
          setPosts([data.post, ...posts]);
        } else {
          // PUT
          const updatedPosts = posts
            .map((post) => {
              if (post._id === data.post._id) {
                post = data.post;
              }
              return post;
            })
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          setPosts(updatedPosts);
        }
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const validateForm = (fieldName) => {
    setValidationError({ ...validationError, [fieldName]: !form[fieldName] });
  };

  if (isLoading) return <div>Loading data</div>;
  if (isError) return <div>Failed to fetch data</div>;

  return (
    <FormControl sx={{ padding: '20px', gap: '10px', width: '600px' }}>
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
      <Box
        w='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap='10px'
      >
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
          onBlur={() => validateForm('imageUrl')}
        >
          <input
            type='file'
            name='imageUrl'
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
        {form.imageSrc && (
          <img
            style={{ maxWidth: '400px', maxHeight: '250px' }}
            src={form.imageSrc}
            alt={form.title}
            loading='lazy'
          />
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
  );
};

export default PostForm;
