import AIInsight from "@/components/dashboard/ai-insight";
import ActivityCalendarPanel from "@/components/dashboard/dashboard-right-panel";
import GetStartedPage from "@/components/dashboard/get-started";
import InsightsCard from "@/components/dashboard/insights-card";
import MonitorAndScore from "@/components/dashboard/monitor-and-score";
import OverviewCard from "@/components/dashboard/overview-card";
import { useQueryState } from "nuqs";
import { useBreadcrumb } from "@/components/breadcrumb-navigation";

const DashboardPage = () => {
  useBreadcrumb({
    items: [
      { label: "Home", href: "/dashboard" },
      { label: "Dashboard", href: "/dashboard", isCurrentPage: true },
    ],
  });

  const isOnboarded = true;

  const [tab] = useQueryState("tab", {
    defaultValue: "metrics",
  });

  return (
    <>
      {isOnboarded ? (
        <main className="mb-10 flex w-full items-start gap-6">
          <section className="w-[60%]">
            <OverviewCard />
            <div className="mt-6 flex w-full items-start gap-6">
              <InsightsCard />
              <MonitorAndScore />
            </div>
          </section>
          <section className="w-[40%]">
            {tab === "ai_insight" ? <AIInsight /> : <ActivityCalendarPanel />}
          </section>
        </main>
      ) : (
        <GetStartedPage />
      )}
    </>
  );
};

export default DashboardPage;
