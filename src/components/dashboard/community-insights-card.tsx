interface InsightMetric {
  value: string;
  change: string;
  label: string;
}

const CommunityInsightsCard = () => {
  const metrics: InsightMetric[] = [
    { value: "54%", change: "+2.3%", label: "New members" },
    { value: "46%", change: "+1.3%", label: "Returning members" },
  ];

  return (
    <div className="min-h-57.5 w-full rounded-xl border border-[#DFE1E7] px-4 py-4 shadow-[0px_1px_2px_0px_#E4E5E7]">
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-[#0D0D12]">Community Insights</h3>
        <p className="mt-1 text-xs text-[#838880]">
          AI highlights representation trends and their impact on engagement and performance.
        </p>
      </header>

      <div className="mb-4 space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#12AA5B]"></div>
                <span className="text-sm font-semibold text-[#0D0D12]">{metric.value}</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded bg-[#1a1a1a] px-2 py-1 text-xs font-medium text-white">
                {metric.change}
              </span>
            </div>
            <span className="text-xs text-[#838880]">{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#12AA5B] p-3">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-xs text-white">
          Community growth is being driven primarily by influencer sharing rather than direct
          campaign traffic. Influencer-led joins convert 2× higher than average.
        </p>
      </div>
    </div>
  );
};

export default CommunityInsightsCard;
