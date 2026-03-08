import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CaretRightIcon } from "@phosphor-icons/react";
import { useGetDonationById } from "@/services/generics/user-generics/user-hooks";
import { formatFullDate, getCurrencySymbol } from "@/lib/utils";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const ReceiptModal = ({ isOpen, onClose, id }: ReceiptModalProps) => {
  const { data, isLoading } = useGetDonationById(id);
  const receiptSpecificData = data?.data;
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!receiptRef.current || !receiptSpecificData) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();

      // We need to get the image dimensions to scale it properly in the PDF
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdfHeight = (img.height * pdfWidth) / img.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt_${receiptSpecificData.receiptNumber || "Donation"}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="no-scrollbar max-h-[95vh] gap-0 overflow-hidden overflow-y-auto bg-white p-0 md:max-w-[854px]"
      >
        <DialogHeader className="hidden">
          <DialogTitle>Receipt</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          // SKELETON LOADER
          <div className="space-y-6 p-8">
            <div className="flex items-start justify-between">
              <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="flex justify-between text-xs">
              <div className="space-y-2">
                <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="space-y-2 text-right">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            <div className="h-px w-full bg-gray-200" />

            <div className="flex flex-col items-center space-y-2">
              <div className="h-8 w-60 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-96 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="h-px w-full bg-gray-200" />

            {/* Donor Skeleton Info */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-24 animate-pulse justify-self-end rounded bg-gray-200" />
                <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-32 animate-pulse justify-self-end rounded bg-gray-200" />
              </div>
            </div>

            <div className="h-32 w-full animate-pulse rounded bg-gray-200" />

            <div className="h-px w-full bg-gray-200" />

            <div className="space-y-3">
              <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
              <div className="mx-auto h-8 w-80 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ) : (
          // ACTUAL RECEIPT CONTENT
          <div className="space-y-6 p-8" ref={receiptRef}>
            {/* Header / Logo */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <img
                  src={receiptSpecificData?.organizationImageUrl}
                  alt="Organization Logo"
                  className="mb-2 h-10 w-85.75 object-cover object-center"
                />
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              {receiptSpecificData?.organizationAddress ? (
                <div className="space-y-1">
                  <p>{receiptSpecificData?.organizationAddress?.line1}</p>
                  <p>
                    Charity Registration:{" "}
                    {receiptSpecificData?.organizationRegistrationNumber || "XXXX-010X-1234"}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p>Address not available</p>
                  <p>
                    Charity Registration:{" "}
                    {receiptSpecificData?.organizationRegistrationNumber || "XXXX-010X-1234"}
                  </p>
                </div>
              )}
              <div className="space-y-1 text-right">
                <p>Receipt #: {receiptSpecificData?.receiptNumber}</p>
                <p>
                  Issued:{" "}
                  {receiptSpecificData?.donationDate
                    ? formatFullDate(receiptSpecificData?.donationDate)
                    : ""}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200" />

            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-medium text-black">Charitable Tax Receipt</h2>
              <p className="text-sm text-gray-500">
                This receipt acknowledges your generous donation to{" "}
                {receiptSpecificData?.organizationName}, a registered charitable organization.
              </p>
            </div>

            <div className="h-px w-full bg-gray-200" />

            {/* Donor Info */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Donor</h3>
                <h3 className="text-lg font-bold">
                  {getCurrencySymbol(receiptSpecificData?.currency)}
                  {receiptSpecificData?.amountCents / 100}
                </h3>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                <div className="font-medium text-[#1E1F24]">
                  {receiptSpecificData?.donorFullName}
                </div>
                <div className="text-right text-gray-500">
                  {formatFullDate(receiptSpecificData?.donationDate)}
                </div>

                {receiptSpecificData?.donorAddress ? (
                  <div className="text-[#1E1F24]">
                    {receiptSpecificData?.donorAddress}
                    <br />
                    {receiptSpecificData?.donorCity}, {receiptSpecificData?.donorProvince}{" "}
                    {receiptSpecificData?.donorPostalCode}
                  </div>
                ) : (
                  <div className="text-[#1E1F24]">Address not available</div>
                )}
                <div className="text-right font-medium text-[#1E1F24]"> Visa ending in 3542</div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg bg-[#F8FAFB]">
              <div className="grid grid-cols-3 border-b border-gray-100 p-3 text-sm text-gray-500">
                <div className="col-span-1">Campaign</div>
                <div className="col-span-1 text-center">Donation Date</div>
                <div className="col-span-1 text-right">Amount</div>
              </div>
              <div className="grid grid-cols-3 border-b border-gray-100 bg-white p-3 text-sm">
                <div className="col-span-1 font-medium text-[#1E1F24]">
                  {receiptSpecificData?.campaignName}
                </div>
                <div className="col-span-1 text-center text-[#1E1F24]">
                  {formatFullDate(receiptSpecificData?.donationDate)}
                </div>
                <div className="col-span-1 text-right text-gray-500">
                  <span className="font-medium text-[#1E1F24]">
                    {receiptSpecificData?.amountCents / 100}
                  </span>{" "}
                  {receiptSpecificData?.currency}
                </div>
              </div>
              <div className="grid grid-cols-3 bg-white p-3 text-sm">
                <div className="col-span-1 font-medium text-[#1E1F24]">Total Donation</div>
                <div className="col-span-1"></div>
                <div className="col-span-1 text-right text-gray-500">
                  <span className="font-medium text-[#1E1F24]">
                    {receiptSpecificData?.amountCents / 100}
                  </span>{" "}
                  {receiptSpecificData?.currency}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200" />

            {/* Footer Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#1E1F24]">Campaign Information:</h3>
                <p className="mt-1 text-gray-600">{receiptSpecificData?.campaignName}</p>
                <p className="mt-1 font-medium text-gray-600">
                  {formatFullDate(receiptSpecificData?.donationDate)}
                </p>
              </div>

              <p className="mx-auto max-w-[400px] text-center text-xs leading-relaxed text-gray-500">
                No goods or services were provided in exchange for this donation.{" "}
                {receiptSpecificData?.organizationName} is an eligible Canadian Charity. Keep this
                receipt for your tax records.
              </p>
            </div>
          </div>
        )}

        {/* Footer Button - Outside the actual receipt content to prevent it from being in the PDF */}
        <div className="border-t border-gray-100 bg-[#F8FAFB] p-4 text-center">
          <p className="mb-4 text-xs text-gray-500">
            If you have any questions about this receipt, please contact us at{" "}
            <span className="text-[#12AA5B]">donations@coterie.org</span>
          </p>
          <Button
            onClick={handleDownload}
            disabled={isDownloading || isLoading}
            className="w-[200px] rounded-full bg-[#12AA5B] text-white hover:bg-[#0da055]"
          >
            {isDownloading ? "Downloading..." : "Download Receipt"}
            {!isDownloading && <CaretRightIcon className="ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
