import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const ACTIVITIES = [
  {
    id: 1,
    content: (
      <>
        <span className="font-semibold text-[#12AA5B]">Sarah</span> invited{" "}
        <span className="font-semibold text-[#12AA5B]">3 new supporters</span>
      </>
    ),
    time: "1 day ago",
  },
  {
    id: 2,
    content: (
      <>
        <span className="font-semibold text-[#12AA5B]">James</span> shared the{" "}
        <span className="font-semibold text-[#12AA5B]">Housing Campaign</span>
      </>
    ),
    time: "1 day ago",
  },
  {
    id: 3,
    content: (
      <>
        5 supporters <span className="font-semibold text-[#12AA5B]">completed a vote</span>
      </>
    ),
    time: "1 day ago",
  },
];

const ActivityItem = ({
  children,
  time,
  className,
}: {
  children: React.ReactNode;
  time: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex h-[58px] items-center justify-between p-4 transition-all", className)}>
      <div className="text-sm leading-[150%] tracking-[-2%] text-[#4A4C54]">{children}</div>
      <span className="text-xs text-[#8B8D98]">{time}</span>
    </div>
  );
};

const ActivitySummaryWidget = () => {
  return (
    <div className="font-ubuntu flex h-full w-full flex-col rounded-xl border border-[#DFE1E7] bg-[#FCFCFD] shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-base leading-[28px] font-medium tracking-[-3%] text-[#4A4C54]">
          Last 7 Days Activity Summary
        </h3>
        <button className="text-xs font-semibold text-[#12AA5B]">Refresh</button>
      </div>
      <Separator />

      <div className="flex flex-col gap-2 p-4 pt-2">
        {ACTIVITIES.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            time={activity.time}
            // Logic: Normal (even index) -> bg-[#F6F6F6], Others (odd index) -> bg-white
            // However, user said "nth child will have bg-white normal will have bg-[#F6F6F6]"
            // Assuming alternating pattern.
            className={index % 2 !== 0 ? "bg-white" : "bg-[#F6F6F6]"}
          >
            {activity.content}
          </ActivityItem>
        ))}
      </div>
    </div>
  );
};

export default ActivitySummaryWidget;
