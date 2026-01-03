import { Button } from "@/components/ui/button";
import {
  Megaphone01Icon,
  Search01Icon,
  PromotionIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const OnboardingItem = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
}: {
  icon: any;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl p-4 md:flex-row md:items-center">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-[#F7FEE7] p-3">
          <HugeiconsIcon icon={icon} size={18} color="#84CC16" />
        </div>
        <div>
          <h4 className="mb-1 text-lg leading-[140%] font-medium text-[#1E1F24]">{title}</h4>
          <p className="text-sm leading-[15px] font-normal tracking-[-0.28px] text-[#52525B]">
            {description}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        className="h-10 w-full shrink-0 gap-2 rounded-lg border-[#E0E1E6] bg-white px-4 py-[14.5px] text-sm leading-[100%] font-semibold text-[#09090B] hover:bg-gray-50 md:w-auto"
        onClick={onClick}
      >
        {buttonText}
        <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} color="#0A0A0A" />
      </Button>
    </div>
  );
};

const CampaignOnboardingWidget = () => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#8B5CF6] bg-[#F5F3FF] p-1 md:p-1.5">
      <div className="flex w-full flex-col gap-1 overflow-hidden rounded-xl">
        <OnboardingItem
          icon={Megaphone01Icon}
          title="Launch Awareness"
          description="Share your campaign to start visibility and early momentum."
          buttonText="Launch Awareness"
        />

        <OnboardingItem
          icon={Search01Icon}
          title="Find Amplifiers"
          description="Identify supporters and influencers likely to help you reach a wider audience."
          buttonText="Find influencers"
        />

        <OnboardingItem
          icon={PromotionIcon}
          title="Make It Stick"
          description="Send an early update to keep supporters engaged after they participate."
          buttonText="Send first update"
        />
      </div>
    </div>
  );
};

export default CampaignOnboardingWidget;
