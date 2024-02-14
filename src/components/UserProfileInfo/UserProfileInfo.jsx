import { useSelector } from 'react-redux';
import { grey, deepOrange } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';

import DeleteAccountBtnDialog from '../DeleteAccountBtnDialog/DeleteAccountBtnDialog';

const UserProfileInfo = () => {
  const user = useSelector((state) => state.user);
  const splittedUsername = user.username.split('-');
  const avatarLabel = `${splittedUsername[0][0]}${splittedUsername[1][0]}`;

  return (
    <Stack
      align='center'
      justifyContent='space-between'
      sx={{
        width: { sm: '100%', md: '25%' },
        maxWidth: '400px',
        background: '#fff',
        padding: '20px',
      }}
    >
      <Stack alignItems='center' mb='40px'>
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
            fontSize: '30px',
            width: 80,
            height: 80,
            mb: '10px',
          }}
        >
          {avatarLabel}
        </Avatar>
        <Typography variant='h5'>{user.username}</Typography>
        <Typography variant='caption' color={grey[600]}>
          Cake Day: {`${user.cakeDay.month} ${user.cakeDay.datePrefix}`}
          <sup>{user.cakeDay.dateSuffix}</sup>, {user.cakeDay.year}
        </Typography>
        <FormGroup sx={{ mt: '20px' }}>
          <FormControlLabel control={<Switch />} label='Online Status' />
          <FormControlLabel control={<Switch />} label='Dark Theme' />
        </FormGroup>
        <FormGroup sx={{ mt: '20px', gap: '10px' }}>
          <Button variant='contained'>+ New Post</Button>
          <Button variant='outlined'>+ New Community</Button>
          <Button color='success' variant='outlined'>
            <ChatIcon fontSize='small' sx={{ mr: '5px' }} /> Chat
          </Button>
        </FormGroup>
      </Stack>
      <DeleteAccountBtnDialog />
    </Stack>
  );
};

export default UserProfileInfo;
