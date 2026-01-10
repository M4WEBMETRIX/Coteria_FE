import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { SummaryCards } from "./components/reports/summary-cards";
import { DonationTrendsChart } from "./components/reports/donation-trends-chart";
import { CategoryDistributionChart } from "./components/reports/category-distribution";
import { DonationsTable } from "./components/reports/donations-table";
import { InsightsPanels } from "./components/reports/insights-panels";
import { Button } from "@/components/ui/button";

const ReportsPage = () => {
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Reports", href: "/reports", isCurrentPage: true },
    ],
  });

  return (
    <div className="font-ubuntu flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0A0A0C]">Report</h1>
        <Button variant="outline" className="border-[#DFE1E7] bg-white">
          Generate Report
        </Button>
      </div>
      <div className="flex h-[451px] w-full gap-6">
        <SummaryCards />
        <DonationTrendsChart />
      </div>
      <div className="flex w-full gap-6">
        <CategoryDistributionChart />
        <DonationsTable />
      </div>

      <InsightsPanels />
    </div>
  );
};

export default ReportsPage;
