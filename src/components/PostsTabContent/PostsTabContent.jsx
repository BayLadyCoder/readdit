import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useFetch } from '../../customHooks/useFetch';
import { baseURL } from '../../resources/URLs';
import { setUserPosts } from '../../reducers/userSlice';

import PostCardClassic from '../PostCardClassic/PostCardClassic';
import TabContentWrapper from '../TabContentWrapper/TabContentWrapper';

const PostsTabContent = ({ selectedTab }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isLoading, isError } = useFetch({
    url: `${baseURL}/api/users/${user.id}/posts`,
    dataHandler: (data) => dispatch(setUserPosts(data.posts)),
    immediate: user.id && user.posts === undefined,
  });

  return (
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
  );
};

export default PostsTabContent;
