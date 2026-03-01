import { useState } from "react";
import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { DonationsMainTable } from "@/components/donations/donations-main";
import { Button } from "@/components/ui/button";
import { useGetOrganisationDonations } from "@/services/generics/hooks";
import { getFunction } from "@/services/generics/generic-index";
import { getCurrencySymbol, useDebounce } from "@/lib/utils";

const DonationsPage = () => {
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Donations", href: "/donations", isCurrentPage: true },
    ],
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: donationsData, isPending } = useGetOrganisationDonations({
    page,
    limit: pageSize,
    search: debouncedSearch,
    sort,
  });

  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      const res = await getFunction(`/org/donations?limit=1000`);
      const items = res?.data?.items || [];
      if (items.length === 0) return;

      const headers = ["No", "Donor", "Campaign", "Date", "Amount", "Status"];
      const rows = items.map((d: any, i: number) => {
        const amount = d.amountCents ? (d.amountCents / 100).toFixed(2) : "0.00";
        return [
          i + 1,
          d.donor || "Anonymous",
          `"${d.campaignName || ""}"`,
          d.createdAt ? new Date(d.createdAt).toLocaleDateString() : "",
          `${getCurrencySymbol(d.currency)} ${amount}`,
          d.status || "",
        ];
      });

      const csvContent = [headers.join(","), ...rows.map((row: any[]) => row.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `donations_export_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="font-ubuntu flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl leading-[135%] font-medium tracking-[0%] text-[#0D0D12]">
          Donation
        </h1>
        <Button onClick={handleExportCSV} disabled={isExporting}>
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>
      <DonationsMainTable
        donationsData={donationsData?.data?.items || []}
        isPending={isPending}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        totalPages={donationsData?.data?.totalPages || 1}
      />
    </div>
  );
};

export default DonationsPage;
