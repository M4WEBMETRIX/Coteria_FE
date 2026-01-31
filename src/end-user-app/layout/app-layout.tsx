import React, { useState, type ReactNode } from "react";
import UserSidebar from "../navigations/user-sidebar";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import UserNavbar from "../navigations/user-navbar";
import { LayoutContext } from "@/components/layout/dashboard-layout";
// import Navbar from "../navbar";
// import Sidebar from "./sidebar";

export interface LayoutContextType {
  setBreadcrumbComponent: (component: ReactNode | null) => void;
}

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [breadcrumbComponent, setBreadcrumbComponent] = useState<ReactNode | null>(null);

  const location = useLocation();

  // Check if current path includes /user/dashboard
  const showNavbar = location.pathname.includes("/user/dashboard");

  return (
    <LayoutContext.Provider value={{ setBreadcrumbComponent }}>
      <div className="flex h-screen bg-white">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col px-8">
          {/* <Navbar breadcrumbs={breadcrumbComponent} /> */}
          {!showNavbar && <UserNavbar breadcrumbs={breadcrumbComponent} />}

          <main
            className={cn(
              "no-scrollbar h-[calc(100vh-150px)] min-w-0 flex-1 overflow-auto bg-white",
              showNavbar ? "py-0" : "py-4"
            )}
          >
            {children}
          </main>
          {/* Removed redundant Outlet */}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default AppLayout;
