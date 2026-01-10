import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { DonationsMainTable } from "@/components/donations/donations-main";
import { Button } from "@/components/ui/button";
// import { DonationsTable } from "./components/reports/donations-table";
// import { DonationsMainTable } from "@/components/donations/donation-table";

const DonationsPage = () => {
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Donations", href: "/donations", isCurrentPage: true },
    ],
  });

  return (
    <div className="font-ubuntu flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl leading-[135%] font-medium tracking-[0%] text-[#0D0D12]">
          Donation
        </h1>
        <Button>Export CSV</Button>
      </div>
      <DonationsMainTable />
    </div>
  );
};

export default DonationsPage;
