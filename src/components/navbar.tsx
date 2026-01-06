import { Search, Bell } from "lucide-react";
import UserProfileMenu from "@/components/user-profile-menu";
import { useRef, useState, type ReactNode } from "react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface NavbarProps {
  breadcrumbs: ReactNode;
}

const Navbar = ({ breadcrumbs }: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

        {/* User Profile */}
        <UserProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
