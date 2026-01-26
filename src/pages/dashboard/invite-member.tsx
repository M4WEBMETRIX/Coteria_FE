import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ArrowsClockwiseIcon, CaretRightIcon } from "@phosphor-icons/react";

const InviteMembersModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [selectedAction, setSelectedAction] = useState("join");
  const [selectedAccess, setSelectedAccess] = useState("anyone");
  const [autoApprove, setAutoApprove] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteLink = "https://coterie.app/join/WomenEmpowermentTO?ref=ORG123";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const message = `Join our community on Coterie to support this cause and stay involved.\nHere's the link: ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleShareEmail = () => {
    const subject = "Join our community on Coterie";
    const body = `Join our community on Coterie to support this cause and stay involved.\nHere's the link: ${inviteLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="gap-0 p-0 md:max-w-[783px]">
        {/* Header */}
        <DialogHeader>
          {/* <DialogTitle className="flex items-center justify-center">Invite Members</DialogTitle> */}
          <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-5 right-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
            <X className="h-6 w-6 text-gray-400 hover:text-gray-600" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6 px-6 py-6">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 text-[24px] leading-[100%] font-bold tracking-[0%] text-[#3A3C48]">
              Invite Members
            </div>

            {/* Subtitle */}
            <p className="mb-2 text-lg leading-[100%] tracking-[0%] text-[#4F4F5C]">
              Invite people to join and support
            </p>

            <p className="text-base leading-[100%] tracking-[0%] text-[#9896A1]">
              Share a link to invite supporters to your community and donate to your active
              campaigns.
            </p>
          </div>

          {/* Invite Link Section */}
          <div className="space-y-2">
            <Label className="text-base leading-[100%] tracking-[0%] text-[#64646E]">
              Invite link
            </Label>
            <div className="relative flex gap-2">
              <Input
                type="text"
                value={inviteLink}
                readOnly
                className="h-12 flex-1 border border-[#F0EEF4] bg-[#F7F5F9] text-[#7C7C8B]"
              />
              <Button onClick={handleCopyLink} className="absolute right-0 h-12 w-[156px] gap-2">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-3">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    Copy link
                  </div>
                  <CaretRightIcon weight="bold" size={18} />
                </div>
              </Button>
            </div>
            <p className="mt-1.5 text-base leading-[100%] tracking-[0%] text-[#878691]">
              Anyone with this link can join based on your settings below.
            </p>
          </div>

          {/* What should this link do? */}
          <div className="space-y-3">
            <Label className="text-base leading-[100%] !font-normal tracking-[0%] text-[#61616C]">
              What should this link do?
            </Label>
            <div className="flex">
              <Button
                variant={selectedAction === "join" ? "default" : "secondary"}
                onClick={() => setSelectedAction("join")}
                className="h-12 w-1/3 rounded-r-[0px] px-5 py-2.5 text-base leading-[100%] font-normal! tracking-[0%]"
              >
                Join Community
              </Button>
              <Button
                variant={selectedAction === "donate" ? "default" : "secondary"}
                onClick={() => setSelectedAction("donate")}
                className="h-12 w-1/3 rounded-[0px] px-5 py-2.5 text-base leading-[100%] font-normal! tracking-[0%]"
              >
                Donate to Campaign
              </Button>
              <Button
                variant={selectedAction === "both" ? "default" : "secondary"}
                onClick={() => setSelectedAction("both")}
                className="h-12 w-1/3 rounded-l-[0px] px-5 py-2.5 text-base leading-[100%] font-normal! tracking-[0%]"
              >
                Join + Donate
              </Button>
            </div>
          </div>

          {/* Who can use this link? */}
          <div className="space-y-3">
            <Label className="text-base leading-[100%] !font-normal tracking-[0%] text-[#61616C]">
              Who can use this link?
            </Label>
            <RadioGroup
              className="grid grid-cols-2"
              value={selectedAccess}
              onValueChange={setSelectedAccess}
            >
              {/* Anyone Option */}
              <div className="flex items-center gap-3 py-2">
                <RadioGroupItem value="anyone" id="anyone" />
                <Label htmlFor="anyone" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 text-base leading-[100%] font-normal tracking-[0%] text-[#555560]">
                    <span className="">Anyone</span>
                    <span className="text-[#797884]">(Public link)</span>
                  </div>
                </Label>
              </div>

              {/* Restricted Option */}
              <div className="flex items-center gap-3 py-2">
                <RadioGroupItem value="restricted" id="restricted" />
                <Label htmlFor="restricted" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 text-base leading-[100%] font-normal tracking-[0%] text-[#555560]">
                    <span className="">Restricted</span>
                    <span className="text-[#797884]">(Email domain / list)</span>
                  </div>
                </Label>
              </div>

              {/* Invite-only Option */}
              <div className="flex items-center gap-3 py-2">
                <RadioGroupItem value="invite-only" id="invite-only" />
                <Label
                  htmlFor="invite-only"
                  className="flex flex-1 cursor-pointer items-center gap-2 text-base leading-[100%] font-normal tracking-[0%] text-[#555560]"
                >
                  <span className="">Invite-only</span>
                  <span className="text-[#797884]">(Approval required)</span>
                </Label>
              </div>

              {/* {selectedAccess === "anyone" && ( */}
              <div className="flex items-center gap-2.5">
                <Switch id="auto-approve" checked={autoApprove} onCheckedChange={setAutoApprove} />
                <Label
                  htmlFor="auto-approve"
                  className="flex cursor-pointer items-center gap-2 text-base leading-[100%] font-normal tracking-[0%] text-[#555560]"
                >
                  Auto-approve past donors
                </Label>
              </div>
              {/* )} */}
            </RadioGroup>
          </div>

          {/* Message Box */}
          <div className="flex items-center justify-between rounded-[10px] border border-[#E9E7F0] bg-[#F7F6FA] p-4">
            <p className="pr-8 text-base leading-[100%] font-normal tracking-[0%] text-[#6E6C77]">
              Join our community on Coterie to support this cause and stay involved.
              <br />
              <div className="mt-1 text-[#6E6C77]">Here's the link:</div>
              <div className="mt-1 text-[#7588B0]">{inviteLink}</div>
            </p>
            <button className="text-gray-400 hover:text-gray-600">
              <Copy size={24} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between rounded-b-lg px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-10 w-[100px] gap-2 rounded-[7px] border border-[#DDDDE8] bg-[#FAF9FC] text-base leading-[100%] font-normal tracking-[0%] text-[#6E6E78]"
          >
            <X size={24} />
            Close
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleShareWhatsApp}
              className="h-10 gap-2 text-base leading-[100%] font-normal tracking-[0%] text-[#6E6E78]"
            >
              <svg className="h-5 w-5 text-[#12AA5B]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Share via WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={handleShareEmail}
              className="h-10 gap-2 text-base leading-[100%] font-normal tracking-[0%] text-[#6E6E78]"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              Share via Email
            </Button>
            <Button className="flex h-10 items-center gap-2">
              <ArrowsClockwiseIcon size={20} />
              <span className="text-[#B3C6E5]">Create link</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembersModal;
