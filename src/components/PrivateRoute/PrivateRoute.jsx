import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../../reducers/userSlice';
import { getUserDataFromSS } from '../../helpers/sessionStorage';

const PrivateRoute = ({ Component }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (!user.isLoggedIn) {
    const userData = getUserDataFromSS();
    if (userData) {
      dispatch(login(userData));
    }
  }

  return user.isLoggedIn ? <Component /> : <Navigate to='/login' />;
};

export default PrivateRoute;
