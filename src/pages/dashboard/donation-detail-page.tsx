import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { Button } from "@/components/ui/button";
import { formatDateAndTime, getCurrencySymbol } from "@/lib/utils";
import { useGetOrganisationDonationDetails } from "@/services/generics/hooks";
import { GlobeIcon } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { useRef } from "react";

const DonationDetailPage = () => {
  const { id } = useParams();
  const receiptRef = useRef<HTMLDivElement>(null);

  useBreadcrumb({
    items: [
      { label: "Home", href: "/dashboard" },
      { label: "Donation", href: "/donations" },
      { label: "Donation details", isCurrentPage: true },
    ],
  });

  const { data: donationDetails, isPending: isFetchingDetails } =
    useGetOrganisationDonationDetails(id);

  const { date, time } = formatDateAndTime(donationDetails?.data?.createdAt || "");

  const handleDownloadReceipt = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    try {
      button.disabled = true;
      button.textContent = "Generating...";

      const d = donationDetails?.data;
      const donorName = d?.donorDisplayName || "Anonymous";
      const amount = `${getCurrencySymbol(d?.currency)} ${(d?.amountCents ?? 0) / 100}`;
      const reference = d?.paymentReference || "N/A";

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      // ── Header ──────────────────────────────────────────────────────
      pdf.setFillColor(18, 170, 91); // #12AA5B green
      pdf.rect(0, 0, pageWidth, 40, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont("helvetica", "bold");
      pdf.text("Donation Details", margin, 26);

      // ── Subheader ────────────────────────────────────────────────────
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, 52);

      // ── Divider ──────────────────────────────────────────────────────
      pdf.setDrawColor(223, 225, 231);
      pdf.line(margin, 58, pageWidth - margin, 58);

      // ── Rows ─────────────────────────────────────────────────────────
      const rows = [
        { label: "Donor Name", value: donorName },
        { label: "Amount", value: amount },
        { label: "Date", value: date },
        { label: "Time", value: time },
        { label: "Reference", value: reference },
        { label: "Status", value: "Completed" },
      ];

      let y = 70;
      rows.forEach((row, i) => {
        // Alternating row bg
        if (i % 2 === 0) {
          pdf.setFillColor(248, 248, 248);
          pdf.rect(margin, y - 6, contentWidth, 14, "F");
        }

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(112, 114, 129);
        pdf.text(row.label, margin + 4, y + 2);

        pdf.setFont("helvetica", "bold");
        if (row.label === "Status") {
          pdf.setTextColor(51, 157, 136); // green for Completed
        } else {
          pdf.setTextColor(11, 13, 12);
        }
        pdf.text(row.value, pageWidth - margin - 4, y + 2, { align: "right" });

        // Row bottom border
        pdf.setDrawColor(223, 225, 231);
        pdf.line(margin, y + 8, pageWidth - margin, y + 8);

        y += 18;
      });

      // ── Footer ───────────────────────────────────────────────────────
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(160, 160, 160);
      pdf.text(
        "This donation is part of your community’s impact. Use this insight to deepen engagement and grow support.",
        margin,
        y + 16
      );

      const filename = `receipt-${reference}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating receipt:", error);
      alert("Failed to generate receipt. Please try again.");
    } finally {
      button.disabled = false;
      button.textContent = "Download receipt";
    }
  };

  if (isFetchingDetails) {
    return (
      <div className="min-h-screen">
        <p className="py-11 text-xl">Payment detail</p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-[8px] border bg-white p-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-5 w-60" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="space-y-4 rounded-[8px] border bg-white p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
            <div className="flex items-center justify-between pt-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <p className="py-11 text-xl leading-[135%] text-[#0D0D12]">Payment detail</p>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Card */}
        <div className="rounded-[8px] border border-[#DFE1E7] bg-white px-4.75 py-5.5">
          <div className="border-b border-gray-100 px-5">
            <div className="mb-5 flex items-center gap-3">
              {donationDetails?.data?.community?.imageUrl ? (
                <img
                  src={donationDetails?.data?.community?.imageUrl}
                  className="h-10 w-10 rounded-full bg-cover bg-center"
                  alt={donationDetails?.data?.community?.name || "Community"}
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <GlobeIcon className="h-5 w-5 text-blue-600" />
                </div>
              )}
              <span className="text-lg font-medium text-[#44536E]">
                {donationDetails?.data?.community?.name || "Community Name"}
              </span>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#DFE1E7] p-5">
            <div className="mb-5 h-26.5 w-full overflow-hidden rounded-[8px] bg-gray-200">
              {donationDetails?.data?.campaign?.imageUrl ? (
                <img
                  src={donationDetails?.data?.campaign?.imageUrl}
                  alt={donationDetails?.data?.campaign?.name || "Campaign"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-300">
                  <GlobeIcon className="h-8 w-8 text-gray-500" />
                </div>
              )}
            </div>
            <div>
              <h2 className="mb-5 text-lg leading-[130%] font-medium text-[#0D0D12]">
                {donationDetails?.data?.campaign?.name || "Campaign Name"}
              </h2>
              <p className="text-sm leading-[150%] text-[#666D80]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard
              </p>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="rounded-[8px] border border-[#DFE1E7] bg-white px-4.75 py-10.5">
          <div ref={receiptRef} className="mb-6 space-y-4 rounded-[8px] bg-[#F8F8F8]">
            <div className="flex items-center justify-between border-b border-[#DFE1E7] px-5 py-2.5">
              <span className="text-sm font-medium text-[#707281]">Donor Name</span>
              <span className="text-sm font-medium text-[#0B0D0C]">
                {donationDetails?.data?.donorDisplayName || "Anonymous"}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[#DFE1E7] px-5 py-2.5">
              <span className="text-sm font-medium text-[#707281]">Amount</span>
              <span className="text-sm font-medium text-[#0B0D0C]">
                {getCurrencySymbol(donationDetails?.data?.currency)}
                {""}
                {(donationDetails?.data?.amountCents ?? 0) / 100}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[#DFE1E7] px-5 py-2.5">
              <span className="text-sm font-medium text-[#707281]">Date</span>
              <span className="text-sm font-medium text-[#0B0D0C]">{date}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#DFE1E7] px-5 py-2.5">
              <span className="text-sm font-medium text-[#707281]">Time</span>
              <span className="text-sm font-medium text-[#0B0D0C]">{time}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-2.5">
              <span className="text-sm font-medium text-[#707281]">Reference</span>
              <span className="line-clamp-1 max-w-[200px] text-right text-sm font-medium text-[#0B0D0C]">
                {donationDetails?.data?.paymentReference || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="ml-5 flex items-center gap-10.5">
              <p className="text-sm text-[#666D80]">Status</p>
              <span className="inline-flex items-center rounded-full bg-[#EAFFFB] px-3 py-1 text-sm font-medium text-[#339D88]">
                Completed
              </span>
            </div>
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="flex items-center gap-2 border border-[#DFE1E7] text-sm text-[#0D0D12]"
            >
              Download receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

export default DonationDetailPage;
