// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InnerNav from "@/end-user-app/navigations/inner-nav";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  // ChatCircle,
  // Heart,
  // ShareFat,
  WhatsappLogo,
  LinkedinLogo,
  XLogo,
  // Plus,
  // Users,
  // Trophy,
  CaretDownIcon,
  ArrowUpRight,
  HandArrowUpIcon,
} from "@phosphor-icons/react";
import { CaretRightIcon } from "@phosphor-icons/react"; // Import missing icons locally if needed, checking existing imports.
import { useNavigate, useParams } from "react-router-dom";
import EmptyCampaigns from "@/assets/icons/empty-campaigns.svg";

// import SAMPLE_FEED_IMAGE from "@/assets/images/sample-community-image.png";
import {
  useGetEndUserProfile,
  useGetUserSpecificCommunity,
} from "@/services/generics/user-generics/user-hooks";
import { cn, formatFullDate, getBaseUrl, getCurrencySymbol, getNameAbbrev } from "@/lib/utils";
import { useGetPublicCommunityCampaigns } from "@/pages/community/services";
import { timeAgo } from "@/pages/dashboard/community-table-list";
import { DonationModal } from "@/pages/community/services/donate-modal";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommunityFeed = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<any | null>(null);
  const [showActiveCampaigns, setShowActiveCampaigns] = useState<boolean>(true);
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);

  const { data: community, isPending: communityLoading } = useGetUserSpecificCommunity(id);
  const { data: communityCampaigns, isPending: campaignsLoading } =
    useGetPublicCommunityCampaigns(id);

  const { data, isPending: userLoading } = useGetEndUserProfile();
  const user = data?.data;
  // console.log("community campaigns", communityCampaigns);

  const shareUrl = `${getBaseUrl({ target: "donor" })}/community/public/${community?.data?.slug}/${community?.data?.id}?referral-code=${user?.referralCode}`;

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const shareOnX = () => {
    const text = `Check out this community: ${community?.data?.name}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <InnerNav
        text={"Back to community"}
        onClick={() => navigate("/user/dashboard?tab=community")}
      />
      <div className="flex w-full gap-6">
        {/* Left Sidebar */}
        <div className="hidden w-[350px] space-y-6 rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] px-4 pt-[38.5px] pb-5 lg:block">
          {/* Profile Card */}
          <div className="rounded-[10px] border border-[#ECEFF3] bg-white p-4 text-center">
            {userLoading ? (
              <div className="flex animate-pulse items-center gap-3">
                <div className="h-20 w-20 rounded-full bg-gray-200" />

                <div className="flex-1 space-y-3">
                  <div className="h-5 w-40 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* mb-14.5 */}

                <Avatar className="h-20 w-20 cursor-pointer border-2 border-transparent transition-all hover:border-gray-200">
                  <AvatarImage src={user?.profileImageUrl || ""} className="object-cover" />
                  <AvatarFallback>{getNameAbbrev(user?.firstName as any)}</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="ml-4 line-clamp-1 text-left text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#D5FBFF] px-3 py-1 text-base leading-[155%] font-normal tracking-[0%] text-[#067884]">
                    {user?.isFullyVerified ? "Verified" : "Not Verified"}
                  </div>
                </div>
              </div>
            )}

            {/* <Button className="h-12 w-full justify-start gap-3 rounded-[10px] border border-[#EFEFEF] bg-white text-base font-normal text-[#000000] hover:bg-gray-50">
              <span className="text-yellow-500">🤝</span> Invite Friends & Family
            </Button> */}
          </div>

          {/* Invite Widget */}
          <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-4">
            <div className="flex gap-2 rounded-lg bg-[#F8FAFB] p-3 text-xs text-[#6B6B6B]">
              <span className="text-yellow-500">💡</span>
              <p>
                <span className="text-[#12AA5B]">Hint:</span> Invite others. Earn XP when you invite
                new members to the community.
              </p>
            </div>

            <div className="space-y-2.5">
              <Button
                onClick={() => shareOnWhatsApp()}
                variant="outline"
                className="h-10 w-full justify-start gap-3 rounded-[10px] border-[#EFEFEF] text-sm font-normal text-gray-600"
              >
                <WhatsappLogo size={20} className="text-[#25D366]" weight="fill" /> Share on
                Whatsapp
              </Button>
              <Button
                onClick={() => shareOnLinkedIn()}
                variant="outline"
                className="h-10 w-full justify-start gap-3 rounded-[10px] border-[#EFEFEF] text-sm font-normal text-gray-600"
              >
                <LinkedinLogo size={20} className="text-[#0077B5]" weight="fill" /> Share on
                Linkedin
              </Button>
              <Button
                onClick={() => shareOnX()}
                variant="outline"
                className="h-10 w-full justify-start gap-3 rounded-[10px] border-[#EFEFEF] text-sm font-normal text-gray-600"
              >
                <XLogo size={20} className="text-black" weight="fill" /> Share on X
              </Button>
              {/* <Button
                variant="outline"
                className="h-10 w-full justify-center gap-2 rounded-[10px] border-[#EFEFEF] text-sm font-medium text-[#1E1F24]"
              >
                <Plus size={16} /> Add Social Links
              </Button> */}
            </div>
          </div>

          {/* Impact Score */}
          <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-4">
            <div className="flex items-center justify-between border-b pb-4">
              <h4 className="text-lg leading-[140%] font-normal tracking-[-2%] text-[#1E1F24]">
                Your Impact Score
              </h4>
              <CaretRightIcon className="text-gray-400" />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">Level 1</span>
                {/* <span className="text-gray-400">1000/1200 XP</span> */}
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[0%] rounded-full bg-[#12AA5B]" />
              </div>
              {/* <p className="mt-1 flex items-center justify-end gap-1.5 text-right text-sm text-gray-500">
                <span className="font-medium text-[#12AA5B]">+200</span> to level 6
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.45225 2.84925C6.76904 2.48455 7.16042 2.19211 7.59996 1.99169C8.03949 1.79126 8.51693 1.68753 9 1.6875C10.0177 1.6875 10.9298 2.1375 11.5478 2.84925C12.0297 2.81533 12.5134 2.88529 12.966 3.0544C13.4186 3.22351 13.8296 3.48784 14.1713 3.8295C14.5128 4.17106 14.7771 4.58196 14.9462 5.03443C15.1153 5.4869 15.1853 5.9704 15.1515 6.45225C15.5161 6.76911 15.8084 7.16053 16.0087 7.60005C16.2089 8.03958 16.3126 8.51699 16.3125 9C16.3125 9.48307 16.2087 9.96051 16.0083 10.4C15.8079 10.8396 15.5154 11.231 15.1508 11.5478C15.1846 12.0296 15.1145 12.5131 14.9454 12.9656C14.7763 13.418 14.5121 13.8289 14.1705 14.1705C13.8289 14.5121 13.418 14.7763 12.9656 14.9454C12.5131 15.1145 12.0296 15.1846 11.5478 15.1508C11.231 15.5154 10.8396 15.8079 10.4 16.0083C9.96051 16.2087 9.48307 16.3125 9 16.3125C8.51693 16.3125 8.03949 16.2087 7.59996 16.0083C7.16042 15.8079 6.76904 15.5154 6.45225 15.1508C5.97033 15.1848 5.48672 15.1149 5.03411 14.9459C4.58151 14.777 4.17046 14.5128 3.82875 14.1713C3.48709 13.8296 3.22276 13.4186 3.05365 12.966C2.88454 12.5134 2.81458 12.0297 2.8485 11.5478C2.48394 11.2309 2.19164 10.8395 1.99135 10.3999C1.79105 9.96042 1.68744 9.48301 1.6875 9C1.6875 7.98225 2.1375 7.07025 2.84925 6.45225C2.81544 5.9704 2.88545 5.4869 3.05456 5.03443C3.22367 4.58196 3.48794 4.17106 3.8295 3.8295C4.17106 3.48794 4.58196 3.22367 5.03443 3.05456C5.4869 2.88545 5.9704 2.81544 6.45225 2.84925ZM11.7075 7.6395C11.7525 7.57954 11.7851 7.51119 11.8033 7.43846C11.8215 7.36574 11.825 7.29011 11.8135 7.21602C11.8021 7.14192 11.7759 7.07087 11.7366 7.00702C11.6973 6.94318 11.6457 6.88783 11.5847 6.84424C11.5237 6.80064 11.4546 6.76968 11.3815 6.75317C11.3084 6.73666 11.2327 6.73494 11.1589 6.7481C11.0851 6.76126 11.0146 6.78904 10.9517 6.82981C10.8888 6.87058 10.8347 6.92351 10.7925 6.9855L8.3655 10.383L7.1475 9.165C7.04087 9.06564 6.89983 9.01155 6.75411 9.01412C6.60838 9.01669 6.46934 9.07572 6.36628 9.17878C6.26322 9.28184 6.20419 9.42088 6.20162 9.56661C6.19905 9.71233 6.25314 9.85337 6.3525 9.96L8.04 11.6475C8.09774 11.7052 8.16735 11.7496 8.24399 11.7777C8.32063 11.8058 8.40247 11.8169 8.48382 11.8102C8.56517 11.8035 8.64409 11.7792 8.7151 11.7389C8.7861 11.6986 8.84749 11.6434 8.895 11.577L11.7075 7.6395Z"
                    fill="#12AA5B"
                  />
                </svg>
              </p> */}
            </div>
          </div>
        </div>

        <div className="block w-full items-start gap-4 rounded-[10px] lg:flex lg:border lg:border-[#F6F6F6] lg:bg-[#FCFCFC] lg:px-4 lg:py-3.5">
          {/* Main Feed */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold text-[#1E1F24]">Community Feed</h2>

            {/* Post Mock */}
            {communityLoading ? (
              <div className="animate-pulse space-y-4 rounded-[16px] bg-white lg:border lg:border-[#ECEFF3] lg:p-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                    <div className="h-3 w-24 rounded bg-gray-200" />
                  </div>
                </div>

                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />

                <div className="h-[180px] w-full rounded-xl bg-gray-200" />
              </div>
            ) : (
              <div className="flex-1 space-y-4 rounded-[16px] bg-white lg:border lg:border-[#ECEFF3] lg:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-xl font-bold text-pink-500">
                    CA
                  </div>
                  <div>
                    <h3 className="text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                      {community?.data?.name}
                    </h3>
                    <p className="text-lg leading-[155%] font-normal tracking-[0%] text-[#6B6B6B]">
                      Created: {formatFullDate(community?.data?.createdAt)}
                    </p>
                  </div>
                </div>

                <p className="pb-2 text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                  {community?.data?.description}
                </p>

                <div className="space-y-3">
                  <div className="h-[180px] w-full overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={community?.data?.imageUrl || ""}
                      alt="Post Content"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* <div className="flex items-center justify-end gap-3 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-[#12AA5B]">
                    <ChatCircle size={20} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-red-500">
                    <Heart size={20} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <ShareFat size={20} />
                  </button>
                </div> */}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full space-y-6 lg:w-[300px]">
            {/* Events Widget (Mocked for now based on image) */}
            {/* NO EVENT FOR MVP  */}
            {/* <div className="space-y-4 rounded-[10px] border border-[#F6F6F6] bg-white px-4 py-5">
              <div className="flex items-center justify-between border-b border-b-[#EFEFEF] pb-4">
                <h3 className="text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                  Upcoming Events
                </h3>
                <CaretDownIcon size={16} />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                  Target Rights & Repairs Q&A
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm leading-[155%] font-normal tracking-[0%] text-[#6B6B6B]">
                    Wed, Apr 24 at 6:00PM
                  </span>
                  <Badge className="h-6.5 gap-1 rounded-full border-0 bg-[#FFF2D5] px-2 text-[10px] text-[#C58804] hover:bg-[#FFF2D5]">
                    💛 RSVP
                  </Badge>
                </div>
                <div className="flex items-center gap-2 border-t border-[#EFEFEF] pt-3 text-base leading-[155%] font-normal tracking-[0%] text-[#000000]">
                  <MapPinIcon weight="fill" size={16} /> Toronto, Ontario
                </div>
              </div>
            </div> */}

            {/* Active Campaigns Widget */}
            <div className="mt-6 space-y-4 rounded-[10px] border border-[#F6F6F6] bg-white lg:mt-0 lg:px-4 lg:py-5">
              <div
                className={cn(
                  "flex items-center justify-between",
                  showActiveCampaigns && "border-b border-b-[#EFEFEF] pb-4"
                )}
              >
                <h3 className="text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                  Active Campaigns
                </h3>
                <CaretDownIcon
                  className="cursor-pointer"
                  onClick={() => setShowActiveCampaigns((prev) => !prev)}
                  size={16}
                />
              </div>
              {showActiveCampaigns && (
                <div className="space-y-5">
                  {campaignsLoading ? (
                    [...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200" />

                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-40 rounded bg-gray-200" />
                            <div className="h-3 w-24 rounded bg-gray-200" />
                          </div>
                        </div>

                        <div className="h-11 w-full rounded-full bg-gray-200" />
                      </div>
                    ))
                  ) : (
                    <>
                      {communityCampaigns?.data?.items?.length === 0 ? (
                        <div className="mt-6 flex flex-col items-center justify-center rounded-[8px] bg-white p-4">
                          <img
                            src={EmptyCampaigns}
                            alt="empty-campaigns"
                            className="mb-3 h-[72px] w-[72px]"
                          />
                          <p className="trackin-[-2%] pb-2 text-center text-base leading-6 font-semibold text-[#1E1F24]">
                            No campaign updates yet.
                          </p>

                          <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
                            When campaign updates are available for this community, they will show
                            up here.
                          </p>
                        </div>
                      ) : (
                        <>
                          {communityCampaigns?.data?.items?.map((campaign: any, index: number) => (
                            <div key={index} className="space-y-4">
                              <div className="flex items-start gap-3">
                                {campaign?.imageUrl ? (
                                  <div>
                                    <img
                                      src={campaign?.imageUrl}
                                      alt="campaign-image"
                                      className="h-10 w-10 shrink-0 rounded-full"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <HandArrowUpIcon weight="duotone" size={20} />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <h4 className="line-clamp-1 text-[15px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                                      {campaign?.name}
                                    </h4>
                                    {/* <span className="text-[17px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                            40%
                          </span> */}
                                  </div>
                                  <div className="mt-1 flex items-center justify-between text-sm leading-[155%] font-normal tracking-[0%] text-[#6B6B6B]">
                                    <span>{timeAgo(campaign?.createdAt)}</span>
                                    {campaign?.goalAmountCents && (
                                      <span className="text-[#12AA5B]">
                                        {getCurrencySymbol(campaign?.goalCurrency || "")}
                                        {(campaign?.goalAmountCents / 100)?.toLocaleString()}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button
                                onClick={() => {
                                  setSelectedCampaign(campaign);
                                  setIsOpen(campaign?.id === isOpen ? null : campaign?.id);
                                }}
                                className="h-11 w-full rounded-full border border-[#FFF2D5] bg-[#ECA50D] text-white hover:bg-[#c98d00]"
                              >
                                Donate <ArrowUpRight className="ml-2 h-4 w-4 -rotate-45" />
                              </Button>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DonationModal
        currency={selectedCampaign?.goalCurrency}
        componentCampaignId={selectedCampaign?.id}
        open={isOpen}
        onOpenChange={setIsOpen}
        campaignName={selectedCampaign?.name}
        endUserId={user?.id}
      />
    </>
  );
};

export default CommunityFeed;
