import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import STRIPE_LOGO from "@/assets/icons/stripe_logo.svg";
import { useConnectStripe } from "@/services/auth";
import { getBaseUrl } from "@/lib/utils";

export function StripeOnboardingModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { mutate: connectStripeMutate, isPending } = useConnectStripe();

  const handleConnectStripe = () => {
    connectStripeMutate({
      returnUrl: `${getBaseUrl()}/community`,
      refreshUrl: `${getBaseUrl()}/community`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-none p-0 shadow-2xl sm:max-w-[600px]">
        {/* Header Branding Section */}
        <div className="flex items-center justify-center px-6 pt-6">
          {/* Custom Stripe SVG Logo */}
          <img src={STRIPE_LOGO} className="w-21.25 bg-cover" alt="stripe-logo" />
        </div>
        <div className="px-6 pb-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-center text-xl font-bold text-slate-900">
              Set up your donation payouts
            </DialogTitle>
            <DialogDescription className="mt-2 text-center text-sm text-slate-500">
              Connect your organization to Stripe to start accepting campaign donations and receive
              funds directly to your bank account.
            </DialogDescription>
          </DialogHeader>
          {/* Value Props */}

          <DialogFooter className="mt-8 flex flex-col gap-2 sm:flex-col">
            <Button
              className="text-md group w-full rounded-lg bg-[#12AA5B] py-6 font-semibold text-white shadow-md transition-all hover:bg-[#12AA5B]"
              onClick={handleConnectStripe}
            >
              {isPending ? "Initializing..." : "Finish Setup Now"}

              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="ghost"
              className="h-11 w-full text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              onClick={() => onOpenChange(false)}
            >
              Skip for later
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
