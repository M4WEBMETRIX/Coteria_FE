import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CaretRightIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";

const ActivityFeedWidget = () => {
  return (
    <div className="rounded-xl border border-[#DFE1E7] bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A4C5q4]">Activity Feed</h3>
        <CaretRightIcon size={16} className="text-[#98A2B3]" />
      </div>{" "}
      <Separator className="my-2.5" />
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <span className="text-[10px] font-normal text-[#4A4C54]">Sarah M</span>{" "}
            <span className="text-[7px] text-[#C5C5C5]">shared campaign</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?u=michelle" />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <span className="text-[10px] font-normal text-[#4A4C54]">Michelle R</span>{" "}
            <span className="text-[7px] text-[#C5C5C5]">pinned campaign</span>
          </div>
        </div>
        <Separator className="my-2.5" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=rebecca" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <span className="text-[10px] font-normal text-[#4A4C54]">Rebecca A</span>{" "}
              <span className="text-[7px] text-[#C5C5C5]">sent an application invite</span>
            </div>
          </div>
          <div className="flex gap-0.5">
            <div className="h-0.5 w-0.5 rounded-full bg-[#C5C5C5]" />
            <div className="h-0.5 w-0.5 rounded-full bg-[#C5C5C5]" />
            <div className="h-0.5 w-0.5 rounded-full bg-[#C5C5C5]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeedWidget;
