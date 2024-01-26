const baseURL = 'http://localhost:8080';

export const getAllPostsURL = `${baseURL}/api/posts`;

export const createGetOnePostURL = (postId) => `${baseURL}/api/posts/${postId}`;
