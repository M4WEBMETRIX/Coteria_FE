import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
// import { useUserAppBreadcrumb } from "@/components/user-app-breadcrumb";
import { PencilSimple } from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InnerNav from "@/end-user-app/navigations/inner-nav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EditProfile = () => {
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const navigate = useNavigate();
  // useUserAppBreadcrumb({
  //   items: [
  //     { label: "Account Settings", href: "/user/account-settings" },
  //     { label: "Edit Profile", href: "/user/account-settings/edit", isCurrentPage: true },
  //   ],
  // });

  return (
    <>
      <InnerNav text={"Back to settings"} onClick={() => navigate("/user/account-settings")} />
      <div className="mx-auto w-full space-y-8 pb-10">
        {/* Change Avatar */}
        <div className="h-[307px] w-[357px] space-y-4 rounded-[10px] border border-[#ECEFF3] bg-white p-5">
          <h3 className="text-xl leading-[155%] font-normal tracking-[-2%] text-[#000000]">
            Change Avatar
          </h3>
          <div className="relative mx-auto h-42 w-42">
            <div className="h-full w-full overflow-hidden rounded-full bg-pink-100">
              <img
                src="https://placehold.co/128x128/png"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <button className="absolute right-0 bottom-0 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50">
              <PencilSimple size={20} />
            </button>
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="max-w-[140px] space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-base leading-6 font-normal tracking-[0%] text-[#1C222A]">
              Profile Visibility
            </h3>
            <p className="text-xs leading-4.5 font-normal tracking-[0%] text-[#6C7787]">
              Choose whether your name and activity are visible to others or kept private.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 items-center gap-2 rounded-[8px] bg-[#EDF3FE] p-1">
              <span
                className={cn(
                  "text-[#9199A5 px-2 text-sm font-normal",
                  isChecked ? "text-[#9199A5 font-normal" : "font-normal text-[#9199A5]"
                )}
              >
                Off
              </span>
              <Switch checked={isChecked} onCheckedChange={(value) => setIsChecked(value)} />
              <span
                className={cn(
                  "px-2 text-sm",
                  isChecked ? "font-medium text-[#0077B5]" : "font-normal text-[#9199A5]"
                )}
              >
                On
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="space-y-6 rounded-[10px] border border-[#ECEFF3] bg-white px-5 py-4">
          <h3 className="text-xl leading-[155%] font-normal tracking-[-2%] text-[#000000]">
            Detailed Information
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Name<span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter your name"
                className="h-12 rounded-[10px] border-[#DFE1E7] bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Birth Date<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2">🇺🇸 +1</span>
                <Input
                  placeholder="Enter your contact number"
                  className="h-12 rounded-[10px] border-[#DFE1E7] bg-white pl-16"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Email<span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter your name"
                className="h-12 rounded-[10px] border-[#DFE1E7] bg-white"
              />
            </div>

            <div className="w-full space-y-2">
              <label className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Birth Date<span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger className="h-12! w-full rounded-[10px] border-[#DFE1E7] bg-white text-gray-500">
                  <SelectValue placeholder="Add Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Address (For tax receipts etc)
              </label>
              <Input className="h-12 rounded-[10px] border-[#DFE1E7] bg-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
