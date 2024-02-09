import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
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
import { deletePost } from '../../reducers/postsSlice.js';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

const PostCard = ({ post }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userId = useSelector((state) => state.user.id);

  const { fetchData: fetchDeletePost } = useFetch({
    url: createPostURLByPostId(post._id),
    options: {
      method: 'DELETE',
    },
    dataHandler: (data) => dispatch(deletePost(data.postId)),
    immediate: false,
  });

  const handleDeletePost = (event) => {
    event.preventDefault();

    fetchDeletePost();
    handleClose();
  };

  return (
    <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: { xs: 345, sm: 500, md: 600 } }}>
        <CardHeader
          action={
            userId === post.author._id && (
              <IconButton
                sx={{ zIndex: 100 }}
                aria-label='settings'
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={post.title}
          subheader={`Posted by ${post.author.username} ${timeAgo(
            post.createdAt
          )}`}
        />
        {userId === post.author._id && (
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
        )}
        {post.imageUrl ? (
          <Stack direction='row' justifyContent='center'>
            <CardMedia
              component='img'
              image={`${baseURL}/${post.imageUrl}`}
              alt='Post image'
              sx={{ objectFit: 'contain', maxWidth: { sm: 300, md: 400 } }}
            />
          </Stack>
        ) : (
          <CardContent sx={{ pt: 0 }}>
            <Typography width='100%'>{post.content}</Typography>
          </CardContent>
        )}

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
    </Link>
  );
};

export default PostCard;
