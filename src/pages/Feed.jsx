import React, { useState, useEffect } from 'react';
import Post from '../components/Post/Post';
import Stack from '@mui/material/Stack';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8080/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  console.log({ posts, isError, isLoading });

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export default Feed;
