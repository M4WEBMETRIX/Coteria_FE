import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logout01Icon } from "hugeicons-react";

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LogoutModal = ({ open, onOpenChange }: LogoutModalProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens/session data here if needed
    // localStorage.removeItem("authToken");
    // sessionStorage.clear();

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
        className="font-ubuntu h-fit max-h-[315px] w-full max-w-[450px] gap-0 overflow-hidden rounded-2xl border-0 bg-white p-8 shadow-xl"
      >
        <div className="flex flex-col items-center pb-6">
          {/* Icon Container */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            {/* Outer pink glow ring */}
            <div className="absolute inset-0 rounded-full bg-linear-to-b from-[#FFF0F3] to-[#FFE4EA] opacity-60" />
            {/* Middle ring */}
            <div className="absolute inset-2 rounded-full bg-linear-to-b from-[#FFF5F7] to-[#FFE8ED]" />
            {/* Inner white circle with icon */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <Logout01Icon className="h-6 w-6 text-[#DF1C41]" />
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="text-[] mb-2 text-xl leading-[130%] font-medium tracking-[2%]">
            Logout
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="text-center text-sm leading-[150%] font-normal tracking-[2%] text-[#666D80]">
            Are you sure want to Logout to Coterie?
          </DialogDescription>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 bg-white">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 rounded-lg border-[#E1E4EA] py-2.5 text-sm font-medium text-[#0A0A0C] hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            className="flex-1 rounded-lg bg-[#DF1C41] py-2.5 text-sm font-medium text-white hover:bg-[#C91839]"
          >
            Yes, Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
