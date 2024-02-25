import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import placeholderImage from '../../assets/images/no-image.png';
import { baseURL } from '../../resources/URLs';
import { PostContext } from '../../context/PostContext';
import PostVoters from '../PostVoters/PostVoters';

const PostCardClassic = ({ post }) => {
  return (
    <PostContext.Provider value={post}>
      <Link
        to={`/posts/${post._id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Stack
          direction='row'
          spacing={2}
          sx={{ border: '1px solid #ddd', p: 1 }}
        >
          <PostVoters />
          <img
            style={{ objectFit: 'contain' }}
            width='100px'
            src={
              post.imageUrl ? `${baseURL}/${post.imageUrl}` : placeholderImage
            }
            alt='post-image'
          />

          <Box width='100%'>
            <Box>
              <Typography>{post.title}</Typography>
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
    </PostContext.Provider>
  );
};

export default PostCardClassic;
