import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
// import { AlertTriangle } from "lucide-react";

interface DeleteAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDonor?: boolean;
}

const DeleteAccountModal = ({ open, onOpenChange, isDonor }: DeleteAccountModalProps) => {
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

  const [reasons, setReasons] = useState<string[]>([]);

  const ORGSREASONS = [
    { id: "not_actively_donating", label: "I’m not actively donating / fundraising right now" },
    { id: "not_useful", label: "I didn’t find it useful" },
    { id: "difficult_to_use", label: "It was difficult to use" },
    { id: "using_another_platform", label: "I’m using another platform" },
    { id: "privacy_security", label: "I’m concerned about privacy or security" },
    { id: "others", label: "Others" },
  ];

  const DONORREASONS = [
    { id: "not_donating_right_now", label: "I’m not donating right now" },
    { id: "not_use_often", label: "I don’t use the platform often" },
    { id: "prefer_other_ways", label: "I prefer other ways to give" },
    { id: "had_trouble", label: "I had trouble using the platform" },
    { id: "too_many_emails", label: "I receive too many emails or notifications" },
    { id: "privacy_security", label: "I’m concerned about privacy or security" },
    { id: "created_by_mistake", label: "I created this account by mistake" },
    { id: "others", label: "Others" },
  ];

  const REASONS = isDonor ? DONORREASONS : ORGSREASONS;
  const SUBTEXT = isDonor
    ? "Why are you leaving Coterie?"
    : "Before you go, help us understand: Why are you leaving Coterie?";

  const handleReasonChange = (reason: string) => {
    if (reasons.includes(reason)) {
      setReasons(reasons.filter((r) => r !== reason));
    } else {
      setReasons([...reasons, reason]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="font-inter w-full max-w-[714px] gap-0 overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-xl lg:min-w-[714px]"
      >
        <div className="flex flex-col items-center px-8 pt-8 pb-6">
          {/* Icon Container */}
          <svg
            width="134"
            height="95"
            viewBox="0 0 134 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="133"
              height="94"
              rx="47"
              fill="url(#paint0_linear_2732_34245)"
            />
            <rect
              x="0.5"
              y="0.5"
              width="133"
              height="94"
              rx="47"
              stroke="url(#paint1_linear_2732_34245)"
            />
            <path
              d="M40 45.5C40 45.5 47.6276 47.1863 52 45.5C55.7558 44.0515 60 39 60 39"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M77.4415 40.1519C77.4415 40.1519 81.3206 45.7212 85.1066 47.2191C88.3587 48.5058 94.0447 47.7786 94.0447 47.7786"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M60 78L63.7953 74.6264C64.191 74.2747 64.7923 74.2923 65.1667 74.6667L68.7929 78.2929C69.1834 78.6834 69.8166 78.6834 70.2071 78.2929L73.7442 74.7558C74.1532 74.3468 74.8229 74.3691 75.2039 74.8044L78 78"
              stroke="#4A1347"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="58.5" cy="60.5" r="10.5" fill="white" />
            <circle cx="82.5" cy="60.5" r="10.5" fill="white" />
            <circle cx="58.5" cy="59.5" r="4.5" fill="#4A134A" />
            <circle cx="82.5" cy="59.5" r="4.5" fill="#4A134A" />
            <defs>
              <linearGradient
                id="paint0_linear_2732_34245"
                x1="67"
                y1="0"
                x2="67"
                y2="95"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FFF0F3" stop-opacity="0.48" />
                <stop offset="1" stop-color="#FFF0F3" stop-opacity="0" />
                <stop offset="1" stop-color="#FFF0F3" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2732_34245"
                x1="67"
                y1="0"
                x2="67"
                y2="95"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FFF0F3" />
                <stop offset="0.765625" stop-color="#FFF0F3" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Title */}
          <DialogTitle className="mb-2 text-2xl font-semibold text-[#0D0D12]">
            We're sad to see you go.!
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="text-center text-sm text-[#666D80]">
            {SUBTEXT}
          </DialogDescription>

          <div className="mt-8 w-full space-y-1 rounded-[8px] border border-[#BEDBFF] bg-[#EFF6FF] p-4">
            {REASONS.map((reason) => (
              <>
                <div key={reason.id} className="flex items-center gap-1.5">
                  <Checkbox
                    checked={reasons.includes(reason.id)}
                    onCheckedChange={() => handleReasonChange(reason.id)}
                    className="border-[#193CB8]"
                  />
                  <p className="text-sm leading-[155%] !font-normal tracking-[0%] text-[#193CB8]">
                    {reason.label}
                  </p>
                </div>
              </>
            ))}
            {reasons.includes("others") && (
              <div className="flex flex-col items-center gap-1.5">
                <Textarea placeholder="Please provide a reason" className="border-[#193CB8]" />
              </div>
            )}
          </div>
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
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
