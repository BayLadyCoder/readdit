import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import PostActionFooterButton from './PostActionFooterButton';
import AuthorMoreActionButton from './AuthorMoreActionButton';

const PostActionFooter = ({ post, showAuthorActionIcon }) => {
  const username = useSelector((state) => state.user.username);
  const isAuthor = username === post.author.username;
  return (
    <Stack direction='row' justifyContent='space-between'>
      <Box>
        <PostActionFooterButton
          areaLabel='comments'
          buttonLabel='58 Comments'
          Icon={ModeCommentOutlinedIcon}
          onClickFn={() => {
            return;
          }}
        />
        <PostActionFooterButton
          areaLabel='save this post'
          buttonLabel='Save'
          Icon={BookmarkBorderOutlinedIcon}
          onClickFn={() => {
            return;
          }}
        />
        <PostActionFooterButton
          areaLabel='share this post'
          buttonLabel='Share'
          Icon={ShareOutlinedIcon}
          onClickFn={() => {
            return;
          }}
        />
      </Box>
      {isAuthor && showAuthorActionIcon && (
        <AuthorMoreActionButton post={post} />
      )}
    </Stack>
  );
};

export default PostActionFooter;
