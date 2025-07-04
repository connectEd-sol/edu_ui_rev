import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SplashScreen from './auth/SplashScreen'

function PublicRoute() {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
          <SplashScreen />
        );
    }

    if (user?.id) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}

export default PublicRoute