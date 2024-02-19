import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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

  const ButtonType = buttonLabel ? Button : IconButton;
  return (
    <ButtonType
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
    </ButtonType>
  );
};

export default PostActionFooterButton;
