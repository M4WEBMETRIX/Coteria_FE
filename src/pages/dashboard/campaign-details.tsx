import { Button } from "@/components/ui/button";
import { useBreadcrumb } from "@/components/breadcrumb-navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Share01Icon } from "@hugeicons/core-free-icons";

import PulseStatsWidget from "@/components/campaigns/details/pulse-stats-widget";
import TodaysObjectivesWidget from "@/components/campaigns/details/todays-objectives-widget";
import DriverAnalysisWidget from "@/components/campaigns/details/driver-analysis-widget";
import CampaignMomentumTimeline from "@/components/campaigns/details/campaign-momentum-timeline";
import {
  WhatsHappeningWidget,
  RequestParticipantsWidget,
} from "@/components/campaigns/details/sidebar-widgets";
import ActivityFeedWidget from "@/components/campaigns/details/activity-feed-widget";
import AiInsightWidget from "@/components/campaigns/details/ai-insight-widget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Story from "@/components/campaigns/details/story";
import CommandCenter from "@/components/campaigns/details/command-center";
import ActivateInfluencer from "@/components/campaigns/details/activate-influencer";
import Settings from "@/components/campaigns/details/settings";
const Campaigndetails = () => {
  // const { id } = useParams(); // Unused for now as we hardcode the view
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Campaigns", href: "/campaigns" },
      { label: "Housing Support Drive", href: "#", isCurrentPage: true }, // Hardcoded name for demo matching screenshot
    ],
  });

  const tabs = [
    {
      value: "command-center",
      label: "Command center",
      component: <CommandCenter />,
    },
    {
      value: "activate-influencer",
      label: "Activate influencer",
      component: <ActivateInfluencer />,
    },
    { value: "story", label: "Story", component: <Story /> },
    { value: "settings", label: "Settings", component: <Settings /> },
  ];

  return (
    <div className="font-inter mx-auto flex w-full max-w-[1600px] flex-col gap-6">
      {/* Header / Tabs */}
      <Tabs defaultValue="command-center">
        <TabsList className="">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="-mt-2 w-full border-b border-[#DFE1E7]"></div>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="pt-[40px]">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
      <div className="flex flex-col gap-4"></div>
    </div>
  );
};

export default Campaigndetails;
