import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import placeholderImage from '../../assets/images/no-image.png';
import { baseURL } from '../../resources/URLs';

const PostCardClassic = ({ post }) => {
  return (
    <Link
      to={`/posts/${post._id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Stack
        direction='row'
        spacing={2}
        sx={{ border: '1px solid #ddd', p: 1 }}
      >
        <Stack alignItems='center'>
          <IconButton>
            <ArrowUpwardIcon />
          </IconButton>
          <Typography>15</Typography>
          <IconButton>
            <ArrowDownwardIcon />
          </IconButton>
        </Stack>
        <img
          style={{ objectFit: 'contain' }}
          width='100px'
          src={post.imageUrl ? `${baseURL}/${post.imageUrl}` : placeholderImage}
          alt='post-image'
        />

        <Box width='100%'>
          <Box>
            <Typography variant='h6'>{post.title}</Typography>
            <Typography
              color='#888'
              variant='body2'
              sx={{ fontStyle: 'italic' }}
            >
              Posted By {post.author.username}
            </Typography>
          </Box>
          <Stack direction='row'>
            <Button variant='string' sx={{ textTransform: 'none', p: 1 }}>
              <ModeCommentOutlinedIcon sx={{ mr: '3px' }} />
              <Typography>1</Typography>
            </Button>
            <Button variant='string' sx={{ textTransform: 'none', p: 1 }}>
              <BookmarkBorderOutlinedIcon sx={{ mr: '3px' }} />
              <Typography>Save</Typography>
            </Button>
            <Button variant='string' sx={{ textTransform: 'none', p: 1 }}>
              <ShareOutlinedIcon sx={{ mr: '3px' }} />
              <Typography>Share</Typography>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Link>
  );
};

export default PostCardClassic;
