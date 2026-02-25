import CampaignsTableWidget from "@/components/campaigns/campaigns-table-widget";
import CampaignOverviewStats from "@/components/campaigns/campaign-overview-stats";
import CampaignOnboardingWidget from "@/components/campaigns/campaign-onboarding-widget";
import { useBreadcrumb } from "@/components/breadcrumb-navigation";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

import CreateCampaignModal from "@/components/campaigns/create-campaign-modal";
// import { Cancel01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
// import { HugeiconsIcon } from "@hugeicons/react";

import EmptyCampaigns from "../../assets/icons/empty-campaigns.svg";
import { useGetCampaigns } from "@/services/generics/hooks";

const CampaignsPage = () => {
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Campaigns", href: "/campaigns", isCurrentPage: true },
    ],
  });

  const { data: campaignsData, isPending } = useGetCampaigns();
  // console.log("campaign data", campaignsData);

  // Initialize with data to show the populated state
  // const [, setCampaignsData] = useState<any>([]);

  // const [justCreated, setJustCreated] = useState<any>(true);

  return (
    <div className="font-inter flex h-full w-full flex-col gap-6">
      {campaignsData?.data?.items?.length <= 0 ? (
        <div className="my-auto flex h-full w-full flex-col place-content-center items-center justify-center">
          <img src={EmptyCampaigns} alt="empty-campaigns" className="mb-3 h-[106px] w-[106px]" />
          <p className="trackin-[-2%] pb-4 text-center text-base leading-6 font-semibold text-[#1E1F24]">
            Create your first campaign
          </p>
          <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
            A campaign gives your community a clear reason to act, whether that’s supporting a
            cause, raising awareness, or mobilizing people around a moment.
          </p>
          <CreateCampaignModal />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Success Banner */}
          {/* {justCreated && (
            <div className="flex items-center justify-between rounded-xl border border-[#84CC16] bg-[#F7FEE7] px-6 py-3 text-[#1E1F24]">
              <span className="text-base leading-[140%] tracking-[0%] text-[#3F3F46]">
                
                was created successfully
              </span>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="text-xm h-8 gap-1 border border-[#E4E4E7] bg-white p-0 px-2 py-[5px] leading-[155%] font-semibold tracking-[0%] text-[#09090B] shadow-[0px_-3px_0px_0px_#00000014_inset] hover:bg-transparent"
                >
                  Manage Campaign
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} color="#0A0A0A" />
                </Button>
                <button className="text-[#1E1F24] hover:text-[#12AA5B]">
                  <HugeiconsIcon icon={Cancel01Icon} color="#3F3F46" size={24} />
                </button>
              </div>
            </div>
          )} */}

          {/* Onboarding Widget */}
          {campaignsData?.data && <CampaignOnboardingWidget />}

          {/* Section Header */}
          <div className="mt-4 flex items-end justify-between">
            <h2 className="text-xl leading-[135%] font-semibold text-[#0D0D12]">All Campaign</h2>
            <CreateCampaignModal />
            {/* <Button
              variant="outline"
              className="border-[#E0E1E6] bg-white px-4 py-[9.5px] text-sm leading-[150%] font-semibold text-[#0D0D12]"
            >
              Generate Report
            </Button> */}
          </div>

          {/* Stats */}
          <CampaignOverviewStats />

          {/* Table */}
          <CampaignsTableWidget
            campaignsData={campaignsData?.data?.items || []}
            isPending={isPending}
          />
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
