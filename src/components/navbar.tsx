import { Search, Bell } from "lucide-react";
// import UserProfileMenu from "@/components/user-profile-menu";
import { useMemo, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getOrgUserFromLocalStorage } from "@/end-user-app/services/local-storage";
// import ProfilePIC from "@/assets/images/image-2.png";
// import { useGetOrganisationProfile } from "@/services/generics/hooks";
// import { setOrgUserToLocalStorage } from "@/end-user-app/services/local-storage";

interface NavbarProps {
  breadcrumbs: ReactNode;
}

const Navbar = ({ breadcrumbs }: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const orgUser = useMemo(() => {
    return getOrgUserFromLocalStorage();
  }, []);

  return (
    <nav className="font-inter sticky top-0 z-50 flex h-[72px] w-full items-center justify-between border-b border-[#DFE1E7] bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center">{breadcrumbs}</div>

      {/* Right Section: Search, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div
          className={cn(
            "relative flex h-12 items-center transition-all duration-300 ease-in-out",
            isSearchOpen
              ? "w-[280px] rounded-full border border-[#DFE1E7] bg-[#FCFCFD] px-4"
              : "w-12 justify-center"
          )}
        >
          <button
            onClick={() => {
              setIsSearchOpen(true);
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            className={cn(
              "flex items-center justify-center text-[#0A0A0C]",
              !isSearchOpen && "h-12 w-12 rounded-full border border-[#DFE1E7] bg-[#FCFCFD]"
            )}
          >
            <Search className="h-5 w-5 text-[#41414380]" />
          </button>
          <input
            ref={inputRef}
            type="text"
            className={cn(
              "ml-2 h-full w-full bg-transparent text-sm outline-none placeholder:text-[#41414380]",
              !isSearchOpen && "hidden"
            )}
            placeholder="Quick search here..."
            onBlur={() => {
              // Small delay to allow clicking search button if we had one,
              // but mostly just close it.
              setIsSearchOpen(false);
            }}
          />
        </div>
        {/* Notifications */}
        <button className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#DFE1E7] bg-[#FCFCFD] text-[#0A0A0C] transition-colors">
          <div className="absolute top-2 right-3 h-3 w-3 rounded-full bg-[#DF1C41]" />
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-[20px] w-[px] bg-[#DFE1E7]" />
        <button className="flex items-center justify-start gap-2 outline-none">
          <Avatar className="h-12 w-12 cursor-pointer border-2 border-transparent transition-all hover:border-gray-200">
            <AvatarImage src={orgUser?.currentUser?.photo || ""} className="object-cover" />
            <AvatarFallback>{getNameAbbrev(orgUser?.currentUser?.firstName as any)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start justify-start text-left">
            <p className="truncate text-left text-xs leading-[150%] font-semibold tracking-[2%] text-[#0D0D12]">
              {orgUser?.currentUser?.firstName}
            </p>
            <p className="text-left text-xs leading-[150%] font-normal tracking-[2%] text-[#666D80]">
              {orgUser?.currentUser?.role}
            </p>
          </div>
        </button>
        {/* User Profile */}
        {/* THE MODAL IS NO LONGER REQUIRED */}
        {/* <UserProfileMenu /> */}
      </div>
    </nav>
  );
};

export default Navbar;

function getNameAbbrev(name: string) {
  if (!name) return;

  return (name[0] + name[1]).toLocaleUpperCase();
}
