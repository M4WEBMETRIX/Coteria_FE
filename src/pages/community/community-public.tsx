import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CaretRightIcon, CalendarIcon, UserIcon } from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router-dom";
import PUBLIC_COMMUNITY_IMAGE_1 from "@/assets/images/public-community-image-1.png";
import ATLANTIC_LOGO from "@/assets/images/atlantic-salmon.png";
import SAMPLE_PUB_COM_IMAGE_1 from "@/assets/images/pub-com-1.png";
import SAMPLE_PUB_COM_IMAGE_2 from "@/assets/images/pub-com-2.png";
import { useGetPublicCommunity } from "./services";

// Mock data - would come from API in production
const communityData = {
  name: "Atlantic Salmon Museum",
  slug: "atlantic-salmon-museum",
  description:
    "A year-round landmark on the Main Southwest Miramichi, the Atlantic Salmon Museum welcomes 3,000+ visitors annually.",
  heroImage: PUBLIC_COMMUNITY_IMAGE_1,
  campaigns: [
    {
      id: "1",
      title: "John Keith-King Collection",
      description: "John William Keith-King died after...",
      raised: 4245,
      goal: 5000,
      donors: 127,
      daysLeft: 45,
      image: SAMPLE_PUB_COM_IMAGE_1,
    },
    {
      id: "2",
      title: "William Cushner Fly Plates",
      description: 'William ("Bill") B. Cushner was born in...',
      raised: 2810,
      goal: 5000,
      donors: 96,
      daysLeft: 25,
      image: SAMPLE_PUB_COM_IMAGE_2,
    },
  ],
  volunteer: {
    name: "Sarah K.",
    role: "Volunteer",
    avatar: "https://placehold.co/80x80/png",
    quote:
      "This community is making Toronto greener, one tree at a time. I'm so proud to be part of it!",
  },
  upcomingEvents: [
    {
      id: "1",
      title: "Cast and Craft Festival",
      description: "Where the River Meets Creativity and you are invited",
      date: "Wed, Apr 24 at 6:00PM",
    },
    {
      id: "2",
      title: "Chase The Ace Lottery",
      description:
        "The Atlantic Salmon Museum Chase the Ace is returning soon, bigger and better than ever.",
      date: "Sun, May 12 at 5:00PM",
    },
  ],
};

const CommunityPublic = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { data: publicCommunityData } = useGetPublicCommunity(slug);
  console.log("publicCommunityData", publicCommunityData);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[426px] w-full overflow-hidden">
        <img
          src={communityData.heroImage}
          alt={communityData.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
          <div className="container mx-auto flex h-full max-w-7xl flex-col justify-center px-8">
            <div className="max-w-xl space-y-6">
              <div className="flex h-16 w-86 items-center rounded-lg px-4">
                <img src={ATLANTIC_LOGO} alt="atlantic-salmon" />
                {/* <h1 className="text-2xl font-bold text-[#1E1F24]">Atlantic Salmon Museum</h1> */}
              </div>
              <p className="max-w-md text-lg leading-relaxed text-[#24205C]">
                {communityData.description}
              </p>
              <div className="flex gap-4">
                <Button className="h-12 w-39.5 rounded-[10px] bg-[#12AA5B] px-8 text-white hover:bg-[#0da055]">
                  Donate <CaretRightIcon className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-50 rounded-[10px] bg-white px-8 hover:bg-white/10"
                >
                  Join Community <CaretRightIcon className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-8 py-12">
        <div className="flex gap-8">
          {/* Left Column - Campaigns */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="mb-2 text-3xl font-normal text-[#1E1F24]">
                Support Our Campaigns to Grow
              </h2>
              <h3 className="text-2xl font-bold text-[#1E1F24]">{communityData.name}</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {communityData.campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => navigate(`/community/public/${slug}/campaign/${campaign.id}`)}
                  className="cursor-pointer space-y-4 rounded-[10px] border border-[#ECEFF3] bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="h-48 w-full overflow-hidden rounded-t-[10px] bg-gray-100">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <h4 className="text-lg leading-[100%] font-normal text-[#605A5C]">
                      {campaign.title}
                    </h4>
                    <p className="line-clamp-2 text-[13px] leading-[100%] text-[#A19FA2]">
                      {campaign.description}
                    </p>
                    <div className="space-y-2">
                      <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[17px] leading-[100%] font-normal text-[#615D60]">
                            ${campaign.raised.toLocaleString()}
                          </span>
                          <span className="text-[13px] leading-[100%] font-thin text-[#908F92]">
                            ${campaign.goal.toLocaleString()} Goal
                          </span>
                        </div>

                        <span className="text-[15px] leading-[100%] font-normal text-[#979498]">
                          {campaign.donors} Donors
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Button className="w-31 rounded-lg bg-[#12AA5B] text-white hover:bg-[#0da055]">
                        Donate
                      </Button>
                      <span className="text-[13px] leading-[100%] font-normal text-[#89B994]">
                        {campaign.daysLeft} Days
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[350px] shrink-0 space-y-6">
            {/* Volunteer Card */}
            <div className="space-y-4 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  <UserIcon size={32} color="#FFFFFF" />
                  {/* <img
                    src={communityData.volunteer.avatar}
                    alt={communityData.volunteer.name}
                    className="h-full w-full object-cover"
                  /> */}
                </div>
                <div>
                  <h4 className="text-lg leading-[100%] font-normal text-[#666566]">
                    {communityData.volunteer.name}
                  </h4>
                  <p className="mt-1 text-[13px] font-normal text-[#B1B3BA]">
                    {communityData.volunteer.role}
                  </p>
                </div>
              </div>
              <p className="text-base leading-relaxed font-normal text-[#646264]">
                "{communityData.volunteer.quote}"
              </p>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-4 bg-[#eaf4f6] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-normal text-[#606266]">Upcoming Events: Join Us</h3>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                {communityData.upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="cursor-pointer space-y-2 rounded-lg border border-[#ECEFF3] bg-white p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-2">
                      <CalendarIcon
                        size={20}
                        className="mt-0.5 shrink-0 text-[#12AA5B]"
                        weight="fill"
                      />
                      <h4 className="text-base font-bold text-[#706D70]">{event.title}</h4>
                    </div>
                    <p className="text-[13px] text-[#9C9A9D]">{event.description}</p>
                    {/* <div className="flex items-center gap-2 text-xs text-gray-400">
                      <CalendarIcon size={14} />
                      <span>{event.date}</span>
                    </div> */}
                    {/* <CaretRightIcon className="ml-auto text-gray-400" /> */}
                  </div>
                ))}
                <Button
                  variant="link"
                  className="w-[205px] justify-center bg-white text-[#A4A8B0] hover:text-[#A4A8B0]"
                >
                  View All Events
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPublic;
