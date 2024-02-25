import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const PostVoters = () => {
  return (
    <Stack alignItems='center' sx={{ backgroundColor: '#f7f7f7' }}>
      <IconButton>
        <ArrowUpwardIcon />
      </IconButton>
      <Typography>15</Typography>
      <IconButton>
        <ArrowDownwardIcon />
      </IconButton>
    </Stack>
  );
};

export default PostVoters;
