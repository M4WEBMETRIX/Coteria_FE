import { useFormContext } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Monitor, MapPin } from "lucide-react"; // Using lucide-react icons as they seem standard
import { cn } from "@/lib/utils";
import { EventType } from "./types";

export function StepEventType() {
  const { watch, setValue } = useFormContext();
  const eventType = watch("eventType");

  const handleSelect = (type: EventType) => {
    setValue("eventType", type);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card
        className={cn(
          "hover:border-primary/50 h-[228px] cursor-pointer rounded-[8px] transition-all",
          eventType === EventType.ONLINE ? "border-primary" : "border border-[#E8EAED]"
        )}
        onClick={() => handleSelect(EventType.ONLINE)}
      >
        <CardHeader className="flex h-full w-full flex-col justify-between">
          <div className="flex w-full items-start justify-between">
            <div className="rounded-[8px] bg-[#DBEAFE] p-3 text-[#155DFC]">
              <Monitor className="h-6 w-6" />
            </div>
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border-2",
                eventType === EventType.ONLINE ? "border-primary bg-primary" : "border-gray-300"
              )}
            >
              {eventType === EventType.ONLINE && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>
          <CardTitle className="mt-4 text-base font-normal text-[#1E1E1E]">Online Event</CardTitle>
          <CardDescription className="max-w-[320px] text-base text-[#6B6B6B]">
            Host virtual events via streaming or video conference
          </CardDescription>
        </CardHeader>
      </Card>

      <Card
        className={cn(
          "hover:border-primary/50 h-[228px] cursor-pointer rounded-[8px] transition-all",
          eventType === EventType.VENUE ? "border-primary" : "border border-[#E8EAED]"
        )}
        onClick={() => handleSelect(EventType.VENUE)}
      >
        <CardHeader className="flex h-full w-full flex-col justify-between">
          <div className="flex w-full items-start justify-between">
            <div className="rounded-[8px] bg-[#DCFCE7] p-3 text-[#00A63E]">
              <MapPin className="h-6 w-6" />
            </div>
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border-2",
                eventType === EventType.VENUE ? "border-primary bg-primary" : "border-gray-300"
              )}
            >
              {eventType === EventType.VENUE && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>
          <CardTitle className="mt-4 text-base font-normal text-[#1E1E1E]">Venue Event</CardTitle>
          <CardDescription className="mb-4 max-w-[320px] text-base text-[#6B6B6B]">
            Host in-person events at a physical location
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
