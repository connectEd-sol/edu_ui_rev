import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "./auth/SplashScreen";

const MentorRoute = (): React.JSX.Element => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <SplashScreen />
    );
  } else {
    return user?.role === "teacher" ? <Outlet /> : <Navigate to="/login" replace />;
  }
};

export default MentorRoute;
