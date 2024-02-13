import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useFetch } from '../customHooks/useFetch';
import { baseURL } from '../resources/URLs';
import { setUserPosts } from '../reducers/userSlice';

import PostCardClassic from '../components/PostCardClassic/PostCardClassic';
import UserProfileInfo from '../components/UserProfileInfo/UserProfileInfo';
import TabContentWrapper from '../components/TabContentWrapper/TabContentWrapper';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { isLoading, isError } = useFetch({
    url: `${baseURL}/api/users/${user.id}/posts`,
    dataHandler: (data) => dispatch(setUserPosts(data.posts)),
    immediate: user.id && user.posts === undefined,
  });

  const handleChangeTab = (event, newTab) => {
    setSelectedTab(newTab);
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
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label='basic tabs example'
          >
            <Tab sx={{ width: '130px' }} label='Posts' />
            <Tab sx={{ width: '130px' }} label='Saved' />
            <Tab sx={{ width: '130px' }} label='Upvoted' />
            <Tab sx={{ width: '130px' }} label='Downvoted' />
          </Tabs>
        </Box>
        <TabContentWrapper selectedTab={selectedTab} index={0}>
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
        </TabContentWrapper>
        <TabContentWrapper selectedTab={selectedTab} index={1}>
          Saved posts
        </TabContentWrapper>
        <TabContentWrapper selectedTab={selectedTab} index={2}>
          Upvoted posts
        </TabContentWrapper>
        <TabContentWrapper selectedTab={selectedTab} index={3}>
          Downvoted posts
        </TabContentWrapper>
      </Box>
      <UserProfileInfo />
    </Stack>
  );
};

export default Profile;
