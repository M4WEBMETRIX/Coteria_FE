import React, { useState, type ReactNode, createContext, useEffect } from "react";
import Navbar from "../navbar";
import Sidebar from "./sidebar";
import { Button } from "../ui/button";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { getBaseUrl } from "@/lib/utils";
import { useConnectStripe } from "@/services/auth";
import { useGetOrganisationProfile } from "@/services/generics/hooks";

export interface LayoutContextType {
  setBreadcrumbComponent: (component: ReactNode | null) => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [breadcrumbComponent, setBreadcrumbComponent] = useState<ReactNode | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { mutate: connectStripeMutate, isPending } = useConnectStripe();

  const { data: userData, refetch } = useGetOrganisationProfile();
  const orgUser = userData?.data;

  const handleConnectStripe = () => {
    connectStripeMutate({
      returnUrl: `${getBaseUrl({ target: "org" })}/community`,
      refreshUrl: `${getBaseUrl({ target: "org" })}/community`,
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <LayoutContext.Provider value={{ setBreadcrumbComponent }}>
      <div className="flex h-screen bg-white">
        {/* Sidebar */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col px-4 lg:px-8">
          <Navbar
            breadcrumbs={breadcrumbComponent}
            onMenuClick={() => setIsMobileSidebarOpen(true)}
          />
          <main className="no-scrollbar h-[calc(100vh-150px)] min-w-0 flex-1 overflow-auto bg-white py-4">
            {orgUser?.stripeOnboardingComplete === false && (
              <div className="mb-6 items-center justify-between rounded-[8px] border border-[#DAFFA2] bg-[#FFF3F6] px-4 py-4 lg:flex lg:h-[72px] lg:px-6 lg:py-0">
                <p className="mb-4 text-base font-medium text-[#3F3F46] lg:mb-0">
                  Your organization cannot receive donations yet. Connect Stripe to start accepting
                  payments.
                </p>
                <Button
                  onClick={handleConnectStripe}
                  className="flex h-12 min-w-42 items-center gap-1.5 border border-[#E2E2E2] bg-white hover:bg-white"
                >
                  <p className="text-base font-normal text-[#FF0909]">
                    {isPending ? "Initializing..." : "Connect"}
                  </p>
                  <ArrowUpRightIcon size={20} color="#0A0A0A" />
                </Button>
              </div>
            )}

            {children}
          </main>
          {/* Removed redundant Outlet */}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default DashboardLayout;
