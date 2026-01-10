import { useQueryState } from "nuqs";
import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FaqTab } from "./components/help-support/faq-tab";
import { ContactTab } from "./components/help-support/contact-tab";

const HelpSupport = () => {
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Help & Support", href: "/help-support", isCurrentPage: true },
    ],
  });
  const tabs = [
    { label: "FAQ", value: "faq", component: <FaqTab /> },
    {
      label: "Contact us",
      value: "contact-us",
      component: <ContactTab />,
    },
  ];
  const activeTabParam = "help-tab"; // custom param name
  const [activeTab, setActiveTab] = useQueryState(activeTabParam, {
    defaultValue: "faq",
  });

  return (
    <div className="font-ubuntu flex h-[calc(100vh-100px)] flex-col">
      {/* Header (optional if needed, but tabs handle the view) */}
      {/* <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#0A0A0C]">Help & Support</h1>
        </div> */}
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

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="pt-[27px]">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HelpSupport;
