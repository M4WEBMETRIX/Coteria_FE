import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { Button } from "@/components/ui/button";
import CommunityStats from "@/components/community/community-stats";
import GrowthTrendsWidget from "@/components/community/growth-trends-widget";
import CommunityAiInsightWidget from "@/components/community/community-ai-insight-widget";
import ActivitySummaryWidget from "@/components/community/activity-summary-widget";
import CommunityInsightsWidget from "@/components/community/community-insights-widget";
import { PlusIcon } from "lucide-react";
import EmptyCampaigns from "../../assets/icons/empty-campaigns.svg";
import { useState } from "react";
import CreateCommunityModal from "@/components/community/create-community-modal";

const CommunityPage = () => {
  useBreadcrumb({
    items: [
      { label: "Home", href: "/dashboard" },
      { label: "Dashboard", href: "/dashboard", isCurrentPage: true },
    ],
  });
  const [community, setCommunity] = useState<any>([1]);
  const [communityModal, setCommunityModal] = useState<boolean>(false);
  // const [justCreated, setJustCreated] = useState<any>(true);
  return (
    <>
      {community.length > 0 ? (
        <div className="">
          {" "}
          <div className="flex h-full w-full flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-[#1E1F24]">Overview</h1>
              <CreateCommunityModal setCommunityData={setCommunity} />
            </div>

            {/* Stats Grid */}
            <CommunityStats />

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Row 1: Trends + AI */}
              <div className="col-span-12 h-[350px] lg:col-span-8">
                <GrowthTrendsWidget />
              </div>
              <div className="col-span-12 h-[350px] lg:col-span-4">
                <CommunityAiInsightWidget />
              </div>

              {/* Row 2: Activity + Insights */}
              <div className="col-span-12 h-full min-h-[300px] lg:col-span-5">
                <ActivitySummaryWidget />
              </div>
              <div className="col-span-12 h-full min-h-[300px] lg:col-span-7">
                <CommunityInsightsWidget />
              </div>
            </div>
          </div>{" "}
        </div>
      ) : (
        <div className="font-inter my-auto flex h-full w-full flex-col place-content-center items-center justify-center">
          <img src={EmptyCampaigns} alt="empty-campaigns" className="mb-3 h-[106px] w-[106px]" />
          <p className="trackin-[-2%] pb-4 text-center text-base leading-6 font-semibold text-[#1E1F24]">
            Create your first campaign
          </p>

          <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
            Everything in Coterie starts with a community. Once created, you can run campaigns,
            invite supporters, and track engagement.
          </p>
          <div className="flex gap-3">
            <CreateCommunityModal setCommunityData={setCommunity}>
              <Button className="" variant={"outline"}>
                Activate Your Community
              </Button>
            </CreateCommunityModal>

            <Button className="rounded-[10px] bg-[#079455] px-4 py-2 text-white hover:bg-[#079455]">
              Complete Onboarding
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityPage;
