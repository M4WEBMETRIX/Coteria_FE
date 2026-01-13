import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { PlusIcon } from "lucide-react";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRightIcon, UserCircle } from "@phosphor-icons/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { TypeCursorIcon, Upload03FreeIcons, UserGroup03Icon } from "@hugeicons/core-free-icons";

const communitySchema = z.object({
  image: z.string().optional(),
  name: z.string().min(3, "Community name must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  visibility: z.enum(["private", "public"]),
  management: z.enum(["admin", "members"]),
});

type CommunityFormValues = z.infer<typeof communitySchema>;

const CreateCommunityDialog = () => {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    control,
    setValue,
  } = useForm<CommunityFormValues>({
    mode: "onChange",
    resolver: zodResolver(communitySchema),
    defaultValues: {
      image: "",
      name: "",
      category: "",
      description: "",
      visibility: "private",
      management: "admin",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CommunityFormValues) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Community created:", data);
    setLoading(false);
    setShowSuccess(true);

    // Reset after 2 seconds
    setTimeout(() => {
      // setShowSuccess(false);
      // setOpen(false);
      reset();
      setImagePreview(null);
    }, 2000);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setShowSuccess(false);
      reset();
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex cursor-pointer items-center gap-2 rounded-full bg-[#000000] px-6 py-5 font-medium text-white hover:bg-[#000000]/90">
          <PlusIcon size={20} />
          Create Community
        </Button>
      </DialogTrigger>
      <DialogContent className="font-inter max-h-[90vh] overflow-y-auto sm:max-w-[80%]">
        {showSuccess ? (
          <div className="space-y-6 px-6 py-8">
            <div className="space-y-2 text-center">
              <h3 className="flex items-center justify-center gap-2 text-2xl font-semibold text-[#0A0A0C]">
                <span>🎉</span> Women Empowerment Created!
              </h3>
              <p className="text-sm text-[#8b8d98]">
                Your community is ready. Choose what you'd like to do next to start building
                participation.
              </p>
            </div>

            <div className="space-y-3">
              {/* Create a Campaign */}
              <button className="group w-full rounded-lg bg-[#F6F6F6] p-4 text-left transition-colors hover:bg-[#EEEEEE]">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="mt-1 grid h-12 w-12 place-items-center rounded-[12px] bg-white">
                      <HugeiconsIcon
                        icon={TypeCursorIcon}
                        size={24}
                        color="#1e1f24"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 text-base font-semibold text-[#0A0A0C]">
                        Create a Campaign
                      </h4>
                      <p className="text-sm text-[#8B8D98]">
                        Create a focused campaign inside this community to give supporters a clear
                        way to participate and contribute.
                      </p>
                    </div>
                  </div>
                  <ArrowRightIcon size={28} color="#1E1F24" />
                </div>
              </button>

              {/* Invite Members */}
              <button className="group w-full rounded-lg bg-[#F6F6F6] p-4 text-left transition-colors hover:bg-[#EEEEEE]">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="mt-1 grid h-12 w-12 place-content-center rounded-[12px] bg-white">
                      {" "}
                      <HugeiconsIcon
                        icon={Upload03FreeIcons}
                        size={24}
                        color="#1e1f24"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-semibold text-[#0A0A0C]">Invite Members</h4>
                        <span className="rounded-full bg-[#47D198] px-2 py-0.5 text-xs text-white">
                          Recommended
                        </span>
                      </div>
                      <p className="text-sm text-[#8B8D98]">
                        Invite supporters, partners, or champions to join this community and start
                        engaging.
                      </p>
                    </div>
                  </div>
                  <ArrowRightIcon size={28} color="#1E1F24" />
                </div>
              </button>

              {/* Get Share Links & Embeds */}
              <button className="group w-full rounded-lg bg-[#F6F6F6] p-4 text-left transition-colors hover:bg-[#EEEEEE]">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="mt-1 grid h-12 w-12 place-content-center rounded-[12px] bg-white">
                      {" "}
                      <HugeiconsIcon icon={UserGroup03Icon} color="#1e1f24" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 font-semibold text-[#0A0A0C]">
                        Get Share Links & Embeds
                      </h4>
                      <p className="text-sm text-[#8B8D98]">
                        Share this community on your website, emails, or social channels to grow
                        participation organically.
                      </p>
                    </div>
                  </div>
                  <ArrowRightIcon size={28} color="#1E1F24" />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
              {/* Upload image */}
              <Field>
                <FieldContent className="">
                  <div className="grid w-[150px] place-content-center pl-3">
                    <label
                      htmlFor="upload-image"
                      className="relative flex h-[120px] w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#EFF0F3]"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserCircle size={60} />
                      )}
                    </label>
                    <Button
                      type="button"
                      onClick={() => document.getElementById("upload-image")?.click()}
                      style={{
                        background:
                          "radial-gradient(34.12% 80.21% at 50% 7.29%, #12AA5B 0%, #026451 100%)",
                      }}
                      className="z-999 mt-[-15px] w-[120px] rounded-full px-6 text-white"
                    >
                      Upload photo
                    </Button>
                    <Input
                      id="upload-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden border-0 bg-[#F6F6F6]"
                    />
                  </div>

                  <FieldError errors={[errors.image]} />
                </FieldContent>
              </Field>
              {/* Community Name */}
              <Field>
                <FieldLabel className="font-medium text-[#0A0A0C]">Community Name*</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="Enter community name"
                    {...register("name")}
                    className="border-0 bg-[#F6F6F6]"
                  />
                  <FieldError errors={[errors.name]} />
                </FieldContent>
              </Field>

              {/* Category */}
              <Field>
                <FieldLabel className="flex flex-col items-start justify-start font-medium text-[#0A0A0C]">
                  Short description of what this community exists to do.
                  <p className="-mt-2 text-xs font-medium text-[#1E1F24] italic">
                    (This helps supporters understand the focus of the community)
                  </p>
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    placeholder="Community"
                    {...register("category")}
                    className="min-h-[164px] border-0 bg-[#F6F6F6]"
                  />
                  <FieldError errors={[errors.category]} />
                </FieldContent>
              </Field>

              {/* Description */}
              <Field>
                <FieldLabel className="font-medium text-[#0A0A0C]">
                  Community Description*
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    placeholder="Enter  community description"
                    {...register("description")}
                    className="min-h-[100px] resize-none border-0 bg-[#F6F6F6]"
                  />
                  <FieldError errors={[errors.description]} />
                </FieldContent>
              </Field>

              {/* Visibility */}
              <Field>
                <FieldLabel className="font-medium text-[#0A0A0C]">
                  Who can see this community?
                </FieldLabel>
                <FieldContent>
                  <Controller
                    name="visibility"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full border-0 bg-[#F6F6F6]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">Private (invite only)</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.visibility]} />
                </FieldContent>
              </Field>

              {/* Management */}
              <Field>
                <FieldLabel className="font-medium text-[#0A0A0C]">Who can manage it?</FieldLabel>
                <FieldContent>
                  <Controller
                    name="management"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full border-0 bg-[#F6F6F6]">
                          <SelectValue placeholder="Select management" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="members">Members</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.management]} />
                </FieldContent>
              </Field>

              <div className="flex justify-between">
                {" "}
                <DialogClose>
                  <Button
                    type="button"
                    variant={"ghost"}
                    className="w-fit rounded-full bg-[#EFF0F3] px-4 py-3"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  loading={loading}
                  disabled={!isValid}
                  type="submit"
                  className="w-fit rounded-full bg-[#12AA5B] px-4 py-3 font-semibold text-white hover:bg-[#12AA5B]/90"
                >
                  {loading ? "Creating..." : "Create Community"}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityDialog;
