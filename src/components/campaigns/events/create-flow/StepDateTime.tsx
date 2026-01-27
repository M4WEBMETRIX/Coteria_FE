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
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">When is your event?</h2>
        <p className="text-muted-foreground text-sm">Set up the date and time for your event</p>
      </div>

      <div className="space-y-4">
        <Label>Event occurrence *</Label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            className={cn(
              "hover:border-primary/50 cursor-pointer transition-all",
              !isRecurring ? "border-primary bg-green-50/50" : ""
            )}
            onClick={() => setValue("isRecurring", false)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
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
              <CardTitle className="mt-2 text-base">Single event</CardTitle>
              <CardDescription className="text-xs">For events that happen once</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className={cn(
              "hover:border-primary/50 cursor-pointer transition-all",
              isRecurring ? "border-primary bg-green-50/50" : ""
            )}
            onClick={() => setValue("isRecurring", true)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
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
              <CardTitle className="mt-2 text-base">Recurring event</CardTitle>
              <CardDescription className="text-xs">
                For timed entry and multiple days
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Label>Start date & time *</Label>
          <div className="flex gap-2">
            <Input type="date" {...register("startDate")} />
            <Input type="time" {...register("startTime")} />
          </div>
          {(errors.startDate || errors.startTime) && (
            <p className="text-sm text-red-500">Start date and time are required</p>
          )}
        </div>

        <div className="space-y-4">
          <Label>End date & time *</Label>
          <div className="flex gap-2">
            <Input type="date" {...register("endDate")} />
            <Input type="time" {...register("endTime")} />
          </div>
          {(errors.endDate || errors.endTime) && (
            <p className="text-sm text-red-500">End date and time are required</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Timezone</Label>
        <Select onValueChange={(val) => setValue("timezone", val)} defaultValue={watch("timezone")}>
          <SelectTrigger>
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

      <div className="space-y-3 border-t pt-4">
        <Label>Display options</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="displayStartTime"
              checked={watch("displayStartTime")}
              onCheckedChange={(checked) => setValue("displayStartTime", checked)}
            />
            <Label htmlFor="displayStartTime">Display start time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="displayEndTime"
              checked={watch("displayEndTime")}
              onCheckedChange={(checked) => setValue("displayEndTime", checked)}
            />
            <Label htmlFor="displayEndTime">Display end time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="displayTimezone"
              checked={watch("displayTimezone")}
              onCheckedChange={(checked) => setValue("displayTimezone", checked)}
            />
            <Label htmlFor="displayTimezone">Display timezone to attendees</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
