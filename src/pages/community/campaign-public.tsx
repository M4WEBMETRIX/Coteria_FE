import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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

// <div className="flex h-16 w-86 items-center rounded-lg px-4">
//                 <img src={ATLANTIC_LOGO} alt="atlantic-salmon" />
//                 {/* <h1 className="text-2xl font-bold text-[#1E1F24]">Atlantic Salmon Museum</h1> */}
//               </div>

const CampaignPublic = () => {
  const navigate = useNavigate();
  const {
    slug,
    // campaignId
  } = useParams();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto max-w-7xl px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="h-10 w-48 bg-contain bg-left bg-no-repeat"
                style={{ backgroundImage: `url(${campaignData.logo})` }}
              />
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate(`/community/${slug}`)}
                className="flex items-center gap-2 text-sm text-[#969294] hover:text-[#12AA5B]"
              >
                {/* <ArrowLeftIcon size={16} /> */}
                Switch back
              </button>
              <Button className="h-12 rounded-lg bg-[#12AA5B] px-8 text-white hover:bg-[#0da055]">
                Donate <CaretRightIcon className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Hero */}
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={campaignData.heroImage}
          alt={campaignData.title}
          className="h-full w-full object-cover"
        />

        {/* Floating Stats Card */}
        <div className="absolute right-0 bottom-0 m-8 w-[400px] max-w-7xl rounded-xl bg-white p-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-bold text-[#1E1F24]">
                  ${campaignData.raised.toLocaleString()}
                </span>
                <span className="ml-2 text-sm text-gray-500">raised</span>
              </div>
              <div>
                <span className="text-lg text-gray-500">${campaignData.goal.toLocaleString()}</span>
                <span className="ml-1 text-sm text-gray-400">goal</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <Badge className="bg-[#E7FDF3] text-[#12AA5B] hover:bg-[#E7FDF3]">625 Boost</Badge>
                <span className="text-gray-500">{campaignData.daysLeft} Days Left</span>
              </div>
              <Progress value={(campaignData.raised / campaignData.goal) * 100} className="h-2" />
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-sm text-gray-600">{campaignData.supporters} Supporters</span>
              <span className="text-sm text-gray-600">{campaignData.daysLeft} Days Left</span>
            </div>

            <Button className="h-12 w-full rounded-lg bg-[#12AA5B] text-white hover:bg-[#0da055]">
              Donate Now <CaretRightIcon className="ml-2" />
            </Button>

            <p className="text-center text-xs text-gray-400">RefCode: {campaignData.refCode}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-8 py-12">
        <div className="flex gap-8">
          {/* Left Column - Campaign Details */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="mb-6 text-4xl font-bold text-[#1E1F24]">{campaignData.title}</h1>
              <div className="prose max-w-none">
                {campaignData.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Impact Highlights */}
            <div className="rounded-xl border border-[#ECEFF3] bg-white p-6">
              <h3 className="mb-6 text-xl font-bold text-[#1E1F24]">Impact Highlights</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7FDF3]">
                    <UsersIcon size={24} className="text-[#12AA5B]" weight="fill" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1E1F24]">
                      {campaignData.impactHighlights.supporters}
                    </div>
                    <div className="text-sm text-gray-500">Supporters</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7FDF3]">
                    <ChartLineUpIcon size={24} className="text-[#12AA5B]" weight="fill" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1E1F24]">
                      {campaignData.impactHighlights.actionsTaken}
                    </div>
                    <div className="text-sm text-gray-500">Actions Taken</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[350px] shrink-0 space-y-6">
            {/* Community Updates */}
            <div className="space-y-4 rounded-xl border border-[#ECEFF3] bg-white p-6">
              <h3 className="text-lg font-bold text-[#1E1F24]">Community Updates: Stay Engaged</h3>
              <div className="space-y-3">
                {campaignData.updates.map((update) => (
                  <div
                    key={update.id}
                    className="cursor-pointer space-y-2 rounded-lg border border-[#ECEFF3] p-4 transition-colors hover:bg-gray-50"
                  >
                    <h4 className="flex items-center justify-between text-sm font-semibold text-[#1E1F24]">
                      {update.title}
                      <CaretRightIcon size={16} className="text-gray-400" />
                    </h4>
                    <p className="text-xs text-gray-500">{update.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-4 rounded-xl border border-[#ECEFF3] bg-white p-6">
              <h3 className="text-lg font-bold text-[#1E1F24]">Upcoming Events: Join In</h3>
              <div className="space-y-3">
                {campaignData.upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="cursor-pointer space-y-2 rounded-lg border border-[#ECEFF3] p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-semibold text-[#1E1F24]">{event.title}</h4>
                      <CaretRightIcon size={16} className="text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <CalendarIcon size={14} />
                      <span>{event.date}</span>
                    </div>
                    <p className="text-xs text-gray-500">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPublic;
