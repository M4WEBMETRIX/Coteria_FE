import { SparkleIcon } from "@phosphor-icons/react";

const StatRow = ({
  color,
  percent,
  change,
  label,
}: {
  color: string;
  percent: string;
  change: string;
  label: string;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className="h-6 w-4 rounded-full" style={{ backgroundColor: color }}></div>

        <span className="text-xl font-bold text-[#1E1F24]">{percent}</span>
        <span className="rounded-full bg-[#1E1F24] px-2 py-1 text-sm leading-[20px] font-normal tracking-[-2%] text-white">
          {change}
        </span>
      </div>
      <span className="text-sm leading-[20px] font-normal tracking-[-1%] text-[#4A4C54]">
        {label}
      </span>
    </div>
  );
};

const CommunityInsightsWidget = () => {
  return (
    <div className="font-ubuntu flex h-fit w-full flex-col rounded-xl border border-[#DFE1E7] bg-[#FCFCFD] p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="mb-2 text-base leading-[28px] font-medium tracking-[-3%] text-[#4A4C54]">
          Community Insights
        </h3>
        <p className="mb-3 text-sm leading-[20px] tracking-[-1%] text-[#838880]">
          AI highlights representation trends and their impact on engagement and performance.
        </p>
      </div>

      <div className="mb-4.5 flex flex-col gap-2">
        <StatRow color="#47D198" percent="54%" change="+2.3%" label="New members" />
        <StatRow color="#12AA5B" percent="46%" change="+1.3%" label="Returning members" />
      </div>

      <div className="mt-auto rounded-lg bg-[#12AA5B] p-4 text-white">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <SparkleIcon size={30} />
          </div>
          <p className="text-xs leading-[150%]">
            Community growth is being driven primarily by influencer sharing rather than direct
            campaign traffic. Influencer-led joins convert 2x higher than average.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityInsightsWidget;
