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
      <div className="flex h-screen overflow-hidden bg-white">
        {/* Sidebar — fixed height, no grow */}
        <UserSidebar />

        {/* Main Content — takes remaining width, locked to screen height */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex h-full flex-col px-4 lg:px-8">
            {showNavbar ? null : <UserNavbar breadcrumbs={breadcrumbComponent} />}

            {/* Scrollable content area */}
            <main
              className={cn(
                "no-scrollbar min-w-0 flex-1 overflow-y-auto bg-white pb-[80px] lg:pb-0",
                showNavbar ? "py-0" : "py-4"
              )}
            >
              {children}
            </main>
          </div>

          {/* Mobile nav sits at the bottom of this column */}
          <MobileNav />
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default AppLayout;
