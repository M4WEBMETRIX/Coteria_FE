import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { CaretRightIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export const campaigns = [
  {
    id: 1,
    name: "John Keith-King Collection",
    raised: 2700,
    target: 55000,
    description:
      'William ("Bill") B. Cushner was born in Alberta in 1914, the son of Russian immigrants from the Ukraine.',
    image: "", // Placeholder
    status: "active",
  },
];

const DashboardCampaigns = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"active" | "completed">("active");

  return (
    <div className="w-full space-y-6">
      {/* Banner */}
      <div
        onClick={() => navigate("/user/dashboard/campaign/287")}
        className="relative h-51.75 w-full cursor-pointer overflow-hidden rounded-[10px] bg-gray-200"
      >
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
            <h1 className="text-[22px] leading-[140%] font-medium tracking-[-2%]">Campaigns</h1>
            <p className="text-sm leading-[150%] font-normal tracking-[-2%] opacity-90">
              Atlantic Salmon Museum
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-7">
        <button
          onClick={() => setTab("active")}
          className={`cursor-pointer pb-1 text-sm leading-[155%] tracking-[-2%] transition-all ${
            tab === "active"
              ? "border-b-2 border-[#12AA5B] font-medium text-[#12AA5B]"
              : "font-normal text-[#818898] hover:text-gray-700"
          }`}
        >
          Active Campaigns
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`cursor-pointer pb-1 text-sm leading-[155%] tracking-[-2%] transition-all ${
            tab === "completed"
              ? "border-b-2 border-[#12AA5B] font-medium text-[#12AA5B]"
              : "font-normal text-[#818898] hover:text-gray-700"
          }`}
        >
          Completed Campaigns
        </button>
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

            <p className="max-w-149.5 leading-[155%] font-normal text-[#6B6B6B]">
              {campaign.description}{" "}
              <span className="cursor-pointer text-[#12AA5B]">Learn more.</span>
            </p>

            <div className="h-26.5 w-full overflow-hidden rounded-[10px] bg-gray-100">
              <img
                src="https://placehold.co/1000x150/png"
                alt="Campaign Detail"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCampaigns;
