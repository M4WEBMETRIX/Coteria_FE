import { useFormContext } from "react-hook-form";
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
import { useState } from "react";
import { X } from "lucide-react";

export function StepBasicInfo() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const [tagInput, setTagInput] = useState("");
  const tags = watch("tags") || [];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setValue("tags", [...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-base leading-[24px] font-normal text-[#1E1E1E]">
          Tell us about your event
        </h2>
        <p className="text-base leading-[24px] font-normal text-[#6B6B6B]">
          Let's start with the basics to help people understand what your event is about
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="title" className="text-sm leading-[14px] font-normal text-[#1E1E1E]">
            Event title *
          </Label>
          <Input
            id="title"
            className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
            placeholder="Give your event a memorable title"
            {...register("title")}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message as string}</p>}
          <div className="text-right text-sm leading-[20px] font-normal text-[#6B6B6B]">
            {watch("title")?.length || 0}/100
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="category" className="text-sm leading-[14px] font-normal text-[#1E1E1E]">
            Event type *
          </Label>
          <Select
            onValueChange={(val) => setValue("category", val)}
            defaultValue={watch("category")}
          >
            <SelectTrigger className="!h-12 w-full rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="webinar">Webinar</SelectItem>
              <SelectItem value="meetup">Meetup</SelectItem>
              <SelectItem value="concert">Concert</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message as string}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="summary" className="text-sm leading-[14px] font-normal text-[#1E1E1E]">
            Event summary *
          </Label>
          <Textarea
            id="summary"
            placeholder="Write a short description that captures the essence of your event"
            className="w-full resize-none rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
            {...register("summary")}
          />
          <div className="flex justify-between text-sm leading-[20px] font-normal text-[#6B6B6B]">
            <span>This appears in search results and previews</span>
            <span>{watch("summary")?.length || 0}/140</span>
          </div>
          {errors.summary && (
            <p className="text-sm text-red-500">{errors.summary.message as string}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="tags" className="text-sm leading-[14px] font-normal text-[#1E1E1E]">
            Tags (optional)
          </Label>
          <Input
            id="tags"
            className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
            placeholder="Add relevant tags (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
          />
          <p className="text-sm leading-[20px] font-normal text-[#6B6B6B]">
            Help people discover your event
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <div
                key={tag}
                className="bg-secondary text-secondary-foreground flex items-center gap-1 rounded-md px-2 py-1 text-sm"
              >
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
