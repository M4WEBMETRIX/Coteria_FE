// import UserUpcomingEventCard from "@/components/end-users/events/user-upcoming-event-card";

import { Button } from "@/components/ui/button";
import InnerNav from "@/end-user-app/navigations/inner-nav";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CaretDownIcon,
  ChatCircleIcon,
  HeartIcon,
  ShareFatIcon,
  Trophy,
} from "@phosphor-icons/react";
import { CaretRightIcon } from "@phosphor-icons/react"; // Import missing icons locally if needed, checking existing imports.
import { useState } from "react";
import { campaigns } from "./dashboard-campaigns";
import { useNavigate } from "react-router-dom";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"active" | "completed">("active");

  return (
    <>
      <InnerNav
        text={"Back to campaigns"}
        onClick={() => navigate("/user/dashboard?tab=campaigns")}
      />
      <div className="flex w-full gap-6">
        {/* Left Sidebar */}
        <div className="w-[350px] space-y-6 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] px-4 pt-[38.5px] pb-5">
          {/* Profile Card */}
          <div className="rounded-[10px] border border-[#ECEFF3] bg-white p-4 text-center">
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200">
                <img
                  src="https://placehold.co/80x80/png"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="line-clamp-1 text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                  Wale Johnson
                </h3>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#D5FBFF] px-3 py-1 text-base leading-[155%] font-normal tracking-[0%] text-[#067884]">
                  <Trophy weight="fill" /> Champion
                </div>
              </div>
            </div>
          </div>

          {/* Invite Widget */}
          <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-4">
            <Button className="h-12 w-full justify-start gap-3 rounded-[10px] border border-[#EFEFEF] bg-white text-base font-normal text-[#000000] hover:bg-gray-50">
              <span className="text-yellow-500">🤝</span> Invite Friends & Family
            </Button>

            <div className="flex gap-2 rounded-lg bg-[#F8FAFB] p-3 text-xs text-[#6B6B6B]">
              <span className="text-yellow-500">💡</span>
              <p>
                <span className="text-[#12AA5B]">Hint:</span> Invite others. Earn XP when you invite
                new members to the community.
              </p>
            </div>
          </div>

          {/* Impact Score */}
          <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-4">
            <div className="flex items-center justify-between border-b pb-4">
              <h4 className="text-lg leading-[140%] font-normal tracking-[-2%] text-[#1E1F24]">
                Your Impact Score
              </h4>
              <CaretRightIcon className="text-gray-400" />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">Level 5</span>
                {/* <span className="text-gray-400">1000/1200 XP</span> */}
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[80%] rounded-full bg-[#12AA5B]" />
              </div>
              <p className="mt-1 flex items-center justify-end gap-1.5 text-right text-sm text-gray-500">
                <span className="font-medium text-[#12AA5B]">+200</span> to level 6
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.45225 2.84925C6.76904 2.48455 7.16042 2.19211 7.59996 1.99169C8.03949 1.79126 8.51693 1.68753 9 1.6875C10.0177 1.6875 10.9298 2.1375 11.5478 2.84925C12.0297 2.81533 12.5134 2.88529 12.966 3.0544C13.4186 3.22351 13.8296 3.48784 14.1713 3.8295C14.5128 4.17106 14.7771 4.58196 14.9462 5.03443C15.1153 5.4869 15.1853 5.9704 15.1515 6.45225C15.5161 6.76911 15.8084 7.16053 16.0087 7.60005C16.2089 8.03958 16.3126 8.51699 16.3125 9C16.3125 9.48307 16.2087 9.96051 16.0083 10.4C15.8079 10.8396 15.5154 11.231 15.1508 11.5478C15.1846 12.0296 15.1145 12.5131 14.9454 12.9656C14.7763 13.418 14.5121 13.8289 14.1705 14.1705C13.8289 14.5121 13.418 14.7763 12.9656 14.9454C12.5131 15.1145 12.0296 15.1846 11.5478 15.1508C11.231 15.5154 10.8396 15.8079 10.4 16.0083C9.96051 16.2087 9.48307 16.3125 9 16.3125C8.51693 16.3125 8.03949 16.2087 7.59996 16.0083C7.16042 15.8079 6.76904 15.5154 6.45225 15.1508C5.97033 15.1848 5.48672 15.1149 5.03411 14.9459C4.58151 14.777 4.17046 14.5128 3.82875 14.1713C3.48709 13.8296 3.22276 13.4186 3.05365 12.966C2.88454 12.5134 2.81458 12.0297 2.8485 11.5478C2.48394 11.2309 2.19164 10.8395 1.99135 10.3999C1.79105 9.96042 1.68744 9.48301 1.6875 9C1.6875 7.98225 2.1375 7.07025 2.84925 6.45225C2.81544 5.9704 2.88545 5.4869 3.05456 5.03443C3.22367 4.58196 3.48794 4.17106 3.8295 3.8295C4.17106 3.48794 4.58196 3.22367 5.03443 3.05456C5.4869 2.88545 5.9704 2.81544 6.45225 2.84925ZM11.7075 7.6395C11.7525 7.57954 11.7851 7.51119 11.8033 7.43846C11.8215 7.36574 11.825 7.29011 11.8135 7.21602C11.8021 7.14192 11.7759 7.07087 11.7366 7.00702C11.6973 6.94318 11.6457 6.88783 11.5847 6.84424C11.5237 6.80064 11.4546 6.76968 11.3815 6.75317C11.3084 6.73666 11.2327 6.73494 11.1589 6.7481C11.0851 6.76126 11.0146 6.78904 10.9517 6.82981C10.8888 6.87058 10.8347 6.92351 10.7925 6.9855L8.3655 10.383L7.1475 9.165C7.04087 9.06564 6.89983 9.01155 6.75411 9.01412C6.60838 9.01669 6.46934 9.07572 6.36628 9.17878C6.26322 9.28184 6.20419 9.42088 6.20162 9.56661C6.19905 9.71233 6.25314 9.85337 6.3525 9.96L8.04 11.6475C8.09774 11.7052 8.16735 11.7496 8.24399 11.7777C8.32063 11.8058 8.40247 11.8169 8.48382 11.8102C8.56517 11.8035 8.64409 11.7792 8.7151 11.7389C8.7861 11.6986 8.84749 11.6434 8.895 11.577L11.7075 7.6395Z"
                    fill="#12AA5B"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          {/* Main Feed */}
          <div className="w-full space-y-6">
            {/* Banner */}
            <div className="relative h-62 w-full cursor-pointer overflow-hidden rounded-[10px] bg-gray-200">
              <img
                src="https://placehold.co/1000x200/png" // Placeholder
                alt="Campaign Banner"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00D06C]">
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
                      d="M2.783 5.573C3.887 4.537 5.39 4 7 4C8.34 4 9.524 4.557 10.443 5.22C11.083 5.682 11.614 6.209 12 6.671C12.4576 6.12508 12.9805 5.63743 13.557 5.219C14.476 4.557 15.66 4 17 4C18.61 4 20.113 4.537 21.217 5.573C22.327 6.613 23 8.124 23 10C23 11.893 21.94 14.748 20.081 17.12C18.212 19.505 15.457 21.5 12 21.5C8.543 21.5 5.788 19.505 3.919 17.12C2.059 14.749 1 11.894 1 10C1 8.124 1.674 6.613 2.783 5.573ZM6 10C6 10.993 6.29 12.461 7.188 13.71C8.124 15.007 9.674 16 12 16C14.326 16 15.876 15.008 16.811 13.71C17.711 12.46 18 10.992 18 10H16C16 10.673 15.79 11.706 15.188 12.54C14.624 13.326 13.675 14 12 14C10.326 14 9.376 13.325 8.812 12.54C8.21 11.707 8 10.674 8 10H6Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="text-white">
                  <h1 className="text-[22px] leading-[140%] font-medium tracking-[-2%]">
                    Campaigns
                  </h1>
                  <p className="text-sm leading-[150%] font-normal tracking-[-2%] opacity-90">
                    Atlantic Salmon Museum
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[22px] leading-[155%] font-normal tracking-[-2%] text-[#000000]">
                      {campaign.name}
                    </h2>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex w-full items-center gap-3">
                      <div className="flex items-center leading-[155%] font-normal tracking-[0%]">
                        <span className="text-lg font-medium text-[#6B6B6B]">
                          ${campaign.raised.toLocaleString()}
                        </span>
                        <span className="text-[#A3A3A3]">/${campaign.target.toLocaleString()}</span>
                      </div>
                      {/* Progress Bar Custom */}
                      <div className="h-2 w-full max-w-138.75 overflow-hidden rounded-full bg-[#D9D9D9]">
                        <div
                          className="h-full rounded-full bg-[#12AA5B]"
                          style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                        />
                      </div>
                    </div>
                    <Button className="h-10 rounded-full bg-[#12AA5B] px-4 text-white hover:bg-[#00b05b]">
                      <div className="flex items-center text-sm font-medium">
                        Donate
                        <CaretRightIcon size={14} weight="bold" className="text-white" />
                      </div>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="max-w-110 text-xs leading-[155%] font-medium tracking-[0%] text-[#000000]">
              If you are interested in donating an item to our collection, please contact us at{" "}
              <span className="underline"> (506) 365-7787 </span> or{" "}
              <span className="underline"> museum@nbnet.nb.ca</span>
            </p>
            {/* Tabs */}
            <div className="flex items-center gap-7">
              <button
                onClick={() => setTab("active")}
                className={`flex cursor-pointer items-center gap-1.5 pb-1 text-sm leading-[155%] tracking-[-2%] transition-all ${
                  tab === "active"
                    ? "border-b-2 border-[#12AA5B] font-medium text-[#12AA5B]"
                    : "font-normal text-[#818898] hover:text-gray-700"
                }`}
              >
                Campaign Information
              </button>
              <button
                onClick={() => setTab("completed")}
                className={`flex cursor-pointer items-center gap-1.5 pb-1 text-sm leading-[155%] tracking-[-2%] transition-all ${
                  tab === "completed"
                    ? "border-b-2 border-[#12AA5B] font-medium text-[#12AA5B]"
                    : "font-normal text-[#818898] hover:text-gray-700"
                }`}
              >
                Members <CaretDownIcon size={16} className="" />
              </button>
            </div>

            <div className="max-w-186.5 p-4">
              <p className="mb-2 line-clamp-4 text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Jack King was a trainman as were two of his brothers. After Jack’s death, John’s
                uncles would use their train passes to take him far and wide on fishing trips that
                he would remember for the rest of his life. Given that he also developed a passion
                for “collecting” early on, it’s not surprising that later in life John would
                establish a sport fishing museum to house his many artifacts.....
              </p>

              <div className="flex items-center justify-start gap-3 text-[#6B6B6B]">
                <button className="flex items-center gap-1 hover:text-[#12AA5B]">
                  <ChatCircleIcon size={20} />
                </button>
                <button className="flex items-center gap-1 hover:text-red-500">
                  <HeartIcon size={20} />
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500">
                  <ShareFatIcon size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          {/* NOT AVAIALABLE FOR MVP  */}
          {/* <UserUpcomingEventCard /> */}
        </div>
      </div>
    </>
  );
};

export default CampaignDetails;
