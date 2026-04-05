import { lazy } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import RouteErrorBoundary from "./pages/authentications/error-boundary";
const AllRoutes = lazy(() => import("./_routes"));
const AccessProtection = lazy(() => import("./components/auth/access-protection"));
const EndUserRoutes = lazy(() => import("./_end-user-routes"));

function getSubdomain() {
  const host = window.location.hostname;
  const parts = host.split(".");
  return parts.length > 2 ? parts[0] : null;
}

function isEndUserSubdomain(subdomain: string | null) {
  if (!subdomain) return false;
  const s = subdomain.toLowerCase();
  return s === "donor" || s === "donor-stage";
}

function isOrgSubdomain(subdomain: string | null) {
  if (!subdomain) return false;
  const s = subdomain.toLowerCase();
  return s === "org" || s === "org-stage";
}

function AppRoutesWrapper() {
  const location = useLocation();
  const subdomain = getSubdomain();

  // --- Synchronous subdomain redirects (must happen before route tree renders) ---

  // On donor subdomain: if not already under /user, redirect there immediately
  if (isEndUserSubdomain(subdomain) && !location.pathname.startsWith("/user")) {
    const rest = location.pathname === "/" ? "" : location.pathname;
    const nextPath = `/user${rest}${location.search}${location.hash}`;
    return <Navigate to={nextPath} replace />;
  }

  // On org subdomain: strip /user prefix if somehow landed there
  if (isOrgSubdomain(subdomain) && location.pathname.startsWith("/user")) {
    const nextPath =
      (location.pathname.replace("/user", "") || "/") + location.search + location.hash;
    return <Navigate to={nextPath} replace />;
  }

  return (
    <Routes>
      <Route element={<AccessProtection />}>
        <Route path="/user/*" element={<EndUserRoutes />} errorElement={<RouteErrorBoundary />} />
        <Route path="/*" element={<AllRoutes />} errorElement={<RouteErrorBoundary />} />
      </Route>
    </Routes>
  );
}

export default AppRoutesWrapper;
