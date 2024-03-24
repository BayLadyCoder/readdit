import { useContext } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { PostContext } from '../../context/PostContext';
import { PostType } from '../../enums/post';

const PostActionFooterButton = ({
  ariaLabel,
  Icon,
  buttonLabel,
  onClickFn,
}) => {
  const post = useContext(PostContext);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClickFn(e);
  };

  const ButtonType = buttonLabel ? Button : IconButton;
  return (
    <ButtonType
      aria-label={ariaLabel}
      size='small'
      sx={{
        backgroundColor:
          post.postType === PostType.CLASSIC ? '#f7f7f7' : 'none',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#555',
        textTransform: 'none',
      }}
      onClick={handleClick}
    >
      <Icon sx={{ mr: '5px', color: '#999' }} />
      {buttonLabel}
    </ButtonType>
  );
};

export default PostActionFooterButton;
