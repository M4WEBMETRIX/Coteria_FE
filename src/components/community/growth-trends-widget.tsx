import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown, RefreshCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Mock data
const data = [
  { day: "1st", raised: 50000, donations: 20000 },
  { day: "5th", raised: 40000, donations: 18000 },
  { day: "10th", raised: 70000, donations: 25000 },
  { day: "15th", raised: 30000, donations: 15000 },
  { day: "20th", raised: 80000, donations: 35000 },
  { day: "25th", raised: 55000, donations: 28000 },
  { day: "30th", raised: 90000, donations: 40000 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-[#E0E1E6] bg-white p-3 shadow-lg">
        <p className="mb-2 text-xs font-semibold text-[#1E1F24]">April 2025</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-[#5E606A]">Amount</span>
          <span className="text-xs font-semibold text-[#12AA5B]">$75,08</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-[#5E606A]">Donations</span>
          <span className="text-xs font-semibold text-[#FDB022]">823</span>
        </div>
      </div>
    );
  }
  return null;
};

const GrowthTrendsWidget = () => {
  return (
    <div className="flex h-full w-full flex-col rounded-xl border border-[#DFE1E7] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base leading-[28px] font-medium tracking-[-3%] text-[#4A4C54]">
            Growth Trends
          </h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-[2px] bg-[#12AA5B]"></div>
              <span className="text-[#5E606A]">Amount Raised</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-[2px] bg-[#FDB022]"></div>
              <span className="text-[#5E606A]">Donations Count</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="December">
            <SelectTrigger className="h-8 w-[120px] rounded-lg border-[#E0E1E6] text-xs font-medium text-[#5E606A]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent className="h-[200px]">
              {MONTHS?.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button className="rounded-lg border border-[#E0E1E6] p-1.5 text-[#5E606A]">
            <RefreshCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="relative h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              // vertical={false}
              horizontal={false}
              stroke="#E0E1E6"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#666D80" }}
              // dy={10}
              tickFormatter={(value) =>
                value === "1st" ? "1st Dec 2025" : value === "30th" ? "Today" : ""
              }
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#666D80" }}
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#E0E1E6", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Line
              type="monotone"
              dataKey="raised"
              stroke="#12AA5B"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="donations"
              stroke="#FDB022"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthTrendsWidget;
