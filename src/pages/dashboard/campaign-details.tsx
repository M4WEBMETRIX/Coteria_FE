import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { useQueryState, parseAsString } from "nuqs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommandCenter from "@/components/campaigns/details/command-center";
import Settings from "@/components/campaigns/details/settings";
import { cn } from "@/lib/utils";
import { useCampaignDetails } from "@/services/generics/hooks";
import { useNavigate, useParams } from "react-router-dom";
import CampaignsEvents from "@/components/campaigns/campaign-events";
import { QrCodeIcon } from "@phosphor-icons/react";

const Campaigndetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useQueryState(
    "view",
    parseAsString.withDefault("command-center")
  );

  const { data: campaignDetails } = useCampaignDetails(id);

  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Campaigns", href: "/campaigns" },
      { label: campaignDetails?.data?.name, href: "#", isCurrentPage: true },
    ],
  });

  const tabs = [
    {
      value: "command-center",
      label: "Command center",
      component: <CommandCenter data={campaignDetails?.data} />,
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
    // { value: "resources", label: "Resources", component: <CampaignResources /> },

    { value: "settings", label: "Settings", component: <Settings data={campaignDetails?.data} /> },
  ];

  return (
    <div className="font-inter mx-auto flex w-full max-w-[1600px] flex-col gap-6">
      {/* Header / Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <div className="flex items-center justify-between">
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
          {/* QR Code button */}
          <button
            onClick={() => navigate(`/campaigns/${id}/qr-code`)}
            className="ml-auto flex h-[34px] cursor-pointer items-center gap-1.5 rounded-[5px] border border-[#DFE1E7] px-[9.5px] py-2.5 text-sm text-[#0D0D12] hover:border-[#12AA5B] hover:text-[#12AA5B]"
          >
            <QrCodeIcon size={14} />
            Generate QR Code
          </button>
        </div>
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
