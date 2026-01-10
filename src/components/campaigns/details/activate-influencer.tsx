import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  PaperPlaneTilt,
  X,
  CaretRight,
  Sparkle,
  WarningCircleIcon,
  ShareFatIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { InfluencerCard, type Influencer } from "./influencer-card";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

const INFLUENCERS_DATA: Influencer[] = [
  {
    id: 1,
    name: "Title Name",
    avatar: "https://i.pravatar.cc/150?u=1",
    confidenceLabel: "High-Confidence influencer",
    responsiveness: "High",
    sharingBehavior: "Active",
    engagement: 3,
    participationDepth: "4 Campaigns",
    matchPercentage: 85,
  },
  {
    id: 2,
    name: "Title Name",
    avatar: "https://i.pravatar.cc/150?u=2",
    confidenceLabel: "High-Confidence influencer",
    responsiveness: "High",
    sharingBehavior: "Active",
    engagement: 3,
    participationDepth: "4 Campaigns",
    matchPercentage: 85,
  },
  {
    id: 3,
    name: "Title Name",
    avatar: "https://i.pravatar.cc/150?u=3",
    confidenceLabel: "High-Confidence influencer",
    responsiveness: "High",
    sharingBehavior: "Active",
    engagement: 3,
    participationDepth: "4 Campaigns",
    matchPercentage: 85,
  },
];

const ActivateInfluencer = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <section className="flex gap-6">
      <main className="w-full flex-1">
        {" "}
        {/* Header Section */}
        <div className="flex flex-col justify-start gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h2 className="text-[22px] font-medium text-[#4A4C54]">Activate Influencers</h2>
            <p className="text-xs font-normal text-[#9B9BA6]">
              Identify and activate supporters who can meaningfully amplify your campaign.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="w-fit gap-2 px-[6.5px] text-[10px] text-[#666D80]">
              <MagnifyingGlassIcon size={14} />
              Search
            </Button>
            <Button variant="outline" className="w-fit gap-2 px-[6.5px] text-[10px] text-[#666D80]">
              <ShareFatIcon size={14} />
              Share Campaign
            </Button>
            <Button variant="outline" className="w-fit gap-2 px-[6.5px] text-[10px] text-[#666D80]">
              <PaperPlaneTilt size={14} />
              Send Application Invite
            </Button>
          </div>
        </div>
        {/* Alert Banner */}
        {showAlert && (
          <div className="my-8 flex items-center justify-between rounded-lg border border-[#FFBE4C] bg-[#FFF6E0] px-[14px] py-[9.5px] text-[#B54708]">
            <div className="flex items-center gap-2">
              <WarningCircleIcon size={20} weight="fill" className="" color="#FFBE4C" />
              <span className="fotn-normal text-sm font-medium text-[#0D0D12]">
                Champions are supporters whose actions consistently lead to new participation.
              </span>
            </div>
            <button onClick={() => setShowAlert(false)} className="">
              <X size={24} color="#666D80" />
            </button>
          </div>
        )}
        {/* Content Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-[#4A4C54]">List of Influencers</h3>
            <div className="flex cursor-pointer items-center gap-1 text-sm text-[10px] font-medium text-[#9B9BA6] text-[#667085]">
              See More <CaretRight size={16} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {INFLUENCERS_DATA.map((influencer) => (
              <InfluencerCard key={influencer.id} user={influencer} />
            ))}
          </div>
        </div>
      </main>
      <aside className="flex w-[256px] flex-col gap-4">
        {/* Recommended Today */}
        <div className="rounded-xl border border-[#DFE1E7] bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#4A4C5q4]">Recommended Today</h3>
            <CaretRight size={16} className="text-[#98A2B3]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#12AA5B]" />
              <p className="text-[10px] text-[#4A4C54]">Activate 2 high-confidence champions</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D5FEF3CC]">
                <CheckIcon size={10} weight="bold" className="text-[#12B76A]" />
              </div>
              <p className="text-[10px] text-[#838880]">
                Champions typically responds within 24hours.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D5FEF3CC]">
                <CheckIcon size={10} weight="bold" className="text-[#12B76A]" />
              </div>
              <p className="text-[10px] text-[#838880]">
                Early activators sustains momentum during growth phase.
              </p>
            </div>
          </div>
        </div>

        {/* Request from Participants */}
        <div className="rounded-xl border border-[#DFE1E7] bg-[#F7FFE1] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#4A4C5q4]">Request from Participants</h3>
            <CaretRight size={16} className="text-[#98A2B3]" />
          </div>
          <Separator className="my-2.5" />
          <p className="mb-4 text-[10px] leading-relaxed text-[#838880]">
            100+ participants in "Housing Support Drive" request for a new campaign
          </p>
          <Button className="w-full bg-[#12B76A] text-sm hover:bg-[#039855]">
            Share our campaign
          </Button>
        </div>

        {/* Activity Feed */}
        <div className="rounded-xl border border-[#DFE1E7] bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#4A4C5q4]">Activity Feed</h3>
            <CaretRight size={16} className="text-[#98A2B3]" />
          </div>{" "}
          <Separator className="my-2.5" />
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <span className="text-[10px] font-normal text-[#4A4C54]">Sarah M</span>{" "}
                <span className="text-[7px] text-[#C5C5C5]">shared campaign</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=michelle" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <span className="text-[10px] font-normal text-[#4A4C54]">Michelle R</span>{" "}
                <span className="text-[7px] text-[#C5C5C5]">pinned campaign</span>
              </div>
            </div>
            <Separator className="my-2.5" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=rebecca" />
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <span className="text-[10px] font-normal text-[#4A4C54]">Rebecca A</span>{" "}
                  <span className="text-[7px] text-[#C5C5C5]">sent an application invite</span>
                </div>
              </div>
              <div className="flex gap-0.5">
                <div className="h-0.5 w-0.5 rounded-full bg-[#C5C5C5]" />
                <div className="h-0.5 w-0.5 rounded-full bg-[#C5C5C5]" />
                <div className="h-0.5 w-0.5 rounded-full bg-[#C5C5C5]" />
              </div>
            </div>
          </div>
        </div>

        {/* Coterie Ai Insight */}
        <div className="rounded-xl border border-[#DFE1E7] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <Sparkle size={20} weight="fill" className="text-[#12B76A]" />
            <h3 className="text-sm font-semibold text-[#101828]">Coterie Ai Insight</h3>
          </div>

          <div className="flex gap-3">
            <div className="relative h-8 w-8 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3E8EF]">
                {/* Robot Icon Placeholder */}
                <span className="text-xs">🤖</span>
              </div>
              <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border border-white bg-[#12B76A]" />
            </div>
            <div className="rounded-tr-xl rounded-br-xl rounded-bl-xl bg-[#F2F4F7] p-3">
              <p className="text-xs leading-relaxed text-[#475467]">
                Based on current activity, here are the most effective actions to take today:
              </p>
            </div>
          </div>

          <Button className="mt-4 w-full gap-2 bg-[#12B76A] hover:bg-[#039855]">
            <span className="text-sm">Get More Insight</span>
            <Sparkle size={16} weight="fill" />
          </Button>
        </div>
      </aside>
    </section>
  );
};

export default ActivateInfluencer;
