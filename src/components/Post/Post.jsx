import React from 'react';

const Post = ({ post }) => {
  return (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>{post.author.name}</p>
    </div>
  );
};

export default Post;
