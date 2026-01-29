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
        <div className="space-y-4">
          <h2 className="text-base leading-[24px] font-normal text-[#1E1E1E]">Venue event setup</h2>
          <p className="text-base leading-[24px] font-normal text-[#6B6B6B]">
            Tell us where you'll be hosting your in-person event
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label
              htmlFor="venueAddress"
              className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
            >
              Venue Address *
            </Label>
            <Input
              id="venueAddress"
              className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
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
      <div className="space-y-4">
        <h2 className="text-base leading-[24px] font-normal text-[#1E1E1E]">Online event setup</h2>
        <p className="text-base leading-[24px] font-normal text-[#6B6B6B]">
          Tell us how you'll be hosting your online event
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="mb-4 text-sm leading-[14px] font-medium text-[#1E1E1E]">
            Where will you host this event? *
          </Label>
          <RadioGroup
            defaultValue={watch("platform")}
            onValueChange={(val) => setValue("platform", val)}
            className="flex flex-col space-y-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="zoom" id="zoom" />
              <Label className="text-sm leading-[14px] font-normal text-[#1E1E1E]" htmlFor="zoom">
                Zoom
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="google_meet" id="google_meet" />
              <Label
                className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
                htmlFor="google_meet"
              >
                Google Meet
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="teams" id="teams" />
              <Label className="text-sm leading-[14px] font-normal text-[#1E1E1E]" htmlFor="teams">
                Microsoft Teams
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="youtube" id="youtube" />
              <Label
                className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
                htmlFor="youtube"
              >
                YouTube Live
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label className="text-sm leading-[14px] font-normal text-[#1E1E1E]" htmlFor="custom">
                Custom streaming platform
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tba" id="tba" />
              <Label className="text-sm leading-[14px] font-normal text-[#1E1E1E]" htmlFor="tba">
                To be announced
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label htmlFor="eventLink" className="text-sm leading-[14px] font-medium text-[#1E1E1E]">
            Event link
          </Label>
          <Input
            className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
            id="eventLink"
            placeholder="https://zoom.us/j/..."
            {...register("eventLink")}
          />
          <p className="text-sm leading-[20px] font-normal text-[#6B6B6B]">
            This will be shared with attendees after registration
          </p>
          {errors.eventLink && (
            <p className="text-sm text-red-500">{errors.eventLink.message as string}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="share-link" />
            <Label
              className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
              htmlFor="share-link"
            >
              Share link immediately
            </Label>
          </div>
          <p className="ml-12 text-sm leading-[20px] font-normal !text-[#6B6B6B]">
            Link will be shared 1 hour before event
          </p>
        </div>

        <div className="space-y-4">
          <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">
            What do attendees need?
          </Label>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox className="!h-4 !w-4 border border-[#E8EAED]" id="webcam" />
              <Label className="text-sm leading-[14px] font-normal text-[#1E1E1E]" htmlFor="webcam">
                Webcam
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox className="!h-4 !w-4 border border-[#E8EAED]" id="microphone" />
              <Label
                className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
                htmlFor="microphone"
              >
                Microphone
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox className="!h-4 !w-4 border border-[#E8EAED]" id="software" />
              <Label
                className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
                htmlFor="software"
              >
                Specific software
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
