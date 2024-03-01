import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import PostCard from '../components/PostCard/PostCard';
import Stack from '@mui/material/Stack';
import { useFetch } from '../customHooks/useFetch';
import { getAllPostsURL, baseURL } from '../resources/URLs.js';
import { setPosts, addPost } from '../reducers/postsSlice.js';

let socket;

const Feed = () => {
  const posts = useSelector((state) => state.posts.posts);
  const hasFetchedFeedPosts = useSelector(
    (state) => state.posts.hasFetchedFeedPosts
  );
  const dispatch = useDispatch();

  const { isLoading, isError } = useFetch({
    url: getAllPostsURL,
    immediate: !hasFetchedFeedPosts,
    dataHandler: (data) => {
      dispatch(setPosts(data.posts));

      // connect websocket
      if (!socket?.connected) {
        socket = io(baseURL);
        socket.on('posts', (data) => {
          if (data.action === 'create') {
            dispatch(addPost(data.post));
          }
        });
      }
    },
  });

  if (isError) return <h1>Failed to load</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (posts.length === 0) return <h1>There is no post</h1>;

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Stack>
  );
};

export default Feed;
