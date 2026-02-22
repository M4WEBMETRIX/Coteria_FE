import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { Button } from "@/components/ui/button";
import { CommunityDashboardStats } from "@/components/community/community-stats";
// import GrowthTrendsWidget from "@/components/community/growth-trends-widget";
// import CommunityAiInsightWidget from "@/components/community/community-ai-insight-widget";
// import ActivitySummaryWidget from "@/components/community/activity-summary-widget";
// import CommunityInsightsWidget from "@/components/community/community-insights-widget";

import EmptyCampaigns from "../../assets/icons/empty-campaigns.svg";
import { useState } from "react";
import CreateCommunityModal from "@/components/community/create-community-modal";

import { useGetAllCommunities } from "@/services/generics/hooks";
import CommunityTableList from "./community-table-list";

const CommunityPage = () => {
  useBreadcrumb({
    items: [
      { label: "Home", href: "/dashboard" },
      { label: "Dashboard", href: "/dashboard", isCurrentPage: true },
    ],
  });

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [, setCommunity] = useState<any>([]);

  const { data: communityData, isPending } = useGetAllCommunities();
  // console.log("community data hmm", communityData?.data);

  // const [justCreated, setJustCreated] = useState<any>(true);
  return (
    <>
      {communityData?.data?.length <= 0 ? (
        <div className="font-inter my-auto flex h-full w-full flex-col place-content-center items-center justify-center">
          <img src={EmptyCampaigns} alt="empty-campaigns" className="mb-3 h-[106px] w-[106px]" />
          <p className="trackin-[-2%] pb-4 text-center text-base leading-6 font-semibold text-[#1E1F24]">
            Get your first community up and running
          </p>

          <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
            Everything in Coterie starts with a community. Once created, you can run campaigns,
            invite supporters, and track engagement.
          </p>

          <div className="flex gap-3">
            <Button onClick={() => setIsOpenModal(true)} className="" variant={"outline"}>
              Create Your Community
            </Button>
            <CreateCommunityModal
              isCustom={true}
              customOpen={isOpenModal}
              setCustomOpen={setIsOpenModal}
              setCommunityData={setCommunity}
            />

            {/* <CreateCommunityModal setCommunityData={setCommunity}>
              <Button className="" variant={"outline"}>
                Activate Your Community
              </Button>
            </CreateCommunityModal>
            <Button className="rounded-[10px] bg-[#079455] px-4 py-2 text-white hover:bg-[#079455]">
              Complete Onboarding
            </Button> */}
          </div>
        </div>
      ) : (
        <div className="">
          {" "}
          <div className="flex h-full w-full flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-[#1E1F24]">Overview</h1>
              <CreateCommunityModal setCommunityData={setCommunity} />
            </div>

            {/* Stats Grid */}
            <CommunityDashboardStats />
            <CommunityTableList isPending={isPending} communityData={communityData?.data || []} />
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default CommunityPage;
