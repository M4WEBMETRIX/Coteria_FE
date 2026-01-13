import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AiInsightsModal from "@/components/community/ai-insights-modal";
import { SparkleIcon } from "@phosphor-icons/react";
import AIIMAGE from "@/assets/images/ai-con.png";
import { ScrollArea } from "../ui/scroll-area";

const InsightItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-start gap-3 overflow-hidden rounded-lg p-3">
      <div className="shrink-0 rounded-full bg-white p-1">
        <img src={AIIMAGE} alt="ai-icon" className="h-[41px] w-[32px] object-cover" />
      </div>
      <div className="rounded-[8px] bg-[#EFF0F3] p-3">
        <p className="text-xs leading-[150%] tracking-[1%] text-[#4A4C54]">{text}</p>
      </div>
    </div>
  );
};

const INSIGHTS = [
  {
    id: 1,
    text: "Two influencers are driving 40% of new participation",
    color: "#F04438",
  },
  {
    id: 2,
    text: "Engagement increased over the past 48 hours due to a combination of two factors.",
    color: "#F04438",
  },
  {
    id: 3,
    text: "Based on current activity, here are the most effective actions to take today.",
    color: "#F04438",
  },
  {
    id: 4,
    text: "Two influencers are driving 40% of new participation",
    color: "#F04438",
  },
  {
    id: 5,
    text: "Engagement increased over the past 48 hours due to a combination of two factors.",
    color: "#F04438",
  },
  {
    id: 6,
    text: "Based on current activity, here are the most effective actions to take today.",
    color: "#F04438",
  },
];

const CommunityAiInsightWidget = () => {
  return (
    <div className="flex max-h-[351px] w-full flex-col overflow-hidden rounded-xl border border-[#DFE1E7] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Sparkle Icon */}
          <div className="text-[#12AA5B]">
            <SparkleIcon size={28} weight="fill" />
          </div>
          <h3 className="text-base leading-[28px] font-medium tracking-[-3%] text-[#4A4C54]">
            Coterie Ai Insight
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#8B8D98]">
          <span>Refresh</span>
          <RefreshCcw className="h-3 w-3" />
        </div>
      </div>

      <ScrollArea className="flex h-[200px] flex-1 flex-col gap-3 overflow-auto">
        {INSIGHTS.map((insight) => (
          <InsightItem
            key={insight.id}
            text={insight.text}
            // color={insight.color}
          />
        ))}
      </ScrollArea>

      <AiInsightsModal>
        <Button className="mt-4 w-full cursor-pointer gap-2 bg-[#12AA5B] text-white hover:bg-[#0E904B]">
          Get More Insight
          {/* Sparkle Icon */}
          <SparkleIcon size={28} />
        </Button>
      </AiInsightsModal>
    </div>
  );
};

export default CommunityAiInsightWidget;
