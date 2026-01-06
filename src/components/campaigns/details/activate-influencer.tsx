import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { UserPlus, CheckCircle } from "@phosphor-icons/react";

const SUGGESTED_INFLUENCERS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    handle: "@sarah.j_impact",
    followers: "12.5K",
    category: "Community Activist",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: 2,
    name: "Michael Chen",
    handle: "@mike_chen",
    followers: "45K",
    category: "Tech for Good",
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
  {
    id: 3,
    name: "Emma Wilson",
    handle: "@emma.w",
    followers: "8.2K",
    category: "Local Leader",
    avatar: "https://i.pravatar.cc/150?u=emma",
  },
];

const YOUR_NETWORK = [
  {
    id: 4,
    name: "David Ross",
    handle: "@dross_99",
    followers: "22K",
    impact: "High",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    id: 5,
    name: "Linda May",
    handle: "@linda_m",
    followers: "5K",
    impact: "Medium",
    avatar: "https://i.pravatar.cc/150?u=linda",
  },
];

const InfluencerCard = ({ user, action }: { user: any; action: "invite" | "connected" }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#E0E1E6] bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border border-gray-100">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-[#1E1F24]">{user.name}</h4>
          <p className="text-sm text-[#8B8D98]">
            {user.handle} • {user.followers} followers
          </p>
          {user.category && (
            <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {user.category}
            </span>
          )}
        </div>
      </div>
      <div>
        {action === "invite" ? (
          <Button
            variant="outline"
            className="gap-2 border-[#12AA5B] text-[#12AA5B] hover:bg-[#12AA5B] hover:text-white"
          >
            <UserPlus size={16} />
            Invite
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="gap-2 text-[#12AA5B] hover:bg-transparent hover:text-[#12AA5B]"
            disabled
          >
            <CheckCircle size={18} weight="fill" />
            Connected
          </Button>
        )}
      </div>
    </div>
  );
};

const ActivateInfluencer = () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header & Search */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1E1F24]">Find & Activate Influencers</h2>
          <p className="text-[#8B8D98]">
            Discover key voices in your community to help amplify your campaign.
          </p>
        </div>
        <div className="relative max-w-lg">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, handle, or topic..."
            className="border-[#E0E1E6] pl-10"
          />
        </div>
      </div>

      {/* Suggested Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1E1F24]">Suggested for you</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SUGGESTED_INFLUENCERS.map((user) => (
            <InfluencerCard key={user.id} user={user} action="invite" />
          ))}
        </div>
      </div>

      {/* Your Network Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1E1F24]">Your Network</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {YOUR_NETWORK.map((user) => (
            <InfluencerCard key={user.id} user={user} action="connected" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivateInfluencer;
