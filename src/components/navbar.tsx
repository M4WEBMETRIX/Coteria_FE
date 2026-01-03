import { Search, Bell } from "lucide-react";
import UserProfileMenu from "@/components/user-profile-menu";
import type { ReactNode } from "react";
import { Separator } from "./ui/separator";

interface NavbarProps {
  breadcrumbs: ReactNode;
}

const Navbar = ({ breadcrumbs }: NavbarProps) => {
  return (
    <nav className="font-inter sticky top-0 z-50 flex h-[72px] w-full items-center justify-between border-b border-[#DFE1E7] bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center">{breadcrumbs}</div>

      {/* Right Section: Search, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        {/* <div className='relative flex items-center'>
                    <Search className='absolute left-3.5 w-5 h-5 text-[#41414380]' />
                    <input
                        type='text'
                        placeholder='Quick search here...'
                        className='h-12 w-full max-w-[235px] bg-[#FCFCFD] pl-11 pr-4 rounded-full text-sm outline-none placeholder:text-[#41414380] focus:ring-1 focus:ring-gray-200 transition-all'
                    />
                </div> */}
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DFE1E7] bg-[#FCFCFD] text-[#0A0A0C] transition-colors">
          <Search className="h-5 w-5" />
        </button>
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
