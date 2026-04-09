import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { useCreateCommunity } from "@/services/generics/hooks";
import { useDeleteUpload, useFileUpload } from "@/services/file-upload-hook";
import { toast } from "sonner";

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface CreateCommunityModalProps {
  isCustom?: boolean;
  customOpen?: boolean;
  setCustomOpen?: (open?: boolean | any) => void;
  children?: React.ReactNode;
  setCommunityData: any;
}

const communitySchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),
  description: z
    .string()
    .min(250, "Minimum of 250 characters required")
    .max(400, "Maximum of 400 characters"),
  visibility: z.string().min(1, "Visibility is required"),
  management: z.string().min(1, "Management preference is required"),
  logo: z
    .custom<File>((v) => v instanceof File || (typeof v === "object" && v !== null), {
      message: "Community Logo is required",
    })
    .refine((file) => file !== null, "Community Logo is required"),
  imageUrl: z.string().refine((v) => v !== null, "Image URL is required"),
});

type CommunityFormValues = z.infer<typeof communitySchema>;

const CreateCommunityModal = ({
  children,
  setCommunityData,
  isCustom,
  customOpen,
  setCustomOpen,
}: CreateCommunityModalProps) => {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CommunityFormValues>({
    mode: "onChange",
    resolver: zodResolver(communitySchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "",
      management: "",
      logo: undefined,
    },
  });

  const logoFile = watch("logo");

  const {
    mutate: createCommunityMutate,
    isPending: isCreatingCommunity,
    isSuccess,
  } = useCreateCommunity();

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
      setValue("imageUrl", fileUploadData.url, { shouldValidate: true });
    }
  }, [fileUploadData]);

  const validateAndUploadFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit. Please choose a smaller file.`);
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, etc.).");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    fileUploadMutate(formData);
    setValue("logo", file, { shouldValidate: true });
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

  const handleDeleteLogo = () => {
    deleteUploadMutate();
    setValue("logo", null as any, { shouldValidate: true });
    setValue("imageUrl", "" as any, { shouldValidate: true });
    // Reset file input so re-selecting the same file triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: CommunityFormValues) => {
    createCommunityMutate({
      ...data,
      name: data?.title,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setCommunityData((prev: any) => [
        ...prev,
        {
          id: Date.now(),
          stats: { members: 1, campaigns: 0 },
        },
      ]);
      setOpen(false);
      reset();
    }
  }, [isSuccess]);

  return (
    <Dialog open={isCustom ? customOpen : open} onOpenChange={isCustom ? setCustomOpen : setOpen}>
      {isCustom ? null : (
        <>
          {children || (
            <DialogTrigger asChild>
              <Button className="flex cursor-pointer items-center gap-2 border border-[#E0E1E6] bg-white text-[#1E1F24] hover:bg-gray-50">
                <Plus className="h-4 w-4" />
                Create New Community
              </Button>
            </DialogTrigger>
          )}
        </>
      )}

      <DialogContent
        showCloseButton={false}
        className="max-h-[82vh] gap-0 overflow-hidden border-none bg-white p-0 lg:max-h-[95vh] lg:w-[700px] lg:min-w-[700px]"
      >
        <DialogHeader className="border-b border-[#DFE1E7] p-6">
          <DialogTitle className="text-lg leading-[135%] font-semibold tracking-[0.01em] text-[#0D0D12]">
            Create a Community
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="no-scrollbar max-h-[60vh] overflow-y-auto p-3 lg:p-6">
            <div className="space-y-6">
              {/* Title */}
              <Field className="flex items-center gap-2">
                <FieldLabel
                  htmlFor="title"
                  className="text-sm leading-[150%] font-medium tracking-[0%] text-[#666D80]"
                >
                  Community Name <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="title"
                    placeholder=""
                    className="border-[#D0D5DD]"
                    {...register("title")}
                  />
                  <FieldError errors={[errors.title]} />
                </FieldContent>
              </Field>

              {/* Description */}
              <Field className="flex items-center gap-2">
                <FieldLabel htmlFor="description" className="text-sm font-medium text-[#666D80]">
                  About the Community <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Textarea
                      id="description"
                      placeholder=""
                      maxLength={400}
                      minLength={5}
                      className="h-[151px] max-h-[151px] resize-none border-[#D0D5DD] pb-8"
                      {...register("description")}
                    />
                    <div className="absolute bottom-2 left-2 text-xs text-gray-400">
                      {watch("description")?.length || 0}/400
                    </div>
                  </div>
                  <FieldError errors={[errors.description]} />
                </FieldContent>
              </Field>

              {/* Visibility */}
              <Field className="flex items-center gap-2">
                <FieldLabel htmlFor="visibility" className="text-sm font-medium text-[#666D80]">
                  Who can see it? <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="visibility"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full border-[#D0D5DD]">
                          <SelectValue placeholder="Public, Private (Invite only)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private (Invite only)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.visibility]} />
                </FieldContent>
              </Field>

              {/* Management */}
              <Field className="flex items-center gap-2">
                <FieldLabel htmlFor="management" className="text-sm font-medium text-[#666D80]">
                  Who Can Manage it <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="management"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full border-[#D0D5DD]">
                          <SelectValue placeholder="Admin Only, All Members" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin Only</SelectItem>
                          <SelectItem value="all">All Members</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.management]} />
                </FieldContent>
              </Field>

              {/* Community Logo */}
              <Field className="flex items-center gap-2">
                <FieldLabel className="text-sm font-medium text-[#666D80]">
                  Community Logo <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  {logoFile ? (
                    <div className="group relative h-32 w-full overflow-hidden rounded-lg border border-[#D0D5DD]">
                      <img
                        src={URL.createObjectURL(logoFile)}
                        alt="Logo"
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
                      <button
                        type="button"
                        disabled={isDeletingUpload || isUploading}
                        onClick={handleDeleteLogo}
                        className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white"
                      >
                        <HugeiconsIcon icon={Cancel01Icon} size={14} className="text-gray-700" />
                      </button>
                      <div className="absolute right-3 bottom-2 rounded bg-black/40 px-2 py-0.5 text-xs font-medium text-white">
                        {(logoFile.size / 1024 / 1024).toFixed(1)} MB
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
                  <FieldError errors={[errors.logo]} />
                </FieldContent>
              </Field>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#DFE1E7] bg-white px-3 py-5 lg:px-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="px-6">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!isValid || isDeletingUpload || isUploading}
              className="bg-[#079455] px-6 text-white hover:bg-[#0E8A4A]"
            >
              {isCreatingCommunity ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
