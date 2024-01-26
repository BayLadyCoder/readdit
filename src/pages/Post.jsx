import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../customHooks/useFetch';
import { createGetOnePostURL } from '../resources/URLs.js';

const Post = () => {
  const { postId } = useParams();
  const { data, isLoading, isError } = useFetch(createGetOnePostURL(postId));

  // todo: style display

  if (isError) return <h1>Failed to load</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (!data) return <h1>No post found</h1>;

  return (
    <div>
      <h1>{data.post.title}</h1>
      <p>Author: {data.post.content}</p>
      <p>{data.post.content}</p>
    </div>
  );
};

export default Post;
