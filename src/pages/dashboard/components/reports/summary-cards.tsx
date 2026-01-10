import { Cube, HandHeartIcon, MoneyIcon } from "@phosphor-icons/react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  fromText?: string;
  icon: React.ReactNode;
}

function SummaryCard({
  title,
  value,
  change,
  trend,
  fromText = "From last month",
  icon,
}: SummaryCardProps) {
  return (
    <div className="flex max-h-[137px] flex-col gap-2 rounded-[16px] border border-[#DFE1E7] p-4 shadow-[0px_1px_2px_0px_#E4E5E73D]">
      <div className="flex flex-row items-center justify-between space-y-0">
        <p className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]">{title}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFFFF6] text-[#10B981]">
          {icon}
        </div>
      </div>

      <div className="mb-1 text-2xl leading-[130%] font-medium tracking-[0%] text-[#0D0D12]">
        {value}
      </div>

      <div className="">
        {change && (
          <div className="flex items-center text-xs">
            <span
              className={`font-medium ${trend === "up" ? "bg-[#EFFEFA] text-[#40C4AA]" : "bg-[#FFF0F3] text-[#DF1C41]"} mr-2 rounded-full px-1.5 py-0.5`}
            >
              {change}
            </span>
            <span className="text-gray-400">{fromText}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function SummaryCards() {
  return (
    <div className="grid w-[258px] gap-4">
      <SummaryCard
        title="Total Campaigns"
        value="1,245"
        change="-8.5%"
        trend="down"
        icon={<Cube size={18} weight="fill" color="#40C4AA" />}
      />
      <SummaryCard
        title="Total Funds Raised"
        value="$456,320.00"
        change="10.5%"
        trend="up"
        icon={<HandHeartIcon size={18} weight="fill" color="#40C4AA" />}
      />
      <SummaryCard
        title="Community Health Score"
        value="12"
        change="-5.5%"
        trend="down"
        icon={<MoneyIcon size={18} weight="fill" color="#40C4AA" />}
      />
    </div>
  );
}
