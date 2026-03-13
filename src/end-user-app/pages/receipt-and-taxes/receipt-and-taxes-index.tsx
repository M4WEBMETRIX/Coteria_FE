import { Button } from "@/components/ui/button";
import { useUserAppBreadcrumb } from "@/components/user-app-breadcrumb";
import { CaretRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import ReceiptModal from "@/components/receipts/receipt-modal";
import { FaqTab } from "@/pages/dashboard/components/help-support/faq-tab";
import { useGetUserDonations } from "@/services/generics/user-generics/user-hooks";
import { formatFullDate, getCurrencySymbol } from "@/lib/utils";

const ReceiptAndTaxesIndex = () => {
  const [activeTab, setActiveTab] = useState<"receipts" | "faq">("receipts");

  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  // Mock year logic
  // const [year] = useState("2023");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetUserDonations();
  console.log("donations", data);

  const receipts = data?.data?.items;

  // const receipts = [
  //   {
  //     id: 1,
  //     organization: "Atlantic Salmon Museum",
  //     receiptNo: "CC-2026-04512",
  //     amount: "500.00",
  //     date: "January 30, 2026",
  //   },
  //   {
  //     id: 2,
  //     organization: "Atlantic Salmon Museum",
  //     receiptNo: "CC-2026-04512",
  //     amount: "500.00",
  //     date: "January 30, 2026",
  //   },
  // ];

  useUserAppBreadcrumb({
    items: [{ label: "Receipts & Taxes", href: "/user/receipt-taxes", isCurrentPage: true }],
  });

  return (
    <div className="mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("receipts")}
            className={`cursor-pointer rounded-[10px] border px-4 py-2.5 text-sm font-normal transition-colors ${activeTab === "receipts" ? "border-[#F6F6F6] bg-[#DCFFE3] text-[#02B128]" : "border-[#F6F6F6] bg-[#FCFCFC] text-[#818898] hover:bg-gray-200"}`}
          >
            Receipts
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`cursor-pointer rounded-[10px] border px-4 py-2.5 text-sm font-normal transition-colors ${activeTab === "faq" ? "border-[#F6F6F6] bg-[#DCFFE3] text-[#02B128]" : "border-[#F6F6F6] bg-[#FCFCFC] text-[#818898] hover:bg-gray-200"}`}
          >
            FAQ
          </button>
        </div>
        {/* <Button
          variant="outline"
          className="h-10 gap-2 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] text-[#818898]"
        >
          Sort Latest <CaretDown size={14} />
        </Button> */}
      </div>

      {activeTab === "receipts" && (
        <div className="space-y-4 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] p-4">
          {/* Filters */}
          {/* <div className="flex items-center gap-4 rounded-[10px] border border-[#ECEFF3] bg-white px-4 py-3.5">
            <Button variant="outline" className="gap-2 border-gray-200 bg-gray-50/50 text-gray-600">
              Year {year} <CaretDown size={14} />
            </Button>
            <Button variant="outline" className="gap-2 border-gray-200 bg-gray-50/50 text-gray-600">
              Newest
            </Button>
          </div> */}

          {/* Receipts List */}
          <div className="space-y-4">
            {isLoading ? (
              // Skeleton loading state
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="flex flex-col justify-between gap-6 rounded-[10px] border border-[#ECEFF3] bg-white px-4 py-7 md:flex-row md:items-center"
                >
                  <div className="space-y-3">
                    <div className="h-8 w-64 animate-pulse rounded-md bg-gray-200"></div>
                    <div className="space-y-2">
                      <div className="h-5 w-48 animate-pulse rounded-md bg-gray-200"></div>
                      <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200"></div>
                      <div className="h-5 w-40 animate-pulse rounded-md bg-gray-200"></div>
                    </div>
                  </div>
                  <div className="h-12 w-54.25 animate-pulse rounded-full bg-gray-200"></div>
                </div>
              ))
            ) : receipts?.length > 0 ? (
              receipts.map((receipt: any) => (
                <div
                  key={receipt?.id}
                  className="flex flex-col justify-between gap-6 rounded-[10px] border border-[#ECEFF3] bg-white px-4 py-7 md:flex-row md:items-center"
                >
                  <div className="space-y-3">
                    <h3 className="text-2xl leading-[150%] tracking-[0%] text-[#000000]">
                      {receipt?.campaignName}
                    </h3>
                    <div className="space-y-1 text-base leading-[150%] tracking-[0%] text-[#6B6B6B]">
                      <p>Receipt #: {receipt?.paymentReference}</p>
                      <p>
                        Amount: {getCurrencySymbol(receipt?.currency)}
                        {receipt?.amountCents / 100}
                      </p>
                      <p>{formatFullDate(receipt?.createdAt)}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedReceipt(receipt);
                      setIsModalOpen(true);
                    }}
                    className="h-12 min-w-54.25 rounded-full bg-[#DCFFE3] px-7.5 py-4 text-base leading-[150%] font-medium tracking-[0%] text-[#02B128] hover:bg-[#d0fbe4]"
                  >
                    Generate Receipt <CaretRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-500">No receipts found.</div>
            )}
          </div>
        </div>
      )}
      {activeTab === "faq" && <FaqTab isUser={true} />}

      <ReceiptModal
        id={selectedReceipt?.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ReceiptAndTaxesIndex;
