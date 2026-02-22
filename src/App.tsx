import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { lazy, Suspense } from "react";
import RouteErrorBoundary from "./pages/authentications/error-boundary";
import { ReloadPrompt } from "./components/ReloadPrompt";
import Logo from "@/assets/icons/coterie.svg";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AllRoutes = lazy(() => import("./_routes"));
const AccessProtection = lazy(() => import("./components/auth/access-protection"));
const EndUserRoutes = lazy(() => import("./_end-user-routes"));

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="relative flex flex-col items-center gap-4">
                <div className="h-48 w-48 animate-spin rounded-full border-4 border-[#12AA5B] border-t-transparent" />{" "}
                <img
                  src={Logo}
                  alt="Coterie"
                  className="absolute top-1/2 left-1/2 h-auto w-[120px] -translate-x-1/2 -translate-y-1/2 transform animate-pulse"
                />
              </div>
            </div>
          }
        >
          <Routes>
            <Route element={<AccessProtection />}>
              <Route path="/*" element={<AllRoutes />} errorElement={<RouteErrorBoundary />} />
              <Route
                path="/user/*"
                element={<EndUserRoutes />}
                errorElement={<RouteErrorBoundary />}
              />
            </Route>
          </Routes>
        </Suspense>
        <Toaster position="top-center" richColors />
        <ReloadPrompt />
      </QueryClientProvider>
    </>
  );
}

export default App;
