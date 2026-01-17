import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load all page components

const ProtectedRoute = lazy(() => import("./pages/authentications/protect-route"));

const DashboardPage = lazy(() => import("./pages/dashboard/dashboard-page"));
const CommunityPage = lazy(() => import("./pages/dashboard/community-page"));
const CampaignsPage = lazy(() => import("./pages/dashboard/campaigns-page"));
const CampaignsPageDetail = lazy(() => import("./pages/dashboard/campaign-details"));
const InsightsPage = lazy(() => import("./pages/dashboard/insights-page"));
const DonorsPage = lazy(() => import("./pages/dashboard/donors-page"));
const SettingsPage = lazy(() => import("./pages/dashboard/settings-page"));
const DonationsPage = lazy(() => import("./pages/dashboard/donations-page"));
const TeamPage = lazy(() => import("./pages/dashboard/team-page"));
const MessagesPage = lazy(() => import("./pages/dashboard/messages-page"));
const ReportsPage = lazy(() => import("./pages/dashboard/reports-page"));
const DonationDetailsPage = lazy(() => import("./pages/dashboard/donation-details"));
const NotFoundPage = lazy(() => import("./pages/not-found-page"));
import Logo from "@/assets/icons/coterie.svg";
import UserHome from "./end-user-app/pages/home";
import UserSignIn from "./end-user-app/pages/authentications/sign-in";
import UbuntuLayout from "./end-user-app/constants/ubuntu-style-wrapper";
import UserSignUp from "./end-user-app/pages/authentications/sign-up";
import UserForgotPassword from "./end-user-app/pages/authentications/forgot-password";

const HelpSupport = lazy(() => import("./pages/dashboard/help-support"));
const EndUserRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative flex flex-col items-center gap-4">
            <div className="h-48 w-48 animate-spin rounded-full border-4 border-[#12AA5B] border-t-transparent" />{" "}
            <img
              src={Logo}
              alt="Coterie"
              className="absolute top-1/2 left-1/2 h-auto w-30 -translate-x-1/2 -translate-y-1/2 transform animate-pulse"
            />
          </div>
        </div>
      }
    >
      <Routes>
        <Route element={<UbuntuLayout />}>
          <Route path="/" element={<UserHome />} />
          <Route path="signup" element={<UserSignUp />} />
          <Route path="login" element={<UserSignIn />} />
          <Route path="forgot-password" element={<UserForgotPassword />} />

          {/* <Route path="check-email" element={<CheckEmailPage />} /> */}
          {/* <Route path="reset-password" element={<ResetPasswordPage />} /> */}
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="campaigns/:id" element={<CampaignsPageDetail />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="donors" element={<DonorsPage />} />
          <Route path="donations" element={<DonationsPage />} />
          <Route path="donors/:id" element={<DonationDetailsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help-support" element={<HelpSupport />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default EndUserRoutes;
