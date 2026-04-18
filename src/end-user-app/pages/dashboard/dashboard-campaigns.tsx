import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { ArrowRightIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
// import CAMPAIGN_IMAGE from "@/assets/images/sample-campaign.png";
// import CAMPAIGN_IMAGE_1 from "@/assets/images/sample-campaign-image-1.png";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useGetUserActiveCampaigns } from "@/services/generics/user-generics/user-hooks";
import { getCurrencySymbol } from "@/lib/utils";
import { getEndUserFromLocalStorage } from "@/end-user-app/services/local-storage";
import EmptyCampaigns from "@/assets/icons/empty-campaigns.svg";
import { DonationModal } from "@/pages/community/services/donate-modal";
import ManagePagination from "@/components/Manage-pagination";

const MAX_LENGTH = 72; // tweak this until it visually fits 2 lines

const getTruncatedText = (text: string) => {
  if (!text) return "";

  if (text.length <= MAX_LENGTH) return text;

  return text.slice(0, MAX_LENGTH) + "...";
};

const DashboardCampaigns = () => {
  const navigate = useNavigate();
  // const [tab, setTab] = useState<"active" | "completed">("active");

  const [isOpen, setIsOpen] = useState<any | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);

  const endUser = useMemo(() => {
    return getEndUserFromLocalStorage();
  }, []);

  // console.log(endUser);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: userActiveCampaigns, isPending: isLoading } = useGetUserActiveCampaigns(
    page,
    limit
  );
  // console.log(userActiveCampaigns);

  const campaignsData = userActiveCampaigns?.data?.items;
  const totalPages = userActiveCampaigns?.data?.totalPages || 1;
  const totalItems =
    userActiveCampaigns?.data?.totalCount || userActiveCampaigns?.data?.totalItems || 0;

  const campaignsWithImages = campaignsData?.filter((campaign: any) => campaign?.imageUrl);

  return (
    <>
      {isLoading ? (
        <div className="w-full animate-pulse space-y-8">
          {/* Banner Skeleton */}
          <div className="h-52 w-full rounded-[10px] bg-gray-200" />

          {/* Tabs Skeleton */}
          <div className="flex gap-6">
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="h-5 w-40 rounded bg-gray-200" />
          </div>

          {/* Campaign List Skeleton */}
          {[1, 2].map((item) => (
            <div key={item} className="space-y-6">
              {/* Title */}
              <div className="h-6 w-64 rounded bg-gray-200" />

              {/* Amount + Progress + Button */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex w-full items-center gap-3">
                  <div className="h-5 w-40 rounded bg-gray-200" />
                  <div className="h-2 w-full max-w-[500px] rounded-full bg-gray-200" />
                </div>
                <div className="h-10 w-28 rounded-full bg-gray-200" />
              </div>

              {/* Description */}
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />

              {/* Image */}
              <div className="h-28 w-full rounded-[10px] bg-gray-200" />
            </div>
          ))}
        </div>
      ) : campaignsData?.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center">
          <img src={EmptyCampaigns} alt="empty-campaigns" className="mb-3 h-[72px] w-[72px]" />
          <p className="trackin-[-2%] pb-2 text-center text-base leading-6 font-semibold text-[#1E1F24]">
            No campaigns yet.
          </p>

          <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
            When campaigns are available, they will show up here.
          </p>
        </div>
      ) : (
        <div className="w-full space-y-6">
          {/* Banner Carousel */}
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              {campaignsWithImages?.map((banner: any) => (
                <CarouselItem key={banner.id}>
                  <div
                    onClick={() => navigate(`/user/dashboard/campaign/${banner?.id}`)}
                    className="relative h-51.75 w-full cursor-pointer overflow-hidden rounded-[10px] bg-gray-200"
                  >
                    <img
                      src={banner?.imageUrl}
                      alt={banner?.name}
                      className="h-full w-full object-cover"
                    />
                    {/* image black overlay */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3.5 lg:bottom-6 lg:left-6">
                      <div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00D06C]">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2.783 5.573C3.887 4.537 5.39 4 7 4C8.34 4 9.524 4.557 10.443 5.22C11.083 5.682 11.614 6.209 12 6.671C12.4576 6.12508 12.9805 5.63743 13.557 5.219C14.476 4.557 15.66 4 17 4C18.61 4 20.113 4.537 21.217 5.573C22.327 6.613 23 8.124 23 10C23 11.893 21.94 14.748 20.081 17.12C18.212 19.505 15.457 21.5 12 21.5C8.543 21.5 5.788 19.505 3.919 17.12C2.059 14.749 1 11.894 1 10C1 8.124 1.674 6.613 2.783 5.573ZM6 10C6 10.993 6.29 12.461 7.188 13.71C8.124 15.007 9.674 16 12 16C14.326 16 15.876 15.008 16.811 13.71C17.711 12.46 18 10.992 18 10H16C16 10.673 15.79 11.706 15.188 12.54C14.624 13.326 13.675 14 12 14C10.326 14 9.376 13.325 8.812 12.54C8.21 11.707 8 10.674 8 10H6Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-white">
                        <h1 className="line-clamp-1 text-[22px] leading-[140%] font-medium tracking-[-2%]">
                          {banner?.name}
                        </h1>
                        <p
                          title={banner?.description}
                          className="line-clamp-1 max-w-[850px] text-sm leading-[150%] font-normal tracking-[-2%] opacity-90"
                        >
                          {banner?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Tabs */}
          {/* <div className="flex items-center gap-7"> */}
          {/* <button
              onClick={() => setTab("active")}
              className={`cursor-pointer pb-1 text-sm leading-[155%] tracking-[-2%] transition-all ${
                tab === "active"
                  ? "border-b-2 border-[#12AA5B] font-medium text-[#12AA5B]"
                  : "font-normal text-[#818898] hover:text-gray-700"
              }`}
            >
              Active Campaigns
            </button> */}
          {/* <button
          onClick={() => setTab("completed")}
          className={`cursor-pointer pb-1 text-sm leading-[155%] tracking-[-2%] transition-all ${
            tab === "completed"
              ? "border-b-2 border-[#12AA5B] font-medium text-[#12AA5B]"
              : "font-normal text-[#818898] hover:text-gray-700"
          }`}
        >
          Completed Campaigns
        </button> */}
          {/* </div> */}
          {/* {
    border: 1px #e5e5e5 solid;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
} */}
          {/* Content */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(0,388px))]">
            {campaignsData?.map((campaign: any) => {
              // const progress =
              //   campaign?.target && campaign?.raised
              //     ? Math.min((campaign.raised / campaign.target) * 100, 100)
              //     : 0;
              const progress = Math.min(
                (campaign.totalRaisedCents / campaign.goalAmountCents) * 100,
                100
              );
              return (
                <div
                  onClick={() => navigate(`/user/dashboard/campaign/${campaign?.id}`)}
                  key={campaign.id}
                  className="flex cursor-pointer gap-3 rounded-[6px] border border-[#E4E4E4] p-3 transition-all duration-300 lg:block lg:max-w-[413px] lg:rounded-[32px] lg:p-3"
                >
                  <div>
                    <div className="relative h-30 w-30 overflow-hidden rounded-[12px] bg-gray-100 lg:h-[272px] lg:w-full lg:rounded-[32px]">
                      <img
                        src={campaign?.imageUrl}
                        alt={campaign?.name + "image"}
                        className="h-full w-full object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="mb-2.5 flex items-center justify-between lg:mt-4">
                      <h2 className="line-clamp-1 text-base leading-[120%] font-semibold tracking-[-0.5%] text-[#0F0F0F] lg:text-[20px] lg:font-medium">
                        {campaign?.name}
                      </h2>
                    </div>

                    <p className="hidden w-full text-base leading-[24px] font-normal tracking-[-0.5%] text-[#404040] lg:inline-block lg:max-h-10">
                      {getTruncatedText(campaign?.description)}{" "}
                      {campaign?.description?.length > MAX_LENGTH && (
                        <span
                          className="cursor-pointer text-[#12AA5B]"
                          onClick={(e) => {
                            e.stopPropagation();
                            // handle expand
                          }}
                        >
                          Learn more
                        </span>
                      )}
                    </p>

                    {/* <p className="hidden w-full text-base leading-[24px] font-normal tracking-[-0.5%] text-[#404040] lg:inline-block lg:min-h-12">
                      <p className="lg:line-clamp-2">{campaign?.description}</p>
                      <span
                        // onClick={() => handleShowMoreDescription(campaign?.description)}
                        className="cursor-pointer text-[#12AA5B]"
                      >
                        Learn more.
                      </span>
                    </p> */}

                    {/* Progress Bar Custom */}
                    <div className="mt-2.5 mb-4 h-4 w-full overflow-hidden rounded-full bg-[#F3E9D8] lg:mt-5.5">
                      <div
                        className="h-full rounded-full bg-[#7CE993] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {/* <div className="mt-5.5 h-4 w-full rounded-full bg-[#D9D9D9]">
                  <div
                    className="h-full rounded-full bg-[#7CE993]"
                    style={{ width: `${(campaign?.raised / campaign?.target) * 100}%` }}
                  />
                </div> */}

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex w-full items-center gap-3">
                        <div className="flex flex-col items-start gap-1.5 leading-[155%] font-normal tracking-[0%]">
                          <span className="text-lg font-semibold text-[#0F0F0F] lg:text-[20px] lg:font-medium">
                            {getCurrencySymbol(campaign?.goalCurrency)}
                            {(campaign?.totalRaisedCents / 100)?.toLocaleString()}
                          </span>
                          <span className="text-sm font-normal text-[#0F0F0F]">
                            raised of {getCurrencySymbol(campaign?.goalCurrency)}
                            {campaign?.goalAmountCents
                              ? (campaign?.goalAmountCents / 100)?.toLocaleString()
                              : "0"}{" "}
                            goal
                          </span>
                        </div>
                      </div>
                      <Button
                        variant={"outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCampaign(campaign);
                          // console.log(campaign);
                          setIsOpen(campaign?.id === isOpen ? null : campaign?.id);
                        }}
                        className="hidden h-[56px] w-[157px] rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-4 text-white lg:flex lg:items-center lg:justify-between"
                      >
                        <div className="flex items-center text-base font-medium text-[#0F0F0F]">
                          Donate
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                          <ArrowRightIcon size={14} weight="bold" className="text-[#0F0F0F]" />
                        </div>
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      // console.log(campaign);
                      setIsOpen(campaign?.id === isOpen ? null : campaign?.id);
                    }}
                    className="hidden h-10 rounded-full bg-[#12AA5B] px-4 text-white hover:bg-[#00b05b] lg:hidden"
                  >
                    <div className="flex items-center text-sm font-medium">
                      Donate
                      <CaretRightIcon size={14} weight="bold" className="text-white" />
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isLoading && campaignsData?.length > 0 && totalPages > 1 && (
        <ManagePagination
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={page}
          setCurrentPage={setPage}
          itemsPerPage={limit}
          setItemsPerPage={(newLimit) => {
            setLimit(newLimit);
            setPage(1); // Reset to first page when changing limit
          }}
        />
      )}

      <DonationModal
        currency={selectedCampaign?.goalCurrency}
        componentCampaignId={selectedCampaign?.id}
        open={isOpen}
        onOpenChange={setIsOpen}
        campaignName={selectedCampaign?.name}
        endUserId={endUser?.id}
      />
    </>
  );
};

export default DashboardCampaigns;
