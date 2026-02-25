import {
  ArrowCircleUpIcon,
  CheckCircleIcon,
  CurrencyCircleDollarIcon,
  XCircleIcon,
} from "@phosphor-icons/react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: any;
  iconColor?: string;
  iconBg?: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  // iconColor = "#12AA5B",
  iconBg = "#E7F6EC",
}: StatsCardProps) => {
  return (
    <div className="font-ubuntu h-[107px] w-full rounded-xl border border-[#DFE1E7] bg-[#FFFFFF] p-4 shadow-sm">
      <div className="flex h-full flex-col justify-between gap-2">
        <div className="flex items-start justify-between">
          <span className="traxcking-[2%] text-xs leading-[150%] font-normal text-[#8B8D98]">
            {title}
          </span>
          <div
            className="flex size-9 items-center justify-center rounded-md border border-[#DDFFF6] p-1.5"
            style={{ backgroundColor: iconBg }}
          >
            {icon}
          </div>
        </div>
        <h3 className="text-2xl leading-[130%] font-medium tracking-[0%] text-[#0D0D12]">
          {value}
        </h3>
      </div>
    </div>
  );
};

const CampaignOverviewStats = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* 1. Campaign Active - Icon: Dollar Sign in Green Circle */}
      <StatsCard
        title="Campaign Active"
        value="0"
        icon={<CurrencyCircleDollarIcon weight="fill" color={"#40C4AA"} />}
        iconBg="#E7F6EC"
        iconColor="#12AA5B"
      />
      {/* 2. Total Raised - Icon: Minus/Dash in Green Circle */}
      <StatsCard
        title="Total Raised"
        value="$0.00"
        icon={<ArrowCircleUpIcon weight="fill" color={"#40C4AA"} />}
        iconBg="#E7F6EC"
        iconColor="#12AA5B"
      />
      {/* 3. Total Goal - Icon: Check in Green Circle */}
      <StatsCard
        title="Total Goal"
        value="$0.00"
        icon={<CheckCircleIcon weight="fill" color={"#40C4AA"} />}
        iconBg="#E7F6EC"
        iconColor="#12AA5B"
      />
      {/* 4. Campaign Closed - Icon: X in Green Circle */}
      <StatsCard
        title="Campaign Closed"
        value="0"
        icon={<XCircleIcon weight="fill" color={"#40C4AA"} />}
        iconBg="#E7F6EC"
        iconColor="#12AA5B"
      />
    </div>
  );
};

export default CampaignOverviewStats;
