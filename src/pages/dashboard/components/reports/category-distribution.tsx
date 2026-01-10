import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ArrowClockwise } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const chartData = [
  { category: "medical", count: 350, fill: "#033E24" }, // Emerald 700 - dark green
  { category: "education", count: 220, fill: "#04512F" }, // Emerald 500 - green
  { category: "animal", count: 180, fill: "#05693C" }, // Emerald 400 - light green
  { category: "disaster", count: 150, fill: "#06874D" }, // Emerald 300 - lighter green
  { category: "community", count: 100, fill: "#079455" }, // Emerald 200 - lightest green
];

const chartConfig = {
  medical: {
    label: "Medical",
    color: "#033E24",
  },
  education: {
    label: "Education",
    color: "#04512F",
  },
  animal: {
    label: "Animal Welfare",
    color: "#05693C",
  },
  disaster: {
    label: "Disaster Relief",
    color: "##06874D",
  },
  community: {
    label: "Community",
    color: "#079455",
  },
} satisfies ChartConfig;

export function CategoryDistributionChart() {
  return (
    <div className="col-span-12 rounded-xl border border-[#DFE1E7] bg-white lg:col-span-4">
      <div className="mb-6 flex items-center justify-between border-b border-[#DFE1E7] p-5">
        <h3 className="leading-[150%] font-medium tracking-[2%] text-[#0D0D12]">
          Top 5 Campaign Categories
        </h3>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ArrowClockwise size={14} />
        </Button>
      </div>

      <div className="bg-[] flex items-center justify-center gap-4 px-5">
        {/* Donut Chart */}
        <div className="relative h-[200px] w-[200px]">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[200px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="category"
                innerRadius={50}
                outerRadius={80}
                strokeWidth={0}
              />
            </PieChart>
          </ChartContainer>
          {/* Center Text if needed, or empty */}
        </div>

        {/* Legend */}
        <div className="flex w-full max-w-[150px] flex-col gap-1 text-xs">
          {chartData.map((item) => {
            const total = chartData.reduce((acc, curr) => acc + curr.count, 0);
            const percentage = Math.round((item.count / total) * 100);
            const label = chartConfig[item.category as keyof typeof chartConfig].label;

            return (
              <div
                key={item.category}
                className="flex items-center justify-between border-b border-[#DFE1E7] py-3 text-sm leading-[150%] tracking-[2%] text-[#666D80] last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  ></span>
                  <span className="t">{label}</span>
                </div>
                <span className="font-medium">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
