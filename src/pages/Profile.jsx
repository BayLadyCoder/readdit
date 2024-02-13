import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import UserProfileInfo from '../components/UserProfileInfo/UserProfileInfo';
import TabContentWrapper from '../components/TabContentWrapper/TabContentWrapper';
import PostsTabContent from '../components/PostsTabContent/PostsTabContent';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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
        <PostsTabContent selectedTab={selectedTab} index={0} />
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
