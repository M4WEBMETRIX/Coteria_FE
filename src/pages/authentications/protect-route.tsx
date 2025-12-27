import { Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from '@/components/layout/dashboard-layout';

const isAuthenticated = () => {
    return true;
    //   return !!localStorage.getItem('token')
};

const ProtectedRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to='/auth/login' replace />;
    }

    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
};

export default ProtectedRoute;
