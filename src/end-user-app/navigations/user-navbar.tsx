import { useRef, useState, type ReactNode } from "react";

import { MagnifyingGlassIcon, UserIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  breadcrumbs: ReactNode;
}

const UserNavbar = ({ breadcrumbs }: NavbarProps) => {
  const navigate = useNavigate();
  const [, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <nav className="font-inter sticky top-0 z-50 mt-10 flex h-[72px] w-full items-center justify-between bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center">{breadcrumbs}</div>

      {/* Right Section: Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-between rounded-[20px] border border-[#ECEFF3] px-3 py-1.5">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8FAFB]">
                <MagnifyingGlassIcon size={18} color="#000000" weight="bold" />
              </div>
            </div>
            <Input
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className="border-0 shadow-none"
              placeholder="Search campaign, schedule"
            />
          </div>
        </div>

        {/* NOT AVAILABLE FOR MVP  */}
        {/* <div className="relative flex h-14 w-14 items-center justify-center gap-3 rounded-full border border-[#ECEFF3]">
          <div className="">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.35179 18.2418C6.19288 19.311 7.51418 20 9 20C10.4858 20 11.8071 19.311 12.6482 18.2418C10.2264 18.57 7.77357 18.57 5.35179 18.2418Z"
                fill="black"
              />
              <path
                d="M15.7491 7V7.7041C15.7491 8.54909 15.9903 9.37517 16.4422 10.0782L17.5496 11.8012C18.5612 13.3749 17.789 15.5139 16.0296 16.0116C11.4273 17.3134 6.57274 17.3134 1.97036 16.0116C0.211046 15.5139 -0.561177 13.3749 0.450359 11.8012L1.5578 10.0782C2.00972 9.37517 2.25087 8.54909 2.25087 7.7041V7C2.25087 3.13401 5.27256 0 9 0C12.7274 0 15.7491 3.13401 15.7491 7Z"
                fill="black"
              />
            </svg>

            <p className="absolute top-0 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#F8FAFB] bg-[#DF1C41] text-xs leading-[155%] font-normal tracking-[0%] text-[#FFFFFF]">
              5
            </p>
          </div>
        </div> */}

        <div className="">
          <div
            onClick={() => navigate("/user/account-settings/edit")}
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#45D884]"
          >
            <UserIcon size={32} color="#FFFFFF" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
