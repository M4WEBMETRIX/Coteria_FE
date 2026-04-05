import { useEffect, lazy } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const subdomain = getSubdomain();

  // useEffect(() => {
  //   if (subdomain?.toLowerCase() === "donor-stage" && !location.pathname.startsWith("/user")) {
  //     navigate(`/${location.pathname}`, { replace: true });
  //   }

  //   if (subdomain?.toLowerCase() === "org-stage" && location.pathname.startsWith("/user")) {
  //     navigate(location.pathname.replace("/user", ""), { replace: true });
  //   }
  // }, [subdomain, location.pathname, navigate]);

  useEffect(() => {
    if (isEndUserSubdomain(subdomain) && !location.pathname.startsWith("/user")) {
      const rest = location.pathname === "/" ? "" : location.pathname;
      const nextPath = `/user${rest}${location.search}${location.hash}`;
      navigate(nextPath, { replace: true });
    }

    if (isOrgSubdomain(subdomain) && location.pathname.startsWith("/user")) {
      const nextPath = (location.pathname.replace("/user", "") || "/") + location.search + location.hash;
      navigate(nextPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only on mount — subdomain is derived from hostname and never changes

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
