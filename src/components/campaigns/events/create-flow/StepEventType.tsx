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
          "hover:border-primary/50 cursor-pointer transition-all",
          eventType === EventType.ONLINE ? "border-primary ring-primary/20 ring-2" : ""
        )}
        onClick={() => handleSelect(EventType.ONLINE)}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
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
          <CardTitle className="mt-4">Online Event</CardTitle>
          <CardDescription>Host virtual events via streaming or video conference</CardDescription>
        </CardHeader>
      </Card>

      <Card
        className={cn(
          "hover:border-primary/50 cursor-pointer transition-all",
          eventType === EventType.VENUE ? "border-primary ring-primary/20 ring-2" : ""
        )}
        onClick={() => handleSelect(EventType.VENUE)}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
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
          <CardTitle className="mt-4">Venue Event</CardTitle>
          <CardDescription>Host in-person events at a physical location</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
