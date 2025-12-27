import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

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
const InsightsPage = lazy(() => import('./pages/dashboard/insights-page'));
const DonorsPage = lazy(() => import('./pages/dashboard/donors-page'));
const SettingsPage = lazy(() => import('./pages/dashboard/settings-page'));

const AllRoutes = () => {
    return (
        <Suspense
            fallback={
                <div className='min-h-screen flex items-center justify-center'>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='w-12 h-12 border-4 border-[#12AA5B] border-t-transparent rounded-full animate-spin' />
                        <p className='text-sm text-gray-500'>Loading...</p>
                    </div>
                </div>
            }>
            <Routes>
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
                    <Route path='insights' element={<InsightsPage />} />
                    <Route path='donors' element={<DonorsPage />} />
                    <Route path='settings' element={<SettingsPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AllRoutes;
