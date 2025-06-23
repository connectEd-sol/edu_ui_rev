import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "./auth/SplashScreen";

const PrivateRoute = (): React.JSX.Element => {
  const { user, isLoading } = useAuth();
  console.log(user);
  if (isLoading) {
    return (
      <SplashScreen />
    );
  } else {
      return user?.id ? <Outlet /> : <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
