import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DeviceMobileSpeakerIcon,
  EnvelopeSimpleIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
  actionType: "copy" | "chat";
  onAction: () => void;
}

function ContactItem({ icon, text, actionType, onAction }: ContactItemProps) {
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    onAction();
    if (actionType === "copy") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-3xl items-center justify-between rounded-xl border border-[#DFE1E7] px-4 py-[10px]",
        actionType === "chat" ? "bg-[#F6FFF7]" : "bg-[#FCFCFD]"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F9FAFB] text-gray-600">
          {icon}
        </div>
        <span className="font-medium text-[#0A0A0C]">{text}</span>
      </div>

      {actionType === "copy" ? (
        <button
          onClick={handleAction}
          className="rounded-md px-3 py-1.5 text-xs font-semibold text-[#0A0A0C] transition-colors hover:text-gray-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      ) : (
        <Button
          onClick={handleAction}
          className="h-9 rounded-md bg-[#10B981] px-4 text-xs text-white hover:bg-[#059669]"
        >
          Chat with us
        </Button>
      )}
    </div>
  );
}

export function ContactTab() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard");
  };

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <h2 className="mb-2 text-lg font-semibold text-[#0A0A0C]">Contact us</h2>

      <ContactItem
        icon={<EnvelopeSimpleIcon size={16} weight="duotone" />}
        text="info@coteries.com"
        actionType="copy"
        onAction={() => handleCopy("info@coteries.com")}
      />

      <ContactItem
        icon={<DeviceMobileSpeakerIcon size={16} weight="duotone" />}
        text="02013306352"
        actionType="copy"
        onAction={() => handleCopy("02013306352")}
      />

      <ContactItem
        icon={<WhatsappLogoIcon size={16} weight="fill" className="text-[#10B981]" />} // Green logo for whatsapp usually
        text="08137272091"
        actionType="chat"
        onAction={() => window.open("https://wa.me/2348137272091", "_blank")}
      />
    </div>
  );
}
