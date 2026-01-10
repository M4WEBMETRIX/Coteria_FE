interface ActivityItem {
  name: string;
  action: string;
  time: string;
}

const ActivitySummaryCard = () => {
  const activities: ActivityItem[] = [
    {
      name: "Sarah",
      action: "invited 3 new supporters",
      time: "1 day ago",
    },
    {
      name: "James",
      action: "shared the Housing Campaign",
      time: "1 day ago",
    },
    {
      name: "5 supporters",
      action: "completed a vote",
      time: "1 day ago",
    },
  ];

  return (
    <div className="min-h-57.5 w-full rounded-xl border border-[#DFE1E7] px-4 py-4 shadow-[0px_1px_2px_0px_#E4E5E7]">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#0D0D12]">Last 7 Days Activity Summary</h3>
        <button className="text-sm font-medium text-[#12AA5B] hover:underline">Refresh</button>
      </header>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start justify-between border-b border-[#EFF0F3] py-2 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-[#12AA5B]">
                {activity.name}{" "}
                <span className="font-normal text-[#4A4C54]">{activity.action}</span>
              </p>
            </div>
            <span className="text-xs text-[#838880]">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySummaryCard;
