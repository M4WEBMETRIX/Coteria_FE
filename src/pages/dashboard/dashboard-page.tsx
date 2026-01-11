import InsightsCard from "@/components/dashboard/insights-card";
import ActivitySummaryCard from "@/components/dashboard/activity-summary-card";
import CommunityInsightsCard from "@/components/dashboard/community-insights-card";
import GrowthTrendsCard from "@/components/dashboard/growth-trends-card";
import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import MetricCard from "@/components/reusable/metric-card";
import CommunityInsightsWidget from "@/components/community/community-insights-widget";
import CommunityPage from "./community-page";

const DashboardPage = () => {
  useBreadcrumb({
    items: [
      { label: "Home", href: "/dashboard" },
      { label: "Dashboard", href: "/dashboard", isCurrentPage: true },
    ],
  });
  const community = true;
  return (
    <>
      {community ? (
        <CommunityPage />
      ) : (
        <main className="w-full">
          <h1 className="text-[20px] leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Dashboard
          </h1>
          <div className="mt-6 flex w-full items-center gap-5">
            {mockMetric?.map((content) => (
              <MetricCard
                title={content?.name}
                value={content?.amount}
                percentage={content?.percent}
              />
            ))}
          </div>
          <div className="mt-6 flex w-full items-start gap-6.25">
            <div className="w-[60%]">
              <GrowthTrendsCard />
            </div>
            <div className="w-[40%]">
              <InsightsCard />
            </div>
          </div>

          <div className="mt-8.5 flex w-full items-start gap-3.5 space-y-6">
            <div className="w-[40%]">
              <ActivitySummaryCard />
            </div>
            <div className="w-[60%]">
              {/* <CommunityInsightsCard /> */}
              <CommunityInsightsWidget />
            </div>
          </div>
          {/* <section className='w-[60%]'>
                        <OverviewCard />
                        <div className='flex items-start gap-6 mt-6 w-full'>
                            <InsightsCard />
                            <MonitorAndScore />
                        </div>
                    </section>
                    <section className='w-[40%]'>
                        {tab === 'ai_insight' ? (
                            <AIInsight />
                        ) : (
                            <ActivityCalendarPanel />
                        )}
                    </section> */}
        </main>
      )}
    </>
  );
};

export default DashboardPage;

const mockMetric = [
  {
    name: "Total Campaigns",
    amount: "1,245",
    percent: -8.5,
  },
  {
    name: "Total Funds Raised",
    amount: "$456,320.00",
    percent: 10.5,
  },
  {
    name: "Members",
    amount: "832",
    percent: -7.3,
  },
  {
    name: "Community Health Score",
    amount: "12",
    percent: -5.5,
  },
];
