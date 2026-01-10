import { SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import ROBOTIMAGE from "@/assets/images/robot.jpg";
import { useQueryState } from "nuqs";

const InsightsCard = () => {
  const [, setTab] = useQueryState("tab");

  return (
    <div className="w-full rounded-[8px] border border-[#DFE1E7] px-4 pb-4 shadow-[0px_1px_2px_0px_#E4E5E7]">
      <header className="flex h-15 items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <HugeiconsIcon icon={SparklesIcon} size={28} color="#12AA5B" strokeWidth={1.5} />
          </div>
          <p className="text-xl leading-7 font-medium tracking-[-3%] text-[#4A4C54]">
            Coterie Ai Insight
          </p>
        </div>
        <p className="text-xs leading-5 font-normal tracking-[-2%] text-[#838880]">Refresh</p>
      </header>

      <div className="no-scrollbar h-60 space-y-3 overflow-auto">
        {[
          {
            image: ROBOTIMAGE,
            text: "Engagement increased over the past 48 hours due to a combination of two factors.",
          },
          {
            image: ROBOTIMAGE,
            text: "Engagement increased over the past 48 hours due to a combination of two factors.",
          },
          {
            image: ROBOTIMAGE,
            text: "Engagement increased over the past 48 hours due to a combination of two factors.",
          },
          {
            image: ROBOTIMAGE,
            text: "Engagement increased over the past 48 hours due to a combination of two factors.",
          },
          {
            image: ROBOTIMAGE,
            text: "Engagement increased over the past 48 hours due to a combination of two factors.",
          },
        ].map((content, index) => (
          <div key={index} className="flex items-start gap-3">
            <img src={content?.image} alt="" className="h-10.25 w-8 object-cover object-center" />

            <p className="rounded-[16px] bg-[#EFF0F3] p-3 text-xs leading-5 font-normal tracking-[-1%] text-[#4A4C54]">
              {content?.text}
            </p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => setTab("ai_insight")}
        className="mt-2 flex h-12 w-full cursor-pointer items-center gap-3 rounded-[8px] bg-[#12AA5B] text-base leading-6 font-semibold tracking-[-2%] text-[#FCFCFD] transition hover:scale-[1.02]"
      >
        {" "}
        Get More Insight
        <div>
          <HugeiconsIcon icon={SparklesIcon} size={28} color="#FCFCFD" strokeWidth={2.5} />
        </div>
      </Button>
      {/* <Button
        onClick={() => setTab("ai_insight")}
        className="mt-2 flex h-12 w-full cursor-pointer items-center gap-3 rounded-full bg-[radial-gradient(circle_at_top,#EA4335,#A82C00)] text-base leading-6 font-semibold tracking-[-2%] text-[#FCFCFD] transition hover:scale-[1.02]"
      >
        Get More Insight
        <div>
          <HugeiconsIcon icon={SparklesIcon} size={28} color="#FCFCFD" strokeWidth={2.5} />
        </div>
      </Button> */}
    </div>
  );
};

export default InsightsCard;
