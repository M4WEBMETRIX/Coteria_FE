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
import { Cancel01Icon, Image01Icon } from "@hugeicons/core-free-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";

interface CreateCommunityModalProps {
  children?: React.ReactNode;
  setCommunityData: (data: any) => void;
}

const communitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required").max(2000, "Max 2000 characters"),
  visibility: z.string().min(1, "Visibility is required"),
  management: z.string().min(1, "Management preference is required"),
  logo: z
    .custom<File>((v) => v instanceof File || (typeof v === "object" && v !== null), {
      message: "Community Logo is required",
    })
    .refine((file) => file !== null, "Community Logo is required"),
});

type CommunityFormValues = z.infer<typeof communitySchema>;

const CreateCommunityModal = ({ children, setCommunityData }: CreateCommunityModalProps) => {
  const [open, setOpen] = useState(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("logo", e.target.files[0], { shouldValidate: true });
    }
  };

  const onSubmit = (data: CommunityFormValues) => {
    console.log("Submitting community:", data);
    setCommunityData((prev: any) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
        stats: { members: 1, campaigns: 0 },
      },
    ]);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="flex items-center gap-2 border border-[#E0E1E6] bg-white text-[#1E1F24] hover:bg-gray-50">
            <Plus className="h-4 w-4" />
            Create New Community
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[700px] gap-0 overflow-hidden border-none bg-white p-0">
        <DialogHeader className="border-b border-gray-100 p-6">
          <DialogTitle className="text-lg leading-[135%] font-semibold tracking-[0.01em] text-[#0D0D12]">
            Create a Community
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-h-[80vh] overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Title */}
              <Field className="flex items-center gap-2">
                <FieldLabel
                  htmlFor="title"
                  className="text-sm leading-[150%] font-medium tracking-[0%] text-[#666D80]"
                >
                  Title <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="title"
                    placeholder="Placeholder"
                    className="border-[#D0D5DD]"
                    {...register("title")}
                  />
                  <FieldError errors={[errors.title]} />
                </FieldContent>
              </Field>

              {/* Description */}
              <Field className="flex items-center gap-2">
                <FieldLabel htmlFor="description" className="text-sm font-medium text-[#666D80]">
                  Description <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Textarea
                      id="description"
                      placeholder="Placeholder"
                      className="min-h-[100px] resize-none border-[#D0D5DD] pb-8"
                      {...register("description")}
                    />
                    <div className="absolute right-2 bottom-2 text-xs text-gray-400">
                      {watch("description")?.length || 0}/2000
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
                      <button
                        type="button"
                        onClick={() => setValue("logo", null as any, { shouldValidate: true })}
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
                      className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#D0D5DD] transition-colors hover:bg-gray-50"
                    >
                      <HugeiconsIcon icon={Image01Icon} size={24} className="mb-2 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Drag & Drop your files or <span className="text-[#12AA5B]">Browse</span>
                      </span>
                    </div>
                  )}
                  <input
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

          <div className="flex justify-end gap-3 border-t border-gray-100 bg-white p-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="px-6">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-[#079455] px-6 text-white hover:bg-[#0E8A4A]"
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
