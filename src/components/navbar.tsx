// import { Search } from "lucide-react";
// import UserProfileMenu from "@/components/user-profile-menu";
import { type ReactNode } from "react";

// import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGetOrganisationProfile } from "@/services/generics/hooks";
import { useNavigate } from "react-router-dom";
import { ListIcon } from "@phosphor-icons/react";

interface NavbarProps {
  breadcrumbs: ReactNode;
  onMenuClick?: () => void;
}

const Navbar = ({ breadcrumbs, onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  const { data: userData } = useGetOrganisationProfile();
  const orgUser = userData?.data;

  // console.log(orgUser);

  // useEffect(() => {
  //   if (orgUser?.stripeOnboardingComplete === false) {
  //     setIsStripeModalOpen(true);
  //   }
  // }, []);

  return (
    <>
      {/* <StripeOnboardingModal isOpen={isStripeModalOpen} onOpenChange={setIsStripeModalOpen} /> */}
      <nav className="font-inter sticky top-0 z-50 flex h-[72px] w-full items-center justify-between border-b border-[#DFE1E7] bg-white">
        {/* Mobile menu button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-[#DFE1E7] transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <ListIcon size={24} weight="bold" color="#818898" />
          </button>

          {/* Breadcrumb - hidden on mobile */}
          <div className="hidden items-center lg:flex">{breadcrumbs}</div>
        </div>

        {/* Right Section: Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          {/* <div
            className={cn(
              "relative flex h-12 items-center transition-all duration-300 ease-in-out",
              isSearchOpen
                ? "w-[280px] rounded-full border border-[#DFE1E7] bg-[#FCFCFD] px-4"
                : "w-12 justify-center"
            )}
          >
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className={cn(
                "flex items-center justify-center text-[#0A0A0C]",
                !isSearchOpen && "h-12 w-12 rounded-full border border-[#DFE1E7] bg-[#FCFCFD]"
              )}
            >
              <Search className="h-5 w-5 text-[#41414380]" />
            </button>
            <input
              ref={inputRef}
              type="text"
              className={cn(
                "ml-2 h-full w-full bg-transparent text-sm outline-none placeholder:text-[#41414380]",
                !isSearchOpen && "hidden"
              )}
              placeholder="Quick search here..."
              onBlur={() => {
                // Small delay to allow clicking search button if we had one,
                // but mostly just close it.
                setIsSearchOpen(false);
              }}
            />
          </div> */}
          {/* Notifications */}
          {/* <button className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#DFE1E7] bg-[#FCFCFD] text-[#0A0A0C] transition-colors">
          <div className="absolute top-2 right-3 h-3 w-3 rounded-full bg-[#DF1C41]" />
          <Bell className="h-5 w-5" />
        </button> */}
          <div className="h-[20px] w-[px] bg-[#DFE1E7]" />
          <button
            onClick={() => navigate("/settings?tab=my-account")}
            className="flex items-center justify-start gap-2 outline-none"
          >
            <Avatar className="h-12 w-12 cursor-pointer border-2 border-transparent transition-all hover:border-gray-200">
              <AvatarImage src={orgUser?.logoUrl || ""} className="object-cover" />
              <AvatarFallback className="bg-[#B2DECA] text-xs font-semibold text-[#079455]">
                {getNameAbbrev(orgUser?.currentUser?.firstName as any)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start justify-start text-left lg:flex">
              <p className="max-w-[150px] truncate text-left text-xs leading-[150%] font-semibold tracking-[2%] text-[#0D0D12]">
                {orgUser?.currentUser?.firstName}
              </p>
              <p className="text-left text-xs leading-[150%] font-normal tracking-[2%] text-[#666D80]">
                {orgUser?.currentUser?.role}
              </p>
            </div>
          </button>
          {/* User Profile */}
          {/* THE MODAL IS NO LONGER REQUIRED */}
          {/* <UserProfileMenu /> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

function getNameAbbrev(name: string) {
  if (!name) return;

  return (name[0] + name[1]).toLocaleUpperCase();
}
