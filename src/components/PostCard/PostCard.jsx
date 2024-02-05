import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { timeAgo } from '../../helpers/timeAgo';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import { baseURL, createPostURLByPostId } from '../../resources/URLs.js';
import { useFetch } from '../../customHooks/useFetch';

const PostCard = ({ post, deletePost }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
    dataHandler: (data) => deletePost(data.postId),
    immediate: false,
  });

  const handleDeletePost = () => {
    fetchDeletePost();
    handleClose();
  };
  return (
    <Card sx={{ width: { xs: 345, sm: 500, md: 600 } }}>
      <CardHeader
        action={
          <IconButton
            aria-label='settings'
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={`Posted by ${post.author.name} ${timeAgo(post.updatedAt)}`}
      />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link
          to={`posts/${post._id}/edit`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem onClick={handleClose}>
            <EditIcon sx={{ mr: '5px' }} size='small' />
            Edit
          </MenuItem>
        </Link>
        <MenuItem onClick={handleDeletePost}>
          <DeleteOutlinedIcon sx={{ mr: '5px' }} size='small' />
          Delete
        </MenuItem>
      </Menu>
      <Link to={`/posts/${post._id}`}>
        <CardMedia
          component='img'
          height='194'
          image={`${baseURL}/${post.imageUrl}`}
          alt='Sample image'
        />
      </Link>

      <CardActions>
        <IconButton aria-label='add to favorites' size='small'>
          <ModeCommentOutlinedIcon sx={{ mr: '5px' }} />
          58 Comments
        </IconButton>
        <IconButton aria-label='add to favorites' size='small'>
          <BookmarkBorderOutlinedIcon sx={{ mr: '5px' }} /> Save
        </IconButton>
        <IconButton aria-label='share' size='small'>
          <ShareOutlinedIcon sx={{ mr: '5px' }} /> Share
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
