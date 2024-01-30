import React, { useEffect } from 'react';
import Post from '../components/Post/Post';
import Stack from '@mui/material/Stack';
import { useFetch } from '../customHooks/useFetch';
import { getAllPostsURL } from '../resources/URLs.js';

const Feed = ({ posts, setPosts }) => {
  const { data, isLoading, isError } = useFetch(getAllPostsURL);

  useEffect(() => {
    if (data?.posts) {
      setPosts(data.posts);
    }
  }, [data]);
  if (isError) return <h1>Failed to load</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (posts.length === 0) return <h1>There is no post</h1>;

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Stack>
  );
};

export default Feed;
