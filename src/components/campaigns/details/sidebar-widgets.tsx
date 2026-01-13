import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const WhatsHappeningWidget = () => {
  return (
    <Card className="rounded-xl border-[#E0E1E6] bg-white shadow-sm">
      <CardHeader className="border-b border-[#E0E1E6] px-4">
        <CardTitle className="text-sm font-semibold text-[#1E1F24]">What's Happening</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
        <div className="flex items-start gap-2">
          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#12AA5B]"></div>
          <p className="text-xs leading-5 text-[#5E606A]">
            Momentum is growing steadily from two community leaders, sharing insights, care tips,
            networks...
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#12AA5B]"></div>
          <p className="text-xs leading-5 text-[#5E606A]">
            Influencer led shares - convert to participants at a $6 higher rate than direct shares.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const RequestParticipantsWidget = () => {
  return (
    <Card className="rounded-xl border border-[#12AA5B]/20 bg-[#F2FDE6] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-[#12AA5B]/10 px-4">
        <CardTitle className="text-sm font-semibold text-[#1E1F24]">
          Request from Participants
        </CardTitle>
        <ChevronRight className="h-4 w-4 text-[#1E1F24]" />
      </CardHeader>
      <CardContent className="px-4">
        <p className="mb-3 text-[10px] leading-4 text-[#5E606A]">
          100+ participants in "Housing Support Drive" request for a new campaign
        </p>
        <Button className="h-8 w-full bg-[#12AA5B] text-xs font-medium text-white hover:bg-[#12AA5B]/90">
          Share our campaign
        </Button>
      </CardContent>
    </Card>
  );
};
