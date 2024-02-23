import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { timeAgo } from '../../helpers/timeAgo';
import { baseURL } from '../../resources/URLs.js';
import { PostContext } from '../../context/PostContext';
import PostActionFooter from '../PostActionFooter/PostActionFooter';
import AuthorMoreActionButton from '../AuthorMoreActionButton/AuthorMoreActionButton.jsx';

const PostCard = ({ post }) => {
  return (
    <PostContext.Provider value={post}>
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
            <AuthorMoreActionButton post={post} forHeader />
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
    </PostContext.Provider>
  );
};

export default PostCard;
