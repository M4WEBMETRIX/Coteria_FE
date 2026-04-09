import React, { useState, type ReactNode } from "react";
import UserSidebar from "../navigations/user-sidebar";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import UserNavbar from "../navigations/user-navbar";
import { LayoutContext } from "@/components/layout/dashboard-layout";
import MobileNav from "../navigations/mobile-nav";
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
  const showNavbar =
    location.pathname.includes("/user/dashboard") ||
    location.pathname.includes("/user/account-settings/edit");

  return (
    <LayoutContext.Provider value={{ setBreadcrumbComponent }}>
      <div className="relative flex h-screen bg-white">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Content */}
        <div className="relative min-w-0 flex-1">
          <div className="flex flex-1 flex-col px-4 lg:px-8">
            {/* <Navbar breadcrumbs={breadcrumbComponent} /> */}
            {showNavbar ? null : <UserNavbar breadcrumbs={breadcrumbComponent} />}

            <main
              className={cn(
                "no-scrollbar mb-[80px] h-[calc(100vh-150px)] min-w-0 flex-1 overflow-auto bg-white lg:pb-0",
                showNavbar ? "py-0" : "py-4"
              )}
            >
              {children}
            </main>
            {/* Removed redundant Outlet */}
          </div>
          <MobileNav />
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default AppLayout;
