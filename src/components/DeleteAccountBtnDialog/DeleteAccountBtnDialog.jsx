import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AlertDialog from '../AlertDialog/AlertDialog';

import { showNotificationAlert } from '../reducers/notificationsSlice';
import { useFetch } from '../customHooks/useFetch';
import { baseURL } from '../resources/URLs';
import { logout } from '../reducers/userSlice';

const DeleteAccountBtnDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const user = useSelector((state) => state.user);

  const { fetchData: deleteAccount } = useFetch({
    url: `${baseURL}/api/users/${user.id}`,
    options: {
      method: 'DELETE',
    },
    dataHandler: (data) => {
      dispatch(
        showNotificationAlert([{ message: data.message, type: 'success' }])
      );
      dispatch(logout());
      navigate('/');
    },
    immediate: false,
  });
  return (
    <>
      <Button
        color='error'
        variant='outlined'
        onClick={() => setOpenDialog(true)}
      >
        Delete Account
      </Button>
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickConfirm={deleteAccount}
        confirmBtnLabel='Delete Account'
        confirmBtnColor='error'
        dialogTitle='Are you sure you want to delete this account?'
        dialogContent='This account will be deleted permanently.'
      />
    </>
  );
};

export default DeleteAccountBtnDialog;
