import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { createPostURLByPostId } from '../../resources/URLs.js';
import { useFetch } from '../../customHooks/useFetch.jsx';
import { deletePost } from '../../reducers/postsSlice.js';

const AuthorMoreActionButton = ({ post, forHeader }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const loggedInUserIsPostAuthor =
    user.isLoggedIn && user._id === post.author._id;

  const { fetchData: fetchDeletePost } = useFetch({
    url: createPostURLByPostId(post._id),
    options: {
      method: 'DELETE',
    },
    dataHandler: (data) => dispatch(deletePost(data.postId)),
    immediate: false,
  });

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleClickDelete = (e) => {
    fetchDeletePost();
    handleClose(e);
    navigate('/');
  };

  if (!loggedInUserIsPostAuthor) {
    return null;
  }

  return (
    <Box sx={{ zIndex: 100, top: forHeader ? -5 : 0 }}>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        {forHeader ? <MoreVertIcon /> : <MoreHorizIcon />}
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
