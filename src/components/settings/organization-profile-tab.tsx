import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCurrencies, useUpdateOrganisationProfile } from "@/services/generics/hooks";
import { Separator } from "../ui/separator";
import { useFileUpload } from "@/services/file-upload-hook";
import { useRef, useState } from "react";
import { Camera, CircleNotch } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface OrganizationProfileTabProps {
  formData: {
    organizationName: string;
    logoUrl: string;
    industry: string;
    language: string;
    currency: string;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressCountry: string;
    addressPostalCode: string;
  };
  setFormData: (data: any) => void;
}

const OrganizationProfileTab = ({ formData, setFormData }: OrganizationProfileTabProps) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const { data: currencies } = useGetCurrencies();
  const { mutateAsync: uploadFile } = useFileUpload();
  const { mutateAsync: updateOrgProfile } = useUpdateOrganisationProfile();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const payload = new FormData();
      payload.append("file", file);

      const res = await uploadFile(payload);
      const uploadedUrl = res?.url || res?.data?.url;
      if (uploadedUrl) {
        handleChange("logoUrl", uploadedUrl);
        await updateOrgProfile({
          name: formData.organizationName,
          logoUrl: uploadedUrl,
          industry: formData.industry,
          defaultCurrency: formData.currency,
          address: {
            line1: formData.addressStreet,
            city: formData.addressCity,
            region: formData.addressState,
            countryCode: formData.addressCountry,
            postalCode: formData.addressPostalCode,
          },
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="font-ubuntu">
      {/* Account Details Section */}
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          {" "}
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Account Details
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Your users will use this information to contact you.
          </p>
        </div>

        <div className="grid min-w-[532px] space-y-4">
          <div className="flex flex-col space-y-3 pb-2">
            <Label className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]">
              Organization Logo
            </Label>
            <div className="flex items-center gap-5">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                {isUploading ? (
                  <CircleNotch className="h-6 w-6 animate-spin text-gray-400" />
                ) : formData.logoUrl ? (
                  <img src={formData.logoUrl} alt="Logo" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="h-8 text-xs font-medium"
                >
                  Upload Logo
                </Button>
                <p className="mt-1 text-xs text-gray-500">Max 5MB, JPG/PNG</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="organizationName"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Company Name <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Input
              id="organizationName"
              value={formData.organizationName}
              onChange={(e) => handleChange("organizationName", e.target.value)}
              placeholder="Coterie"
            />
          </div>

          <div className="w-full space-y-2">
            <Label
              htmlFor="industry"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Industry<span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Select
              value={formData.industry}
              onValueChange={(value) => handleChange("industry", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="nonprofit">Non-profit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-2">
            <Label
              htmlFor="currency"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Currency <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Select
              value={formData.currency}
              onValueChange={(value) => handleChange("currency", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies?.map((currency: string, index: number) => (
                  <SelectItem key={index} value={currency}>
                    {getCurrencyName(currency)}
                  </SelectItem>
                ))}
                {/* <SelectItem value="usd">US Dollar</SelectItem>
                <SelectItem value="eur">Euro</SelectItem>
                {/* <SelectItem value="gbp">British Pound</SelectItem>
                <SelectItem value="ngn">Nigerian Naira</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Separator />
      {/* Address Section */}
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Address
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            This address will be saved as your entity.
          </p>
        </div>

        <div className="grid w-[532px] space-y-4">
          <div className="col-span-2 space-y-2">
            <Label
              htmlFor="addressStreet"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              This address will appear on your invoice.
            </Label>
            <Input
              id="addressStreet"
              value={formData.addressStreet}
              onChange={(e) => handleChange("addressStreet", e.target.value)}
              placeholder="House"
            />
          </div>

          <div className="col-span-2 w-full space-y-2">
            <Label
              htmlFor="addressCountry"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Country/Region <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Select
              value={formData.addressCountry}
              onValueChange={(value) => handleChange("addressCountry", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ng">Nigeria</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 space-y-2">
            <Label
              htmlFor="addressCity"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              City <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Input
              id="addressCity"
              value={formData.addressCity}
              onChange={(e) => handleChange("addressCity", e.target.value)}
              placeholder="Please enter your city"
            />
          </div>
          <div className="flex w-full gap-6">
            <div className="flex-2 space-y-2">
              <Label
                htmlFor="addressFull"
                className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
              >
                Address <span className="text-sm text-[#DF1C41]">*</span>
              </Label>
              <Input
                id="addressFull"
                className="w-[372px]"
                value={formData.addressStreet}
                onChange={(e) => handleChange("addressStreet", e.target.value)}
                placeholder="Please enter your address"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="addressPostalCode"
                className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
              >
                Postal Code <span className="text-sm text-[#DF1C41]">*</span>
              </Label>
              <Input
                id="addressPostalCode"
                className="min-w-[110px]"
                value={formData.addressPostalCode}
                onChange={(e) => handleChange("addressPostalCode", e.target.value)}
                placeholder="Please enter your postal code"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function getCurrencyName(code: string) {
  const currencies: Record<string, string> = {
    usd: "US Dollar",
    cad: "CAD Dollar",
    eur: "Euro",
    gbp: "British Pound",
    ngn: "Nigerian Naira",
  };

  if (!code) return "";

  return currencies[code.toLowerCase()] || code;
}

export default OrganizationProfileTab;
