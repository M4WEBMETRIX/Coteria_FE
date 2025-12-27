import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/authentications/signup-page';
import ProtectedRoute from './pages/authentications/protect-route';
import LoginPage from './pages/authentications/login-page';
import ForgotPasswordPage from './pages/authentications/forgot-password-page';
import CheckEmailPage from './pages/authentications/check-email-page';
import ResetPasswordPage from './pages/authentications/reset-password-page';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='auth/signup' element={<SignupPage />} />
            <Route path='auth/login' element={<LoginPage />} />
            <Route
                path='auth/forgot-password'
                element={<ForgotPasswordPage />}
            />
            <Route path='auth/check-email' element={<CheckEmailPage />} />
            <Route path='auth/reset-password' element={<ResetPasswordPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
                <Route path='dashboard' element={<>Dashboard Page</>} />
            </Route>
        </Routes>
    );
};

export default AllRoutes;
