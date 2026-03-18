import { useEffect, lazy } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import RouteErrorBoundary from "./pages/authentications/error-boundary";
const AllRoutes = lazy(() => import("./_routes"));
const AccessProtection = lazy(() => import("./components/auth/access-protection"));
const EndUserRoutes = lazy(() => import("./_end-user-routes"));
const CommunityPublic = lazy(() => import("./pages/community/community-public"));
const CampaignPublic = lazy(() => import("./pages/community/campaign-public"));

function getSubdomain() {
  const host = window.location.hostname;
  const parts = host.split(".");
  return parts.length > 2 ? parts[0] : null;
}

function AppRoutesWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const subdomain = getSubdomain();

  useEffect(() => {
    if (subdomain?.toLowerCase() === "donor-stage" && !location.pathname.startsWith("/user")) {
      navigate(`/user${location.pathname}`, { replace: true });
    }

    if (subdomain?.toLowerCase() === "org-stage" && location.pathname.startsWith("/user")) {
      navigate(location.pathname.replace("/user", ""), { replace: true });
    }
  }, [subdomain, location.pathname, navigate]);

  return (
    <Routes>
      <Route element={<AccessProtection />}>
        <Route path="/user/*" element={<EndUserRoutes />} errorElement={<RouteErrorBoundary />} />
        <Route path="/*" element={<AllRoutes />} errorElement={<RouteErrorBoundary />} />
        {/* Public routes */}
        <Route path="/community/public/:slug/:communityId" element={<CommunityPublic />} />
        <Route path="/community/public/campaign/:campaignId" element={<CampaignPublic />} />
      </Route>
    </Routes>
  );
}

export default AppRoutesWrapper;
