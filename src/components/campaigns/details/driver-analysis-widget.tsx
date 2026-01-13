import { Button } from "@/components/ui/button";
import IMAGE from "@/assets/images/Image-22.png";

const DriverAnalysisWidget = () => {
  return (
    <div className="rounded-xl border border-[#E0E1E6]">
      <div>
        <img src={IMAGE} className="h-[114px] w-full" alt="img" />
      </div>
      <div className="w-full p-2">
        <div className="my-1">
          <p className="text-sm font-medium text-[#4A4C54]">Housing Support Drive</p>
          <p className="text-[10px] leading-[17.7px] font-normal text-[#838880]">
            Help families access sate and stable housing through community support.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <Button className="bg-primary w-full">Share our campaign</Button>
          <Button className="w-full border border-[#F2F2F2] bg-[#F6F6F6] text-sm leading-[100%] text-[#4A4C54]">
            Share Application Invite
          </Button>
        </div>
        <p className="mt-[14px] text-[10px] font-normal text-[#838880]">
          Champions will receive a personalized invitation to join your community{" "}
        </p>
      </div>
    </div>
  );
};

export default DriverAnalysisWidget;
