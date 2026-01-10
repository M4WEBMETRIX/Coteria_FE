import { useEffect, useState } from "react";
import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { Button } from "@/components/ui/button";
import { conversations } from "./components/messages/data";
import { ConversationList } from "./components/messages/conversation-list";
import { ChatView } from "./components/messages/chat-view";
import { useQueryState } from "nuqs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
const MessagesPage = () => {
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Messages", href: "/messages", isCurrentPage: true },
    ],
  });
  const tabs = [
    { label: "Donor messages", value: "donor", component: <Convsersation /> },
    {
      label: "Influencer messages",
      value: "influencer",
      component: <Convsersation />,
    },
  ];

  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: tabs[0].value,
  });
  const [selectedId, setSelectedId] = useState<string>("");

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  useEffect(() => {
    setSelectedId("");
  }, [activeTab]);

  function Convsersation() {
    return (
      <div className="">
        {" "}
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0A0A0C]">Messages</h1>
          <Button className="bg-primary text-white hover:bg-[#059669]">New message</Button>
        </div>
        {/* Content Grid */}
        <div className="mt-5 flex min-h-0 flex-1 rounded-[16px] border border-[#DFE1E7]">
          {/* Sidebar */}
          <div className="flex min-h-0 max-w-[268px] flex-col overflow-y-auto border-r">
            <ConversationList
              conversations={conversations}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* Main Chat Area */}
          <div className="h-[calc(100vh-250px)] w-full flex-1 flex-col p-4">
            {selectedConversation ? (
              <ChatView conversation={selectedConversation} />
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-ubuntu flex h-[calc(100vh-100px)] flex-col">
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

export default MessagesPage;
