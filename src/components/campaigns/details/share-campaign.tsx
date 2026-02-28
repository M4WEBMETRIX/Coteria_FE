import { useState, useRef, useEffect } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import { Share01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { CopyIcon, EnvelopeSimpleIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { getBaseUrl } from "@/lib/utils";

const ShareCampaign = ({ campaignSlug, communityId }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<any>(null);

  const CampaignUrl = `${getBaseUrl()}/community/public/${campaignSlug}/${communityId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(CampaignUrl);
    setIsOpen(false);
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(CampaignUrl)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  const shareOnEmail = () => {
    const url = `mailto:?subject=${encodeURIComponent("Share Campaign")}&body=${encodeURIComponent(
      CampaignUrl
    )}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block font-sans" ref={menuRef}>
      {/* Main Share Button */}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="h-8 gap-2 border-[#E0E1E6] text-xs text-[#5E606A]"
      >
        <HugeiconsIcon icon={Share01Icon} size={14} />
        Share | 517
      </Button>

      {/* Share Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-42 overflow-hidden rounded-xl border border-[#E0E1E6] bg-white shadow-2xl">
          <div className="p-4">
            {/* Left Column: Socials */}
            <div className="flex-1">
              <p className="mb-3 text-[10px] font-bold tracking-wider text-[#696A70] uppercase">
                Share Campaign
              </p>
              <ul className="space-y-3">
                <MenuOption
                  icon={<CopyIcon size={18} />}
                  text="Copy Link"
                  color="text-orange-600"
                  onClick={() => copyLink()}
                />
                <MenuOption
                  icon={<WhatsappLogoIcon weight="duotone" size={18} />}
                  text="WhatsApp"
                  color="text-green-600"
                  onClick={() => shareOnWhatsApp()}
                />
                <MenuOption
                  icon={<EnvelopeSimpleIcon size={18} />}
                  text="Email"
                  onClick={() => shareOnEmail()}
                />
              </ul>
            </div>
          </div>

          {/* Bottom Cancel Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full cursor-pointer border-t border-[#E0E1E6] py-3 text-sm font-medium text-[#696A70] transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

// Helper component for menu items
const MenuOption = ({ icon, text, color = "text-gray-700", onClick }: any) => (
  <li
    onClick={onClick}
    className={`flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-70 ${color}`}
  >
    <span className="opacity-80">{icon}</span>
    <span className="text-sm font-medium">{text}</span>
  </li>
);

export default ShareCampaign;
