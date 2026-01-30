import { ButtonTabs } from "@/components/button-tab";
import { useQueryState } from "nuqs";
import DashboardHome from "./dashboard-home";
import DashboardCampaigns from "./dashboard-campaigns";
import DashboardCommunity from "./dashboard-community";
import DashboardResources from "./dashboard-resources";
import DashboardMember from "./dashboard-member";
import { Calendar } from "@/components/ui/calendar";
import { useMemo, useState } from "react";
import {
  CaretDownIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

const TAB_VALUES = ["home", "community", "campaigns", "resources", "impact", "member"] as const;

const getAdjacentDays = (date?: Date | null) => {
  if (!date) return [];

  const prev = new Date(date);
  prev.setDate(date.getDate() - 1);

  const next = new Date(date);
  next.setDate(date.getDate() + 1);

  return [prev, next];
};

const DashboardIndex = () => {
  const [activeTab] = useQueryState("tab", {
    defaultValue: "home",
  });

  const [date, setDate] = useState<Date | undefined>(new Date());

  const highlightedDays = useMemo(() => getAdjacentDays(date), [date]);

  return (
    <div className="flex w-full gap-4">
      <div className="w-full py-8.5">
        <nav className="mb-13.75 flex items-center justify-between">
          <div className="space-y-0.75">
            <p className="text-[32px] leading-[120%] font-normal tracking-[-2%] text-[#000000]">
              Good Morning,
            </p>
            <p className="text-[48px] leading-[120%] font-medium tracking-[-2%] text-[#000000]">
              Wale Abba!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-between rounded-[20px] border border-[#ECEFF3] px-3 py-1.5">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8FAFB]">
                    <MagnifyingGlassIcon size={18} color="#000000" weight="bold" />
                  </div>
                </div>
                <Input className="border-0 shadow-none" placeholder="Search campaign, schedule" />
              </div>
            </div>

            <div className="relative flex h-14 w-14 items-center justify-center gap-3 rounded-full border border-[#ECEFF3]">
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
            </div>
          </div>
        </nav>
        <ButtonTabs
          tabs={[
            { label: "Home", value: "home" },
            { label: "Community", value: "community" },
            { label: "Campaigns", value: "campaigns" },
            { label: "Resources ", value: "resources" },
            { label: "Impact", value: "impact" },
            { label: "Member", value: "member" },
          ]}
          values={TAB_VALUES}
          defaultValue={TAB_VALUES[0]}
          className="mb-9 max-w-[650px]"
        />
        {activeTab === "home" && <DashboardHome />}
        {activeTab === "community" && <DashboardCommunity />}
        {activeTab === "campaigns" && <DashboardCampaigns />}
        {activeTab === "resources" && <DashboardResources />}
        {activeTab === "member" && <DashboardMember />}
      </div>

      {(activeTab === "home" || activeTab === "community") && (
        <div className="w-full max-w-[324px] border-l border-l-[#ECEFF3] pt-[89.58px] pl-5">
          <div className="mb-5 flex items-start gap-5">
            <div className="">
              <div className="flex h-[104.55px] w-[104.55px] items-center justify-center rounded-full bg-[#FDD8E1]">
                <UserIcon size={64} color="rgba(111, 111, 111, 0.5)" />
              </div>
            </div>

            <div className="w-full space-y-0.5">
              <div className="flex items-center justify-between">
                <p className="text-sm leading-[155%] font-normal tracking-[0%] text-[#6F6F6F]">
                  Level
                </p>
                <p className="text-lg leading-[140%] font-normal tracking-[-2%] text-[#000000]">
                  7
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm leading-[155%] font-normal tracking-[0%] text-[#6F6F6F]">
                  Total XP
                </p>
                <p className="text-lg leading-[140%] font-normal tracking-[-2%] text-[#000000]">
                  5400
                </p>
              </div>
              <button className="mt-3 flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-[100px] bg-[#EFFFF8] text-base leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Edit Profile
                <div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.66212 14.4563C7.90076 14.2702 8.11722 14.0537 8.55008 13.6209L14.097 8.07399C13.342 7.75978 12.4479 7.24365 11.6022 6.39801C10.7565 5.55224 10.2403 4.65794 9.92612 3.90293L4.37912 9.44992L4.37907 9.44997C3.94624 9.8828 3.7298 10.0992 3.54367 10.3379C3.3241 10.6194 3.13585 10.924 2.98226 11.2463C2.85205 11.5195 2.75526 11.8099 2.56167 12.3906L1.54084 15.4531C1.44557 15.7389 1.51995 16.054 1.73297 16.267C1.94599 16.48 2.26108 16.5544 2.54688 16.4592L5.60938 15.4383C6.19014 15.2447 6.48052 15.1479 6.75373 15.0177C7.07602 14.8641 7.38061 14.6759 7.66212 14.4563Z"
                      fill="#919191"
                    />
                    <path
                      d="M15.6362 6.53479C16.7879 5.38301 16.7879 3.51561 15.6362 2.36383C14.4844 1.21206 12.617 1.21206 11.4652 2.36383L10.7999 3.02911C10.809 3.05662 10.8185 3.08451 10.8283 3.11277C11.0721 3.81562 11.5322 4.737 12.3977 5.60252C13.2632 6.46803 14.1846 6.92811 14.8875 7.17196C14.9156 7.18172 14.9434 7.19113 14.9708 7.2002L15.6362 6.53479Z"
                      fill="#919191"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between rounded-[20px] border border-[#ECEFF3] px-5.5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative h-6.75 w-6.75 rounded-full bg-[#45D884]">
                <p className="absolute right-0 bottom-0 h-[6.75px] w-[6.75px] rounded-full border border-[#F8FAFB] bg-[#40C4AA]" />
              </div>
              <p className="text-lg leading-[140%] font-normal tracking-[-2%] text-[#000000]">
                Notifications
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg
                  className=""
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0867 19.3877L11.6288 18.4718C12.0492 17.7614 12.2595 17.4062 12.5972 17.2098C12.9349 17.0134 13.36 17.0061 14.2104 16.9915C15.4658 16.9698 16.2531 16.8929 16.9134 16.6194C18.1386 16.1119 19.1119 15.1386 19.6194 13.9134C20 12.9946 20 11.8297 20 9.5V8.5C20 8.13033 20 7.78153 19.9989 7.45187C19.9976 7.02454 19.4751 6.78307 19.0971 6.9825C18.4709 7.31294 17.7573 7.5 17 7.5C14.5147 7.5 12.5 5.48528 12.5 3C12.5 2.24271 12.6871 1.52911 13.0175 0.902885C13.2169 0.524944 12.9755 0.00243675 12.5481 0.00106117C12.2185 -9.66247e-09 11.8697 0 11.5 0H8.5C5.22657 0 3.58985 -5.96046e-08 2.38751 0.736799C1.71473 1.14908 1.14908 1.71473 0.736799 2.38751C0 3.58985 0 5.22657 0 8.5V9.5C0 11.8297 0 12.9946 0.380602 13.9134C0.888072 15.1386 1.86144 16.1119 3.08658 16.6194C3.74689 16.8929 4.53422 16.9698 5.78958 16.9915C6.63992 17.0061 7.06509 17.0134 7.40279 17.2098C7.74049 17.4063 7.95073 17.7614 8.37121 18.4718L8.91331 19.3877C9.39647 20.204 10.6035 20.204 11.0867 19.3877Z"
                    fill="black"
                  />
                </svg>

                <p className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#F8FAFB] bg-[#DF1C41] text-xs leading-[155%] font-normal tracking-[0%] text-[#FFFFFF]">
                  5
                </p>
              </div>
              <div>
                <CaretDownIcon weight="bold" color="#919191" size={18} />
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg leading-[140%] font-normal tracking-[-2%] text-[#000000]">
              Calendar
            </p>
            <p className="text-xs leading-[155%] font-normal tracking-[0%] text-[#818898]">
              See all
            </p>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={{
              soft: highlightedDays,
            }}
            modifiersClassNames={{
              soft: "bg-[#EFFFF8] border border-[#ECEFF3] text-[#6F6F6F] rounded-full",
            }}
            classNames={{
              today: "rounded-full data-[selected=true]:rounded-full",
              week: "flex w-full mt-3 gap-2",
              day_button: "data-[selected-single=true]:rounded-full",
            }}
            className="w-full rounded-lg border text-sm! font-normal! text-[#6F6F6F]!"
          />

          <div className="mt-4 mb-3 flex items-center justify-between">
            <p className="text-lg leading-[140%] font-normal tracking-[-2%] text-[#000000]">
              Your Attention
            </p>
            <p className="text-xs leading-[155%] font-normal tracking-[0%] text-[#818898]">
              See all
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-21.5 max-w-51.25 items-center justify-between rounded-[4px] border-l-2 border-l-[#45D884] bg-[#EFFFF8] p-2.5">
              <div className="max-w-27 text-sm leading-[155%] font-normal tracking-[0%]">
                <p className="line-clamp-2 text-[#2C2C2D]">John Keith-King Collection</p>
                <p className="text-[#6F6F6F]">Fund Raising</p>
              </div>
              <div>
                <CaretRightIcon weight="bold" color="#919191" size={18} />
              </div>
            </div>
            <p className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
              Ongoing
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardIndex;
