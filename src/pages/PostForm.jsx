import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';

import { useFetch } from '../customHooks/useFetch';
import { baseURL, createPostURLByPostId } from '../resources/URLs.js';
import { setPosts, updatePost } from '../reducers/postsSlice.js';

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
};

const PostForm = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const inputFileRef = useRef(null);
  const [validationError, setValidationError] = useState(
    initialValidationError
  );

  const { isLoading, isError } = useFetch({
    url: createPostURLByPostId(postId),
    immediate: !!postId,
    dataHandler: (data) => {
      setForm({
        _id: data.post._id,
        title: data.post.title,
        content: data.post.content,
        imageUrl: data.post.imageUrl,
        imageSrc: data.post.imageUrl
          ? `${baseURL}/${data.post.imageUrl}`
          : undefined,
      });
    },
  });

  const { fetchData: submitPost } = useFetch({
    immediate: false,
  });

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
    if (form.imageUrl) {
      formData.append('image', form.imageUrl);
    }

    const url = form._id
      ? `${baseURL}/api/posts/${form._id}`
      : `${baseURL}/api/posts`;

    const method = form._id ? 'PUT' : 'POST';

    submitPost({
      url,
      options: { method, body: formData },
      dataHandler: (data) => {
        if (method === 'POST') {
          dispatch(setPosts([data.post, ...posts]));
          navigate('/');
        } else if (method === 'PUT') {
          dispatch(updatePost(data.post));
          navigate(`/posts/${data.post._id}`);
        }
      },
    });
  };

  const removeImageFromForm = () => {
    setForm({ ...form, imageUrl: undefined, imageSrc: undefined });
  };

  const validateForm = (fieldName) => {
    setValidationError({ ...validationError, [fieldName]: !form[fieldName] });
  };

  if (isLoading) return <div>Loading data</div>;
  if (isError) return <div>Failed to fetch data</div>;

  return (
    <Paper>
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
            {form.imageSrc ? 'Replace Image' : 'Add Image'}
          </Button>
          {form.imageSrc && (
            <Stack direction='row' alignItems='flex-start'>
              <img
                style={{ maxWidth: '400px', maxHeight: '250px' }}
                src={form.imageSrc}
                alt={form.title}
                loading='lazy'
              />
              <IconButton
                onClick={removeImageFromForm}
                sx={{
                  p: '3px',
                  backgroundColor: '#fff',
                  left: '-5px',
                  top: '-10px',
                  zIndex: 10,
                  margin: '10px',
                  border: '2px solid #1976d2',
                  color: '#1976d2',

                  '&:hover': {
                    color: '#c20000',
                    border: '2px solid #c20000',
                    backgroundColor: '#ffe0e0',
                  },
                }}
              >
                <ClearIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            </Stack>
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
    </Paper>
  );
};

export default PostForm;
