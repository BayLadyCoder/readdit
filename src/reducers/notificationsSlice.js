import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [
    // {
    //   id: 1,
    //   type: 'error | warning | info | success',
    //   message: '',
    // },
  ],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotificationAlert: (state, action) => {
      const newAlerts = action.payload
        .filter(({ message }) => {
          // deduplicate alerts
          return !state.alerts.find((alert) => {
            return alert.message === message;
          });
        })
        .map(({ message, type }) => {
          return { message, type, id: Math.round(Math.random() * 1000) };
        });

      state.alerts = state.alerts.concat(newAlerts);
    },
    removeNotificationAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
});

export const { showNotificationAlert, removeNotificationAlert } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
