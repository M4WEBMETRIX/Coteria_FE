import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share01Icon, UserAdd01Icon, Mail01Icon, ArrowDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ArrowDown01Icon } from "lucide-react";

const data = [
  { name: "2 days", value: 2000, active: false },
  { name: "0.of", value: 3000, active: false },
  { name: "April 4", value: 4500, active: true },
  { name: "Oct", value: 2780, active: false },
  { name: "April 4", value: 1890, active: false },
  { name: "Apr 6", value: 2390, active: false },
  { name: "April 6", value: 3490, active: false },
  { name: "April 14", value: 2000, active: false },
];

const TodaysObjectivesWidget = () => {
  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base leading-[100%] font-semibold tracking-[0%] text-[#68686F]">
          Today's Objectives
        </h3>
        <div className="flex gap-2">
          <div className="flex h-full items-center gap-1 rounded-md border-[#E0E1E6] bg-white px-2 py-1">
            {/* Icons for time/filter */}
            {/* <div className="h-4 w-4 rounded-full border border-gray-300"></div>
            <div className="h-4 w-4 rounded-full border border-gray-300"></div>
            <div className="h-4 w-4 rounded-full border border-gray-300"></div> */}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="h-8 gap-2 border-[#E0E1E6] bg-white text-xs text-[#9D9FA6]"
        >
          <HugeiconsIcon icon={Share01Icon} size={14} />
          Share
        </Button>
        <Button
          variant="outline"
          className="h-8 gap-2 border-[#E0E1E6] bg-white text-xs text-[#9D9FA6]"
        >
          <HugeiconsIcon icon={UserAdd01Icon} size={14} />
          Invite
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 gap-2 border-[#E0E1E6] bg-white text-xs text-[#9D9FA6]"
          >
            <HugeiconsIcon icon={Mail01Icon} size={14} />
            Send Update
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 border-[#E0E1E6] bg-white">
            <span className="text-xs">
              <HugeiconsIcon icon={ArrowDown} size={14} />
            </span>
          </Button>
        </div>
      </div>

      <Card className="relative min-h-[250px] flex-1 rounded-xl border-[#E0E1E6] bg-white shadow-sm">
        <CardContent className="h-full p-4">
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs text-[#8B8D98]">[od 8.2pr]</span>
          </div>

          {/* Floating Stats Card inside Chart */}
          <div className="absolute top-10 right-20 z-10 w-[200px] rounded-xl border border-[#E0E1E6] bg-white p-3 shadow-lg">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h4 className="flex items-center gap-1 text-xl font-bold text-[#1E1F24]">
                  +42{" "}
                  <span className="ml-1 text-xs font-normal text-[#5E606A]">new participants</span>
                </h4>
              </div>
              <div className="h-2 w-2 rounded-full bg-[#12AA5B]"></div>
            </div>
            <div className="my-2 h-px bg-[#E0E1E6]" />
            <div className="mb-1 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FDB022]"></div>
              <span className="text-xs text-[#5E606A]">80% driven</span>
            </div>
            <p className="pl-3.5 text-[10px] text-[#8B8D98]">by high-confidence amplifiers</p>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E1E6" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#8B8D98" }}
                dy={10}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#8B8D98" }} />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.active ? "#12AA5B" : "#88D9A8"} /> // Active green vs lighter green
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodaysObjectivesWidget;
