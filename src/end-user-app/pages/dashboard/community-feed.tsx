import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChatCircle,
  Heart,
  ShareFat,
  WhatsappLogo,
  LinkedinLogo,
  XLogo,
  Plus,
  // Users,
  Trophy,
} from "@phosphor-icons/react";
// import ActiveCampaignsWidget from "@/components/campaigns/active-campaigns-widget"; // Reusing existing widget
// import { Calendar } from "@/components/ui/calendar"; // Assuming we use a similar widget or reuse

const CommunityFeed = () => {
  return (
    <div className="flex w-full gap-6">
      {/* Left Sidebar */}
      <div className="w-[280px] space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-6 text-center">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200">
            <img
              src="https://placehold.co/80x80/png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1E1F24]">Wale Johnson</h3>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#E0F8FF] px-3 py-1 text-sm font-medium text-[#009BC2]">
              <Trophy weight="fill" /> Champion
            </div>
          </div>
        </div>

        {/* Invite Widget */}
        <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-4">
          <Button className="h-12 w-full justify-start gap-3 border border-[#ECEFF3] bg-white text-base font-medium text-[#1E1F24] shadow-sm hover:bg-gray-50">
            <span className="text-yellow-500">🤝</span> Invite Friends & Family
          </Button>
          <div className="flex gap-2 rounded-lg bg-[#F8FAFB] p-3 text-xs text-gray-500">
            <span className="text-yellow-500">💡</span>
            <p>Hint: Invite others. Earn XP when you invite new members to the community.</p>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="h-10 w-full justify-start gap-3 border-[#ECEFF3] text-sm font-normal text-gray-600"
            >
              <WhatsappLogo size={20} className="text-[#25D366]" weight="fill" /> Share on Whatsapp
            </Button>
            <Button
              variant="outline"
              className="h-10 w-full justify-start gap-3 border-[#ECEFF3] text-sm font-normal text-gray-600"
            >
              <LinkedinLogo size={20} className="text-[#0077B5]" weight="fill" /> Share on Linkedin
            </Button>
            <Button
              variant="outline"
              className="h-10 w-full justify-start gap-3 border-[#ECEFF3] text-sm font-normal text-gray-600"
            >
              <XLogo size={20} className="text-black" weight="fill" /> Share on X
            </Button>
            <Button
              variant="outline"
              className="h-10 w-full justify-center gap-2 border-[#ECEFF3] text-sm font-medium text-[#1E1F24]"
            >
              <Plus size={16} /> Add Social Links
            </Button>
          </div>
        </div>

        {/* Impact Score */}
        <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-[#1E1F24]">Your Impact Score</h4>
            <CaretRightIcon className="text-gray-400" />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">Level 5</span>
              <span className="text-gray-400">1000/1200 XP</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[80%] rounded-full bg-[#12AA5B]" />
            </div>
            <p className="mt-1 text-right text-xs text-gray-500">
              <span className="font-medium text-[#12AA5B]">+200</span> to level 6
            </p>
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-bold text-[#1E1F24]">Community Feed</h2>

        {/* Post Mock */}
        <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-xl font-bold text-pink-500">
              CA
            </div>
            <div>
              <h3 className="font-semibold text-[#1E1F24]">Community Admin</h3>
              <p className="text-xs text-gray-500">Posted: 4th May, 2023</p>
            </div>
          </div>

          <p className="leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Convallis at lacinia amet nulla nulla vulputate
            eget. Volutpat morbi sed semper tincidunt dolor et cras.
          </p>

          <div className="h-[300px] w-full overflow-hidden rounded-xl bg-gray-100">
            <img
              src="https://placehold.co/600x300/png"
              alt="Post Content"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center justify-end gap-4 text-gray-500">
            <button className="flex items-center gap-1 hover:text-[#12AA5B]">
              <ChatCircle size={20} />
            </button>
            <button className="flex items-center gap-1 hover:text-red-500">
              <Heart size={20} />
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <ShareFat size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[300px] space-y-6">
        {/* Events Widget (Mocked for now based on image) */}
        <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#1E1F24]">Events</h3>
            <CaretRightIcon className="rotate-90 text-gray-400" />
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Target Rights & Repairs Q&A</h4>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Wed, Apr 24 at 6:00PM</span>
              <Badge className="rounded-full border-0 bg-[#FEF6E7] px-2 text-[10px] text-[#D9A300] hover:bg-[#fff0d4]">
                💛 RSVP
              </Badge>
            </div>
            <div className="flex items-center gap-2 border-t border-gray-100 pt-3 text-sm">
              <MapPinIcon size={16} weight="fill" /> Toronto, Ontario
            </div>
          </div>
        </div>

        {/* Active Campaigns Widget */}
        <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-[#1E1F24]">Active Campaigns</h3>
            <CaretRightIcon className="rotate-90 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Heart weight="fill" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium">Green Roof Initiative</h4>
                  <span className="text-sm font-bold">40%</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                  <span>5 mins ago</span>
                  <span className="font-medium text-[#12AA5B]">$320,000</span>
                </div>
              </div>
            </div>
            <Button className="w-full rounded-full bg-[#E5A000] text-white hover:bg-[#c98d00]">
              Donate <CaretRightIcon className="ml-2 h-4 w-4 -rotate-45" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
import { CaretRightIcon, MapPin as MapPinIcon } from "@phosphor-icons/react"; // Import missing icons locally if needed, checking existing imports.

export default CommunityFeed;
