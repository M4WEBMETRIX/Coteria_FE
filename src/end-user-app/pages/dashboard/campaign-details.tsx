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
import { ArrowRightIcon, ClockIcon } from "@phosphor-icons/react"; // Import missing icons locally if needed, checking existing imports.
import { useState } from "react";
// import { campaigns } from "./dashboard-campaigns";
import { useNavigate, useParams } from "react-router-dom";

const getTimeRemaining = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();

  // If time has passed, return null
  if (diffMs <= 0) {
    return { text: "Ended", isUrgent: true };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const isUrgent = diffMs < 24 * 60 * 60 * 1000; // Less than 24 hours

  if (days > 0) {
    return { text: `${days} day${days !== 1 ? "s" : ""} left`, isUrgent: false };
  } else if (hours > 0) {
    return { text: `${hours}h ${minutes}m left`, isUrgent };
  } else {
    return { text: `${minutes}m left`, isUrgent };
  }
};

const getTimeProgress = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  // If campaign hasn't started yet, return 0
  if (now < start) {
    return 0;
  }

  // If campaign has ended, return 100
  if (now > end) {
    return 100;
  }

  const totalDuration = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();

  return Math.min((elapsed / totalDuration) * 100, 100);
};

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
        <div className="w-full items-start gap-4 rounded-[32px] lg:border lg:border-[#E5E5E5] lg:p-6">
          <div className="flex items-center gap-3.5">
            <div className="">
              <h1 className="line-clamp-1 text-[20px] leading-[140%] font-medium tracking-[-2%] text-[#0F0F0F] lg:text-[48px]">
                {campaign?.name}
              </h1>
              <div className="mt-1.5 mb-3 flex flex-col gap-[2px] lg:mt-3 lg:mb-6">
                <p className="text-base font-semibold text-[#0F0F0F] lg:text-lg">
                  {campaign?.community?.name}
                </p>
                <p className="text-sm leading-[150%] font-normal tracking-[-2%] text-[#525252] lg:text-base">
                  Focus type: {campaign?.categoryLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="w-full space-y-6">
            {/* Banner */}
            <div className="relative h-[350px] w-full cursor-pointer overflow-hidden rounded-[32px] bg-gray-200 lg:h-[500px]">
              <img
                src={campaign?.imageUrl}
                alt={campaign?.name}
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="h-max w-full rounded-[32px] border border-[#E5E5E5] p-4 lg:block lg:hidden">
              {/* Time left badge for time-based campaigns */}
              {campaign?.type?.toLowerCase() === "time" &&
                campaign?.endDate &&
                (() => {
                  const timeInfo = getTimeRemaining(campaign?.endDate);
                  return (
                    <div
                      className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 ${
                        timeInfo.isUrgent
                          ? "bg-[#FFF5F5] text-[#DF1C41]"
                          : "bg-[#F2FFF4] text-[#12AA5B]"
                      }`}
                    >
                      <ClockIcon
                        size={20}
                        weight="fill"
                        className={timeInfo.isUrgent ? "text-[#EF4444]" : "text-[#12AA5B]"}
                      />
                      <span
                        className={`text-sm font-medium ${timeInfo.isUrgent ? "text-[#EF4444]" : "text-[#12AA5B]"}`}
                      >
                        {timeInfo.text}
                      </span>
                    </div>
                  );
                })()}

              {/* Content */}
              <div className="flex w-full items-center gap-3">
                <div>
                  <div className="flex items-center gap-1.5 leading-[155%] font-normal tracking-[0%]">
                    <span className="text-lg font-semibold text-nowrap text-[#0F0F0F]">
                      {getCurrencySymbol(campaign?.goalCurrency)}
                      {""}
                      {(campaign?.totalRaisedCents / 100)?.toLocaleString()}
                    </span>
                    <span className="text-sm text-nowrap text-[#000000]">
                      {campaign?.type?.toLowerCase() === "time" ? (
                        "raised in the time"
                      ) : (
                        <>
                          raised of {getCurrencySymbol(campaign?.goalCurrency)}
                          {""}
                          {campaign?.goalAmountCents
                            ? (campaign?.goalAmountCents / 100)?.toLocaleString()
                            : "0"}{" "}
                          goal
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              {/* Progress Bar Custom */}
              <div className="mt-1.5 mb-2 h-4 w-full overflow-hidden rounded-full bg-[#F3E9D8] lg:mt-2.5">
                <div
                  className="h-full rounded-full bg-[#7CE993] transition-all duration-300"
                  style={{
                    width: `${
                      campaign?.type?.toLowerCase() === "time"
                        ? getTimeProgress(campaign?.startDate, campaign?.endDate)
                        : (campaign?.totalRaisedCents / campaign?.goalAmountCents) * 100
                    }%`,
                  }}
                />
              </div>

              {/* Progress indicators for time-based campaigns */}
              <div className="mb-2.5 flex items-center justify-between text-xs">
                {campaign?.type?.toLowerCase() === "amount" && (
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#12AA5B]" />
                    <span className="text-[#6B6B6B]">
                      {Math.round(
                        campaign?.goalAmountCents
                          ? (campaign?.totalRaisedCents / campaign?.goalAmountCents) * 100
                          : 0
                      )}
                      % funded
                    </span>
                  </div>
                )}
                {campaign?.type?.toLowerCase() === "time" && (
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#E5E5E5]" />
                    <span className="text-[#6B6B6B]">
                      {Math.round(getTimeProgress(campaign?.startDate, campaign?.endDate))}% of time
                      elapsed
                    </span>
                  </div>
                )}
              </div>

              {campaign?.donationsCount > 0 && (
                <p className="mb-4 text-sm text-[#6B6B6B]">
                  {campaign?.donationsCount} donation{campaign?.donationsCount !== 1 ? "s" : ""}
                </p>
              )}

              <Button
                onClick={
                  // () => setIsOpen(true)
                  () => navigate(`/user/donate/${campaign?.slug}?userId=${endUser?.id}`)
                }
                className="h-[56px] w-full rounded-full bg-[#12AA5B] px-4 text-white lg:flex lg:hidden lg:items-center lg:justify-between"
              >
                <div className="flex w-full items-center text-center text-sm font-medium text-[#FAFAFA]">
                  Donate Now
                </div>
                <div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                    <ArrowRightIcon size={14} weight="bold" className="text-[#0F0F0F]" />
                  </div>
                </div>
              </Button>

              <Button
                variant={"outline"}
                // onClick={(e) => {

                // }}
                className="mt-3 h-[56px] w-full rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-4 lg:flex lg:hidden lg:items-center lg:justify-center"
              >
                <div className="flex items-center justify-center text-center text-sm font-medium text-[#0F0F0F]">
                  Invite more people to help
                </div>
              </Button>
            </div>

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

        <div className="hidden h-max w-full max-w-[413px] rounded-[32px] border border-[#E5E5E5] p-6 lg:block">
          {/* Time left badge for time-based campaigns */}
          {campaign?.type?.toLowerCase() === "time" &&
            campaign?.endDate &&
            (() => {
              const timeInfo = getTimeRemaining(campaign?.endDate);
              return (
                <div
                  className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 ${
                    timeInfo.isUrgent
                      ? "bg-[#FFF5F5] text-[#DF1C41]"
                      : "bg-[#F2FFF4] text-[#12AA5B]"
                  }`}
                >
                  <ClockIcon
                    size={20}
                    weight="fill"
                    className={timeInfo.isUrgent ? "text-[#EF4444]" : "text-[#12AA5B]"}
                  />
                  <span
                    className={`text-sm font-medium ${timeInfo.isUrgent ? "text-[#EF4444]" : "text-[#12AA5B]"}`}
                  >
                    {timeInfo.text}
                  </span>
                </div>
              );
            })()}

          {/* Content */}
          <div className="flex w-full items-center gap-3">
            <div>
              <div className="flex items-center gap-1.5 leading-[155%] font-normal tracking-[0%]">
                <span className="text-[20px] font-medium text-nowrap text-[#0F0F0F]">
                  {getCurrencySymbol(campaign?.goalCurrency)}
                  {""}
                  {(campaign?.totalRaisedCents / 100)?.toLocaleString()}
                </span>
                <span className="text-sm text-nowrap text-[#000000]">
                  {campaign?.type?.toLowerCase() === "time" ? (
                    "raised in the time"
                  ) : (
                    <>
                      raised of {getCurrencySymbol(campaign?.goalCurrency)}
                      {""}
                      {campaign?.goalAmountCents
                        ? (campaign?.goalAmountCents / 100)?.toLocaleString()
                        : "0"}{" "}
                      goal
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
          {/* Progress Bar Custom */}
          <div className="mt-1.5 mb-2 h-4 w-full overflow-hidden rounded-full bg-[#F3E9D8] lg:mt-2.5">
            <div
              className="h-full rounded-full bg-[#7CE993] transition-all duration-300"
              style={{
                width: `${
                  campaign?.type?.toLowerCase() === "time"
                    ? getTimeProgress(campaign?.startDate, campaign?.endDate)
                    : (campaign?.totalRaisedCents / campaign?.goalAmountCents) * 100
                }%`,
              }}
            />
          </div>

          {/* Progress indicators for time-based campaigns */}
          <div className="mb-2.5 flex items-center justify-between text-xs">
            {campaign?.type?.toLowerCase() === "amount" && (
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#12AA5B]" />
                <span className="text-[#6B6B6B]">
                  {Math.round(
                    campaign?.goalAmountCents
                      ? (campaign?.totalRaisedCents / campaign?.goalAmountCents) * 100
                      : 0
                  )}
                  % funded
                </span>
              </div>
            )}

            {campaign?.type?.toLowerCase() === "time" && (
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#E5E5E5]" />
                <span className="text-[#6B6B6B]">
                  {Math.round(getTimeProgress(campaign?.startDate, campaign?.endDate))}% of time
                  elapsed
                </span>
              </div>
            )}
          </div>

          {campaign?.donationsCount > 0 && (
            <p className="mb-4 text-sm text-[#6B6B6B]">
              {campaign?.donationsCount} donation{campaign?.donationsCount !== 1 ? "s" : ""}
            </p>
          )}

          <Button
            onClick={
              // () => setIsOpen(true)
              () => navigate(`/user/donate/${campaign?.slug}?userId=${endUser?.id}`)
            }
            className="hidden h-[56px] w-full rounded-full bg-[#12AA5B] px-4 text-white lg:flex lg:items-center lg:justify-between"
          >
            <div className="flex w-full items-center justify-center text-center text-base font-medium text-[#FAFAFA]">
              Donate Now
            </div>
            <div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <ArrowRightIcon size={14} weight="bold" className="text-[#0F0F0F]" />
              </div>
            </div>
            {/* <div className="flex items-center text-sm font-medium">
                    Donate
                    <CaretRightIcon size={14} weight="bold" className="text-white" />
                  </div> */}
          </Button>

          <Button
            variant={"outline"}
            // onClick={(e) => {

            // }}
            className="mt-3 hidden h-[56px] w-full rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-4 lg:flex lg:items-center lg:justify-center"
          >
            <div className="flex items-center justify-center text-center text-base font-medium text-[#0F0F0F]">
              Invite more people to help
            </div>
          </Button>
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
