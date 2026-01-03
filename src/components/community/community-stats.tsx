import { HandHeartIcon, MoneyIcon, PackageIcon, UsersFourIcon } from "@phosphor-icons/react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: any;
  iconBg: string;
  iconColor: string;
}

const StatCard = ({
  title,
  value,
  trend,
  trendDirection,
  icon,
  iconBg,
  iconColor,
}: StatCardProps) => {
  const isPositive = trendDirection === "up";
  return (
    <div className="font-ubuntu flex h-full w-full flex-col justify-between rounded-xl border border-[#DFE1E7] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-xs font-normal tracking-[2%] text-[#8B8D98]">{title}</span>
        <div
          className="size-9 rounded-md border border-[#DDFFF6] p-1.5"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-2xl leading-[130%] font-semibold text-[#0D0D12]">{value}</h3>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
              isPositive ? "bg-[#EFFEFA] text-[#40C4AA]" : "bg-[#FFF0F3] text-[#DF1C41]"
            }`}
          >
            {isPositive ? "+" : "-"}
            {trend}
          </span>
          <span className="text-[10px] leading-[150%] font-normal tracking-[2%] text-[#667085]">
            from last month
          </span>
        </div>
      </div>
    </div>
  );
};

const CommunityStats = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Campaigns"
        value="1,245"
        trend="8.5%"
        trendDirection="down"
        icon={<PackageIcon size={20} weight="duotone" color={"#40C4AA"} />}
        iconBg="#EFFEFA"
        iconColor="#0BA5EC"
      />
      <StatCard
        title="Total Funds Raised"
        value="$456,320.00"
        trend="8.5%"
        trendDirection="up"
        icon={<HandHeartIcon size={20} weight="duotone" color={"#40C4AA"} />}
        iconBg="#EFFEFA"
        iconColor="#12AA5B"
      />
      <StatCard
        title="Members"
        value="832"
        trend="7.3%"
        trendDirection="down"
        icon={<UsersFourIcon size={20} weight="duotone" color={"#40C4AA"} />}
        iconBg="#EFFEFA"
        iconColor="#12AA5B"
      />
      <StatCard
        title="Community Health Score"
        value="12"
        trend="5.1%"
        trendDirection="down"
        icon={<MoneyIcon size={20} weight="duotone" color={"#40C4AA"} />}
        iconBg="#EFFEFA"
        iconColor="#12AA5B"
      />
    </div>
  );
};

export default CommunityStats;
