export const baseURL = 'http://localhost:8080';

export const getAllPostsURL = `${baseURL}/api/posts`;

export const createPostURLByPostId = (postId) =>
  `${baseURL}/api/posts/${postId}`;
