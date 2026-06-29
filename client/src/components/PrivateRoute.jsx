import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuth, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) {
    return <p>Перевірка авторизації...</p>;
  }
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default PrivateRoute;
