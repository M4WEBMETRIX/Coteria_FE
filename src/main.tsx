import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { NuqsAdapter } from "nuqs/adapters/react-router";
import { NuqsAdapter } from "nuqs/adapters/react";
import Logo from "@/assets/icons/coterie.svg";

const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NuqsAdapter>
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
          <App />
        </Suspense>
      </NuqsAdapter>
    </BrowserRouter>
  </StrictMode>
);
