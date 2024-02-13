import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useFetch } from '../customHooks/useFetch';
import { baseURL } from '../resources/URLs';
import { setUserPosts, logout } from '../reducers/userSlice';
import { showNotificationAlert } from '../reducers/notificationsSlice';

import PostCardClassic from '../components/PostCardClassic/PostCardClassic';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { isLoading, isError } = useFetch({
    url: `${baseURL}/api/users/${user.id}/posts`,
    dataHandler: (data) => dispatch(setUserPosts(data.posts)),
    immediate: user.id && user.posts === undefined,
  });

  const { fetchData: deleteAccount } = useFetch({
    url: `${baseURL}/api/users/${user.id}`,
    options: {
      method: 'DELETE',
    },
    dataHandler: (data) => {
      dispatch(
        showNotificationAlert([{ message: data.message, type: 'success' }])
      );
      dispatch(logout());
      navigate('/');
    },
    immediate: false,
  });

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack
      direction={{ sm: 'column-reverse', md: 'row' }}
      justifyContent='center'
      alignItems={{ sm: 'center', md: 'flex-start' }}
      spacing={5}
      sx={{ width: '100%' }}
    >
      <Box
        sx={{ background: '#fff', width: { sm: '100%', md: '80%', lg: '50%' } }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label='basic tabs example'
          >
            <Tab sx={{ width: '130px' }} label='Posts' />
            <Tab sx={{ width: '130px' }} label='Saved' />
            <Tab sx={{ width: '130px' }} label='Upvoted' />
            <Tab sx={{ width: '130px' }} label='Downvoted' />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {isLoading && <Typography align='center'>Loading...</Typography>}
          {isError && <Typography align='center'>Failed to load.</Typography>}
          {user.posts?.length === 0 ? (
            <Typography align='center'>You have no post.</Typography>
          ) : (
            <Stack spacing={1}>
              {user.posts?.map((post) => (
                <PostCardClassic key={post._id} post={post} />
              ))}
            </Stack>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Saved posts
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Upvoted posts
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Downvoted posts
        </CustomTabPanel>
      </Box>
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
        <Button
          color='error'
          variant='contained'
          onClick={() => deleteAccount()}
        >
          Delete Account
        </Button>
      </Box>
    </Stack>
  );
};

export default Profile;
