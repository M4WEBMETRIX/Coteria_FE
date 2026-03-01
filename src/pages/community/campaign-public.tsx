import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
import {
  CaretRightIcon,
  // ArrowLeftIcon,
  UsersIcon,
  ChartLineUpIcon,
  CalendarIcon,
} from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router-dom";
import PUBLIC_COMMUNITY_IMAGE_2 from "@/assets/images/public-community-image-2.png";
import ATLANTIC_LOGO from "@/assets/images/atlantic-salmon.png";
import { useGetPublicCampaign } from "./services";
import { getCurrencySymbol, getDaysBetweenDates } from "@/lib/utils";
import CampaignPublicSkeleton from "./campaign-public-skeleton";
import { DonationModal } from "./services/donate-modal";
import { useState } from "react";

// Mock data - would come from API in production
const campaignData = {
  id: "2",
  title: "William Cushner Fly Plates",
  refCode: "ACQR1",
  logo: ATLANTIC_LOGO,
  raised: 6230,
  goal: 15000,
  boost: 625,
  supporters: 168,
  daysLeft: 45,
  heroImage: PUBLIC_COMMUNITY_IMAGE_2,
  description: `William ("Bill") B. Cushner was born in Alberta in 1914, the son of Russian immigrants from the Ukraine.

His father worked in the wheat fields and mines as well as for the Canadian Pacific Railroad, which, at the time, was being built across the province. In 1924, however, the family moved to New York, where there were more employment opportunities and a better life for the children.

During his formative years, young Bill spent many happy days wandering through New York's Metropolitan Museum of Art, gradually developing an interest in art and artistic impression.`,
  impactHighlights: {
    supporters: 168,
    actionsTaken: 174,
  },
  updates: [
    {
      id: "1",
      title: "Weekly progress updates from our desk",
      description: "Clear visibility into how your support adds up",
    },
  ],
  upcomingEvents: [
    {
      id: "1",
      title: "Salmon Museum & Friends Lotto",
      date: "May 10",
      description: "The Salmon Museum and Friends weekly lotto was first established in 2019",
    },
    {
      id: "2",
      title: "Chase The Ace Lottery",
      date: "June 2",
      description: "We expect to kick off our exciting new Chase the Ace",
    },
  ],
};

const CampaignPublic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { campaignId } = useParams();

  const { data: publicCampaignData, isPending: publicCampaignPending } =
    useGetPublicCampaign(campaignId);

  // console.log("publicCampaignData", publicCampaignData);

  if (publicCampaignPending) {
    return <CampaignPublicSkeleton />;
  }

  return (
    <>
      <DonationModal
        currency={publicCampaignData?.data?.goalCurrency}
        open={isOpen}
        onOpenChange={setIsOpen}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-100 bg-white">
          <div className="container mx-auto max-w-7xl px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="h-10 w-48 bg-contain bg-left bg-no-repeat"
                  style={{ backgroundImage: `url(${publicCampaignData?.data?.logo})` }}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigate(-1)}
                  className="flex cursor-pointer items-center gap-2 text-sm text-[#969294] hover:text-[#12AA5B]"
                >
                  {/* <ArrowLeftIcon size={16} /> */}
                  Switch back
                </button>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="h-12 w-32 rounded-[10px] bg-[#307941] px-8 text-white hover:bg-[#0da055]"
                >
                  Donate <CaretRightIcon className="ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Hero */}
        <div className="relative h-[350px] w-full overflow-hidden">
          <img
            src={publicCampaignData?.data?.campaignImageUrl}
            alt={publicCampaignData?.data?.campaignName}
            className="h-full w-full bg-gradient-to-r from-black/60 object-cover"
          />

          {/* Floating Stats Card */}
          <div className="relative mx-auto w-full max-w-7xl px-8">
            <div className="absolute right-0 bottom-0 m-8 w-100 rounded-xl bg-white p-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-1">
                    <span className="leading-[] text-[25px] font-normal text-[#444243]">
                      {getCurrencySymbol(publicCampaignData?.data?.goalCurrency)}{" "}
                      {publicCampaignData?.data?.totalRaisedCents
                        ? (publicCampaignData?.data?.totalRaisedCents / 100)?.toLocaleString()
                        : "0"}
                    </span>
                    <span className="ml-2 text-[15px] text-[#868486]">raised</span>
                  </div>
                  <div>
                    <span className="text-[20px] leading-[100%] text-[#6B9671]">
                      {getCurrencySymbol(publicCampaignData?.data?.goalCurrency)}{" "}
                      {publicCampaignData?.data?.totalGoalCents
                        ? (publicCampaignData?.data?.totalGoalCents / 100)?.toLocaleString()
                        : "0"}
                    </span>
                    <span className="ml-1 text-base font-normal text-[#888688]">goal</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    {/* <p className="text-base text-[#80A384] hover:bg-[#E7FDF3]">+625 Boost</p> */}
                    <p className="text-base text-[#80A384] hover:bg-[#E7FDF3]">
                      {publicCampaignData?.data?.donationsCount} Donor
                      {publicCampaignData?.data?.donationsCount <= 1 ? "" : "s"}
                    </p>
                    {(publicCampaignData?.data?.endDate || publicCampaignData?.data?.startDate) && (
                      <span className="text-[15px] text-[#8D8A8C]">
                        {getDaysBetweenDates(
                          publicCampaignData?.data?.startDate,
                          publicCampaignData?.data?.endDate
                        )}{" "}
                        Days Left
                      </span>
                    )}
                  </div>
                  <Progress
                    value={
                      (publicCampaignData?.data?.totalRaisedCents /
                        publicCampaignData?.data?.goalAmountCents) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-[20px] leading-[100%] text-[#706E6F]">
                    {/* {publicCampaignData?.data?.supporters} Supporters */}
                  </span>
                  <span className="text-[19px] leading-[100%] text-[#777577]">
                    {/* {publicCampaignData?.data?.daysLeft} Days Left */}
                  </span>
                </div>

                <Button
                  onClick={() => setIsOpen(true)}
                  className="h-12 w-full rounded-lg bg-[#307941] text-white hover:bg-[#0da055]"
                >
                  Donate Now <CaretRightIcon className="ml-2" />
                </Button>

                {/* <p className="text-center text-[15px] text-[#8D8A8C]">
                RefCode: {campaignData.refCode}
              </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto max-w-7xl px-8 py-12">
          <div className="flex gap-8">
            {/* Left Column - Campaign Details */}
            <div className="flex-1 space-y-8">
              <div>
                <h1 className="mb-6 text-[26px] font-bold text-[#414041]">
                  {publicCampaignData?.data?.campaignName}
                </h1>
                <div className="prose max-w-none text-[19px] text-[#7C797B]">
                  {publicCampaignData?.data?.campaignDescription
                    ?.split("\n\n")
                    ?.map((paragraph: any, index: number) => (
                      <p key={index} className="mb-4 leading-[26.73px]">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>

              {/* Impact Highlights */}
              <div className="">
                <h3 className="mb-6 text-[25px] font-normal text-[#424042]">Impact Highlights</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="">
                      <UsersIcon size={24} className="text-[#12AA5B]" weight="fill" />
                    </div>
                    <div className="flex items-center gap-2.25 text-[21px] font-normal text-[#676567]">
                      <div className="">{publicCampaignData?.data?.donationsCount}</div>
                      <div className="">
                        Donor
                        {publicCampaignData?.data?.donationsCount <= 1 ? "" : "s"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="">
                      <ChartLineUpIcon size={24} className="text-[#12AA5B]" weight="fill" />
                    </div>
                    <div className="flex items-center gap-2.25 text-[21px] font-normal text-[#676567]">
                      <div className="">0</div>
                      <div className="">Actions Taken</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-[350px] shrink-0 space-y-6">
              {/* Community Updates */}
              <div className="w-full space-y-4 rounded-[10px] bg-[#12AA5B]/5 p-3">
                <h3 className="text-[22px] leading-[27.16px] font-bold text-[#5A5C59]">
                  Community Updates: Stay Engaged
                </h3>
                <div className="w-full space-y-3">
                  {campaignData.updates.map((update) => (
                    <div
                      key={update.id}
                      className="w-full cursor-pointer space-y-2 rounded-[10px] bg-white p-4 text-[19px] font-normal text-[#7D7B7C] transition-colors hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="flex items-center justify-between">
                          <div className="flex items-start gap-2.5">
                            <p className="mt-3 h-2.5 w-2.5 gap-2 rounded-full bg-[#12AA5B]" />
                            <p className="w-57.25">{update.title}</p>
                          </div>
                          <CaretRightIcon size={16} className="text-gray-400" />
                        </h4>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <p className="mt-3 h-2.5 w-2.5 gap-2 rounded-full bg-[#12AA5B]" />
                        <p className="w-57.25">{update.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="w-full space-y-4 bg-[#12AA5B]/5 p-3">
                <h3 className="text-[22px] leading-[27.16px] font-bold text-[#5A5C59]">
                  Upcoming Events: Join In
                </h3>
                <div className="space-y-3">
                  {campaignData.upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="cursor-pointer space-y-2 rounded-[10px] bg-white p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <CalendarIcon size={18} color="#12AA5B" />
                          <h4 className="text-[15px] font-bold text-[#676566]">{event.title}</h4>
                        </div>
                        <CaretRightIcon size={16} className="text-gray-400" />
                      </div>
                      <div className="text-[15px] font-semibold text-[#848284]">
                        <span>{event.date}</span>
                      </div>
                      <p className="text-sm leading-[21px] font-normal text-[#898689]">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignPublic;
