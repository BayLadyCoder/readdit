import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteAccountBtnDialog from '../DeleteAccountBtnDialog/DeleteAccountBtnDialog';

const UserProfileInfo = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box
      align='center'
      sx={{
        width: { sm: '100%', md: '25%' },
        maxWidth: '400px',
        background: '#fff',
      }}
    >
      <Typography>{user.username}</Typography>
      <Typography>
        Cake Day: {`${user.cakeDay.month} ${user.cakeDay.datePrefix}`}
        <sup>{user.cakeDay.dateSuffix}</sup>, {user.cakeDay.year}
      </Typography>
      <DeleteAccountBtnDialog />
    </Box>
  );
};

export default UserProfileInfo;
