import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import IMAGE from "@/assets/images/Image-22.png";

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
    <div className="rounded-xl border border-[#E0E1E6]">
      <div>
        <img src={IMAGE} className="h-[114px] w-full" alt="img" />
      </div>
      <div className="w-full p-2">
        <div className="my-1">
          <p className="text-sm font-medium text-[#4A4C54]">Housing Support Drive</p>
          <p className="text-[10px] leading-[17.7px] font-normal text-[#838880]">
            Help families access sate and stable housing through community support.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <Button className="bg-primary w-full">Share our campaign</Button>
          <Button className="w-full border border-[#F2F2F2] bg-[#F6F6F6] text-sm leading-[100%] text-[#4A4C54]">
            Share Application Invite
          </Button>
        </div>
        <p className="mt-[14px] text-[10px] font-normal text-[#838880]">
          Champions will receive a personalized invitation to join your community{" "}
        </p>
      </div>
    </div>
  );
};

export default DriverAnalysisWidget;
