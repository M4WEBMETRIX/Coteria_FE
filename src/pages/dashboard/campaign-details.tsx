import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { useQueryState, parseAsString } from "nuqs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Story from "@/components/campaigns/details/story";
import CommandCenter from "@/components/campaigns/details/command-center";
// import ActivateInfluencer from "@/components/campaigns/details/activate-influencer";
import Settings from "@/components/campaigns/details/settings";
import { cn } from "@/lib/utils";
import CampaignsEvents from "@/components/campaigns/campaign-events";
import CampaignResources from "@/components/campaigns/campaign-resources";

const Campaigndetails = () => {
  // const { id } = useParams(); // Unused for now as we hardcode the view

  const [activeTab, setActiveTab] = useQueryState(
    "view",
    parseAsString.withDefault("command-center")
  );

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
    //COMMENTED OUT FOR MVC
    // {
    //   value: "activate-influencer",
    //   label: "Activate influencer",
    //   component: <ActivateInfluencer />,
    // },
    // { value: "story", label: "Story", component: <Story /> },

    //
    //BROUGHT IN FOR MVC
    {
      value: "events",
      label: "Events",
      component: <CampaignsEvents />,
    },
    { value: "resources", label: "Resources", component: <CampaignResources /> },

    { value: "settings", label: "Settings", component: <Settings /> },
  ];

  return (
    <div className="font-inter mx-auto flex w-full max-w-[1600px] flex-col gap-6">
      {/* Header / Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList className="flex gap-2 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "h-[34px] rounded-[5px] border border-[#DFE1E7] px-[9.5px] py-2.5 text-xs",
                activeTab === tab.value ? "bg-[#EFF0F3] text-[#000000]" : "text-[#666D80]"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* <div className="-mt-2 w-full border-b border-[#DFE1E7]"></div> */}
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
