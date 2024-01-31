import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { baseURL } from '../../resources/URLs';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = ({ post, setOpenPostForm }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: { xs: 345, sm: 500, md: 600 } }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {post.author.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={post.createdAt}
      />
      <Link to={`/posts/${post._id}`}>
        <CardMedia
          component='img'
          height='194'
          image={`${baseURL}/${post.imageUrl}`}
          alt='Sample image'
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {post.content}
          </Typography>
        </CardContent>
      </Link>

      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <Link to={`posts/${post._id}/edit`}>
          <Button onClick={() => setOpenPostForm(true)}>Edit</Button>{' '}
        </Link>
        {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {/* <Typography paragraph>Content:</Typography> */}
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            corporis consectetur corrupti unde pariatur ut itaque autem tempora
            ab ex necessitatibus animi sunt amet asperiores iusto quae
            laudantium, perferendis odit.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const PostOld = ({ post }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>{post.author.name}</p>
    </div>
  );
};

export default Post;
