import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
// Using lucide-react Sparkles because HugeIcons usage might be tricky with finding exact icon names without checking.

const AiInsightWidget = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-[#DFE1E7] bg-white">
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <SparklesIcon className="h-4 w-4 fill-[#12AA5B] text-[#12AA5B]" />
          <h3 className="text-sm font-semibold text-[#1E1F24]">Coterie AI Insight</h3>
        </div>

        <div className="mb-4 flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl">
            🤖
            {/* Placeholder for AI Robot Icon */}
          </div>
          <div className="rounded-tr-xl rounded-br-xl rounded-bl-xl bg-[#F2F4F7] p-3 text-xs leading-5 text-[#1E1F24]">
            Based on current activity, here are the most effective actions to take today:
          </div>
        </div>

        <Button className="h-9 w-full bg-[#12AA5B] text-xs font-medium text-white hover:bg-[#12AA5B]/90">
          Get More Insight
          <SparklesIcon className="ml-2 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default AiInsightWidget;
