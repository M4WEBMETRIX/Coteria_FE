import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RotateCcw } from "lucide-react";

interface DataPoint {
  date: string;
  amount: number;
  donations: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: DataPoint }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const month = "April 2025"; // Static for now, can be dynamic
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-[#E4E5E7] bg-white p-3 shadow-lg">
        <p className="font-semibold text-[#0D0D12]">{month}</p>
        <p className="text-sm text-[#12AA5B]">
          Amount: <span className="font-semibold">${(data.amount / 1000).toFixed(0)}K</span>
        </p>
        <p className="text-sm text-[#FFA500]">
          Donations: <span className="font-semibold">{data.donations}</span>
        </p>
      </div>
    );
  }
  return null;
};

const GrowthTrendsCard = () => {
  const [month] = useState("December");

  // Mock data for the chart
  const data: DataPoint[] = [
    { date: "1st Dec", amount: 75000, donations: 25000 },
    { date: "", amount: 72000, donations: 26000 },
    { date: "", amount: 68000, donations: 24000 },
    { date: "", amount: 85000, donations: 22000 },
    { date: "", amount: 78000, donations: 23000 },
    { date: "", amount: 72000, donations: 25000 },
    { date: "", amount: 88000, donations: 24000 },
    { date: "", amount: 82000, donations: 26000 },
    { date: "", amount: 75000, donations: 25000 },
    { date: "", amount: 70000, donations: 23000 },
    { date: "", amount: 76000, donations: 24000 },
    { date: "", amount: 85000, donations: 27000 },
    { date: "", amount: 92000, donations: 28000 },
    { date: "", amount: 88000, donations: 26000 },
    { date: "", amount: 95000, donations: 29000 },
    { date: "", amount: 100000, donations: 30000 },
    { date: "Today", amount: 102000, donations: 31000 },
  ];

  const handleRefresh = () => {
    // Placeholder for refresh logic
    console.log("Chart refreshed");
  };

  return (
    <div className="w-full rounded-xl border border-[#DFE1E7] px-6 py-4 shadow-[0px_1px_2px_0px_#E4E5E7]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#0D0D12]">Growth Trends</h3>
          <div className="mt-2 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-4 rounded-sm bg-[#12AA5B]"></div>
              <span className="text-xs text-[#838880]">Amount Raised</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-4 rounded-sm bg-[#FFA500]"></div>
              <span className="text-xs text-[#838880]">Donations Count</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#4A4C54]">{month}</span>
            <button className="text-[#838880] hover:text-[#0D0D12]">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V15a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={handleRefresh}
            className="text-[#838880] transition hover:text-[#0D0D12]"
            title="Refresh"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-65 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#079455" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#079455" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#079455" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#079455" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EFF0F3" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#838880"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#838880" }}
            />
            <YAxis
              yAxisId="left"
              stroke="#838880"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#838880" }}
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#838880"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#838880" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(18, 170, 91, 0.1)" }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="amount"
              stroke="#12AA5B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAmount)"
              isAnimationActive={true}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="donations"
              stroke="#FFA500"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDonations)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthTrendsCard;
