import { io } from 'socket.io-client';
import { baseURL } from '../resources/URLs.js';
import {
  addPost,
  deletePost,
  updatePost,
  addComment,
  deleteComment,
} from '../reducers/postsSlice.js';

class WebSocket {
  init(dispatch) {
    if (!this.socket) {
      this.socket = io(baseURL);

      this.socket.on('posts', (data) => {
        if (data.action === 'create') {
          dispatch(addPost(data.post));
        } else if (data.action === 'delete') {
          dispatch(deletePost(data.postId));
        } else if (data.action === 'update') {
          dispatch(updatePost(data.post));
        }
      });

      this.socket.on('comments', (data) => {
        if (data.action === 'create') {
          dispatch(addComment(data.comment));
        } else if (data.action === 'delete') {
          dispatch(deleteComment(data.comment));
        }
      });
    }
    return this.socket;
  }

  getSocket() {
    return this.socket;
  }
}

const webSocket = new WebSocket();

export default webSocket;
