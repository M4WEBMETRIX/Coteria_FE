import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, UserIcon } from "@phosphor-icons/react";
import { useRef, useState, type ReactElement, type ReactEventHandler } from "react";
import { useNavigate } from "react-router-dom";

const InnerNav = ({
  text,
  onClick,
}: {
  text: string | ReactElement;
  onClick: ReactEventHandler;
}) => {
  const navigate = useNavigate();
  const [, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center justify-between py-10">
      <div onClick={onClick} className="flex cursor-pointer items-center gap-3">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z"
            fill="#1C274C"
          />
        </svg>
        <p>{text}</p>
      </div>

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
    </div>
  );
};

export default InnerNav;
