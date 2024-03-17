import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { useFetch } from '../../customHooks/useFetch';
import { baseURL } from '../../resources/URLs.js';
import { PostContext } from '../../context/PostContext.jsx';
import { updatePostVotingScores } from '../../reducers/postsSlice.js';
import {
  updateUserVote,
  addNewUserVote,
  deleteUserVote,
} from '../../reducers/userSlice.js';

const VOTING_ACTION = {
  UP_VOTE: 'UP_VOTE',
  DOWN_VOTE: 'DOWN_VOTE',
  UN_VOTE: 'UN_VOTE',
};

const getActionAndIsUpVote = (click, status) => {
  let action;
  let isUpVote;

  if (click === VOTING_ACTION.UP_VOTE && status !== 1) {
    action = VOTING_ACTION.UP_VOTE;
    isUpVote = true;
  } else if (click === VOTING_ACTION.DOWN_VOTE && status !== -1) {
    action = VOTING_ACTION.DOWN_VOTE;
    isUpVote = false;
  } else {
    action = VOTING_ACTION.UN_VOTE;
  }

  return { action, isUpVote };
};

const PostVoters = () => {
  const post = useContext(PostContext);
  const postId = post._id;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userVote = user.votes?.find((v) => v.postId === postId);
  const status = !userVote ? 0 : userVote.isUpVote ? 1 : -1;

  const { fetchData: submitVote } = useFetch({
    url: `${baseURL}/api/votes`,
    immediate: false,
  });

  const { fetchData: unVote } = useFetch({
    immediate: false,
  });

  const handleUpVote = (vote) => {
    if (userVote) {
      dispatch(updateUserVote(vote));
    } else {
      dispatch(addNewUserVote(vote));
    }
    dispatch(
      updatePostVotingScores({
        postId,
        scores: status === 0 ? 1 : 2,
      })
    );
  };

  const handleDownVote = (vote) => {
    if (userVote) {
      dispatch(updateUserVote(vote));
    } else {
      dispatch(addNewUserVote(vote));
    }
    dispatch(
      updatePostVotingScores({
        postId,
        scores: status === 0 ? -1 : -2,
      })
    );
  };

  const handleUnVote = (vote) => {
    dispatch(updatePostVotingScores({ postId, scores: status === 1 ? -1 : 1 }));

    dispatch(deleteUserVote(vote));
  };

  const handleClickVote = ({ click }) => {
    const { action, isUpVote } = getActionAndIsUpVote(click, status);

    if (
      action === VOTING_ACTION.UP_VOTE ||
      action === VOTING_ACTION.DOWN_VOTE
    ) {
      submitVote({
        options: {
          method: 'PUT',
          body: JSON.stringify({
            isUpVote,
            postId,
            userId: user._id,
            _id: userVote?._id,
          }),
          headers: { 'Content-Type': 'application/json' },
        },
        dataHandler: (data) => {
          if (action === VOTING_ACTION.UP_VOTE) {
            handleUpVote(data.vote);
          } else {
            handleDownVote(data.vote);
          }
        },
      });
    } else if (action === VOTING_ACTION.UN_VOTE && userVote._id) {
      unVote({
        url: `${baseURL}/api/votes/${userVote._id}`,
        options: { method: 'DELETE' },
        dataHandler: (data) => {
          handleUnVote(data.vote);
        },
      });
    }
  };

  return (
    <Stack alignItems='center' sx={{ backgroundColor: '#f7f7f7' }}>
      <IconButton
        onClick={() => handleClickVote({ click: VOTING_ACTION.UP_VOTE })}
      >
        <ThumbUpIcon fontSize='small' color={status === 1 ? 'primary' : ''} />
      </IconButton>
      <Typography>{post.votingScores}</Typography>
      <IconButton
        onClick={() => handleClickVote({ click: VOTING_ACTION.DOWN_VOTE })}
      >
        <ThumbDownIcon fontSize='small' color={status === -1 ? 'error' : ''} />
      </IconButton>
    </Stack>
  );
};

export default PostVoters;
