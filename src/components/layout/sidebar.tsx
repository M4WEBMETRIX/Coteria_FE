import { Link, NavLink, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Logo from "@/assets/icons/coterie.svg";
import {
  CaretLeftIcon,
  CaretRightIcon,
  HeadsetIcon,
  PowerIcon,
  // CaretDownIcon,
} from "@phosphor-icons/react";
import { HelpCircleIcon, Logout01Icon } from "hugeicons-react";
import { useState } from "react";
import LogoutModal from "@/components/layout/logout-modal";
import { sidebarLinks } from "@/constants/nav-links";
import { Separator } from "@/components/ui/separator";

// Mock translation function for now
const t = (key: string) => key;

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();

  function handleLogoutClick() {
    setIsLogoutModalOpen(true);
  }

  return (
    <aside
      className={cn(
        "font-inter relative z-50 flex h-screen flex-col border-r border-[#DFE1E7] bg-[#F6F8FA] transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#DFE1E7] px-4">
        {isSidebarOpen && (
          <Link to="/dashboard">
            <img src={Logo} alt="Coterie" className="h-auto w-[120px]" />
          </Link>
        )}

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "flex h-6 w-6 cursor-pointer items-center justify-center rounded-[6px] border border-[#DFE1E7] bg-white transition-colors hover:bg-gray-200",
            !isSidebarOpen && "mx-auto"
          )}
        >
          {isSidebarOpen ? (
            <CaretLeftIcon className="h-4 w-4 text-[#0D0D12]" />
          ) : (
            <CaretRightIcon className="h-4 w-4 text-[#0D0D12]" />
          )}
        </button>
      </div>

      {/* Profile Completion Banner - Only show when open */}

      <nav
        className={cn(
          "flex-1 shrink-0 overflow-y-auto p-2",
          isSidebarOpen ? "tiny-scrollbar" : "no-scrollbar"
        )}
      >
        {/* {isSidebarOpen && (
          <div
            className="mt-5 h-[40px] rounded-[8px] bg-[#FFF0F3] px-4 py-2 transition-all delay-1000 duration-300"
            style={{ boxShadow: "0px 1px 2px 0px #E4E5E73D" }}
          >
            <p className="mb-1 line-clamp-1 text-sm leading-[150%] font-medium tracking-[2%] text-[#DF1C41]">
              Profile 50% complete
            </p>
          </div>
        )} */}
        <ul className={cn("flex w-full flex-col gap-2", isSidebarOpen ? "" : "items-center")}>
          {sidebarLinks.map((link, index) => {
            // const isSectionOpen = openSections[link.name];

            return (
              <li key={index} className="flex w-full flex-col justify-center">
                {isSidebarOpen && (
                  <>
                    {link.name !== "Main" && (
                      <p className="mb-1 flex cursor-pointer items-center justify-between p-2 text-sm leading-[150%] font-medium tracking-[2%] text-[#A4ACB9] select-none">
                        {link.name}
                      </p>
                    )}
                  </>
                )}

                {!isSidebarOpen && (
                  <div className="w-full px-2">
                    <Separator className="my-2 w-full bg-[#E1E4EA]" />
                  </div>
                )}

                {/* Render Sublinks if section is open or if we are just ignoring section collapse for "Main" (implied) or if sidebar is closed (we might show icons) */}
                {/* Actually, for the requested behavior: "Main" doesn't have a header. "Other" does.
                                When sidebar is CLOSED, we show all icons in a list, maybe separated.
                                When sidebar is OPEN, we respect the collapsible state.
                             */}

                <TooltipProvider delayDuration={0}>
                  <ul className="flex w-full flex-col items-center gap-1">
                    {link.subLinks.map((subLink, subIndex: number) => {
                      const isActive = location.pathname.includes(subLink.path);
                      const LinkContent = (
                        <NavLink
                          to={subLink.path}
                          className={cn(
                            "group flex w-full cursor-pointer items-center gap-2 rounded-md border border-transparent px-3 py-[10px] text-sm text-[#99A0AE] transition-all duration-200",
                            isActive
                              ? "border-[#DFE1E7] bg-white font-medium text-[#079455] shadow-[0px_1px_2px_0px_#E4E5E73D]"
                              : "bg-transparent hover:bg-gray-100 hover:text-[#717171]",
                            isSidebarOpen ? "justify-start" : "justify-center"
                          )}
                        >
                          <span
                            className={cn(
                              "shrink-0",
                              location.pathname.includes(subLink.path)
                                ? "text-[#079455]"
                                : "text-[#666D80] group-hover:text-[#0A0A0C]"
                            )}
                          >
                            {subLink.icon}
                          </span>

                          {isSidebarOpen && <span className="truncate">{t(subLink.name)}</span>}
                        </NavLink>
                      );

                      return (
                        <li className="relative w-full" key={subIndex}>
                          {isSidebarOpen ? (
                            LinkContent
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>{LinkContent}</TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="ml-2 bg-[#079455] font-medium text-white"
                              >
                                {t(subLink.name)}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </TooltipProvider>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto shrink-0 border-t border-gray-100 p-2">
        <div className="flex flex-col gap-1">
          <button
            className={cn(
              "group relative flex w-full items-center gap-2 rounded-lg p-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#0A0A0C]",
              isSidebarOpen ? "justify-start" : "justify-center"
            )}
          >
            <HeadsetIcon size={20} weight="duotone" color="#666D80" />
            {isSidebarOpen && <span>Help & Support</span>}
            {!isSidebarOpen && (
              <span className="absolute top-1/2 left-[calc(100%+8px)] z-90 hidden w-max -translate-y-1/2 rounded-md border border-[#e1e4ea] bg-white p-2 text-xs font-medium text-gray-700 shadow-md group-hover:block">
                Help & Support
              </span>
            )}
          </button>
          <button
            onClick={handleLogoutClick}
            className={cn(
              "group relative flex w-full items-center gap-2 rounded-lg p-2 text-sm font-medium text-[#FF4D4F] transition-colors hover:bg-red-50",
              isSidebarOpen ? "justify-start" : "justify-center"
            )}
          >
            {/* <Logo ut01Icon className="h-4 w-4 shrink-0" /> */}
            <PowerIcon size={20} className="rotate-90" color="#DF1C41" />
            {isSidebarOpen && <span>Logout</span>}
            {!isSidebarOpen && (
              <span className="absolute top-1/2 left-[calc(100%+8px)] z-90 hidden w-max -translate-y-1/2 rounded-md border border-[#e1e4ea] bg-white p-2 text-xs font-medium text-red-600 shadow-md group-hover:block">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen} />
    </aside>
  );
};

export default Sidebar;
