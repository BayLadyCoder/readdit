import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ Component }) => {
  const user = useSelector((state) => state.user);

  return user.isLoggedIn ? <Component /> : <Navigate to='/login' />;
};

export default PrivateRoute;
