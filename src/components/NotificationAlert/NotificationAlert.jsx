import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import { removeNotificationAlert } from '../../reducers/notificationsSlice.js';

const NotificationAlert = () => {
  const alerts = useSelector((state) => state.notifications.alerts);
  const dispatch = useDispatch();

  if (alerts.length === 0) {
    return null;
  }

  return alerts.map((alert) => (
    <Grow key={alert.id} in={true} timeout={800} sx={{ mb: 1 }}>
      <Alert
        severity={alert.type}
        onClose={() => dispatch(removeNotificationAlert(alert.id))}
      >
        {alert.message}
      </Alert>
    </Grow>
  ));
};

export default NotificationAlert;
