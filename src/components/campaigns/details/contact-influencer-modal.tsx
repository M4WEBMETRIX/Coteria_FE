import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Influencer } from "./influencer-card";

export default function ContactInfluencerModal({
  influencer,
  open,
  setOpen,
}: {
  influencer?: Influencer | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log(influencer);
  //   const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    influencerName: "",
    emailAddress: "",
    campaign: "",
  });

  useEffect(() => {
    if (open && influencer) {
      setFormData({
        influencerName: influencer.name ?? "",
        emailAddress: influencer.email ?? "",
        campaign: "",
      });
    }
  }, [open, influencer]);

  const campaigns = [
    "Housing Support Drive",
    "Community Outreach 2024",
    "Youth Empowerment",
    "Health & Wellness Initiative",
  ];

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="rounded-[20px] p-0 sm:max-w-175">
        <DialogHeader>
          <DialogTitle className="border-b border-b-[#DFE1E7] p-6 text-lg leading-[135%] font-medium tracking-[0%] text-[#0D0D12]">
            Contact an Influencer
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3 space-y-6 px-6">
          <div className="space-y-2">
            <Label
              htmlFor="influencerName"
              className="text-sm leading-[150%] font-medium tracking-[0%] text-[#666D80]"
            >
              Influencer Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="influencerName"
              type="text"
              value={formData.influencerName}
              onChange={(e) => setFormData({ ...formData, influencerName: e.target.value })}
              className="h-12 w-full rounded-md border-[#DFE1E7]"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="emailAddress"
              className="text-sm leading-[150%] font-medium tracking-[0%] text-[#666D80]"
            >
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
              className="h-12 w-full rounded-md border-[#DFE1E7]"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="campaign"
              className="text-sm leading-[150%] font-medium tracking-[0%] text-[#666D80]"
            >
              Select Campaign <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.campaign}
              onValueChange={(value) => setFormData({ ...formData, campaign: value })}
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
        </div>
        <div className="mt-3 flex justify-end gap-4 border-t border-t-[#DFE1E7] p-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-12 w-30 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Back
          </Button>
          <Button
            disabled={!formData.campaign || !formData.emailAddress || !formData.influencerName}
            onClick={handleSubmit}
            className="h-12 w-30 bg-[#079455] text-white hover:bg-green-700"
          >
            invite
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
