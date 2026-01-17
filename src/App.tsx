import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AllRoutes from "./_routes";
import RouteErrorBoundary from "./pages/authentications/error-boundary";
import AccessProtection from "./components/auth/access-protection";
import EndUserRoutes from "./_end-user-routes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AccessProtection />}>
          <Route path="/*" element={<AllRoutes />} errorElement={<RouteErrorBoundary />} />
          <Route path="/user/*" element={<EndUserRoutes />} errorElement={<RouteErrorBoundary />} />
        </Route>
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
