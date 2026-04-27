import { useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import {
  ArrowSquareOutIcon,
  DownloadSimpleIcon,
  ImageIcon,
  QrCodeIcon,
} from "@phosphor-icons/react";
import {
  useCampaignDetails,
  useGetCampaignBasic,
  useGetOrganisationProfile,
} from "@/services/generics/hooks";
import { cn, getBaseUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CoteriePlaceholderLogo from "./coterie-placeholder-logo";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Combobox,
  ComboboxContent,
  // ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";

const SIZES = [
  { label: "512 × 512 px", value: 512 },
  { label: "1024 × 1024 px", value: 1024 },
  { label: "2048 × 2048 px", value: 2048 },
];

const CampaignQRCodePage = () => {
  const { id } = useParams();
  const [selectedCampaignId, setSelectedCampaignId] = useState<any | null>(null);
  // const navigate = useNavigate();

  const fetchId = id && id !== "undefined" ? id : selectedCampaignId;
  const { data: campaignDetails, isPending } = useCampaignDetails(fetchId);
  const campaign = campaignDetails?.data;

  const previewRef = useRef<HTMLDivElement>(null);
  const qrCanvasRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState("");
  const [brandColor, setBrandColor] = useState("#12AA5B");
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [format, setFormat] = useState<"PNG" | "JPG" | "SVG">("PNG");
  const [size, setSize] = useState(1024);
  const [generated, setGenerated] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: userData } = useGetOrganisationProfile();
  const orgUser = userData?.data;

  const { data, isPending: isCampaignListPending } = useGetCampaignBasic({
    search: debouncedSearchQuery,
  });
  const campaignList = data?.data?.items || [];

  // Find selected campaign name for display
  const selectedCampaign = campaignList.find((c: any) => c.slug === selectedCampaignId);

  const selectedCampaignName = selectedCampaign?.name;

  const donateUrl = `${getBaseUrl({ target: "donor" })}/campaign/public/donate/${id || selectedCampaign?.slug}`;
  const orgName = orgUser?.name || "<Org Name>";
  const campaignName = campaign?.name || "<Campaign Name>";

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoFile(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const convertOklchColors = (element: HTMLElement) => {
    console.log(element);
    // Create a temporary style element to override CSS variables
    const styleEl = document.createElement("style");
    styleEl.id = "temp-oklch-override";

    // Convert CSS variables from oklch to rgb
    const cssVarOverrides = `
      * {
        --background: rgb(255, 255, 255) !important;
        --foreground: rgb(15, 15, 15) !important;
        --card: rgb(255, 255, 255) !important;
        --card-foreground: rgb(15, 15, 15) !important;
        --popover: rgb(255, 255, 255) !important;
        --popover-foreground: rgb(15, 15, 15) !important;
        --primary-foreground: rgb(255, 255, 255) !important;
        --secondary: rgb(245, 245, 245) !important;
        --secondary-foreground: rgb(23, 23, 23) !important;
        --muted: rgb(245, 245, 245) !important;
        --muted-foreground: rgb(115, 115, 115) !important;
        --accent: rgb(245, 245, 245) !important;
        --accent-foreground: rgb(23, 23, 23) !important;
        --destructive: rgb(239, 68, 68) !important;
        --border: rgb(229, 229, 229) !important;
        --input: rgb(229, 229, 229) !important;
        --ring: rgb(163, 163, 163) !important;
        --flex-direction: column !important;
        --flex-wrap: wrap !important;
        --flex-gap: 1rem !important;
        --flex-justify-content: center !important;
        --flex-align-items: center !important;
        --flex-justify-content: center !important;
        --flex-align-items: center !important;
        --flex-justify-content: center !important;
        --flex-align-items: center !important;
      }
    `;

    styleEl.textContent = cssVarOverrides;
    document.head.appendChild(styleEl);

    return styleEl;
  };

  const restoreStyles = (styleEl: HTMLStyleElement) => {
    styleEl.remove();
  };

  const downloadPNG = useCallback(async () => {
    if (!previewRef.current) return;
    const styleEl = convertOklchColors(previewRef.current);

    try {
      // Small delay to let styles apply
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(previewRef.current, {
        scale: size / previewRef.current.offsetWidth,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const link = document.createElement("a");
      const fileFormat = format === "JPG" ? "jpeg" : "png";
      link.download = `${campaignName}-qr-code.${fileFormat === "jpeg" ? "jpg" : "png"}`;
      link.href = canvas.toDataURL(`image/${fileFormat}`);
      link.click();
    } finally {
      restoreStyles(styleEl);
    }
  }, [size, campaignName, format]);

  const downloadSVG = useCallback(async () => {
    if (!previewRef.current) return;
    const styleEl = convertOklchColors(previewRef.current);

    try {
      // Small delay to let styles apply
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(previewRef.current, {
        scale: size / previewRef.current.offsetWidth,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}">
  <image href="${dataUrl}" width="${size}" height="${size}" />
</svg>`;
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const link = document.createElement("a");
      link.download = `${campaignName}-qr-code.svg`;
      link.href = URL.createObjectURL(blob);
      link.click();
    } finally {
      restoreStyles(styleEl);
    }
  }, [size, campaignName]);

  const handleDownload = () => {
    if (format === "SVG") downloadSVG();
    else downloadPNG();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: campaignName, url: donateUrl });
    } else {
      navigator.clipboard.writeText(donateUrl);
    }
  };

  return (
    <div className="mx-auto w-full py-3">
      {/* Back nav */}
      {/* <button
        onClick={() => navigate(`/campaigns/${id}`)}
        className="mb-6 flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#0F0F0F]"
      >
        <ArrowLeftIcon size={16} />
        Back to campaign
      </button> */}

      {/* <h1 className="mb-8 text-2xl font-bold text-[#0F0F0F]">Generate QR Code</h1> */}

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ── Left panel ── */}
        <div className="w-full space-y-6 lg:max-w-[399px]">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-[#424448]">Customize (optional)</h2>

            {/* Campaign selector */}
            {!id && (
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-[#404040]">
                  Select Campaign
                </label>
                <Combobox
                  disabled={isCampaignListPending}
                  value={selectedCampaignId}
                  onValueChange={setSelectedCampaignId}
                  inputValue={searchQuery}
                  onInputValueChange={setSearchQuery}
                >
                  <ComboboxTrigger
                    className={cn(
                      "flex h-11 w-full cursor-pointer items-center justify-between rounded-full border border-[#E5E5E5] bg-[#F9F9F9] px-4 text-sm font-normal text-[#0F0F0F] shadow-none hover:bg-gray-100",
                      !selectedCampaignId && "text-[#D7D7D7]"
                    )}
                  >
                    <ComboboxValue placeholder={"Select campaign"}>
                      {isCampaignListPending ? (
                        "Loading..."
                      ) : (
                        <>{selectedCampaignName || "Select campaign"}</>
                      )}
                    </ComboboxValue>
                  </ComboboxTrigger>
                  <ComboboxContent className="z-[9999] w-(--anchor-width) min-w-(--anchor-width) p-0">
                    <ComboboxInput
                      showTrigger={false}
                      placeholder="Search campaign..."
                      className="h-auto rounded-none border-b py-4 text-sm shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none"
                    />
                    {(!campaignList || campaignList.length === 0) && (
                      <div className="px-4 py-4 text-center text-sm text-gray-500">
                        No campaigns found.
                      </div>
                    )}
                    <ComboboxList className="mt-1 max-h-[200px]">
                      {campaignList?.map((campaign: any) => (
                        <ComboboxItem
                          className={"cursor-pointer px-4 py-3"}
                          key={campaign.slug}
                          value={campaign.slug}
                        >
                          {campaign.name}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
            )}

            {/* Message */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-[#404040]">
                Message (show under the QR code)
              </label>
              <div className="relative">
                <Input
                  maxLength={60}
                  placeholder="e.g every contributions make a different"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-11 rounded-full border-[#E5E5E5] bg-[#F9F9F9] pr-12 text-sm placeholder:font-medium placeholder:text-[#D7D7D7]"
                />
                <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs text-[#9B9B9B]">
                  {message.length}/60
                </span>
              </div>
            </div>

            {/* Brand color */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-[#404040]">Brand color</label>
              <div className="relative flex items-center">
                <Input
                  placeholder="e.g #39966d9d1"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="h-11 rounded-full border-[#E5E5E5] bg-[#F9F9F9] pr-14 text-sm"
                />
                <label className="absolute right-3 cursor-pointer">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="sr-only"
                  />
                  <span
                    className="block h-7 w-7 rounded-md border border-[#E5E5E5]"
                    style={{ backgroundColor: brandColor }}
                  />
                </label>
              </div>
            </div>

            {/* Logo upload */}
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium text-[#404040]">
                Add logo (optional)
              </label>
              <label className="flex h-[107px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[20px] border border-[#E5E5E5] bg-[#FAFAFA] py-5 hover:border-[#12AA5B]">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  className="sr-only"
                  onChange={handleLogoUpload}
                />
                {logoFile ? (
                  <img src={logoFile} alt="logo" className="h-10 w-10 object-contain" />
                ) : (
                  <>
                    <p className="flex items-center gap-2">
                      <ImageIcon weight="bold" size={20} className="text-[#818898]" />
                      <span className="text-sm font-medium text-[#818898]">Upload logo</span>
                    </p>
                    <span className="text-sm font-medium text-[#818898]">
                      PNG, JPG, SVG (Max, 2MB)
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Format & Size */}
          <div>
            <h2 className="mb-4 text-base font-semibold text-[#424448]">Choose format % Size</h2>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-[#000000]">Format</p>
                <div className="flex gap-2">
                  {(["PNG", "JPG", "SVG"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`cursor-pointer rounded-[7px] border px-5 py-2.5 text-sm font-medium transition-all ${
                        format === f
                          ? "border-[#12AA5B] bg-white text-[#12AA5B]"
                          : "border-[#E5E5E5] bg-white text-[#6B6B6B] hover:border-[#12AA5B]"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-[#000000]">Size</p>
                <select
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="cursor-pointer rounded-[7px] border border-[#E5E5E5] bg-white px-2 py-2.5 text-sm text-[#0F0F0F] outline-none"
                >
                  {SIZES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate button */}
            <Button
              onClick={() => setGenerated(true)}
              className="flex h-12 w-full items-center justify-between rounded-full bg-[#12AA5B] px-2 text-white hover:bg-[#0da055]"
            >
              <span className="flex-1 text-center text-sm font-medium">Generate QR code</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <QrCodeIcon size={16} className="text-[#0F0F0F]" />
              </div>
            </Button>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 space-y-6">
          {/* Preview */}
          <div className="rounded-[10px] bg-[#FAFAFA] px-7.5 py-4.5">
            <p className="mb-1 text-sm font-semibold text-[#000000]">Preview</p>
            <p className="mb-4 text-xs font-medium text-[#666D80]">
              This is how your QR code will look.
            </p>

            <div className="">
              {/* Printable card */}
              <div
                ref={previewRef}
                className="relative mx-auto flex w-full max-w-[499px] flex-col items-center rounded-[16px] bg-white px-8 py-8"
              >
                {/* Dot decorations */}
                <div className="pointer-events-none absolute top-4 left-4 grid grid-cols-4 gap-1 opacity-30">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: brandColor }}
                    />
                  ))}
                </div>
                <div className="pointer-events-none absolute right-4 bottom-4 grid grid-cols-4 gap-1 opacity-30">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: brandColor }}
                    />
                  ))}
                </div>

                {/* Logo / icon */}
                {logoFile ? (
                  <img src={logoFile} alt="logo" className="h-14 w-14 object-contain" />
                ) : (
                  <CoteriePlaceholderLogo color={brandColor} />
                )}

                <p
                  className="mt-2 mb-0.5 max-w-full text-center text-lg font-bold break-words"
                  style={{ color: brandColor }}
                >
                  {orgName}
                </p>
                <p className="mb-1 max-w-full text-center text-sm break-words text-[#6B6B6B]">
                  Support our mission
                </p>
                {isPending && selectedCampaign ? (
                  <div className="mb-4 flex justify-center">
                    <div className="h-[16px] w-[60%] max-w-[260px] animate-pulse rounded bg-gray-200" />
                  </div>
                ) : (
                  <p className="mb-4 max-w-full text-center text-base font-bold break-words text-[#0F0F0F]">
                    {campaignName || "<Campaign Name>"}
                  </p>
                )}

                {/* QR Code */}
                <div ref={qrCanvasRef} className="mb-4">
                  {format === "SVG" ? (
                    <QRCodeSVG
                      value={donateUrl}
                      size={180}
                      fgColor="#000000"
                      bgColor="#ffffff"
                      level="H"
                      imageSettings={
                        logoFile
                          ? { src: logoFile, height: 36, width: 36, excavate: true }
                          : undefined
                      }
                    />
                  ) : (
                    <QRCodeCanvas
                      value={donateUrl}
                      size={180}
                      fgColor="#000000"
                      bgColor="#ffffff"
                      level="H"
                      imageSettings={
                        logoFile
                          ? { src: logoFile, height: 36, width: 36, excavate: true }
                          : undefined
                      }
                    />
                  )}
                </div>

                {/* Custom message */}
                <div className="mt-2 mb-4 flex w-full items-center justify-center border-t border-[#E5E5E5] pt-4 text-center text-sm font-medium text-[#6B6B6B]">
                  <p className="max-w-[350px] px-2 break-words">
                    {message || "Every contribution makes a difference."}
                  </p>
                </div>

                {/* Scan CTA */}
                <svg
                  width="200"
                  height="40"
                  viewBox="0 0 200 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Border pill */}
                  <rect
                    x="1"
                    y="1"
                    width="198"
                    height="38"
                    rx="19"
                    ry="19"
                    fill="none"
                    stroke={brandColor}
                    strokeWidth="1.5"
                  />
                  {/* Phone icon */}
                  <path
                    d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"
                    fill={brandColor}
                    transform="translate(35, 10) scale(0.85)"
                  />
                  {/* Text */}
                  <text
                    x="110"
                    y="26"
                    textAnchor="middle"
                    fill={brandColor}
                    fontSize="14"
                    fontWeight="500"
                    fontFamily="inter"
                  >
                    Scan to donate
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Download & Share */}
          {generated && (
            <div className="rounded-[10px] bg-[#FAFAFA] px-7.5 py-4.5">
              <p className="mb-1 text-sm font-semibold text-[#000000]">Download and share</p>
              <p className="mb-4 text-xs text-[#666D80]">
                Download your QR code or share it with your team or friends.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  className="flex cursor-pointer items-center gap-2 rounded-[8px] border border-[#DFE1E7] bg-white px-4 py-3 text-sm font-medium text-[#0D0D12] hover:border-[#12AA5B] hover:text-[#12AA5B]"
                >
                  Download {format}
                  <DownloadSimpleIcon size={16} />
                </button>
                <button
                  onClick={handleShare}
                  className="flex cursor-pointer items-center gap-2 rounded-[8px] border border-[#DFE1E7] bg-white px-4 py-3 text-sm font-medium text-[#0D0D12] hover:border-[#12AA5B] hover:text-[#12AA5B]"
                >
                  Share
                  <ArrowSquareOutIcon size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignQRCodePage;
