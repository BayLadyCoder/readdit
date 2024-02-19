import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const PostActionFooterButton = ({
  ariaLabel,
  Icon,
  buttonLabel,
  onClickFn,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClickFn(e);
  };
  return (
    <Button
      aria-label={ariaLabel}
      size='small'
      sx={{
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#555',
        textTransform: 'none',
      }}
      onClick={handleClick}
    >
      <Icon sx={{ mr: '5px', color: '#999' }} />
      {buttonLabel}
    </Button>
  );
};

const PostActionFooter = () => {
  return (
    <Stack direction='row'>
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
    </Stack>
  );
};

export default PostActionFooter;
