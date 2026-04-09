import { Button } from "@/components/ui/button";
import IMAGE from "@/assets/images/Image-22.png";
// import { useQueryState } from "nuqs";
import ContactInfluencerModal from "./contact-influencer-modal";
import { useState } from "react";
import InviteInfluencerModal from "./invite-influencer-modal";

const DriverAnalysisWidget = ({
  data,
}: {
  data: { name: string; description: string; imageUrl: string };
}) => {
  // const [, setTab] = useQueryState("view");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isInfluencerInvited, setIsInfluencerInvited] = useState(false);

  return (
    <>
      <div className="rounded-xl border border-[#E0E1E6]">
        <div>
          <img
            src={data?.imageUrl || IMAGE}
            className="h-[140px] w-full rounded-t-xl object-cover"
            alt="img"
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between p-2">
          <div className="my-1">
            <p className="line-clamp-1 text-sm font-medium text-[#4A4C54]">{data?.name}</p>
            <p className="line-clamp-3 min-h-[53px] text-[10px] leading-[17.7px] font-normal text-[#838880]">
              {data?.description}
            </p>
          </div>

          <Button
            disabled
            onClick={() => setIsInfluencerInvited(true)}
            className="bg-primary mt-2 w-full"
          >
            Post Announcement
          </Button>

          {/* COMMENTED OUT FOR MVC  */}

          {/* <div className="mt-4 space-y-3">
            <Button onClick={() => setIsInfluencerInvited(true)} className="bg-primary w-full">
              Invite an Influncer
            </Button>
            <Button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full border border-[#F2F2F2] bg-[#F6F6F6] text-sm leading-[100%] text-[#4A4C54]"
            >
              Contact an Influencer
            </Button>
          </div>
          <p className="my-[14px] text-[10px] font-normal text-[#838880]">
            Champions will receive a personalized invitation to join your community{" "}
          </p> */}
        </div>
      </div>
      <ContactInfluencerModal
        open={isContactModalOpen}
        setOpen={() => setIsContactModalOpen(false)}
      />

      <InviteInfluencerModal
        open={isInfluencerInvited}
        setOpen={() => setIsInfluencerInvited(false)}
      />
    </>
  );
};

export default DriverAnalysisWidget;
