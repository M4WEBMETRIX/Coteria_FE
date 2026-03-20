import { useEffect, useState } from "react";
import { Copy, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowsClockwiseIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import { useCreateInviteToCommunity, useCreateShortenedUrl } from "@/services/generics/hooks";
import { getBaseUrl } from "@/lib/utils";

const InviteMembersModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const { mutate: generateReferral, isPending, data } = useCreateInviteToCommunity(id);

  const {
    mutate: generateShortenedReferral,
    isPending: isPendingShortened,
    data: dataShortened,
  } = useCreateShortenedUrl();

  // ✅ Only run when modal opens
  useEffect(() => {
    if (open && id) {
      generateReferral({});
    }
  }, [open, id, generateReferral]);

  const returnUrl = `${getBaseUrl({ target: "donor" })}/user/dashboard/community/${id}`;
  const inviteLink = `${getBaseUrl({ target: "donor" })}/user/signup?referral-code=${
    data?.data?.code
  }&returnUrl=${returnUrl}`;

  const visibleLink = `${getBaseUrl({ target: "donor" })}${dataShortened?.data?.short_url}`;

  useEffect(() => {
    if (open && inviteLink) {
      generateShortenedReferral({ Url: inviteLink });
    }
  }, [open, inviteLink, generateShortenedReferral]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(visibleLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const message = `Join our community on Coterie to support this cause and stay involved.\nHere's the link: ${visibleLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleShareEmail = () => {
    const subject = "Join our community on Coterie";
    const body = `Join our community on Coterie to support this cause and stay involved.\nHere's the link: ${visibleLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="w-full min-w-[783px] gap-0 p-0">
        {/* Header */}
        <DialogHeader>
          <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-6 w-6 text-gray-400 hover:text-gray-600" />
          </DialogClose>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6 px-4 py-6 sm:px-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-[24px] font-bold text-[#3A3C48]">Invite Members</h2>

            <p className="mt-2 text-lg text-[#4F4F5C]">Invite people to join and support</p>

            <p className="mt-1 text-base text-[#9896A1]">
              Share a link to invite supporters to your community and donate to your active
              campaigns.
            </p>
          </div>

          {/* Invite Link */}
          <div className="space-y-2">
            <Label className="text-base text-[#64646E]">Invite link</Label>

            <div className="flex">
              {isPendingShortened ? (
                <div className="h-12 flex-1 animate-pulse rounded bg-gray-200" />
              ) : (
                <Input
                  value={visibleLink}
                  readOnly
                  className="h-12 min-w-0 flex-1 rounded-r-none border border-[#F0EEF4] bg-[#F7F5F9] pr-0"
                />
              )}

              <Button
                onClick={handleCopyLink}
                className="flex h-12 w-[140px] shrink-0 items-center justify-between rounded-l-none sm:w-[156px]"
              >
                <span className="flex items-center gap-2">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  Copy link
                </span>
                <CaretRightIcon size={16} />
              </Button>
            </div>

            <p className="text-sm text-[#878691]">Anyone with this link can join the community.</p>
          </div>

          {/* Message Box */}
          <div className="flex items-start justify-between gap-3 rounded-[10px] border border-[#E9E7F0] bg-[#F7F6FA] p-4">
            <div className="min-w-0 flex-1 text-sm text-[#6E6C77]">
              <p>Join our community on Coterie to support this cause and stay involved.</p>

              <p className="mt-1 text-[#989AAA]">Here's the link:</p>

              {isPendingShortened ? (
                <div className="mt-2 h-6 w-40 animate-pulse rounded bg-gray-200" />
              ) : (
                <p className="mt-1 break-all text-[#7588B0]">{visibleLink}</p>
              )}
            </div>

            <button
              disabled={isPending}
              onClick={handleCopyLink}
              className="shrink-0 text-gray-400 hover:text-gray-600"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6">
          {/* <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            <X size={18} />
            Close
          </Button> */}

          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-10 w-[100px] gap-2 rounded-[7px] border border-[#DDDDE8] bg-[#FAF9FC] text-base leading-[100%] font-normal tracking-[0%] text-[#6E6E78]"
          >
            <X size={24} /> Close{" "}
          </Button>
          <div className="flex w-full flex-wrap justify-end gap-2 sm:w-auto">
            <Button variant="outline" onClick={handleShareWhatsApp} className="flex-1 sm:flex-none">
              <svg className="h-5 w-5 text-[#12AA5B]" viewBox="0 0 24 24" fill="currentColor">
                {" "}
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />{" "}
              </svg>{" "}
              Share via WhatsApp
            </Button>

            <Button variant="outline" onClick={handleShareEmail} className="flex-1 sm:flex-none">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {" "}
                <rect x="2" y="4" width="20" height="16" rx="2" /> <path d="M22 7l-10 7L2 7" />{" "}
              </svg>{" "}
              Share via Email
            </Button>

            <Button onClick={() => generateReferral({})} className="flex items-center gap-2">
              <ArrowsClockwiseIcon size={16} />
              {isPending ? "Generating..." : "Create link"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembersModal;
