import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowsClockwise } from "@phosphor-icons/react";

const chartData = [
  { month: "Jan", amount: 2500, count: 1800 },
  { month: "Feb", amount: 3500, count: 2200 },
  { month: "Mar", amount: 4800, count: 2900 },
  { month: "Apr", amount: 3200, count: 2000 },
  { month: "May", amount: 3000, count: 2600 },
  { month: "Jun", amount: 2800, count: 1400 },
];

const chartConfig = {
  amount: {
    label: "Amount Raised",
    color: "#10B981", // Emerald 500
  },
  count: {
    label: "Donations Count",
    color: "#FBBF24", // Amber 400
  },
} satisfies ChartConfig;

export function DonationTrendsChart() {
  return (
    <div className="flex-1 rounded-xl border border-[#DFE1E7] bg-white p-6 lg:col-span-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="leading-[150%] font-medium tracking-[2%] text-[#0D0D12]">
            Monthly Donations Trend
          </h3>
          <div className="mt-1 flex items-center gap-4 text-xs">
            {[
              { label: "Amount Raised", color: "bg-[#10B981]" },
              { label: "Donations Count", color: "bg-[#FBBF24]" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-[2px] ${item.color}`}></span>
                <span className="text-[#666D80]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="monthly">
            <SelectTrigger className="h-8 w-[100px] text-xs text-[#666D80]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[
                { value: "monthly", label: "Monthly" },
                { value: "weekly", label: "Weekly" },
              ].map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowsClockwise size={14} color="#666D80" />
          </Button>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[315px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          barGap={8}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
            style={{ fontSize: "14px", fill: "#818898", fontStyle: "normal" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
            style={{ fontSize: "14px", fill: "#818898", fontStyle: "normal" }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {/* <ChartLegend content={<ChartLegendContent />} /> */}
          <Bar dataKey="amount" fill="#079455" radius={[4, 4, 4, 4]} barSize={20} />
          <Bar dataKey="count" fill="#FFBE4C" radius={[4, 4, 4, 4]} barSize={20} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
