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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useCreateShortenedUrl } from "@/services/generics/hooks";
// import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";

interface ShareDialogProps {
  url: string;
}

export function ShareDialog({ url }: ShareDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    mutate: generateShortenedReferral,
    isPending: isPendingShortened,
    data: dataShortened,
  } = useCreateShortenedUrl();

  useEffect(() => {
    if (url && open) {
      generateShortenedReferral({
        Url: `${url}`,
      });
    }
  }, [url, open]);

  const encodedUrl = encodeURIComponent(dataShortened?.data?.short_url || url);

  const handleShareWhatsApp = () => {
    const message = `Join Coterie through my referral link.\nHere's the link: ${encodedUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareOnX = () => {
    const text = `Join Coterie through my referral link`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(encodedUrl)}`;
    window.open(url, "_blank");
  };

  const handleShareEmail = () => {
    const subject = "Join Coterie";
    const body = `Join Coterie through my referral link.\nHere's the link: ${encodedUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-14 w-full rounded-[20px] border border-[#BDFFCA] bg-[#12AA5B] text-lg font-medium text-white hover:bg-[#0da055]">
          Refer others
          <CaretRightIcon className="ml-1 h-6 w-6" />
        </Button>
        {/* <Button>Share</Button> */}
      </DialogTrigger>

      <DialogContent className="h-[450px] rounded-2xl sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Quick Share</DialogTitle>
        </DialogHeader>

        {/* Link + Copy */}
        {/* <div className="flex items-center gap-2 rounded-lg border p-2">
          <input value={url} readOnly className="flex-1 bg-transparent text-sm outline-none" />
          <Button size="sm" variant="secondary" onClick={copyToClipboard}>
            <Copy className="mr-1 h-4 w-4" />
            Copy
          </Button>
        </div> */}

        <div className="space-y-2">
          <Label className="text-base text-[#64646E]">Invite link</Label>

          <div className="flex">
            {isPendingShortened ? (
              <div className="h-12 flex-1 animate-pulse rounded bg-gray-200" />
            ) : (
              <Input
                value={encodedUrl}
                readOnly
                className="h-12 min-w-0 flex-1 rounded-r-none border border-[#F0EEF4] bg-[#F7F5F9] pr-0"
              />
            )}

            <Button
              onClick={copyToClipboard}
              className="flex h-12 w-[140px] shrink-0 items-center justify-between rounded-l-none sm:w-[156px]"
            >
              <span className="flex items-center gap-2">
                {copied ? <CheckIcon size={16} /> : <Copy size={16} />}
                Copy link
              </span>
              <CaretRightIcon size={16} />
            </Button>
          </div>

          <p className="text-sm text-[#878691]">
            Anyone with this link can join coterie with your referral.
          </p>
        </div>

        {/* Share Options */}
        <div className="mt-3 grid grid-cols-2 gap-4">
          <button
            onClick={handleShareWhatsApp}
            className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl p-3 transition"
          >
            <WhatsappLogoIcon className="text-xl text-green-500" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={shareOnX}
            className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl p-3 transition"
          >
            <XLogoIcon className="text-xl text-black" />
            <span>X</span>
          </button>

          <button
            onClick={handleShareEmail}
            className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl p-3 transition"
          >
            <Mail className="h-5 w-5 text-gray-600" />
            <span>Email</span>
          </button>

          <QRCodeModal url={url} />
          {/* <button
            onClick={() => alert("QR code modal or generator here")}
            className="hover:bg-muted flex items-center gap-3 rounded-xl p-3 transition"
          >
            <QrCode className="h-5 w-5 text-gray-600" />
            <span>QR Code</span>
          </button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const QRCodeModal = ({ url }: { url: string }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl p-3 transition">
          <QrCodeIcon className="h-5 w-5 text-gray-600" />
          <span>QR Code</span>
        </button>
      </DialogTrigger>

      <DialogContent className="rounded-xl sm:max-w-[400px]">
        <div ref={qrRef} className="mt-4 flex flex-col items-center gap-2">
          <QRCodeCanvas value={url} size={220} />

          <button
            onClick={handleDownload}
            className="text-muted-foreground mt-4 cursor-pointer text-base underline"
          >
            Download QR-Code
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
