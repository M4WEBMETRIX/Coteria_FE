// import { Badge } from "@/components/ui/badge";
// import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { Button } from "@/components/ui/button";
import { useUserAppBreadcrumb } from "@/components/user-app-breadcrumb";
import {
  Funnel,
  CaretDown,
  PlayCircle,
  Users,
  CaretRightIcon,
  ClockIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

const EventsIndex = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "attended" | "past">("upcoming");

  const upcomingEvents = [
    {
      id: 1,
      title: "Tenant Rights & Repairs",
      community: "<Community Name>",
      date: "Sun Mar 12 at 5:00PM",
      going: 15,
      image: "https://placehold.co/400x250/png",
    },
    {
      id: 2,
      title: "Tenant Rights & Repairs",
      community: "<Community Name>",
      date: "Sun Mar 12 at 5:00PM",
      going: 15,
      image: "https://placehold.co/400x250/png",
    },
  ];

  const virtualEvents = [
    {
      id: 1,
      title: "Learn budgeting and savings tips with community experts.",
      duration: "30 mins",
      date: "Sun Mar 12 at 5:00PM",
      image: "https://placehold.co/300x180/png",
    },
  ];

  const pastEvents = [
    {
      id: 1,
      title: "Community Garden Build Day",
      date: "Sun Mar 12 at 5:00PM",
      type: "One-time",
    },
    {
      id: 2,
      title: "Community Garden Build Day",
      date: "Sun Mar 12 at 5:00PM",
      type: "One-time",
    },
  ];

  useUserAppBreadcrumb({
    items: [{ label: "Events", href: "/user/events", isCurrentPage: true }],
  });

  return (
    <div className="mx-auto w-full space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <p className="text-2xl leading-[150%] tracking-[-2%] text-[#515151]">
          Events happening across all your communities
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`cursor-pointer rounded-[10px] border px-4 py-2.5 text-sm font-normal transition-colors ${activeTab === "upcoming" ? "border-[#F6F6F6] bg-[#DCFFE3] text-[#02B128]" : "border-[#F6F6F6] bg-[#FCFCFC] text-[#818898] hover:bg-gray-200"}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("attended")}
            className={`cursor-pointer rounded-[10px] px-4 py-2.5 text-sm font-normal transition-colors ${activeTab === "attended" ? "border-[#F6F6F6] bg-[#DCFFE3] text-[#02B128]" : "border-[#F6F6F6] bg-[#FCFCFC] text-[#818898] hover:bg-gray-200"}`}
          >
            Attended
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`cursor-pointer rounded-[10px] px-4 py-2.5 text-sm font-normal transition-colors ${activeTab === "past" ? "border-[#F6F6F6] bg-[#DCFFE3] text-[#02B128]" : "border-[#F6F6F6] bg-[#FCFCFC] text-[#818898] hover:bg-gray-200"}`}
          >
            Past
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] text-[#818898]"
          >
            <Funnel size={18} /> Filter
          </Button>
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] text-[#818898]"
          >
            Sort Latest <CaretDown size={14} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column: Upcoming Events */}
        <div className="space-y-6 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] px-4 py-2">
          <h2 className="text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
            Upcoming Events
          </h2>
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="h-full space-y-4 rounded-[10px] border border-[#F6F6F6] bg-white p-4"
              >
                <div className="flex h-full flex-col gap-6 md:flex-row">
                  <div className="h-full space-y-6">
                    <div className="flex h-full flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                          {event.title}
                        </h3>
                        <p className="text-[15px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                          {event.community}
                        </p>
                        <p className="mt-3 text-lg leading-[155%] font-normal tracking-[0%] text-[#6B6B6B]">
                          {event.date}
                        </p>
                      </div>
                      <div className="mt-16 flex items-center gap-4">
                        <div className="flex items-center gap-2 rounded-[10px] border border-[#F6F6F6] bg-[#F6F6F6] px-3 py-1.5 text-sm text-[#818898]">
                          <Users size={16} weight="fill" />
                          <span>{event.going} going</span>
                        </div>
                        <span className="cursor-pointer text-sm leading-[155%] font-normal text-[#818898] hover:text-[#12AA5B]">
                          Learn More
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full items-start gap-2 pt-2">
                      <span className="mt-0.5 text-yellow-500">💡</span>
                      <p className="text-[10px] leading-[155%] font-normal tracking-[0%] text-[#A4A4A4]">
                        Event participation counts toward your community <br /> activity and impact
                        score.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="h-[191px] w-full overflow-hidden rounded-lg bg-gray-200 md:w-[308px]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <Button className="h-11 w-full rounded-full bg-[#12AA5B] text-base font-medium text-white hover:bg-[#00b05b]">
                      RSVP <CaretRightIcon className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Virtual & Past Events */}
        <div className="space-y-6">
          {/* Virtual Events */}
          <div className="space-y-6 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] px-4 py-2">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Virtual Events
              </h2>
              <span className="cursor-pointer text-sm leading-[155%] font-normal tracking-[0%] text-[#12AA5B]">
                See All
              </span>
            </div>
            {virtualEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col justify-between gap-4 rounded-[10px] border border-[#F6F6F6] bg-white p-4 md:flex-row"
              >
                <div className="max-w-67 flex-1 space-y-2">
                  <h3 className="text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-lg leading-[155%] font-normal tracking-[0%] text-[#6B6B6B]">
                    <span className="flex items-center gap-1">
                      <ClockIcon size={20} /> {event.duration}
                    </span>
                  </div>
                  <p className="text-lg leading-[155%] font-normal tracking-[0%] text-[#3B3B3B]">
                    {event.date}
                  </p>
                </div>
                <div className="group relative h-38.5 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 md:w-54.75">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                    <PlayCircle size={32} className="text-white drop-shadow-md" weight="fill" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Past Events */}
          <div className="space-y-6 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] px-4 py-2">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Past Events
              </h2>
              <span className="cursor-pointer text-sm leading-[155%] font-normal tracking-[0%] text-[#12AA5B]">
                See All
              </span>
            </div>
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-[10px] border border-[#F6F6F6] bg-white p-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Users weight="fill" size={20} />
                      </div>
                      <h4 className="text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                        {event.title}
                      </h4>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-lg leading-[155%] font-normal tracking-[0%] text-[#6B6B6B]">
                        <span>{event.date}</span>
                        <span className="ml-2 h-5 w-0.5 rounded-full bg-[#000000]" />
                        <span>{event.type}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="h-12 rounded-full bg-[#12AA5B] px-5 text-base font-medium text-white hover:bg-[#00b05b]">
                    <div className="flex items-center gap-2">
                      Recap <CaretRightIcon weight="bold" className="h-3.5 w-3.5" />
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsIndex;
