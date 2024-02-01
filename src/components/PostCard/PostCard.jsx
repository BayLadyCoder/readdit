import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { baseURL } from '../../resources/URLs';
import { timeAgo } from '../../helpers/timeAgo';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const PostCard = ({ post, setOpenPostForm }) => {
  return (
    <Card sx={{ width: { xs: 345, sm: 500, md: 600 } }}>
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={`Posted by ${post.author.name} ${timeAgo(post.updatedAt)}`}
      />
      <Link to={`/posts/${post._id}`}>
        <CardMedia
          component='img'
          height='194'
          image={`${baseURL}/${post.imageUrl}`}
          alt='Sample image'
        />
      </Link>

      <CardActions disableSpacing>
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
        <Link to={`posts/${post._id}/edit`}>
          <Button onClick={() => setOpenPostForm(true)}>Edit</Button>{' '}
        </Link>
      </CardActions>
    </Card>
  );
};

export default PostCard;
