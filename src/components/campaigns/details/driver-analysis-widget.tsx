import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const data = [
  { name: "High-confidence", value: 2, color: "#2E90FA" }, // Blue
  { name: "Emerging", value: 4, color: "#9747FF" }, // Purple
  { name: "Broadcast", value: 14, color: "#F04438" }, // Red (using red for bottom segment based on image, looks like reddish orange?)
  // Actually screenshot: Blue (High conf), Purple (Emerging?), Red/Orange (Broadcast?)
  // Let's approximate colors:
  // High-confidence: Blue #2E90FA
  // Emerging: Purple? The screenshot shows a big red chunk, purple chunk, blue chunk.
  // The legend says: High-confidence (Blue), Emerging (Greenish?), Broadcast (Red).
  // Wait, let's look at legend dots:
  // High-confidence: Blue
  // Emerging: Greenish/Teal?
  // Broadcast: Red
  // But the chart itself has: Blue, Purple, Orange/Red.
  // I'll stick to a nice palette: Blue, Purple, Orange.
];

const DriverAnalysisWidget = () => {
  return (
    <div className="h-full rounded-xl border-[#E0E1E6] bg-[#F6F8FA] shadow-sm">
      <div className="flex flex-row items-center justify-between p-4 pb-2">
        <h3 className="text-sm font-semibold text-[#717279]">Driver Analysis</h3>
        <ChevronDown className="h-4 w-4 text-[#8B8D98]" />
      </div>
      <Separator />
      <div>
        <div className="mb-4 rounded-lg bg-[#F9FAFB] p-4">
          <div className="flex items-start gap-2">
            <div className="mt-1.5 h-2 w-2 rounded-full bg-[#12AA5B]"></div>
            <div>
              <p className="text-xs leading-4 text-[#5E606A]">
                Community leader shared <br /> outside of network
              </p>
            </div>
          </div>
        </div>{" "}
        <Separator />
        <div className="mb-4 rounded-lg bg-[#F9FAFB] p-4">
          <div className="flex items-start gap-2">
            <div className="mt-1.5 h-2 w-2 rounded-full bg-[#12AA5B]"></div>
            <div>
              <p className="text-xs leading-4 text-[#5E606A]">
                Personal campaign <br /> update sent at 2:00 PM
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="my-3 flex items-center justify-between px-2">
          <span className="text-sm font-bold text-[#71737A]">Amplifiers</span>
          <span className="flex items-center gap-1 text-[10px] text-[#A2A6B0]">
            2 detected <ChevronDown className="h-3 w-3" />
          </span>
        </div>{" "}
        <Separator />
        <p className="mt-2 mb-4 px-2 text-[8px] leading-[100%] text-[#BABDC5]">
          High-confidence amplifiers consistently drive participation.
        </p>
        <div className="relative mb-4 flex h-[160px] w-full justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={0}
                dataKey="value"
                startAngle={180}
                endAngle={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-xs font-semibold text-[#888888]">Overview</span>
          </div>
        </div>
        <div className="space-y-2 px-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#2E90FA]"></div>
              <span className="text-[#5E606A]">High-confidence</span>
            </div>
            <span className="font-medium text-[#1E1F24]">2</span>
            <div className="relative h-3 w-6 rounded-full bg-[#E0F2FE]">
              <div className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-[#2E90FA]"></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#9747FF]"></div>
              <span className="text-[#5E606A]">Emerging</span>
            </div>
            <span className="font-medium text-[#1E1F24]">4</span>
            <div className="relative h-3 w-6 rounded-full bg-[#F4EBFF]">
              <div className="absolute top-0.5 left-0.5 h-2 w-2 rounded-full bg-[#9747FF]"></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#F04438]"></div>
              <span className="text-[#5E606A]">Broadcast</span>
            </div>
            <span className="font-medium text-[#1E1F24]">14</span>
            <div className="relative h-3 w-6 rounded-full bg-[#FEF3F2]">
              <div className="absolute top-0.5 left-0.5 h-2 w-2 rounded-full bg-[#F04438]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverAnalysisWidget;
