import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/home';

// Lazy load all page components
const SignupPage = lazy(() => import('./pages/authentications/signup-page'));
const ProtectedRoute = lazy(
    () => import('./pages/authentications/protect-route')
);
const LoginPage = lazy(() => import('./pages/authentications/login-page'));
const ForgotPasswordPage = lazy(
    () => import('./pages/authentications/forgot-password-page')
);
const CheckEmailPage = lazy(
    () => import('./pages/authentications/check-email-page')
);
const ResetPasswordPage = lazy(
    () => import('./pages/authentications/reset-password-page')
);
const SetupAccountPage = lazy(
    () => import('./pages/authentications/setup-account')
);
const DashboardPage = lazy(() => import('./pages/dashboard/dashboard-page'));
const CommunityPage = lazy(() => import('./pages/dashboard/community-page'));
const CampaignsPage = lazy(() => import('./pages/dashboard/campaigns-page'));
const CampaignsPageDetail = lazy(
    () => import('./pages/dashboard/campaign-details')
);
const InsightsPage = lazy(() => import('./pages/dashboard/insights-page'));
const DonorsPage = lazy(() => import('./pages/dashboard/donors-page'));
const SettingsPage = lazy(() => import('./pages/dashboard/settings-page'));
const DonationsPage = lazy(() => import('./pages/dashboard/donations-page'));
const TeamPage = lazy(() => import('./pages/dashboard/team-page'));
const MessagesPage = lazy(() => import('./pages/dashboard/messages-page'));
const ReportsPage = lazy(() => import('./pages/dashboard/reports-page'));
import Logo from '@/assets/icons/coterie.svg';
const AllRoutes = () => {
    return (
        <Suspense
            fallback={
                <div className='min-h-screen flex items-center justify-center'>
                    <div className='relative flex flex-col items-center gap-4'>
                        <div className=' w-48 h-48 border-4 border-[#12AA5B] border-t-transparent rounded-full animate-spin' />{' '}
                        <img
                            src={Logo}
                            alt='Coterie'
                            className='w-[120px] h-auto animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                        />
                    </div>
                </div>
            }>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='auth/signup' element={<SignupPage />} />
                <Route
                    path='auth/setup-account'
                    element={<SetupAccountPage />}
                />
                <Route path='auth/login' element={<LoginPage />} />
                <Route
                    path='auth/forgot-password'
                    element={<ForgotPasswordPage />}
                />
                <Route path='auth/check-email' element={<CheckEmailPage />} />
                <Route
                    path='auth/reset-password'
                    element={<ResetPasswordPage />}
                />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path='dashboard' element={<DashboardPage />} />
                    <Route path='community' element={<CommunityPage />} />
                    <Route path='campaigns' element={<CampaignsPage />} />
                    <Route
                        path='campaigns/:id'
                        element={<CampaignsPageDetail />}
                    />
                    <Route path='insights' element={<InsightsPage />} />
                    <Route path='donors' element={<DonorsPage />} />
                    <Route path='donations' element={<DonationsPage />} />
                    <Route path='team' element={<TeamPage />} />
                    <Route path='messages' element={<MessagesPage />} />
                    <Route path='reports' element={<ReportsPage />} />
                    <Route path='settings' element={<SettingsPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AllRoutes;
