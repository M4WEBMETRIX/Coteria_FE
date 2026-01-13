import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { name: "2 April", awareness: 65, interest: 45, participants: 30, influencer: 25 },
  { name: "2 April", awareness: 55, interest: 55, participants: 45, influencer: 20 },
  { name: "2 April", awareness: 40, interest: 65, participants: 70, influencer: 15 },
  { name: "3 April", awareness: 38, interest: 45, participants: 60, influencer: 18 },
  { name: "3 April", awareness: 55, interest: 35, participants: 35, influencer: 45 },
  { name: "3 April", awareness: 78, interest: 50, participants: 45, influencer: 25 },
  { name: "4 April", awareness: 60, interest: 60, participants: 30, influencer: 35 },
  { name: "4 April", awareness: 50, interest: 45, participants: 55, influencer: 20 },
  { name: "5 April", awareness: 45, interest: 35, participants: 45, influencer: 55 },
  { name: "5 April", awareness: 65, interest: 55, participants: 30, influencer: 60 },
  { name: "5 April", awareness: 80, interest: 65, participants: 40, influencer: 45 },
  { name: "5 April", awareness: 70, interest: 50, participants: 65, influencer: 35 },
  { name: "5 April", awareness: 55, interest: 40, participants: 50, influencer: 25 },
  { name: "5 April", awareness: 85, interest: 60, participants: 35, influencer: 40 },
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
              <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAwareness" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#12AA5B" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#12AA5B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#8B8D98" }}
                  dy={10}
                  interval={2} // Show fewer labels to avoid clutter with dense data
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
