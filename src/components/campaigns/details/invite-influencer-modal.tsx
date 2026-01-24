import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { INFLUENCERS_DATA } from "./activate-influencer";
import { InfluencerCard } from "./influencer-card";
import { X } from "@phosphor-icons/react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function InviteInfluencerModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const campaigns = [
    "Housing Support Drive",
    "Community Outreach 2024",
    "Youth Empowerment",
    "Health & Wellness Initiative",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="no-scrollbar max-h-[95vh] gap-0! space-y-0! overflow-auto rounded-[20px] p-0 px-10 sm:max-w-[964px]"
      >
        <div className="py-4 text-lg leading-[135%] font-medium tracking-[0%] text-[#0D0D12]">
          <div className="flex items-center justify-between">
            <p>Invite an Influencer</p>
            <div className="mr-5.5">
              <X
                className="cursor-pointer"
                onClick={() => setOpen(false)}
                size={20}
                color="#1E1F24"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full items-end gap-10 pb-6">
          <div className="w-full space-y-2">
            <Label
              htmlFor="campaign"
              className="text-sm leading-[150%] font-medium tracking-[0%] text-[#666D80]"
            >
              Select Campaign <span className="text-red-500">*</span>
            </Label>
            <Select
            //   value={formData.campaign}
            //   onValueChange={(value) => setFormData({ ...formData, campaign: value })}
            >
              <SelectTrigger className="h-12! w-full cursor-pointer rounded-md border-[#DFE1E7]">
                <SelectValue placeholder="Choose a campaign" />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem
                    className="cursor-pointer py-2 hover:bg-[#F6F8FA]"
                    key={campaign}
                    value={campaign}
                  >
                    {campaign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="flex h-12 items-center gap-3 px-7.5!">
            Get More Insight
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z"
                stroke="#FCFCFD"
                stroke-width="2.5"
                stroke-linejoin="round"
              />
              <path
                d="M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z"
                stroke="#FCFCFD"
                stroke-width="2.5"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>

        <div className="no-scrollbar grid max-h-[80vh] grid-cols-1 gap-2.5 overflow-auto pb-12.5">
          {INFLUENCERS_DATA.map((influencer) => (
            <InfluencerCard key={influencer.id} user={influencer} isInvite={true} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
