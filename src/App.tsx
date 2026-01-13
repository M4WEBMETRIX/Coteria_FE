import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AllRoutes from "./_routes";
import RouteErrorBoundary from "./pages/authentications/error-boundary";
import AccessProtection from "./components/auth/access-protection";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AccessProtection />}>
          <Route path="/*" element={<AllRoutes />} errorElement={<RouteErrorBoundary />} />
        </Route>
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
