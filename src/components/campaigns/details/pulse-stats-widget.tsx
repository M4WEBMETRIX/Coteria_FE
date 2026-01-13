import { Chart01Icon, ChartHistogramIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const PulseStatsWidget = () => {
  const stats = [
    {
      title: "Awareness",
      value: "3,542",
      badge: "+16.0",
      badgeRole: "positive", // green
      hasChartIcon: true,
      chartIcon: Chart01Icon,
      chartIconColor: "text-[#12AA5B]",
      footer: ["Impression", "vs Last 7 Days"],
      footerColor: "text-[#31AB93]",
    },
    {
      title: "Participation",
      value: "429",
      badge: "+10.0",
      badgeRole: "positive",
      hasChartIcon: true,
      chartIcon: Chart01Icon,
      chartIconColor: "text-[#12AA5B]",
      footer: ["Participant", "Conversion rate"],
      footerColor: "text-[#8B8D98]",
    },
    {
      title: "Influence",
      value: "33%",
      badge: "+20.0",
      badgeRole: "info", // blue
      hasChartIcon: false,
      footer: ["5 active influencers"],
      footerColor: "text-[#8B8D98]",
    },
    {
      title: "Momentum",
      value: "Growing",
      badge: null,
      hasChartIcon: true,
      chartIcon: ChartHistogramIcon,
      chartIconColor: "text-[#2E90FA]",
      footer: [],
      footerColor: "",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col gap-[6px] rounded-[16px] border border-[#DFE1E7] bg-white p-4"
        >
          <div className="flex justify-between">
            <span className="text-[12px] leading-[150%] font-normal tracking-[2%] text-[#666D80]">
              {stat.title}
            </span>
          </div>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-2xl leading-[150%] font-medium tracking-[0%] text-[#0D0D12]">
              {stat.value}
            </span>

            {stat.badge && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                  stat.badgeRole === "info"
                    ? "bg-[#EFF8FF] text-[#175CD3]"
                    : "bg-[#E7F6EC] text-[#12AA5B]"
                }`}
              >
                {stat.badge}
              </span>
            )}

            {stat.hasChartIcon && stat.chartIcon && (
              <div className={stat.chartIconColor}>
                <HugeiconsIcon icon={stat.chartIcon} size={20} />
              </div>
            )}
          </div>

          {stat.footer.length > 0 && (
            <div
              className={`flex items-center gap-4 text-[10px] leading-[150%] tracking-[2%] ${stat.footerColor}`}
            >
              {stat.footer.map((label, idx) => (
                <span key={idx}>{label}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PulseStatsWidget;
