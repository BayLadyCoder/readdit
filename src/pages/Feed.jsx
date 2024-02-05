import React from 'react';
import PostCard from '../components/PostCard/PostCard';
import Stack from '@mui/material/Stack';
import { useFetch } from '../customHooks/useFetch';
import { getAllPostsURL } from '../resources/URLs.js';

const Feed = ({ posts, setPosts, deletePost }) => {
  const { isLoading, isError } = useFetch({
    url: getAllPostsURL,
    immediate: posts.length === 0,
    dataHandler: (data) => setPosts(data.posts),
  });

  if (isError) return <h1>Failed to load</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (posts.length === 0) return <h1>There is no post</h1>;

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} deletePost={deletePost} />
      ))}
    </Stack>
  );
};

export default Feed;
