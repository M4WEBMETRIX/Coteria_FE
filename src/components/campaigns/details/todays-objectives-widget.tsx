import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share01Icon, UserAdd01Icon, Mail01Icon, ArrowDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", green: 30000, yellow: 45000 },
  { name: "Feb", green: 28000, yellow: 35000 },
  { name: "Mar", green: 45000, yellow: 60000 },
  { name: "Apr", green: 75000, yellow: 55000 },
  { name: "May", green: 55000, yellow: 55000 },
  { name: "Jun", green: 55000, yellow: 90000 },
  { name: "Jul", green: 75000, yellow: 85000 },
];

const TodaysObjectivesWidget = () => {
  return (
    <div className="flex h-[250px] w-full flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base leading-[100%] font-semibold tracking-[0%] text-[#68686F]">
          Today's Objectives
        </h3>
        <div className="flex gap-2">
          {/* <div className="flex h-full items-center gap-1 rounded-md border-[#E0E1E6] bg-white px-2 py-1">
          </div> */}
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

      <Card className="relative h-full flex-1 rounded-xl border-[#E0E1E6] bg-white shadow-sm">
        <CardContent className="h-full p-4">
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs text-[#8B8D98]">[od 8.2pr]</span>
          </div>

          {/* Floating Stats Card inside Chart */}
          {/* <div className="absolute top-4 left-1/2 z-10 w-[240px] -translate-x-1/2 rounded-xl border border-[#E0E1E6] bg-white p-3 shadow-lg">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h4 className="flex items-center gap-1 text-base font-bold text-[#1E1F24]">
                  +42 <span className="text-xs font-normal text-[#5E606A]">new participants</span>
                </h4>
              </div>
              <div className="text-[10px] font-medium text-[#12AA5B]">• Apr 4</div>
            </div>
            <div className="my-2 h-px bg-[#E0E1E6]" />
            <div className="mb-1 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FDB022]"></div>
              <span className="text-sm font-medium text-[#1E1F24]">80% driven</span>
            </div>
            <p className="pl-3.5 text-[10px] text-[#8B8D98]">by high-confidence amplifiers</p>
            <div className="mt-2 pl-3.5">
              <p className="text-[8px] tracking-wider text-[#8B8D98] uppercase">
                Top Referral Channel
              </p>
              <p className="text-sm font-semibold text-[#1E1F24]">Whatsapp</p>
            </div>
          </div> */}

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
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#8B8D98" }}
                tickFormatter={(value) => `${value / 1000}K`}
              />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar dataKey="green" fill="#12AA5B" radius={[4, 4, 0, 0]} barSize={12} />
              <Bar dataKey="yellow" fill="#FDB022" radius={[4, 4, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodaysObjectivesWidget;
