import { Button } from "@/components/ui/button";

import { useState } from "react";
import EmptyCampaigns from "../../assets/icons/empty-campaigns.svg";
const CommunityPage = () => {
  // Sample data matching the mockup

  const [communityData, setCommunityData] = useState([]);

  return (
    <div className="font-inter flex h-full w-full flex-col gap-6 p-6">
      {communityData.length > 0 ? (
        <></>
      ) : (
        <div className="my-auto flex h-full w-full flex-col place-content-center items-center justify-center">
          <img src={EmptyCampaigns} alt="empty-campaigns" className="mb-3 h-[106px] w-[106px]" />
          <p className="trackin-[-2%] pb-4 text-center text-base leading-6 font-semibold text-[#1E1F24]">
            Create your first campaign
          </p>
          <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
            A campaign gives your community a clear reason to act, whether that’s supporting a
            cause, raising awareness, or mobilizing people around a moment.
          </p>
          <div>
            <Button className="max-w-[257px] px-[51px] py-3" variant={"outline"}>
              {" "}
              Activate your community
            </Button>{" "}
            <Button className="max-w-[257px] px-[51px] py-3" variant={"outline"}>
              {" "}
              Complete onboarding
            </Button>
          </div>
          {/* <CreateCampaignModal /> */}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
