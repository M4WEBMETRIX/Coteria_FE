import { Button } from "@/components/ui/button";
import { CaretRightIcon, MapPin, UserIcon } from "@phosphor-icons/react";
import EmptyCampaigns from "@/assets/icons/empty-campaigns.svg";
import {
  useGetEndUserProfile,
  useGetImpactLeaderboard,
  useGetImpactScore,
} from "@/services/generics/user-generics/user-hooks";
import { getBaseUrl } from "@/lib/utils";
import { useState } from "react";

// const directReferrals = [
//   {
//     id: 1,
//     name: "Nick Daniels",
//     avatar: "https://placehold.co/40x40/png",
//     location: "",
//     status: { label: "You", color: "bg-[#E7FDF3] text-[#0F973D]" }, // Mocking logic for "You" tag
//     boosts: 0,
//     referralId: "D234",
//     amount: 0,
//     subText: "0 Boosts",
//   },
//   {
//     id: 2,
//     name: "Anonymous",
//     avatar: "", // No avatar
//     location: "Toronto",
//     status: null,
//     amount: 0,
//     subText: "Referred 0 Friends",
//     referredUsers: [1, 2, 3], // Mock for mini avatars
//   },
//   {
//     id: 3,
//     name: "Ben Smith",
//     avatar: "https://placehold.co/40x40/png",
//     location: "Toronto",
//     status: null,
//     amount: 0,
//     subText: "0 Friends Referred",
//     referredUsers: [1, 2, 3],
//   },
//   {
//     id: 4,
//     name: "John Maguire",
//     avatar: "https://placehold.co/40x40/png",
//     location: "Toronto",
//     status: { label: "CA$0", color: "bg-[#E7FDF3] text-[#0F973D]" },
//     amount: 0,
//     subText: "Referred 0 Friends",
//     referredUsers: [1, 2, 3],
//   },
// ];

const DashboardImpact = () => {
  const [copied, setCopied] = useState(false);
  const { data: impactScore } = useGetImpactScore();
  const { data: impactLeaderboard } = useGetImpactLeaderboard();

  const { data } = useGetEndUserProfile();

  const endUser: any = data?.data;

  const inviteLink = `${getBaseUrl()}/user/signup?referral-code=${endUser?.referralCode}`;

  console.log("impactScore", impactScore);
  console.log("impactLeaderboard", impactLeaderboard);
  const directReferrals: any = impactLeaderboard?.data?.items;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex w-full items-center justify-center">
        <div className="max-w-159.5 gap-4 space-y-1 text-center">
          <h2 className="text-center text-[32px] leading-[100%] font-bold tracking-[0%] text-[#000000]">
            Referral Lineage
          </h2>
          <div className="w-full">
            <p className="text-2xl leading-[30.92px] font-normal tracking-[0%] text-[#82828A]">
              See how your referrals have spread and the impact they have inspired.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Referred Donations Card */}
          <div className="space-y-6 rounded-[10px] border border-[#ECEFF3] bg-white p-6">
            <div className="space-y-1">
              <h3 className="text-[50px] leading-[150%] font-medium text-[#12AA5B]">
                CA${(impactScore?.data?.totalDonatedCents / 100)?.toLocaleString()}
              </h3>
              <p className="text-2xl leading-[150%] font-normal text-[#888787]">
                Referred Donations
              </p>
            </div>
            {/* <Button className="h-14 w-full max-w-102.75 justify-center rounded-[20px] border border-[#BDFFCA] bg-[#DCFFE3] text-lg leading-[150%] font-medium text-[#02B128] hover:bg-[#d0fbe4]">
              <div className="flex items-center gap-4">
                <Trophy size={24} weight="fill" />
                Reach Milestones
                <CaretRightIcon size={24} className="ml-2" />
              </div>
            </Button> */}
            <p className="text-2xl leading-[150%] font-normal text-[#888787]">
              You have impact score of {impactScore?.data?.totalScore}
              {/* 0 referrals away from reaching the next level */}
            </p>
          </div>

          {/* People Referred Card */}
          <div className="space-y-6 rounded-[10px] border border-[#ECEFF3] bg-white p-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[50px] leading-[150%] font-medium text-[#000000]">
                  {impactScore?.data?.referralCount?.toLocaleString()}
                </h3>
                <p className="text-2xl leading-[150%] font-normal text-[#888787]">
                  People Referred
                </p>
              </div>
            </div>
            {/* <div className="space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[0%] rounded-full bg-[#12AA5B]" />
              </div>
            </div>
            <div className="flex items-center justify-between text-2xl leading-[150%] font-normal text-[#888787]">
              <span className="flex items-center gap-6">
                Amplifier Badge Earned
              </span>
              <span>0 Days</span>
            </div> */}
            <Button
              onClick={handleCopyLink}
              className="h-14 w-full rounded-[20px] border border-[#BDFFCA] bg-[#12AA5B] text-lg font-medium text-white hover:bg-[#0da055]"
            >
              {copied ? "Referral Link Copied to clipboard" : "Refer More Family"}
              {!copied && <CaretRightIcon className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <h3 className="text-[30px] leading-[150%] font-medium tracking-[0%] text-[#000000]">
            Direct Referrals
          </h3>
          <div className="rounded-[10px] border border-[#ECEFF3] bg-white">
            {directReferrals?.length === 0 ? (
              <div className="mt-6 flex h-[25vh] flex-col items-center justify-center">
                <img
                  src={EmptyCampaigns}
                  alt="empty-campaigns"
                  className="mb-3 h-[72px] w-[72px]"
                />
                <p className="trackin-[-2%] pb-2 text-center text-base leading-6 font-semibold text-[#1E1F24]">
                  No referrals yet.
                </p>

                <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
                  When you refer someone, they will show up here.
                </p>
              </div>
            ) : (
              <div className="p-6">
                {directReferrals?.map((referral: any) => (
                  <div
                    key={referral?.id}
                    className={`flex items-center justify-between border-b py-6 last:border-b-0`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${referral?.avatar ? "overflow-hidden" : "bg-[#FFD3D8]"}`}
                      >
                        {referral?.avatar ? (
                          <img
                            src={referral?.avatar}
                            alt={referral?.donorName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#FFD3D8]">
                            <UserIcon size={24} color="#000000" />
                          </div>
                        )}
                        {referral?.id === 1 && (
                          <div className="absolute -right-1 -bottom-1">
                            {/* Status dot or icon if needed */}
                          </div>
                        )}
                      </div>
                      <div className="space-y-0">
                        <div className="flex items-center gap-2">
                          <p className="line-clamp-1 text-lg leading-[150%] font-normal tracking-[0%] text-[#000000]">
                            {referral?.donorName}
                          </p>

                          {referral?.location && (
                            <div className="flex items-center gap-1 text-base leading-[150%] font-normal text-[#888787]">
                              <MapPin size={16} weight="fill" className="text-gray-400" />
                              {referral?.location}
                            </div>
                          )}
                          {referral?.status && (
                            <span
                              className={`rounded px-2 py-0.5 text-xs font-normal ${referral?.status?.color}`}
                            >
                              {referral?.status?.label}
                            </span>
                          )}
                        </div>
                        {referral?.donationCount && (
                          <div className="flex items-center gap-1 text-base leading-[150%] font-normal text-[#888787]">
                            Donation count: {referral?.donationCount}
                          </div>
                        )}
                        {referral?.subText && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {referral?.referredUsers && (
                              <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="h-6 w-6 rounded-full border-2 border-white bg-gray-200"
                                  />
                                ))}
                              </div>
                            )}
                            <p className="text-base leading-[150%] font-normal text-[#888787]">
                              {referral?.id === 1
                                ? `${referral?.boosts} Boosts D234`
                                : referral?.id === 3
                                  ? "CA$0 referred"
                                  : "CA$0 referred"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-lg leading-[150%] font-normal tracking-[0%] ${referral?.id === 1 || referral?.id === 3 ? "text-[#12AA5B]" : "text-[#12AA5B]"}`}
                      >
                        ${(referral?.totalScore / 100)?.toLocaleString()}
                        {/* <CaretRightIcon size={14} color="#000000" /> */}
                      </p>
                      <p className="text-sm font-medium text-[#888787]">
                        Referred {referral?.referralCount?.toLocaleString()} Friends
                        {/* {referral?.id === 1
                          ? "0 Boosts"
                          : referral?.id === 3
                            ? "0 Friends Referred"
                            : "Referred 0 Friends"} */}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Volunteer Highlight Card */}
            {/* <div className="space-y-4 rounded-b-[10px] border-t border-t-[#F6F6F6] bg-[#EEFFF1] p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
                  <img
                    src="https://placehold.co/48x48/png"
                    alt="Volunteer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg leading-[150%] font-normal tracking-[0%] text-[#000000]">
                      Liz Jacob
                    </p>
                    <span className="text-base leading-[150%] font-normal text-[#595959]">
                      Volunteer
                    </span>
                  </div>
                  <p className="text-base leading-[150%] font-normal text-[#595959]">10 Referred</p>
                </div>
              </div>
              <p className="text-base leading-[150%] font-normal text-[#595959]">
                "This community is making Toronto greener, one tree at a time. I'm so proud to be
                part of it."
              </p>
              <p className="text-base leading-[150%] font-normal text-[#595959]">
                — Liz Jacob - Volunteer.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardImpact;
