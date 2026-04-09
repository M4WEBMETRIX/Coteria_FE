import EmptyState from "@/components/reusable/empty-state";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react";

interface whatsHappeningProps {
  id?: string | number;
  title?: string;
  description?: string;
}

export const WhatsHappeningWidget = () => {
  const whatsHappening: whatsHappeningProps[] = [
    // {
    //   id: 1,
    //   title: "Activate 2 high-confidence champions",
    //   description: "Champions typically responds within 24hours.",
    // },
    // {
    //   id: 2,
    //   title: "Activate 2 high-confidence champions",
    //   description: "Champions typically responds within 24hours.",
    // },
    // {
    //   id: 3,
    //   title: "Activate 2 high-confidence champions",
    //   description: "Champions typically responds within 24hours.",
    // },
  ];

  return (
    <div className="rounded-xl border border-[#DFE1E7] bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A4C5q4]">Recommended Today</h3>
        <CaretRightIcon size={16} className="text-[#98A2B3]" />
      </div>{" "}
      <Separator className="my-[9px]" />
      <div className="no-scrollbar max-h-[80px] space-y-4 overflow-y-auto">
        {whatsHappening.length === 0 ? (
          <EmptyState
            title="No recommended actions yet"
            description="When campaign updates are available, they will show up here."
            imgClassName="h-[20px] w-[20px]"
            titleClassName="text-xs !pb-1"
            descriptionClassName="text-[10px] !pb-0"
            showImg={false}
            className="!mt-0 !py-0"
          />
        ) : (
          <>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#12AA5B]" />
              <p className="text-[10px] text-[#4A4C54]">
                Activate {whatsHappening.length} high-confidence champions
              </p>
            </div>
            {whatsHappening.map((item) => (
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D5FEF3CC]">
                  <CheckIcon size={10} weight="bold" className="text-[#12B76A]" />
                </div>
                <p className="text-[10px] text-[#838880]">{item.description}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export const RequestParticipantsWidget = () => {
  return (
    <div className="rounded-xl border border-[#DFE1E7] bg-[#F7FFE1] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A4C5q4]">Request from Participants</h3>
        <CaretRightIcon size={16} className="text-[#98A2B3]" />
      </div>
      <Separator className="my-[9px]" />
      <p className="mb-4 text-[10px] leading-relaxed text-[#838880]">
        100+ participants in "Housing Support Drive" request for a new campaign
      </p>
      <Button className="w-full bg-[#12B76A] text-sm hover:bg-[#039855]">Review Request</Button>
    </div>
  );
};
