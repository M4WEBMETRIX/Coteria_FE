import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteAccountModal = ({ open, onOpenChange }: DeleteAccountModalProps) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    // Handle account deletion logic here
    // Clear auth tokens, session data, etc.
    onOpenChange(false);
    navigate("/auth/login");
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="font-ubuntu w-full max-w-[450px] gap-0 overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-xl"
      >
        <div className="flex flex-col items-center px-8 pt-8 pb-6">
          {/* Icon Container */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            {/* Outer pink glow ring */}
            <div className="absolute inset-0 rounded-full bg-linear-to-b from-[#FFF0F3] to-[#FFE4EA] opacity-60" />
            {/* Middle ring */}
            <div className="absolute inset-2 rounded-full bg-linear-to-b from-[#FFF5F7] to-[#FFE8ED]" />
            {/* Inner white circle with icon */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <AlertTriangle className="h-6 w-6 text-[#DF1C41]" />
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="mb-2 text-2xl font-semibold text-[#0D0D12]">
            Delete Account
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="text-center text-sm text-[#666D80]">
            Donors will no longer be able to donate or engage with this campaign.
          </DialogDescription>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 bg-white px-8 py-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 rounded-lg border-[#E1E4EA] py-2.5 text-sm font-medium text-[#0A0A0C] hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="flex-1 rounded-lg bg-[#DF1C41] py-2.5 text-sm font-medium text-white hover:bg-[#C91839]"
          >
            Yes, I accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
