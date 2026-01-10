import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CaretRight, Info } from "@phosphor-icons/react";
import InfluencerAiInsightsModal from "./InfluencerAiInsightsModal";
import { useState } from "react";

export interface Influencer {
  id: number;
  name: string;
  avatar: string;
  confidenceLabel: string;
  responsiveness: "High" | "Medium" | "Low";
  sharingBehavior: "Active" | "Passive";
  engagement: number;
  participationDepth: string;
  matchPercentage: number;
}

export const InfluencerCard = ({ user }: { user: Influencer }) => {
  const [showModal, setShowModal] = useState<number | null>(null);
  return (
    <>
      <InfluencerAiInsightsModal showModal={showModal} setShowModal={setShowModal} />
      <div className="rounded-xl border border-[#DFE1E7] bg-[#FEFEFE] px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-3">
              <h4 className="text-sm leading-[150%] font-normal tracking-[2%] text-[#0D0D12]">
                {user.name}
              </h4>
              <span className="rounded-full bg-[#D9FFF7] px-2.5 py-0.5 text-xs font-medium text-[#267666]">
                {user.confidenceLabel}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1">
              <span className="text-2xl font-medium text-[#267666]">{user.matchPercentage}%</span>
            </div>
            <div className="h-1.5 w-[54px] rounded-full bg-[#EBEBEB]">
              <div
                className="h-full rounded-full bg-[#267666]"
                style={{ width: `${user.matchPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <div className="space-y-4">
            <div className="flex w-[223px] items-center justify-between gap-2">
              <span className="text-xs leading-[100%] font-medium text-[#4A4C54]">
                Update Responsiveness:
              </span>
              <Badge
                variant="secondary"
                className="rounded-full border border-[#FFE1E7] bg-[#FCE8EC] px-2.5 py-0.5 text-xs font-medium text-[#B21634] hover:bg-[#FEF3F2]"
              >
                • {user.responsiveness}
              </Badge>
            </div>
            <div className="flex w-[223px] items-center justify-between gap-2">
              <span className="text-xs leading-[100%] font-medium text-[#4A4C54]">
                Sharing Behavior:
              </span>
              <Badge
                variant="secondary"
                className="rounded-full border-[#A7FFEE] bg-[#D9FFF7] px-2.5 py-0.5 text-xs font-medium text-[#0E8A72] hover:bg-[#ECFDF3]"
              >
                • {user.sharingBehavior}
              </Badge>
            </div>
            <div className="cols-span-2 items-center justify-between">
              <span className="text-xs leading-[100%] font-medium text-[#4A4C54]">
                Based on observed engagement behavior
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs leading-[100%] font-medium text-[#4A4C54]">Engagement:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    weight="fill"
                    className={star <= user.engagement ? "text-[#FFBE4C]" : "text-[#D9D9D9]"}
                    size={27}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs leading-[100%] font-medium text-[#4A4C54]">
                Participation Depth:
              </span>
              <span className="font-regular rounded-md bg-[#F8F9FC] px-2 py-0.5 text-sm text-[#4A4C54]">
                {user.participationDepth}
              </span>
            </div>{" "}
          </div>

          <div className="ml-auto justify-end space-y-[14px]">
            <p className="mt-1 text-[10px] text-[#ACADB3]">Matches your campaign goals</p>
            <Button
              onClick={() => setShowModal(user.id)}
              variant="outline"
              className="font-regular h-9 gap-2 border-[#DFE1E7] text-sm text-[#4A4C54]"
            >
              View more insight
              <CaretRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
