import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CaretRightIcon } from "@phosphor-icons/react";
import { parseAsString, useQueryState } from "nuqs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Sparkle } from "@phosphor-icons/react";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Mock Data & Components for Tabs ---

const engagementData = [
  { month: "Jan 2025", amount: 20000, donations: 150 },
  { month: "Feb 2025", amount: 25000, donations: 200 },
  { month: "Mar 2025", amount: 22000, donations: 180 },
  { month: "Apr 2025", amount: 75080, donations: 823 },
  { month: "May 2025", amount: 45000, donations: 400 },
  { month: "Jun 2025", amount: 50000, donations: 450 },
  { month: "Jul 2025", amount: 48000, donations: 430 },
  { month: "Aug 2025", amount: 30000, donations: 300 },
  { month: "Sep 2025", amount: 55000, donations: 500 },
  { month: "Oct 2025", amount: 60000, donations: 550 },
  { month: "Nov 2025", amount: 35000, donations: 320 },
  { month: "Dec 2025", amount: 70000, donations: 650 },
];

const EngagementHistory = () => (
  <div className="flex h-[213px] gap-6">
    <div className="flex-1 rounded-xl border border-[#E4E7EC] bg-white p-3">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#101828]">Engagement History</h3>
        <p className="text-sm text-[#475467]">Activity over time</p>
      </div>
      <div className="h-[155px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engagementData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={false}
              stroke="#F2F4F7"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#667085", fontSize: 12 }}
              // interval={3}
              tickFormatter={(value, index) => {
                // Show only first and last? Or some interval.
                // Based on design, it shows "Jan 2025" and "Dec 2025" clearly, others maybe hidden or sparse.
                if (index === 0 || index === engagementData.length - 1) return value;
                return "";
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#667085", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #EAECF0",
                boxShadow: "0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
              }}
              labelStyle={{ color: "#344054", fontWeight: 600, marginBottom: "4px" }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#12B76A"
              strokeWidth={2}
              dot={{ r: 4, fill: "#12B76A", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#12B76A", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="donations"
              stroke="#FDB022"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="w-[300px] shrink-0 rounded-xl border border-[#E4E7EC] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkle size={20} weight="fill" className="text-[#12B76A]" />
        <h3 className="text-sm font-semibold text-[#101828]">Coterie Ai Insight</h3>
      </div>
      <div className="flex gap-3">
        <div className="relative h-8 w-8 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3E8EF]">
            <span className="text-xs">🤖</span>
          </div>
          <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-[#12B76A]" />
        </div>
        <div className="rounded-tr-xl rounded-br-xl rounded-bl-xl bg-[#F2F4F7] p-3">
          <p className="text-xs leading-relaxed text-[#475467]">
            Based on current activity, here are the most effective actions to take today:
          </p>
        </div>
      </div>
    </div>
  </div>
);

const responsivenessData = [
  { name: "Updates received", value: 12, color: "#054F31" },
  { name: "Updates viewed", value: 10, color: "#12B76A" },
];

const UpdateResponsiveness = () => (
  <div className="h-213px flex gap-6">
    <div className="flex flex-1 items-center justify-between rounded-xl border border-[#E4E7EC] bg-white px-6 py-5">
      <div className="h-[155px] w-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={responsivenessData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={450}
              stroke="none"
            >
              {responsivenessData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-6 pl-12">
        {responsivenessData.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-[#F2F4F7] pb-2 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-medium text-[#475467]">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-[#101828]">{item.value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-[#475467]">Responsiveness</span>
          <Badge className="bg-[#FEF3F2] text-[#B42318] hover:bg-[#FEF3F2]">• High</Badge>
        </div>
      </div>
    </div>
    <div className="w-[300px] shrink-0 rounded-xl border border-[#E4E7EC] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkle size={20} weight="fill" className="text-[#12B76A]" />
        <h3 className="text-sm font-semibold text-[#101828]">Coterie Ai Insight</h3>
      </div>
      <div className="flex gap-3">
        <div className="relative h-8 w-8 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3E8EF]">
            <span className="text-xs">🤖</span>
          </div>
          <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-[#12B76A]" />
        </div>
        <div className="rounded-tr-xl rounded-br-xl rounded-bl-xl bg-[#F2F4F7] p-3">
          <p className="text-xs leading-relaxed text-[#475467]">
            Based on current activity, here are the most effective actions to take today:
          </p>
        </div>
      </div>
    </div>
  </div>
);

const sharingData = [
  { name: "Direct Shares", value: 45 },
  { name: "Social Lists", value: 30 },
  { name: "Email Invites", value: 25 },
];

const SharingBehavior = () => (
  <div className="flex gap-6">
    <div className="flex flex-1 items-center justify-between rounded-xl border border-[#E4E7EC] bg-white p-6">
      <div className="h-[155px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sharingData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#F2F4F7"
            />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              width={100}
              tick={{ fontSize: 12, fill: "#475467" }}
            />
            <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: "8px" }} />
            <Bar dataKey="value" fill="#12B76A" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-[200px] space-y-4 pl-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#475467]">Sharing Behavior</span>
          <Badge className="bg-[#ECFDF3] text-[#027A48] hover:bg-[#ECFDF3]">• Active</Badge>
        </div>
      </div>
    </div>
    <div className="w-[300px] shrink-0 rounded-xl border border-[#E4E7EC] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkle size={20} weight="fill" className="text-[#12B76A]" />
        <h3 className="text-sm font-semibold text-[#101828]">Coterie Ai Insight</h3>
      </div>
      <div className="flex gap-3">
        <div className="relative h-8 w-8 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3E8EF]">
            <span className="text-xs">🤖</span>
          </div>
          <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-[#12B76A]" />
        </div>
        <div className="rounded-tr-xl rounded-br-xl rounded-bl-xl bg-[#F2F4F7] p-3">
          <p className="text-xs leading-relaxed text-[#475467]">
            Based on current activity, here are the most effective actions to take today:
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ParticipationDepth = () => (
  <div className="flex h-[213px] gap-6">
    <ScrollArea className="h-[213px] flex-1 rounded-xl border border-[#E4E7EC] bg-white px-[28px] py-[20px]">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-[#101828]">Participation Depth</h3>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-4 last:border-0 last:pb-0">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#12B76A]" />
            <div>
              <p className="text-sm font-medium text-[#344054]">Housing Support Drive</p>
              <p className="text-xs text-[#475467]">12 days ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#475467]">13 actions</span>
            <Badge className="bg-[#FEF3F2] text-[#B42318] hover:bg-[#FEF3F2]">• High</Badge>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-4 last:border-0 last:pb-0">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#12B76A]" />
            <div>
              <p className="text-sm font-medium text-[#344054]">Welcoming Refugees</p>
              <p className="text-xs text-[#475467]">1 month ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#475467]">5 actions</span>
            <Badge className="bg-[#FFFAEB] text-[#B54708] hover:bg-[#FFFAEB]">• Medium</Badge>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-4 last:border-0 last:pb-0">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#12B76A]" />
            <div>
              <p className="text-sm font-medium text-[#344054]">Welcoming Refugees</p>
              <p className="text-xs text-[#475467]">1 month ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#475467]">5 actions</span>
            <Badge className="bg-[#FFFAEB] text-[#B54708] hover:bg-[#FFFAEB]">• Medium</Badge>
          </div>
        </div>
      </div>
    </ScrollArea>
    <div className="w-[300px] shrink-0 rounded-xl border border-[#E4E7EC] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkle size={20} weight="fill" className="text-[#12B76A]" />
        <h3 className="text-sm font-semibold text-[#101828]">Coterie Ai Insight</h3>
      </div>
      <div className="flex gap-3">
        <div className="relative h-8 w-8 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3E8EF]">
            <span className="text-xs">🤖</span>
          </div>
          <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-[#12B76A]" />
        </div>
        <div className="rounded-tr-xl rounded-br-xl rounded-bl-xl bg-[#F2F4F7] p-3">
          <p className="text-xs leading-relaxed text-[#475467]">
            Based on current activity, here are the most effective actions to take today:
          </p>
        </div>
      </div>
    </div>
  </div>
);

const InfluencerAiInsightsModal = ({
  showModal,
  setShowModal,
}: {
  showModal: number | null;
  setShowModal: (id: number | null) => void;
}) => {
  const [activeTab, setActiveTab] = useQueryState(
    "influencer-ai-insights",
    parseAsString.withDefault("engagement-history")
  );
  const tabs = [
    {
      value: "engagement-history",
      label: "Engagement history",
      component: <EngagementHistory />,
    },
    {
      value: "update-responsiveness",
      label: "Update responsiveness",
      component: <UpdateResponsiveness />,
    },
    {
      value: "sharing-behaviour",
      label: "Sharing behaviour",
      component: <SharingBehavior />,
    },
    {
      value: "participation-depth",
      label: "Participation depth",
      component: <ParticipationDepth />,
    },
  ];
  return (
    <div>
      <Dialog open={showModal !== null} onOpenChange={(open) => !open && setShowModal(null)}>
        <DialogContent className="flex h-[420px] flex-col p-4 sm:max-w-[965px]">
          <p>Coterie Ai Insights</p>

          <div className="flex items-start justify-between">
            <div className="flex items-center justify-start gap-2.5">
              {" "}
              <Avatar className="h-10 w-10">
                <AvatarImage src={"https://i.pravatar.cc/150?u=1"} alt={"akabr badmus"} />
                <AvatarFallback>{"Akbar Badmus".charAt(0)}</AvatarFallback>
              </Avatar>{" "}
              <p>{"Akbar Badmus"}</p>{" "}
              <Badge className="bg-[#ECF9F7] text-[#267666]">High-Confidence Influencer</Badge>{" "}
            </div>
            <div>
              {" "}
              <Button variant="outline" className="">
                Invite to your campaign <CaretRightIcon size={16} />
              </Button>
            </div>
          </div>
          <div>
            {" "}
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
                <TabsContent key={tab.value} value={tab.value} className="pt-6">
                  {tab.component}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InfluencerAiInsightsModal;
