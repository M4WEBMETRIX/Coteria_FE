import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { DonorsMainTable } from "@/components/donors/donors-main-table";
import { Button } from "@/components/ui/button";

const DonorsPage = () => {
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Donors", href: "/donors", isCurrentPage: true },
    ],
  });

  return (
    <div className="font-ubuntu flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl leading-[135%] font-medium tracking-[0%] text-[#0D0D12]">
          All members
        </h1>
        <Button
          className="bg-primary text-white hover:bg-[#059669]"
          //   onClick={() => setIsAddUserOpen(true)}
        >
          Export CSV
        </Button>
      </div>

      <DonorsMainTable />
    </div>
  );
};

export default DonorsPage;
