import { Button } from "@/components/ui/button";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Cancel01Icon, Checkmark, Share01Icon } from "@hugeicons/core-free-icons";

import PulseStatsWidget from "@/components/campaigns/details/pulse-stats-widget";
import TodaysObjectivesWidget from "@/components/campaigns/details/todays-objectives-widget";
// import DriverAnalysisWidget from "@/components/campaigns/details/driver-analysis-widget";
// import CampaignMomentumTimeline from "@/components/campaigns/details/campaign-momentum-timeline";
// import {
// WhatsHappeningWidget,
// RequestParticipantsWidget,
// } from "@/components/campaigns/details/sidebar-widgets";
// import ActivityFeedWidget from "@/components/campaigns/details/activity-feed-widget";
// import AiInsightWidget from "@/components/campaigns/details/ai-insight-widget";

const CommandCenter = ({ data }: { data: any }) => {
  return (
    <div>
      {" "}
      {/* Content Grid */}
      <div className="flex gap-6">
        {/* Main Column (Left - 8 cols) */}
        <div className="flex w-full flex-1 flex-col">
          {/* Live Campaign Pulse Header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm leading-[100%] font-semibold text-[#696A70]">
              {data?.categoryLabel}
            </h3>
            <div className="flex cursor-pointer items-center gap-1 text-[10px] leading-[100%] text-[#C1C2C9]">
              Last 14 days <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </div>
          </div>

          {/* Campaign Title & Share */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex flex-col gap-[6px]">
              <h1 className="text-2xl font-bold text-[#1E1F24]">{data?.name}</h1>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D5FEF3CC]">
                  <HugeiconsIcon icon={Checkmark} color="#31AB93" size={14} />
                </div>
                <span className="text-xs text-[#8B8D98]">{data?.description}</span>
              </div>
            </div>
            <Button variant="outline" className="h-8 gap-2 border-[#E0E1E6] text-xs text-[#5E606A]">
              <HugeiconsIcon icon={Share01Icon} size={14} />
              Share | 517
            </Button>
          </div>

          {/* Pulse Stats Widgets */}
          <PulseStatsWidget />

          {/* Alert Banner */}
          <div className="mt-8 flex items-center justify-between rounded-[12px] border border-[#FFBE4C] bg-[#FFF6E0] px-4 py-[5.5px] text-xs leading-[150%] font-normal tracking-[2%] text-[#0D0D12]">
            <div className="flex items-center gap-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FDB022] text-[10px] text-white">
                !
              </div>
              <span>
                Momentum increased because two community influencer shared the campaign overnight,
                driving 85 new participants.
              </span>
            </div>
            <HugeiconsIcon icon={Cancel01Icon} size={16} className="cursor-pointer" />
          </div>

          {/* Objectives & Driver Analysis Row */}
          <div className="mt-10 grid grid-cols-12 gap-6">
            {/* Objectives (Larger) */}
            {/* lg:col-span-9 - removed for mvp */}
            <div className="col-span-12 flex-1 space-y-5">
              <TodaysObjectivesWidget />

              {/* COMMENTED OUT FOR MVC  */}
              {/* Momentum Timeline */}
              {/* <CampaignMomentumTimeline /> */}
            </div>
            {/* Driver Analysis (Smaller) */}
            {/* <div className="col-span-12 h-full lg:col-span-3">
              <DriverAnalysisWidget />
            </div> */}
          </div>
        </div>

        {/* Sidebar Column (Right - 4 cols) */}
        {/* COMMENTED OUT FOR MVC  */}
        {/* <aside className="flex w-[256px] flex-col gap-4">
          <WhatsHappeningWidget />
          <RequestParticipantsWidget />
          <ActivityFeedWidget />
          <AiInsightWidget />
        </aside> */}
      </div>
    </div>
  );
};

export default CommandCenter;
