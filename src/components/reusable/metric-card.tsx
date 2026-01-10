import { cn } from "@/lib/utils";
import { Calendar } from "@phosphor-icons/react";
import { type ReactElement } from "react";

interface MetricProps {
  title?: string;
  icon?: ReactElement;
  value?: string | number;
  percentage?: number;
}

const MetricCard = ({ title, icon, value, percentage = 0 }: MetricProps) => {
  return (
    <div className="h-34.25 w-full rounded-[16px] border border-[#DFE1E7] p-4 shadow-[0px_1px_2px_0px_#DFE1E7]">
      <div className="flex items-center justify-between">
        <p className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]">
          {title || "title"}
        </p>
        <div className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#DDFFF6] bg-[#DDFFF6]">
          {icon || <Calendar />}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-[24px] leading-[130%] font-semibold tracking-[0%] text-[#0D0D12]">
          {value?.toLocaleString() || "1,234"}
        </p>
        <div className="flex items-center gap-2 text-xs leading-[150%] font-medium tracking-[2%]">
          <div
            className={cn(
              "rounded-[50px] px-1.5 py-0.5 text-xs",
              percentage < 0 ? "bg-[#FFF0F3] text-[#DF1C41]" : "bg-[#EFFEFA] text-[#40C4AA]"
            )}
          >
            {percentage || "0.00"}%
          </div>
          <p className="text-sm text-[#666D80]">from last month</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
