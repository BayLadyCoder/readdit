import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TabContentWrapper from '../TabContentWrapper/TabContentWrapper';
import PostsTabContent from '../PostsTabContent/PostsTabContent';

const UserProfileTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (event, newTab) => {
    setSelectedTab(newTab);
  };

  const tabs = ['Posts', 'Saved', 'Upvoted', 'Downvoted'];

  return (
    <Box
      sx={{ background: '#fff', width: { sm: '100%', md: '80%', lg: '50%' } }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          aria-label='User profile tabs'
        >
          {tabs.map((tab) => (
            <Tab key={tab} sx={{ width: '130px' }} label={tab} />
          ))}
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
  );
};

export default UserProfileTabs;
