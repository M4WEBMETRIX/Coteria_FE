import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { EventType } from "./types";

export function StepLocation() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const eventType = watch("eventType");

  if (eventType === EventType.VENUE) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Venue event setup</h2>
          <p className="text-muted-foreground text-sm">
            Tell us where you'll be hosting your in-person event
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="venueAddress">Venue Address *</Label>
            <Input
              id="venueAddress"
              placeholder="Enter the physical address of the venue"
              {...register("venueAddress")}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Online event setup</h2>
        <p className="text-muted-foreground text-sm">
          Tell us how you'll be hosting your online event
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Where will you host this event? *</Label>
          <RadioGroup
            defaultValue={watch("platform")}
            onValueChange={(val) => setValue("platform", val)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="zoom" id="zoom" />
              <Label htmlFor="zoom">Zoom</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="google_meet" id="google_meet" />
              <Label htmlFor="google_meet">Google Meet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="teams" id="teams" />
              <Label htmlFor="teams">Microsoft Teams</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="youtube" id="youtube" />
              <Label htmlFor="youtube">YouTube Live</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom streaming platform</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tba" id="tba" />
              <Label htmlFor="tba">To be announced</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventLink">Event link</Label>
          <Input id="eventLink" placeholder="https://zoom.us/j/..." {...register("eventLink")} />
          <p className="text-muted-foreground text-xs">
            This will be shared with attendees after registration
          </p>
          {errors.eventLink && (
            <p className="text-sm text-red-500">{errors.eventLink.message as string}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="share-link" />
            <Label htmlFor="share-link">Share link immediately</Label>
          </div>
          <p className="text-muted-foreground -mt-3 ml-12 text-xs">
            Link will be shared 1 hour before event
          </p>
        </div>

        <div className="space-y-3">
          <Label>What do attendees need?</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="webcam" />
              <Label htmlFor="webcam">Webcam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="microphone" />
              <Label htmlFor="microphone">Microphone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="software" />
              <Label htmlFor="software">Specific software</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
