import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { CaretRightIcon } from "@phosphor-icons/react";
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

const DashboardCampaigns = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"active" | "completed">("active");

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
          <div className="flex items-center gap-7">
            <button
              onClick={() => setTab("active")}
              className={`cursor-pointer pb-1 text-sm leading-[155%] tracking-[-2%] transition-all ${
                tab === "active"
                  ? "border-b-2 border-[#12AA5B] font-medium text-[#12AA5B]"
                  : "font-normal text-[#818898] hover:text-gray-700"
              }`}
            >
              Active Campaigns
            </button>
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
          </div>

          {/* Content */}
          <div className="space-y-8">
            {campaignsData?.map((campaign: any) => (
              <div key={campaign.id} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[22px] leading-[155%] font-normal tracking-[-2%] text-[#000000]">
                    {campaign?.name}
                  </h2>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex w-full items-center gap-3">
                    <div className="flex items-center leading-[155%] font-normal tracking-[0%]">
                      <span className="text-lg font-medium text-[#6B6B6B]">
                        {getCurrencySymbol(campaign?.goalCurrency)}
                        {(campaign?.totalRaisedCents / 100)?.toLocaleString()}
                      </span>
                      <span className="text-[#A3A3A3]">
                        /{getCurrencySymbol(campaign?.goalCurrency)}
                        {campaign?.goalAmountCents
                          ? (campaign?.goalAmountCents / 100)?.toLocaleString()
                          : "0"}
                      </span>
                    </div>
                    {/* Progress Bar Custom */}
                    <div className="h-2 w-full max-w-138.75 overflow-hidden rounded-full bg-[#D9D9D9]">
                      <div
                        className="h-full rounded-full bg-[#12AA5B]"
                        style={{ width: `${(campaign?.raised / campaign?.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      console.log(campaign);
                      setIsOpen(campaign?.id === isOpen ? null : campaign?.id);
                    }}
                    className="hidden h-10 rounded-full bg-[#12AA5B] px-4 text-white hover:bg-[#00b05b] lg:block"
                  >
                    <div className="flex items-center text-sm font-medium">
                      Donate
                      <CaretRightIcon size={14} weight="bold" className="text-white" />
                    </div>
                  </Button>
                </div>

                <p className="max-w-149.5 leading-[155%] font-normal text-[#6B6B6B]">
                  {campaign?.description}{" "}
                  <span
                    onClick={() => navigate(`/user/dashboard/campaign/${campaign?.id}`)}
                    className="cursor-pointer text-[#12AA5B]"
                  >
                    Learn more.
                  </span>
                </p>

                <Button
                  onClick={() => {
                    setSelectedCampaign(campaign);
                    console.log(campaign);
                    setIsOpen(campaign?.id === isOpen ? null : campaign?.id);
                  }}
                  className="h-10 rounded-full bg-[#12AA5B] px-4 text-white hover:bg-[#00b05b] lg:hidden"
                >
                  <div className="flex items-center text-sm font-medium">
                    Donate
                    <CaretRightIcon size={14} weight="bold" className="text-white" />
                  </div>
                </Button>

                <div className="h-26.5 w-full overflow-hidden rounded-[10px] bg-gray-100">
                  <img
                    src={campaign?.imageUrl}
                    alt={campaign?.name + "image"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
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
