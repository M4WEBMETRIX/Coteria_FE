import { Chart01Icon, ChartHistogramIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useGetCampaignEngagement } from "@/services/generics/hooks";
// import { InfoIcon } from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

const PulseStatsWidget = ({ id }: { id: string | number | undefined }) => {
  const { data: engagementData } = useGetCampaignEngagement(id);

  console.log(engagementData, "engagementData");

  //   {
  //     "success": true,
  //     "data": {
  //         "campaignViews": 3,
  //         "sharedLinkOpens": 0,
  //         "referralClicks": 0,
  //         "impressionsTotal": 3,
  //         "participationDonations": 0,
  //         "participationSharingInvites": 0,
  //         "participationTotal": 0,
  //         "momentumStatus": "flat",
  //         "momentumCurrentParticipationTotal": 0,
  //         "momentumPreviousParticipationTotal": 0
  //     }
  // }

  const stats = [
    {
      title: "Awareness",
      value: engagementData?.data?.campaignViews,
      badge: engagementData?.data?.impressionsTotal,
      badgeRole: "positive", // green
      hasChartIcon: true,
      chartIcon: Chart01Icon,
      chartIconColor: "text-[#12AA5B]",
      footer: ["Impression", "vs Last 7 Days"],
      footerColor: "text-[#31AB93]",
      toolTipDesc: (
        <div>
          <p className="font-semibold text-gray-900">Campaign Awareness (Impressions)</p>
          <p className="mt-1">
            Measures how many people have seen or been exposed to the campaign.
          </p>

          <p className="mt-2 font-medium text-gray-900">What counts:</p>
          <ul className="mt-1 ml-4 list-disc space-y-1">
            <li>Link views</li>
            <li>Shared links opened</li>
            <li>Campaign page visits</li>
            <li>Referral clicks</li>
          </ul>

          <p className="mt-2 font-medium text-gray-900">Why it matters:</p>
          <p className="mt-1">
            Awareness reflects reach. If awareness is high but participation is low, the issue is
            likely messaging or trust.
          </p>
        </div>
      ),
    },
    {
      title: "Participation",
      value: engagementData?.data?.participationTotal,
      badge: engagementData?.data?.participationSharingInvites,
      badgeRole: "positive",
      hasChartIcon: true,
      chartIcon: Chart01Icon,
      chartIconColor: "text-[#12AA5B]",
      footer: ["Participant", "Conversion rate"],
      footerColor: "text-[#8B8D98]",
      toolTipDesc: (
        <div>
          <p className="font-semibold text-gray-900">Campaign Participation</p>
          <p className="mt-1">Tracks how many people take action after seeing the campaign.</p>

          <p className="mt-2 font-medium text-gray-900">Actions include:</p>
          <ul className="mt-1 ml-4 list-disc space-y-1">
            <li>Donating</li>
            <li>Voting</li>
            <li>RSVPing or attending events</li>
            <li>Sharing or inviting others</li>
          </ul>

          <p className="mt-2 font-medium text-gray-900">Why it matters:</p>
          <p className="mt-1">Participation shows real engagement, not just interest.</p>
        </div>
      ),
    },
    // {
    //   title: "Influence",
    //   value: "33%",
    //   badge: "+20.0",
    //   badgeRole: "info", // blue
    //   hasChartIcon: false,
    //   footer: ["5 active influencers"],
    //   footerColor: "text-[#8B8D98]",
    // },
    {
      title: "Momentum",
      value: engagementData?.data?.momentumStatus,
      badge: null,
      hasChartIcon: true,
      chartIcon: ChartHistogramIcon,
      chartIconColor: "text-[#2E90FA]",
      footer: [],
      footerColor: "",
      toolTipDesc: (
        <div>
          <p className="font-semibold text-gray-900">Campaign Momentum</p>
          <p className="mt-1">Shows whether a campaign is gaining or losing energy over time.</p>

          <p className="mt-2 font-medium text-gray-900">How it’s calculated:</p>
          <ul className="mt-1 ml-4 list-disc space-y-1">
            <li>Rate of new participants</li>
            <li>Frequency of shares and referrals</li>
            <li>Donation velocity (not just total raised)</li>
            <li>Update activity from organizers</li>
          </ul>

          <p className="mt-2 font-medium text-gray-900">Why it matters:</p>
          <p className="mt-1">
            Momentum helps you decide when to push, intervene, or identify when a campaign is
            stalling.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col gap-[6px] rounded-[16px] border border-[#DFE1E7] bg-white p-4"
        >
          <div className="flex justify-between">
            <span className="text-[12px] leading-[150%] font-normal tracking-[2%] text-[#666D80]">
              {stat.title}
            </span>
            <div>
              <ReusableTooltip content={stat.toolTipDesc} />
              {/* <InfoIcon /> */}
            </div>
          </div>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-2xl leading-[150%] font-medium tracking-[0%] text-[#0D0D12]">
              {stat.value}
            </span>

            {(stat.badge || stat.badge === 0) && (
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

function ReusableTooltip({ content }: any) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="flex cursor-pointer items-center gap-1 text-sm font-normal text-[#12AA5B]">
          why <HelpCircle className="h-4 w-4" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="bg-white shadow" side="bottom">
        <p className="max-w-[300px] text-sm text-[#1E1F24]">{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default PulseStatsWidget;
