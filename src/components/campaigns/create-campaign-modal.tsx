import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
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
// import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import {
  useCreateCampaign,
  useGetAllCommunities,
  useGetCampaignCategories,
} from "@/services/generics/hooks";
import { useDeleteUpload, useFileUpload } from "@/services/file-upload-hook";
import { InfoIcon } from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
// import {
//   Combobox,
//   ComboboxContent,
//   ComboboxEmpty,
//   ComboboxInput,
//   ComboboxItem,
//   ComboboxList,
//   ComboboxTrigger,
//   ComboboxValue,
// } from "../ui/combobox";
// import { useNavigate } from "react-router-dom";

interface CreateCampaignModalProps {
  children?: React.ReactNode;
  // setCampaignsData: any;
  // setJustCreated: any;
  isCustom?: boolean;
  customOpen?: boolean;
  setCustomOpen?: (open: boolean) => void;
}

const CreateCampaignModal = ({
  // children,
  // setCampaignsData,
  // setJustCreated,
  isCustom,
  customOpen,
  setCustomOpen,
}: CreateCampaignModalProps) => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    imageUrl: "",
    thumbnail: null as File | null,
    campaignType: "",
    // participation: [] as string[],
    startDate: "",
    endDate: "",
    isOngoing: false,
    visibility: "",
    communityId: "" as any,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split("T")[0];

  const {
    mutateAsync: createCampaign,
    isPending: isCreatingCampaign,
    isSuccess: isCreatingCampaignSuccess,
  } = useCreateCampaign();
  const { data: categories } = useGetCampaignCategories();
  const { data: communityData, isPending: isCommunityPending } = useGetAllCommunities({
    sort: "",
    search: "",
  });

  const {
    mutate: fileUploadMutate,
    isPending: isUploading,
    data: fileUploadData,
    uploadProgress,
  } = useFileUpload();

  const { mutate: deleteUploadMutate, isPending: isDeletingUpload } = useDeleteUpload(
    fileUploadData?.url
  );

  useEffect(() => {
    if (fileUploadData) {
      setFormData((prev) => ({ ...prev, imageUrl: fileUploadData.url }));
    }
  }, [fileUploadData]);

  // console.log(categories);
  const validateAndUploadFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit. Please choose a smaller file.`);
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, etc.).");
      return;
    }
    const uploadPayload = new FormData();
    uploadPayload.append("file", file);
    fileUploadMutate(uploadPayload);
    setFormData((prev) => ({ ...prev, thumbnail: file }) as any);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUploadFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      validateAndUploadFile(files[0]);
    }
  };

  const handleDeleteThumbnail = () => {
    deleteUploadMutate();
    setFormData((prev) => ({ ...prev, thumbnail: null, imageUrl: "" }));
    // Reset file input so re-selecting the same file triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (isCreatingCampaignSuccess) {
      setOpen(false);
      setStep(1);
      setFormData({
        title: "",
        description: "",
        goal: "",
        category: "",
        thumbnail: null,
        campaignType: "",
        imageUrl: "",
        // participation: [],
        startDate: "",
        endDate: "",
        isOngoing: false,
        visibility: "",
        communityId: "",
      });
    }
  }, [isCreatingCampaignSuccess]);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = () => {
    const payload = {
      name: formData.title,
      visibility: formData.visibility,
      description: formData.description,
      goalType: formData.campaignType,
      communityId: formData.communityId || null,
      categoryId: formData.category || null,
      goalAmountCents: Number(formData.goal) * 100,
      startDate: formData.startDate,
      imageUrl: formData.imageUrl,
      endDate: formData.endDate || null,
    };

    createCampaign(payload as any);

    // Handle submission logic here
    // console.log("Submitting campaign:", formData);
  };

  // const handleParticipationChange = (value: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     participation: prev.participation.includes(value)
  //       ? prev.participation.filter((item) => item !== value)
  //       : [...prev.participation, value],
  //   }));
  // };

  const communityItems =
    communityData?.data?.items?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) ?? [];

  // console.log(communityItems);

  return (
    <Dialog
      // modal={true}
      open={isCustom ? customOpen : open}
      onOpenChange={isCustom ? setCustomOpen : setOpen}
    >
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
        // onInteractOutside={(e) => e.preventDefault()}
        // showCloseButton={false}
        className="max-h-[95vh] w-full gap-0 overflow-hidden bg-white p-0 lg:min-w-[700px]"
      >
        <DialogHeader className="border-b border-[#DFE1E7] p-6">
          <DialogTitle className="text-xl font-bold text-[#0A0A0C]">Campaign Details</DialogTitle>
        </DialogHeader>

        <div className="no-scrollbar max-h-[70vh] overflow-y-auto p-3 lg:p-6">
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
                    placeholder="Please enter description..."
                    minLength={5}
                    maxLength={400}
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
                    {formData?.description?.length}/400
                  </div>
                </div>
                <p className="text-sm text-red-500">
                  {formData?.description?.length < 250 && formData?.description?.length > 0
                    ? "Minimum of 250 characters required"
                    : ""}
                </p>
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
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, "");

                    const parts = value.split(".");
                    if (parts.length > 2) {
                      value = parts[0] + "." + parts[1];
                    }
                    setFormData({
                      ...formData,
                      goal: value,
                    });
                  }}
                />
              </div>

              {/* Goal Type */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-[#344054]">
                  Goal Type <CampaignGoalTypeTooltip /> <span className="text-red-500">*</span>
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
                    <SelectItem value="Amount">Amount</SelectItem>
                    <SelectItem value="Time">Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#344054]">
                  Thumbnail <span className="text-red-500">*</span>
                </Label>
                {formData.thumbnail ? (
                  <div className="group relative h-32 w-full overflow-hidden rounded-lg border border-[#D0D5DD]">
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
                      alt="Thumbnail"
                      className="h-full w-full object-cover"
                    />
                    {/* Upload progress overlay */}
                    {isUploading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                        <div className="mb-2 text-sm font-medium text-white">
                          Uploading... {uploadProgress}%
                        </div>
                        <div className="h-2 w-3/4 overflow-hidden rounded-full bg-white/30">
                          <div
                            className="h-full rounded-full bg-white transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {!isUploading && (
                      <button
                        disabled={isDeletingUpload || isUploading}
                        onClick={handleDeleteThumbnail}
                        className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white"
                      >
                        <HugeiconsIcon icon={Cancel01Icon} size={14} className="text-gray-700" />
                      </button>
                    )}

                    <div className="absolute right-3 bottom-2 rounded bg-black/40 px-2 py-0.5 text-xs font-medium text-white">
                      {(formData.thumbnail.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex h-25 w-full cursor-pointer flex-col items-center justify-center rounded-lg border transition-colors ${
                      isDragging
                        ? "border-dashed border-[#12AA5B] bg-[#12AA5B]/5"
                        : "border-[#DFE1E7] hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm text-gray-500">
                      Drag & Drop your files or <span className="text-[#12AA5B]">Browse</span>
                    </span>
                    <span className="mt-1 text-xs text-gray-400">
                      Max {MAX_FILE_SIZE_MB}MB, JPG/PNG
                    </span>
                  </div>
                )}
                <input
                  disabled={isUploading}
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
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Participation */}
              {/* <div className="space-y-2">
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
              </div> */}

              {/* Duration */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#344054]">
                  Campaign Duration <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-col gap-4 rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      min={today}
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
                      min={formData.startDate || today}
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
                      Ongoing campaign
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

              {/* Community */}

              <div className="w-full space-y-2">
                <Label htmlFor="community" className="text-sm font-medium text-[#344054]">
                  Community <span className="text-red-500">*</span>
                </Label>

                {/* <>
                  
                    <Combobox
                      value={formData.communityId}
                      items={communityItems}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          communityId: value,
                        }))
                      }
                    >
                      <ComboboxTrigger className="border-input bg-background w-full justify-between rounded-md border px-3 py-2 text-sm shadow-xs">
                        <ComboboxValue placeholder="Select community" />
                      </ComboboxTrigger>
                      <ComboboxContent
                        // anchor={"trigger"}
                        className="z-[9999] !w-[var(--anchor-width)] !min-w-[var(--anchor-width)]"
                      >
                        <ComboboxInput showTrigger={false} placeholder="Search" />
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item.value} value={item.value}>
                              {item.label}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </> */}
                <Select
                  disabled={isCommunityPending || communityItems.length === 0}
                  value={formData.communityId}
                  onValueChange={(value) => {
                    console.log("value", value);
                    setFormData({
                      ...formData,
                      communityId: value,
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isCommunityPending
                          ? "Loading..."
                          : communityItems.length === 0
                            ? "No communities found"
                            : "Select community"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {communityItems?.map((item: any, index: number) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-[#DFE1E7] px-3 py-5 lg:px-6">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={() => setOpen(false)} className="px-6">
                Cancel
              </Button>
              <Button
                disabled={
                  isUploading ||
                  isDeletingUpload ||
                  !formData.title ||
                  !formData.description ||
                  !formData.goal
                }
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
                disabled={
                  isCreatingCampaign ||
                  !formData.category ||
                  !formData.communityId ||
                  !formData.visibility
                }
                onClick={handleSubmit}
                className="bg-[#079455] px-6 text-white hover:bg-[#0E8A4A]"
              >
                {isCreatingCampaign ? "Creating..." : "Submit"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

function CampaignGoalTypeTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="flex cursor-pointer items-center gap-1 text-sm font-normal text-[#12AA5B]">
          <InfoIcon className="h-4 w-4" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="bg-white shadow" side="right">
        <p className="max-w-[300px] text-sm text-[#1E1F24]">
          Goal Type – Choose whether the campaign goal is based on a target amount or a time
          duration.
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

export default CreateCampaignModal;
