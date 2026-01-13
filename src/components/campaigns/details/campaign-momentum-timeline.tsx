import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "2 April", awareness: 16500, interest: 14500, participants: 13000, influencer: 12500 },
  { name: "2 April", awareness: 15500, interest: 15500, participants: 14500, influencer: 12000 },
  { name: "2 April", awareness: 14000, interest: 16500, participants: 17000, influencer: 11500 },
  { name: "3 April", awareness: 13800, interest: 14500, participants: 16000, influencer: 11800 },
  { name: "3 April", awareness: 15500, interest: 13500, participants: 13500, influencer: 14500 },
  { name: "3 April", awareness: 17800, interest: 15000, participants: 14500, influencer: 12500 },
  { name: "4 April", awareness: 16000, interest: 16000, participants: 13000, influencer: 13500 },
  { name: "4 April", awareness: 15000, interest: 14500, participants: 15500, influencer: 12000 },
  { name: "5 April", awareness: 14500, interest: 13500, participants: 14500, influencer: 15500 },
  { name: "5 April", awareness: 16500, interest: 15500, participants: 13000, influencer: 16000 },
  { name: "5 April", awareness: 18000, interest: 16500, participants: 14000, influencer: 14500 },
  { name: "5 April", awareness: 17000, interest: 15000, participants: 16500, influencer: 13500 },
  { name: "5 April", awareness: 15500, interest: 14000, participants: 15000, influencer: 12500 },
  { name: "5 April", awareness: 18500, interest: 16000, participants: 13500, influencer: 14000 },
];

const CampaignMomentumTimeline = () => {
  return (
    <div className="w-full border-[#E0E1E6]">
      <div className="">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#68686F]">Campaign Momentum Timeline</h3>
          <div className="rounded border border-[#E0E1E6] bg-[#FCFCFD] px-2 py-1 text-xs text-[#5E606A]">
            Last 7 days
          </div>
        </div>

        <div className="rounded-xl border">
          {/* Legend */}
          <div className="mb-4 flex items-center gap-6 border-b px-6 py-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-[7px] w-7 rounded-full bg-[#12AA5B]"></div>
              <span className="text-[#8B8D98]">Awareness</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-[7px] w-7 rounded-full bg-[#88D9A8]"></div>
              <span className="text-[#8B8D98]">Interest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-[7px] w-7 rounded-full bg-[#FDB022]"></div>
              <span className="text-[#8B8D98]">Participants</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-[7px] w-7 rounded-full bg-[#2E90FA]"></div>
              <span className="text-[#8B8D98]">Influencer</span>
            </div>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAwareness" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#12AA5B" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#12AA5B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E1E6" />
                <Tooltip />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#8B8D98" }}
                  dy={10}
                  interval={2}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#8B8D98" }}
                  tickFormatter={(value) => `${value / 1000}K`}
                  //   domain={[8000, "auto"]}
                  //   ticks={[10000]}
                  width={30}
                />
                <Area
                  type="monotone"
                  dataKey="awareness"
                  stroke="#12AA5B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAwareness)"
                />
                <Area
                  type="monotone"
                  dataKey="interest"
                  stroke="#88D9A8"
                  strokeWidth={2}
                  fillOpacity={0}
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="participants"
                  stroke="#FDB022"
                  strokeWidth={2}
                  fillOpacity={0}
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="influencer"
                  stroke="#2E90FA"
                  strokeWidth={2}
                  fillOpacity={0}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignMomentumTimeline;
