import CommunityAiInsightWidget from "@/components/community/community-ai-insight-widget";
import CommunityInsightsWidget from "@/components/community/community-insights-widget";

export function InsightsPanels() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Community Insights */}
      <CommunityInsightsWidget />

      {/* Coterie Ai Insight */}
      <CommunityAiInsightWidget />
    </div>
  );
}
