import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PencilIcon,
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  InfoIcon,
  MonitorIcon,
} from "lucide-react";

import { useFormContext } from "react-hook-form";
import { EventType, type EventFormValues } from "./types";

const StepPublish = () => {
  const { getValues } = useFormContext<EventFormValues>();
  const values = getValues();
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Not set";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    // Assuming timeStr is HH:mm
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-base leading-[24px] font-normal text-[#1E1E1E]">Review and Publish</h2>
        <p className="text-base leading-[24px] font-normal text-[#6B6B6B]">
          Review your event details before publishing
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <InfoIcon className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-medium">Basic Information</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <PencilIcon className="h-4 w-4 text-gray-500" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Event Title</p>
              <p className="text-sm font-medium">{values.title || "Untitled Event"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Category</p>
              <p className="text-sm capitalize">{values.category || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Summary</p>
              <p className="line-clamp-2 text-sm text-gray-600">
                {values.summary || "No summary provided"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Location / Platform */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-green-100 p-2 text-green-600">
                {values.eventType === EventType.VENUE ? (
                  <MapPinIcon className="h-4 w-4" />
                ) : (
                  <MonitorIcon className="h-4 w-4" />
                )}
              </div>
              <CardTitle className="text-base font-medium">
                {values.eventType === EventType.VENUE ? "Venue Details" : "Online Details"}
              </CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <PencilIcon className="h-4 w-4 text-gray-500" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {values.eventType === EventType.VENUE ? (
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-sm">{values.venueAddress || "No address provided"}</p>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-500">Platform</p>
                  <p className="text-sm capitalize">
                    {values.platform?.replace("_", " ") || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Link Sharing</p>
                  <p className="text-sm text-gray-600">Share 1 hour before event</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Date & Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                <CalendarIcon className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-medium">Date & Time</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <PencilIcon className="h-4 w-4 text-gray-500" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Event Type</p>
              <p className="text-sm">{values.isRecurring ? "Recurring Event" : "Single Event"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Start</p>
              <p className="text-sm">
                {formatDate(values.startDate)} at {formatTime(values.startTime)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">End</p>
              <p className="text-sm">
                {formatDate(values.endDate)} at {formatTime(values.endTime)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ticketing */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-red-100 p-2 text-red-600">
                <TicketIcon className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-medium">Ticketing</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <PencilIcon className="h-4 w-4 text-gray-500" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Ticket Type</p>
              <p className="text-sm">{values.isTicketType ? "Paid Event" : "Free Event"}</p>
            </div>
            {values.isTicketType && values.tickets && (
              <div>
                <p className="text-sm font-medium text-gray-500">Tickets</p>
                <div className="mt-1 space-y-1">
                  {values.tickets.map((ticket: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{ticket.name}</span>
                      <span className="font-medium">₦{ticket.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Organizer Info Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Organizer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Business Name</p>
              <p className="text-sm">Your Event Company</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact Email</p>
              <p className="text-sm">hello@yourevents.com</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="link" className="h-auto p-0 text-red-500">
              Edit business profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepPublish;
