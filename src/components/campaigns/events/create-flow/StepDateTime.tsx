import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepDateTime() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const isRecurring = watch("isRecurring");

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-base leading-[24px] font-normal text-[#1E1E1E]">When is your event?</h2>
        <p className="text-base leading-[24px] font-normal text-[#6B6B6B]">
          Set up the date and time for your event
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">
          Event occurrence *
        </Label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            className={cn(
              "hover:border-primary/50 h-[160px] cursor-pointer transition-all",
              !isRecurring ? "border-[#12AA5B] bg-[#ECF5F0]" : ""
            )}
            onClick={() => setValue("isRecurring", false)}
          >
            <CardHeader className="flex h-full w-full flex-col justify-between">
              <div className="flex w-full items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#DBEAFE] p-2 text-[#155DFC]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border-2",
                    !isRecurring ? "border-primary bg-primary" : "border-gray-300"
                  )}
                >
                  {!isRecurring && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
              </div>
              <CardTitle className="text-base font-medium text-[#1E1E1E]">Single event</CardTitle>
              <CardDescription className="max-w-[320px] text-base text-[#6B6B6B]">
                For events that happen once
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className={cn(
              "hover:border-primary/50 h-[160px] cursor-pointer transition-all",
              isRecurring ? "border-[#12AA5B] bg-[#ECF5F0]" : ""
            )}
            onClick={() => setValue("isRecurring", true)}
          >
            <CardHeader className="flex h-full w-full flex-col justify-between">
              <div className="flex w-full items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#C7F3D1] p-2 text-[#00A63E]">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-[6px] bg-[#DCFCE7] px-2 py-1 text-xs font-medium text-[#008236]">
                    NEW
                  </span>
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full border-2",
                      isRecurring ? "border-primary bg-primary" : "border-gray-300"
                    )}
                  >
                    {isRecurring && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
              <CardTitle className="text-[#1E1E1E]base text-base font-medium">
                Recurring event
              </CardTitle>
              <CardDescription className="max-w-[320px] text-base text-[#6B6B6B]">
                For timed entry and multiple days
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">
            Start date & time *
          </Label>
          <div className="flex gap-2">
            <Input
              className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
              type="date"
              {...register("startDate")}
            />
            <Input
              className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
              type="time"
              {...register("startTime")}
            />
          </div>
          {(errors.startDate || errors.startTime) && (
            <p className="text-sm text-red-500">Start date and time are required</p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">
            End date & time *
          </Label>
          <div className="flex gap-2">
            <Input
              className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
              type="date"
              {...register("endDate")}
            />
            <Input
              className="h-12 rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]"
              type="time"
              {...register("endTime")}
            />
          </div>
          {(errors.endDate || errors.endTime) && (
            <p className="text-sm text-red-500">End date and time are required</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">Timezone</Label>
        <Select onValueChange={(val) => setValue("timezone", val)} defaultValue={watch("timezone")}>
          <SelectTrigger className="!h-12 w-full rounded-[6px] border border-[#000000]/0 bg-[#F8F9FA] text-[#6B6B6B]">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GMT+1 (West Africa Time)">GMT+1 (West Africa Time)</SelectItem>
            <SelectItem value="UTC">UTC</SelectItem>
            <SelectItem value="EST">EST</SelectItem>
            <SelectItem value="PST">PST</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label className="text-sm leading-[14px] font-medium text-[#1E1E1E]">Display options</Label>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              className="!h-4 !w-4 border border-[#E8EAED]"
              id="displayStartTime"
              checked={watch("displayStartTime")}
              onCheckedChange={(checked) => setValue("displayStartTime", checked)}
            />
            <Label
              className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
              htmlFor="displayStartTime"
            >
              Display start time
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              className="!h-4 !w-4 border border-[#E8EAED]"
              id="displayEndTime"
              checked={watch("displayEndTime")}
              onCheckedChange={(checked) => setValue("displayEndTime", checked)}
            />
            <Label
              className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
              htmlFor="displayEndTime"
            >
              Display end time
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              className="!h-4 !w-4 border border-[#E8EAED]"
              id="displayTimezone"
              checked={watch("displayTimezone")}
              onCheckedChange={(checked) => setValue("displayTimezone", checked)}
            />
            <Label
              className="text-sm leading-[14px] font-normal text-[#1E1E1E]"
              htmlFor="displayTimezone"
            >
              Display timezone to attendees
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
