import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { createPostURLByPostId } from '../../resources/URLs.js';
import { useFetch } from '../../customHooks/useFetch';
import { deletePost } from '../../reducers/postsSlice.js';
import { PostContext } from '../../context/PostContext';

const AuthorMoreActionButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useContext(PostContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { fetchData: fetchDeletePost } = useFetch({
    url: createPostURLByPostId(post._id),
    options: {
      method: 'DELETE',
    },
    dataHandler: (data) => dispatch(deletePost(data.postId)),
    immediate: false,
  });

  const handleClickDelete = () => {
    fetchDeletePost();
    handleClose();
    navigate('/');
  };

  return (
    <Box>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link
          to={`/posts/${post._id}/edit`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem onClick={handleClose}>
            <EditIcon sx={{ mr: '5px' }} size='small' />
            Edit
          </MenuItem>
        </Link>
        <MenuItem key='delete' onClick={handleClickDelete}>
          <DeleteIcon sx={{ mr: '5px' }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AuthorMoreActionButton;
