import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CaretRightIcon } from "@phosphor-icons/react";
import AtlanticSalmonMuseum from "@/assets/images/atlantic-salmon.png";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any; // We can type this strictly if needed later
}

const ReceiptModal = ({ isOpen, onClose }: ReceiptModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="no-scrollbar max-h-[95vh] gap-0 overflow-hidden overflow-y-auto bg-white p-0 md:max-w-[854px]"
      >
        <DialogHeader className="hidden">
          <DialogTitle>Receipt</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-8">
          {/* Header / Logo */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div
                className="mb-2 h-10 w-85.75 bg-contain bg-left bg-no-repeat"
                style={{
                  backgroundImage: `url(${AtlanticSalmonMuseum})`,
                }}
              />
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <div className="space-y-1">
              <p>263 Main St, Doaktown, NB E9C 1A9</p>
              <p>Charity Registration: 12345 6789 RR001</p>
            </div>
            <div className="space-y-1 text-right">
              <p>Receipt #: CC-2026-04512</p>
              <p>Issued: January 30, 2026</p>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200" />

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-medium text-black">Charitable Tax Receipt</h2>
            <p className="text-sm text-gray-500">
              This receipt acknowledges your generous donation to Coterie Community Foundation, a
              registered charitable organization.
            </p>
          </div>

          <div className="h-px w-full bg-gray-200" />

          {/* Donor Info */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Donor</h3>
              <h3 className="text-lg font-bold">$500.00</h3>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium text-[#1E1F24]">John Smith</div>
              <div className="text-right text-gray-500">January 30, 2026</div>

              <div className="text-[#1E1F24]">
                55 Magazine St
                <br />
                Saint John, NB E2K 2S5
              </div>
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
              <div className="col-span-1 font-medium text-[#1E1F24]">Green Roof Initiative</div>
              <div className="col-span-1 text-center text-[#1E1F24]">January 30, 2026</div>
              <div className="col-span-1 text-right text-gray-500">
                <span className="font-medium text-[#1E1F24]">$500.00</span> CAD
              </div>
            </div>
            <div className="grid grid-cols-3 bg-white p-3 text-sm">
              <div className="col-span-1 font-medium text-[#1E1F24]">Total Donation</div>
              <div className="col-span-1"></div>
              <div className="col-span-1 text-right text-gray-500">
                <span className="font-medium text-[#1E1F24]">$500.00</span> CAD
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200" />

          {/* Footer Info */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-[#1E1F24]">Campaign Information:</h3>
              <p className="mt-1 text-gray-600">John Keith-King Collection</p>
              <p className="mt-1 font-medium text-gray-600">January 30, 2026</p>
            </div>

            <p className="mx-auto max-w-[400px] text-center text-xs leading-relaxed text-gray-500">
              No goods or services were provided in exchange for this donation. Coterie Community
              Foundation is an eligible Canadian Charity. Keep this receipt for your tax records.
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="border-t border-gray-100 bg-[#F8FAFB] p-4 text-center">
          <p className="mb-4 text-xs text-gray-500">
            If you have any questions about this receipt, please contact us at{" "}
            <span className="text-[#12AA5B]">donations@coterie.org</span>
          </p>
          <Button className="w-[200px] rounded-full bg-[#12AA5B] text-white hover:bg-[#0da055]">
            Download Receipt <CaretRightIcon className="ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
