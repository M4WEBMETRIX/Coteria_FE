import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Mail } from "lucide-react";
import {
  CaretRightIcon,
  CheckIcon,
  QrCodeIcon,
  WhatsappLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useCreateShortenedUrlUserEnd } from "@/services/generics/hooks";

interface ShareDialogProps {
  url: string;
  /** Controlled open state — when provided the dialog is controlled externally */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ShareDialog({ url, open: controlledOpen, onOpenChange }: ShareDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "qr">("link");

  // Support both controlled and uncontrolled usage
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? (v: boolean) => onOpenChange?.(v) : setInternalOpen;

  const {
    mutate: generateShortenedReferral,
    isPending: isPendingShortened,
    data: dataShortened,
  } = useCreateShortenedUrlUserEnd();

  useEffect(() => {
    if (url && open) {
      generateShortenedReferral({ Url: `${url}` });
    }
  }, [url, open]);

  const encodedUrl = encodeURIComponent(dataShortened?.data?.short_url || url);
  const rawUrl = dataShortened?.data?.short_url || url;

  const handleShareWhatsApp = () => {
    const message = `Join Coterie through my referral link.\nHere's the link: ${rawUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareOnX = () => {
    const text = `Join Coterie through my referral link`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodedUrl}`;
    window.open(twitterUrl, "_blank");
  };

  const handleShareEmail = () => {
    const subject = "Join Coterie";
    const body = `Join Coterie through my referral link.\nHere's the link: ${rawUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rawUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dialogContent = (
    <DialogContent className="rounded-2xl sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-[#1E1F24]">Quick Share</DialogTitle>
      </DialogHeader>

      {/* Tab switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("link")}
          className={`cursor-pointer rounded-[10px] px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "link"
              ? "bg-[#12AA5B] text-white"
              : "border border-[#F6F6F6] bg-[#F6F6F6] text-[#6F6F6F]"
          }`}
        >
          Copy link
        </button>
        <button
          onClick={() => setActiveTab("qr")}
          className={`cursor-pointer rounded-[10px] px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "qr"
              ? "bg-[#12AA5B] text-white"
              : "border border-[#F6F6F6] bg-[#F6F6F6] text-[#6F6F6F]"
          }`}
        >
          QR Code
        </button>
      </div>

      {activeTab === "link" ? (
        <>
          {/* URL + copy button */}
          <div className="flex overflow-hidden rounded-[10px] border border-[#E5E5E5]">
            {isPendingShortened ? (
              <div className="h-12 flex-1 animate-pulse bg-gray-100" />
            ) : (
              <Input
                value={rawUrl}
                readOnly
                className="h-12 min-w-0 flex-1 rounded-none border-0 bg-white text-sm text-[#6F6F6F] focus-visible:ring-0"
              />
            )}
            <Button
              onClick={copyToClipboard}
              className="h-12 shrink-0 rounded-none rounded-r-[10px] bg-[#12AA5B] px-4 text-sm font-medium text-white hover:bg-[#0da055]"
            >
              <span className="flex items-center gap-1.5">
                {copied ? <CheckIcon size={14} /> : <Copy size={14} />}
                Copy link
              </span>
            </Button>
          </div>

          <p className="text-xs text-[#8B8D98]">
            Anyone with this link can join coterie with your referral.
          </p>

          {/* Social share buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={handleShareWhatsApp}
              className="flex min-w-[99px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <WhatsappLogoIcon size={16} />
              WhatsApp
            </button>
            <button
              onClick={handleShareEmail}
              className="flex min-w-[99px] cursor-pointer items-center justify-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-medium text-[#1E1F24] hover:border-[#12AA5B]"
            >
              <Mail size={14} />
              Mail
            </button>
            <button
              onClick={shareOnX}
              className="flex min-w-[99px] cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <XLogoIcon size={14} />
            </button>
          </div>
        </>
      ) : (
        <QRCodeSection url={rawUrl} />
      )}
    </DialogContent>
  );

  // Controlled mode — no trigger needed
  if (isControlled) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {dialogContent}
      </Dialog>
    );
  }

  // Uncontrolled mode — renders its own trigger button
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-14 w-full rounded-[20px] border border-[#BDFFCA] bg-[#12AA5B] text-lg font-medium text-white hover:bg-[#0da055]">
          Refer others
          <CaretRightIcon className="ml-1 h-6 w-6" />
        </Button>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}

const QRCodeSection = ({ url }: { url: string }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "referral-qrcode.png";
    link.click();
  };

  return (
    <div ref={qrRef} className="flex flex-col items-center gap-4 py-2">
      <QRCodeCanvas value={url} size={200} />

      <p className="text-xs text-[#8B8D98]">
        Anyone with this QR code can join coterie with your referral.
      </p>

      {/* Social share buttons */}
      <div className="flex flex-wrap gap-3 pt-1">
        <button
          onClick={handleDownload}
          className="flex min-w-[99px] cursor-pointer items-center justify-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-medium text-[#1E1F24] hover:border-[#12AA5B]"

          // className="text-sm font-medium text-[#12AA5B] underline hover:opacity-80"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export const QRCodeModal = ({
  url,
  isOpen,
  setIsOpen,
  isCustom,
}: {
  url: string;
  isOpen?: boolean;
  isCustom?: boolean;
  setIsOpen?: (value: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!isCustom && (
        <DialogTrigger asChild>
          <button className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl p-3 transition">
            <QrCodeIcon className="h-5 w-5 text-gray-600" />
            <span>QR Code</span>
          </button>
        </DialogTrigger>
      )}
      <DialogContent className="rounded-xl sm:max-w-[400px]">
        <QRCodeSection url={url} />
      </DialogContent>
    </Dialog>
  );
};
