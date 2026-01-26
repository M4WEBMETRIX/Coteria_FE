import React, { useState, type ReactNode, createContext } from "react";
import UserSidebar from "../navigations/user-sidebar";
// import Navbar from "../navbar";
// import Sidebar from "./sidebar";

export interface LayoutContextType {
  setBreadcrumbComponent: (component: ReactNode | null) => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: DashboardLayoutProps) => {
  const [breadcrumbComponent, setBreadcrumbComponent] = useState<ReactNode | null>(null);
  return (
    <LayoutContext.Provider value={{ setBreadcrumbComponent }}>
      <div className="flex h-screen bg-white">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col px-8">
          {/* <Navbar breadcrumbs={breadcrumbComponent} /> */}
          <>Navbar</>
          <main className="no-scrollbar h-[calc(100vh-150px)] min-w-0 flex-1 overflow-auto bg-white py-4">
            {children}
          </main>
          {/* Removed redundant Outlet */}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default AppLayout;
