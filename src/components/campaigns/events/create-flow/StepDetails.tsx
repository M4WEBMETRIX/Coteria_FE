import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Type, Image as ImageIcon, Video } from "lucide-react";
import { SparkleIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { QueryTabs } from "@/components/query-tab";
import { useQueryState } from "nuqs";

export function StepDetails() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [activeTab] = useQueryState("tab", {
    defaultValue: "overview",
  });

  const TAB_VALUES = ["overview", "good_to_know"] as const;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-base leading-[24px] font-normal text-[#1E1E1E]">
          Tell people about your event
        </h2>
        <p className="text-base leading-[24px] font-normal text-[#6B6B6B]">
          Add rich details to help attendees understand what makes your event special
        </p>
      </div>

      <QueryTabs
        values={TAB_VALUES}
        defaultValue="overview"
        tabs={[
          { label: "Overview", value: "overview" },
          { label: "Good to Know", value: "good_to_know" },
        ]}
      />

      {activeTab === "overview" && (
        <>
          <div className="space-y-4">
            <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">
              Hero Image/Video *
            </Label>
            <div className="flex h-[264px] cursor-pointer flex-col items-center justify-center rounded-[8px] border-2 border-[#E8EAED] p-10 text-center transition-colors hover:bg-gray-50">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[8px] bg-[#F8F9FA]">
                <Upload className="h-8 w-8 text-[#6B6B6B]" />
              </div>
              <h3 className="text-base leading-[24px] font-normal text-[#1E1E1E]">
                Upload photos and video
              </h3>
              <p className="mt-2 text-sm leading-[20px] font-normal text-[#6B6B6B]">
                Upload up to 10 images. First image is your main event image.
              </p>
              <p className="mt-3 text-xs leading-[16px] font-normal text-[#6B6B6B]">
                Recommended: 1200x675px (16:9 aspect ratio), Max 10MB, JPG/PNG
              </p>
              <Input
                type="file"
                className="hidden"
                accept="image/*,video/*"
                {...register("heroImage")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                className="text-sm leading-[14px] font-medium text-[#1E1E1E]"
                htmlFor="description"
              >
                Event description *
              </Label>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-[8px] rounded-[6px] border-[#FF5A5F] text-sm leading-[20px] font-medium text-[#FF5A5F] hover:bg-red-50 hover:text-[#FF5A5F]"
              >
                <SparkleIcon />
                Suggest description
              </Button>
            </div>
            <Textarea
              id="description"
              placeholder="Describe what makes your event unique. What will attendees experience?"
              className="w-full resize-none rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message as string}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">Add Media</Label>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex w-full justify-center gap-4 !rounded-[6px] border border-[#E8EAED] text-sm leading-[20px] font-medium text-[#1E1E1E]"
              >
                <Type className="h-4 w-4" />
                Add text
              </Button>
              <Button
                variant="outline"
                className="flex w-full justify-center gap-4 !rounded-[6px] border border-[#E8EAED] text-sm leading-[20px] font-medium text-[#1E1E1E]"
              >
                <ImageIcon className="h-4 w-4" />
                Add image
              </Button>
              <Button
                variant="outline"
                className="flex w-full justify-center gap-4 !rounded-[6px] border border-[#E8EAED] text-sm leading-[20px] font-medium text-[#1E1E1E]"
              >
                <Video className="h-4 w-4" />
                Add video
              </Button>
            </div>
          </div>
        </>
      )}

      {activeTab === "good_to_know" && (
        <div className="space-y-8">
          {/* Event Highlights */}
          <div className="space-y-4">
            <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">
              Event highlights
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a highlight"
                className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) {
                      const currentHighlights = watch("highlights") || [];
                      setValue("highlights", [...currentHighlights, val]);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
              <Button
                type="button"
                className="h-12 w-12 bg-[#12AA5B] hover:bg-[#12AA5B]/90"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  const val = input.value.trim();
                  if (val) {
                    const currentHighlights = watch("highlights") || [];
                    setValue("highlights", [...currentHighlights, val]);
                    input.value = "";
                  }
                }}
              >
                <PlusIcon className="h-5 w-5 text-white" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(watch("highlights") || []).map((highlight: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-[#F8F9FA] px-3 py-1.5 text-sm text-[#1E1E1E]"
                >
                  {highlight}
                  <button
                    type="button"
                    onClick={() => {
                      const currentHighlights = watch("highlights") || [];
                      setValue(
                        "highlights",
                        currentHighlights.filter((_: string, i: number) => i !== index)
                      );
                    }}
                    className="cursor-pointer text-gray-400 hover:text-red-500"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Tags */}
          <div className="space-y-4">
            <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">
              Quick info tags
            </Label>
            <div className="flex flex-wrap gap-3">
              {["Age info", "Door Time", "Parking Info", "Dress Code"].map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  variant="outline"
                  className="h-10 rounded-[6px] border border-[#E8EAED] text-sm font-medium text-[#1E1E1E] hover:bg-gray-50"
                  onClick={() => {
                    const currentHighlights = watch("highlights") || [];
                    setValue("highlights", [...currentHighlights, `${tag}: `]);
                  }}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">
                Frequently asked questions
              </Label>
              <div className="flex items-center gap-2 rounded bg-[#EFF6FF] px-3 py-1.5 text-sm leading-[20px] font-normal text-[#6B6B6B]">
                <span className="text-lg">💡</span>
                Events with FAQs have 8% more organic traffic
              </div>
            </div>

            <div className="space-y-4">
              {(watch("faqs") || []).map((_: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-1 gap-4 space-y-4">
                    <Input
                      placeholder="Question"
                      className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
                      {...register(`faqs.${index}.question`)}
                    />
                    <Input
                      placeholder="Answer"
                      className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
                      {...register(`faqs.${index}.answer`)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-2 cursor-pointer text-gray-400 hover:text-red-500"
                    onClick={() => {
                      const currentFaqs = watch("faqs") || [];
                      setValue(
                        "faqs",
                        currentFaqs.filter((_: any, i: number) => i !== index)
                      );
                    }}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              className="h-12 w-full rounded-[6px] bg-[#12AA5B]/50 text-white hover:bg-[#12AA5B]"
              onClick={() => {
                const currentFaqs = watch("faqs") || [];
                setValue("faqs", [...currentFaqs, { question: "", answer: "" }]);
              }}
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Add question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
