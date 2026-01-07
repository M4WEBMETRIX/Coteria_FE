import { useBreadcrumb } from "@/components/breadcrumb-navigation";

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
      <Tabs defaultValue="command-center" className="">
        <TabsList className="flex gap-2 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-[34px] rounded-[5px] border border-[#DFE1E7] px-[9.5px] py-2.5"
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
