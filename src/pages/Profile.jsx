import Stack from '@mui/material/Stack';

import UserProfileInfo from '../components/UserProfileInfo/UserProfileInfo';
import UserProfileTabs from '../components/UserProfileTabs/UserProfileTabs';

const Profile = () => {
  return (
    <Stack
      direction={{ sm: 'column-reverse', md: 'row' }}
      justifyContent='center'
      alignItems={{ sm: 'center', md: 'flex-start' }}
      spacing={5}
      sx={{ width: '100%' }}
    >
      <UserProfileTabs />
      <UserProfileInfo />
    </Stack>
  );
};

export default Profile;
