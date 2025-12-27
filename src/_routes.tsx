import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/authentications/signup-page'
import ProtectedRoute from './pages/authentications/protect-route'
import LoginPage from './pages/authentications/login-page'
import ForgotPasswordPage from './pages/authentications/forgot-password-page'
import CheckEmailPage from './pages/authentications/check-email-page'
import ResetPasswordPage from './pages/authentications/reset-password-page'
import SetupAccountPage from './pages/authentications/setup-account'
import DashboardPage from './pages/dashboard/dashboard-page';
import CommunityPage from './pages/dashboard/community-page';
import CampaignsPage from './pages/dashboard/campaigns-page';
import InsightsPage from './pages/dashboard/insights-page';
import DonorsPage from './pages/dashboard/donors-page';
import SettingsPage from './pages/dashboard/settings-page';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='auth/signup' element={<SignupPage />} />
      <Route path='auth/setup-account' element={<SetupAccountPage />} />
      <Route path='auth/login' element={<LoginPage />} />
      <Route path='auth/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='auth/check-email' element={<CheckEmailPage />} />
      <Route path='auth/reset-password' element={<ResetPasswordPage />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path='dashboard' element={<DashboardPage />} />
                    <Route path='community' element={<CommunityPage />} />
                    <Route path='campaigns' element={<CampaignsPage />} />
                    <Route path='insights' element={<InsightsPage />} />
                    <Route path='donors' element={<DonorsPage />} />
                    <Route path='settings' element={<SettingsPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AllRoutes
