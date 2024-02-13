import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({
  open,
  setOpen,
  handleClickConfirm,
  confirmBtnLabel,
  confirmBtnColor,
  cancelBtnLabel,
  dialogTitle,
  dialogContent,
}) => {
  const handleConfirm = () => {
    handleClickConfirm();
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{cancelBtnLabel || 'Cancel'}</Button>
        <Button
          variant='contained'
          color={confirmBtnColor || 'primary'}
          onClick={handleConfirm}
          autoFocus
        >
          {confirmBtnLabel || 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
