// import UserUpcomingEventCard from "@/components/end-users/events/user-upcoming-event-card";

import { Button } from "@/components/ui/button";
import InnerNav from "@/end-user-app/navigations/inner-nav";
// import { getEndUserFromLocalStorage } from "@/end-user-app/services/local-storage";
import {
  // getBaseUrl,
  getCurrencySymbol,
  // getNameAbbrev
} from "@/lib/utils";
import { DonationModal } from "@/pages/community/services/donate-modal";
import {
  useGetEndUserProfile,
  useGetUserSpecificCampaigns,
} from "@/services/generics/user-generics/user-hooks";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   CaretDownIcon,
//   // ChatCircleIcon,
//   // HeartIcon,
//   // ShareFatIcon,
//   // Trophy,
// } from "@phosphor-icons/react";
import { CaretRightIcon } from "@phosphor-icons/react"; // Import missing icons locally if needed, checking existing imports.
import { useState } from "react";
// import { campaigns } from "./dashboard-campaigns";
import { useNavigate, useParams } from "react-router-dom";

const CampaignDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: userSpecificCampaigns } = useGetUserSpecificCampaigns(id);

  const { data } = useGetEndUserProfile();

  const endUser: any = data?.data;

  // console.log(userSpecificCampaigns);

  const campaign = userSpecificCampaigns?.data;

  // const shareUrl = `${getBaseUrl({ target: "donor" })}/community/public/campaign/${campaign?.slug}?referral-code=${endUser?.referralCode}`;

  // const shareOnWhatsApp = () => {
  //   const url = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
  //   window.open(url, "_blank");
  // };

  // const shareOnX = () => {
  //   const text = `Check out this campaign: ${campaign?.name}`;
  //   const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
  //   window.open(url, "_blank");
  // };

  // const shareOnLinkedIn = () => {
  //   const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  //   window.open(url, "_blank");
  // };

  // const campaigns = [
  //   {
  //     id: 1,
  //     name: "Community Support Fund",
  //     description: "Help us reach our goal of $10,000 to support community projects.",
  //     progress: 65,
  //     daysLeft: 12,
  //     image: "https://placehold.co/600x400/png",
  //     status: "active",
  //   },
  // ];

  return (
    <>
      <InnerNav
        text={"Back to campaigns"}
        onClick={() => navigate("/user/dashboard?tab=campaigns")}
      />
      <div className="flex w-full gap-10">
        <div className="w-full items-start gap-4 rounded-[32px] border border-[#E5E5E5] p-6">
          <div className="flex items-center gap-3.5">
            <div className="">
              <h1 className="line-clamp-1 text-[48px] leading-[140%] font-medium tracking-[-2%] text-[#0F0F0F]">
                {campaign?.name}
              </h1>
              <div className="mt-3 mb-6 flex flex-col gap-[2px]">
                <p className="text-lg font-semibold text-[#0F0F0F]">{campaign?.community?.name}</p>
                <p className="text-base leading-[150%] font-normal tracking-[-2%] text-[#525252]">
                  Focus type: {campaign?.categoryLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="w-full space-y-6">
            {/* Banner */}
            <div className="relative h-[500px] w-full cursor-pointer overflow-hidden rounded-[32px] bg-gray-200">
              <img
                src={campaign?.imageUrl}
                alt={campaign?.name}
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              className="h-10 rounded-full bg-[#12AA5B] px-4 text-white hover:bg-[#00b05b] lg:hidden"
            >
              <div className="flex items-center text-sm font-medium">
                Donate
                <CaretRightIcon size={14} weight="bold" className="text-white" />
              </div>
            </Button>

            <div className="max-w-176.75">
              <p className="mb-2 text-lg leading-[155%] font-medium tracking-[0%] text-[#000000]">
                {campaign?.description}
              </p>

              {/* <div className="flex items-center justify-start gap-3 text-[#6B6B6B]">
                <button className="flex items-center gap-1 hover:text-[#12AA5B]">
                  <ChatCircleIcon size={20} />
                </button>
                <button className="flex items-center gap-1 hover:text-red-500">
                  <HeartIcon size={20} />
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500">
                  <ShareFatIcon size={20} />
                </button>
              </div> */}
            </div>
          </div>

          {/* Right Sidebar */}
          {/* NOT AVAIALABLE FOR MVP  */}
          {/* <UserUpcomingEventCard /> */}
        </div>

        <div className="h-max w-full max-w-[413px] rounded-[32px] border border-[#E5E5E5] p-6">
          {/* Content */}
          <div className="">
            <div className="">
              <div className="flex flex-col items-center justify-between">
                <div className="flex w-full items-center gap-3">
                  <div>
                    <div className="flex items-center leading-[155%] font-normal tracking-[0%]">
                      <span className="text-lg font-medium text-nowrap text-[#6B6B6B]">
                        {getCurrencySymbol(campaign?.goalCurrency)}{" "}
                        {(campaign?.totalRaisedCents / 100)?.toLocaleString()}
                      </span>
                      <span className="text-nowrap text-[#A3A3A3]">
                        /{getCurrencySymbol(campaign?.goalCurrency)}{" "}
                        {campaign?.goalAmountCents
                          ? (campaign?.goalAmountCents / 100)?.toLocaleString()
                          : "0"}
                      </span>
                    </div>
                  </div>
                  {/* Progress Bar Custom */}
                  <div className="h-2 w-full max-w-138.75 overflow-hidden rounded-full bg-[#D9D9D9]">
                    <div
                      className="h-full rounded-full bg-[#12AA5B]"
                      style={{
                        width: `${(campaign?.totalRaisedCents / campaign?.goalAmountCents) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="hidden h-[56px] w-full rounded-full bg-[#12AA5B] px-4 text-white hover:bg-[#00b05b] lg:inline-block"
                >
                  <div className="flex items-center text-sm font-medium">
                    Donate
                    <CaretRightIcon size={14} weight="bold" className="text-white" />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DonationModal
        currency={campaign?.goalCurrency}
        componentCampaignId={campaign?.id}
        open={isOpen}
        onOpenChange={setIsOpen}
        campaignName={campaign?.name}
        endUserId={endUser?.id}
      />
    </>
  );
};

export default CampaignDetails;
