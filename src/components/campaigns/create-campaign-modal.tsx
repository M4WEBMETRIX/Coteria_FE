import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
// import { useNavigate } from "react-router-dom";

interface CreateCampaignModalProps {
  children?: React.ReactNode;
  setCampaignsData: any;
  setJustCreated: any;
  isCustom?: boolean;
  customOpen?: boolean;
  setCustomOpen?: (open: boolean) => void;
}

const CreateCampaignModal = ({
  // children,
  setCampaignsData,
  setJustCreated,
  isCustom,
  customOpen,
  setCustomOpen,
}: CreateCampaignModalProps) => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    thumbnail: null as File | null,
    campaignType: "",
    participation: [] as string[],
    startDate: "",
    endDate: "",
    isOngoing: false,
    visibility: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, thumbnail: e.target.files[0] });
    }
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Submitting campaign:", formData);
    setOpen(false);
    setStep(1);
    setFormData({
      title: "",
      description: "",
      goal: "",
      category: "",
      thumbnail: null,
      campaignType: "",
      participation: [],
      startDate: "",
      endDate: "",
      isOngoing: false,
      visibility: "",
    });
    setCampaignsData([
      {
        title: "",
        description: "",
        goal: "",
        category: "",
        thumbnail: null,
        campaignType: "",
        participation: [],
        startDate: "",
        endDate: "",
        isOngoing: false,
        visibility: "",
      },
    ]);
    setJustCreated(true);

    //MVP NAVIGATION FOR DEMO
    // navigate("/campaigns/sample-campaign-1xeydjtYWDB");
  };

  const handleParticipationChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      participation: prev.participation.includes(value)
        ? prev.participation.filter((item) => item !== value)
        : [...prev.participation, value],
    }));
  };

  return (
    <Dialog open={isCustom ? customOpen : open} onOpenChange={isCustom ? setCustomOpen : setOpen}>
      <DialogTrigger asChild>
        {isCustom ? null : (
          <Button className="max-w-[257px] px-[51px] py-3" variant={"outline"}>
            {" "}
            <Plus />
            Create campaign
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-h-[95vh] w-full min-w-[700px] gap-0 overflow-hidden bg-white p-0"
      >
        <DialogHeader className="border-b border-[#DFE1E7] p-6">
          <DialogTitle className="text-xl font-bold text-[#0A0A0C]">Campaign Details</DialogTitle>
        </DialogHeader>

        <div className="no-scrollbar max-h-[70vh] overflow-y-auto p-6">
          {step === 1 ? (
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-[#344054]">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Strength in Unity: Cancer Patient Support Program"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-[#344054]">
                  Description <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Textarea
                    id="description"
                    placeholder="Lorem Ipsum is simply dummy text..."
                    className="min-h-[120px] resize-none pb-8"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                  <div className="absolute right-2 bottom-2 text-xs text-gray-400">
                    {formData.description.length}/200
                  </div>
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm font-medium text-[#344054]">
                  Goals <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="goal"
                  placeholder="$1,500.00"
                  type="text" // Keep text for currency formatting flexibility
                  value={formData.goal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      goal: e.target.value,
                    })
                  }
                />
              </div>

              {/* Category */}
              <div className="w-full space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-[#344054]">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#344054]">
                  Thumbnail <span className="text-red-500">*</span>
                </Label>
                {formData.thumbnail ? (
                  <div className="group relative h-32 w-full overflow-hidden rounded-lg">
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
                      alt="Thumbnail"
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          thumbnail: null,
                        })
                      }
                      className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={14} className="text-gray-700" />
                    </button>
                    <div className="absolute right-3 bottom-2 rounded bg-black/40 px-2 py-0.5 text-xs font-medium text-white">
                      {(formData.thumbnail.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-25 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-[#DFE1E7] transition-colors hover:bg-gray-50"
                  >
                    {/* <HugeiconsIcon icon={Image01Icon} size={24} className="mb-2 text-gray-400" /> */}
                    <span className="text-sm text-gray-500">Click to upload thumbnail</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Campaign Type */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-[#344054]">
                  Campaign Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.campaignType}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      campaignType: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fundraising">Fundraising</SelectItem>
                    <SelectItem value="awareness">Awareness / Advocacy</SelectItem>
                    <SelectItem value="community">Community Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Participation */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#344054]">
                  How can people participate? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3 rounded-lg border p-4">
                  {[
                    "Donate",
                    "Share with others",
                    "Invite friends",
                    "Respond / Vote",
                    "Attend an event",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={item}
                        checked={formData.participation.includes(item)}
                        onCheckedChange={() => handleParticipationChange(item)}
                      />
                      <label
                        htmlFor={item}
                        className="cursor-pointer text-sm leading-none font-medium text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#344054]">
                  Campaign Duration <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-col gap-4 rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      placeholder="Start date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startDate: e.target.value,
                        })
                      }
                      className="flex-1"
                    />
                    <span className="text-gray-400">/</span>
                    <Input
                      type="date"
                      placeholder="End date (optional)"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          endDate: e.target.value,
                        })
                      }
                      disabled={formData.isOngoing}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="ongoing"
                      checked={formData.isOngoing}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          isOngoing: checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="ongoing"
                      className="cursor-pointer text-sm font-normal text-gray-600"
                    >
                      Toggle: Ongoing campaign
                    </Label>
                  </div>
                </div>
              </div>

              {/* Visibility */}
              <div className="space-y-2">
                <Label htmlFor="visibility" className="text-sm font-medium text-[#344054]">
                  Campaign Visibility <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.visibility}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      visibility: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (shareable)</SelectItem>
                    <SelectItem value="community">Community only</SelectItem>
                    <SelectItem value="invite">Invite-only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-[#DFE1E7] px-6 py-5">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={() => setOpen(false)} className="px-6">
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                className="bg-[#079455] px-6 text-white hover:bg-[#0E8A4A]"
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleBack} className="px-6">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-[#079455] px-6 text-white hover:bg-[#0E8A4A]"
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;
