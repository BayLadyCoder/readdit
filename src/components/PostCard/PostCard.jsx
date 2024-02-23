import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { timeAgo } from '../../helpers/timeAgo';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import { baseURL, createPostURLByPostId } from '../../resources/URLs.js';
import { useFetch } from '../../customHooks/useFetch';
import { deletePost } from '../../reducers/postsSlice.js';
import Typography from '@mui/material/Typography';
import PostActionFooter from '../PostActionFooter/PostActionFooter';

const PostCard = ({ post }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
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

  const handleDeletePost = (event) => {
    fetchDeletePost();
    handleClose(event);
  };

  return (
    <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
      <Paper
        sx={{
          width: {
            xs: 345,
            sm: 500,
            md: 600,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '10px 4px 6px 12px',
          },
        }}
      >
        <Stack
          pb={1}
          spacing={1}
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Box>
            <Typography sx={{ fontWeight: '500', fontSize: '20px' }}>
              {post.title}
            </Typography>
            <Typography
              variant='body2'
              sx={{ fontSize: '12px', color: '#555' }}
            >
              {`Posted by ${post.author.username} ${timeAgo(post.createdAt)}`}
            </Typography>
          </Box>
          {loggedInUserIsPostAuthor && (
            <Box>
              <IconButton
                sx={{ zIndex: 100, top: -5 }}
                aria-label='settings'
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
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
            </Box>
          )}
        </Stack>
        {post.imageUrl ? (
          <Stack direction='row' justifyContent='center'>
            <CardMedia
              component='img'
              src={`${baseURL}/${post.imageUrl}`}
              alt='Post image'
              sx={{
                objectFit: 'contain',
                maxWidth: { sm: 300, md: 400 },
                maxHeight: 300,
              }}
            />
          </Stack>
        ) : (
          <Stack sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'linear-gradient(to bottom,rgba(250,250,250,0.1), white)',
                width: '100%',
                height: '100%',
                zIndex: 2,
              }}
            ></Box>
            <Box
              sx={{
                p: '16px',
                pt: 0,
                maxHeight: 300,
                whiteSpace: 'break-spaces',
                overflow: 'hidden',
                textAlign: 'justify',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Noto Sans',
                }}
                width='100%'
              >
                {post.content}
              </Typography>
            </Box>
          </Stack>
        )}
        <PostActionFooter post={post} />
      </Paper>
    </Link>
  );
};

export default PostCard;
