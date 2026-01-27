import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Type, Image as ImageIcon, Video } from "lucide-react";

export function StepDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Tell people about your event</h2>
        <p className="text-muted-foreground text-sm">
          Add rich details to help attendees understand what makes your event special
        </p>
      </div>

      <div className="space-y-4">
        <Label>Hero Image/Video *</Label>
        <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-10 text-center transition-colors hover:bg-gray-50">
          <div className="mb-4 rounded-full bg-gray-100 p-4">
            <Upload className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold">Upload photos and video</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Upload up to 10 images. First image is your main event image.
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
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
          <Label htmlFor="description">Event description *</Label>
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 text-red-500 hover:bg-red-50"
          >
            Suggest description
          </Button>
        </div>
        <Textarea
          id="description"
          placeholder="Describe what makes your event unique. What will attendees experience?"
          className="min-h-[150px]"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message as string}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Add Media</Label>
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline" className="flex w-full justify-center gap-2">
            <Type className="h-4 w-4" />
            Add text
          </Button>
          <Button variant="outline" className="flex w-full justify-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Add image
          </Button>
          <Button variant="outline" className="flex w-full justify-center gap-2">
            <Video className="h-4 w-4" />
            Add video
          </Button>
        </div>
      </div>
    </div>
  );
}
