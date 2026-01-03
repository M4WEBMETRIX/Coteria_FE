import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkBadge01Icon,
  AiChat02FreeIcons,
  Settings01Icon,
  LogoutCircle01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import ProfilePIC from "@/assets/images/image-2.png";

const UserProfileMenu = () => {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/auth/login");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-start gap-2 outline-none">
          <Avatar className="h-12 w-12 cursor-pointer border-2 border-transparent transition-all hover:border-gray-200">
            <AvatarImage src={ProfilePIC} className="object-cover" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start justify-start text-left">
            <p className="text-left text-xs leading-[150%] font-semibold tracking-[2%] text-[#0D0D12]">
              John Doe
            </p>
            <p className="text-left text-xs leading-[150%] font-normal tracking-[2%] text-[#666D80]">
              Admin
            </p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[360px] rounded-[24px] p-3 shadow-[0px_8px_32px_0px_#00000029]"
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={ProfilePIC} className="object-cover" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <div className="absolute -right-1 -bottom-1 rounded-full bg-white p-[2px]">
              <HugeiconsIcon
                icon={CheckmarkBadge01Icon}
                size={16}
                className="fill-[#12AA5B] text-white"
              />
            </div>
          </div>
          <div>
            <h4 className="text-base leading-6 font-medium tracking-[-1%] text-[#1E1F24]">
              Mario Maurer
            </h4>
            <p className="text-sm leading-4 tracking-[-1%] text-[#8B8D98]">
              mariomaurer@hiresense.co.id
            </p>
          </div>
        </div>

        {/* Plan Card */}
        <div className="mb-4 rounded-2xl bg-[#EFF0F3] p-4">
          <div className="mb-1 flex items-start justify-between">
            <div className="space-y-1">
              <h5 className="text-base font-semibold text-[#0A0A0C]">Pro Plan</h5>
              <p className="text-xs font-normal text-[#8B8D98]">234/10,000 AI messages remaining</p>
            </div>
            <button
              className="rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-colors"
              style={{
                background: "radial-gradient(34.12% 80.21% at 50% 7.29%, #12AA5B 0%, #026451 100%)",
              }}
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {/* AI Helper */}
          <div className="group flex cursor-pointer items-center justify-between rounded-xl p-2 transition-colors hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <HugeiconsIcon
                icon={AiChat02FreeIcons}
                size={22}
                className="text-[#0A0A0C]"
                strokeWidth={1.5}
              />
              <span className="text-[15px] font-medium text-[#0A0A0C]">AI Helper</span>
            </div>
            <Switch />
          </div>

          {/* Settings */}
          <div className="group flex cursor-pointer items-center justify-between rounded-xl p-2 transition-colors hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <HugeiconsIcon
                icon={Settings01Icon}
                size={22}
                className="text-[#0A0A0C]"
                strokeWidth={1.5}
              />
              <span className="text-[15px] font-medium text-[#0A0A0C]">Settings</span>
            </div>
          </div>

          {/* Logout */}
          <div
            className="group flex cursor-pointer items-center justify-between rounded-xl p-2 transition-colors hover:bg-red-50"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-3">
              <HugeiconsIcon
                icon={LogoutCircle01Icon}
                size={22}
                className="rotate-270 text-[#FF897E]"
                strokeWidth={1.5}
              />
              <span className="text-[15px] font-medium text-[#FF897E]">Logout</span>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} className="text-[#FF3B30]" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileMenu;
