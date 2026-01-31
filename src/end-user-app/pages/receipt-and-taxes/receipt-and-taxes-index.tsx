import { Button } from "@/components/ui/button";
import { useUserAppBreadcrumb } from "@/components/user-app-breadcrumb";
import { CaretDown, CaretRightIcon } from "@phosphor-icons/react";
import { useState } from "react";

const ReceiptAndTaxesIndex = () => {
  const [activeTab, setActiveTab] = useState<"receipts" | "faq">("receipts");

  // Mock year logic
  const [year] = useState("2023");

  const receipts = [
    {
      id: 1,
      organization: "Toronto Housing Coalition",
      receiptNo: "CC-2004-534564",
      amount: 500,
      date: "January 28th 2025",
    },
    {
      id: 2,
      organization: "Women Empowerment",
      receiptNo: "CC-2004-534564",
      amount: 500,
      date: "January 28th 2025",
    },
  ];

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
        <Button
          variant="outline"
          className="h-10 gap-2 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] text-[#818898]"
        >
          Sort Latest <CaretDown size={14} />
        </Button>
      </div>

      <div className="space-y-4 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] p-4">
        {/* Filters */}
        <div className="flex items-center gap-4 rounded-[10px] border border-[#ECEFF3] bg-white px-4 py-3.5">
          <Button variant="outline" className="gap-2 border-gray-200 bg-gray-50/50 text-gray-600">
            Year {year} <CaretDown size={14} />
          </Button>
          <Button variant="outline" className="gap-2 border-gray-200 bg-gray-50/50 text-gray-600">
            Newest
          </Button>
        </div>

        {/* Receipts List */}
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="flex flex-col justify-between gap-6 rounded-[10px] border border-[#ECEFF3] bg-white px-4 py-7 md:flex-row md:items-center"
            >
              <div className="space-y-3">
                <h3 className="text-2xl leading-[150%] tracking-[0%] text-[#000000]">
                  {receipt.organization}
                </h3>
                <div className="space-y-1 text-base leading-[150%] tracking-[0%] text-[#6B6B6B]">
                  <p>Receipt #: {receipt.receiptNo}</p>
                  <p>Amount: ${receipt.amount}</p>
                  <p>{receipt.date}</p>
                </div>
              </div>
              <Button className="h-12 min-w-54.25 rounded-full bg-[#DCFFE3] px-7.5 py-4 text-base leading-[150%] font-medium tracking-[0%] text-[#02B128] hover:bg-[#d0fbe4]">
                Generate Receipt <CaretRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceiptAndTaxesIndex;
