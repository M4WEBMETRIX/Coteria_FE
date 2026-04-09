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
import { Camera, CaretDownIcon, CircleNotch } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

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

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

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

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit. Please choose a smaller file.`);

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
    <div className="font-inter">
      {/* Account Details Section */}
      <div className="justify-between p-3 lg:flex lg:p-6">
        <div className="w-[300px]">
          {" "}
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Organization Details
          </h3>
          {/* <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Your users will use this information to contact you.
          </p> */}
        </div>

        <div className="grid space-y-4 lg:min-w-[532px]">
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
              Organization Name <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Input
              id="organizationName"
              value={formData.organizationName}
              onChange={(e) => handleChange("organizationName", e.target.value)}
              placeholder="Coterie"
            />
          </div>

          <MultiSelectField
            value={formData.industry ? formData.industry.split(",") : []} // store as CSV
            onChange={(vals) => handleChange("industry", vals.join(","))}
          />
          {/* <div className="w-full space-y-2">
            <Label
              htmlFor="industry"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Focus Types<span className="text-sm text-[#DF1C41]">*</span>
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
          </div> */}

          <div className="w-full space-y-2">
            <Label
              htmlFor="currency"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Currency <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Select
              defaultValue="cad"
              disabled
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
      <div className="justify-between p-3 lg:flex lg:p-6">
        <div className="w-full lg:w-[300px]">
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Address
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            This address will be saved as your entity.
          </p>
        </div>

        <div className="w-full space-y-4 lg:grid lg:w-[532px]">
          <div className="col-span-2 space-y-2">
            <div className="w-full flex-2 space-y-2">
              <Label
                htmlFor="addressFull"
                className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
              >
                Address <span className="text-sm text-[#DF1C41]">*</span>
              </Label>
              <Input
                id="addressFull"
                className="w-full"
                value={formData.addressStreet}
                onChange={(e) => handleChange("addressStreet", e.target.value)}
                placeholder="Please enter your address"
              />
            </div>
            {/* <Label
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
            /> */}
          </div>

          <div className="col-span-2 w-full space-y-2">
            <Label
              htmlFor="addressCountry"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Country/Region <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Select
              defaultValue="ca"
              disabled
              value={formData.addressCountry}
              onValueChange={(value) => handleChange("addressCountry", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ng">Nigeria</SelectItem> */}
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
          <div className="flex w-full gap-3 lg:gap-6">
            <div className="flex-2 space-y-2">
              {/* <div className="w-full"> */}
              <Label
                htmlFor="addressState"
                className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
              >
                Province <span className="text-sm text-[#DF1C41]">*</span>
              </Label>
              <Select
                value={formData.addressState}
                onValueChange={(value) => handleChange("addressState", value)}
              >
                <SelectTrigger className="w-full lg:w-[372px]">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent className="w-full lg:w-[372px]">
                  <SelectItem className="cursor-pointer" value="AB">
                    Alberta
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="BC">
                    British Columbia
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="MB">
                    Manitoba
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="NB">
                    New Brunswick
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="NL">
                    Newfoundland and Labrador
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="NS">
                    Nova Scotia
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="NT">
                    Northwest Territories
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="NU">
                    Nunavut
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="ON">
                    Ontario
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="PE">
                    Prince Edward Island
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="QC">
                    Quebec
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="SK">
                    Saskatchewan
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="YT">
                    Yukon
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* </div> */}
              {/* <Label
                htmlFor="addressFull"
                className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
              >
                Address <span className="text-sm text-[#DF1C41]">*</span>
              </Label>
              <Input
                id="addressFull"
                className="w-full lg:w-[372px]"
                value={formData.addressStreet}
                onChange={(e) => handleChange("addressStreet", e.target.value)}
                placeholder="Please enter your address"
              /> */}
            </div>
            <div className="w-[40%] space-y-2 lg:w-full">
              <Label
                htmlFor="addressPostalCode"
                className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
              >
                Postal Code <span className="text-sm text-[#DF1C41]">*</span>
              </Label>
              <Input
                id="addressPostalCode"
                className="lg:min-w-[110px]"
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
    // usd: "US Dollar",
    cad: "CAD Dollar",
    // eur: "Euro",
    // gbp: "British Pound",
    // ngn: "Nigerian Naira",
  };

  if (!code) return "";

  return currencies[code.toLowerCase()] || code;
}

const focusTypes = [
  "Community & Social Services",
  "Education & Youth Development",
  "Health & Wellness",
  "Environment & Sustainability",
  "Arts, Culture & Heritage",
  "Faith-Based & Religious Organizations",
  "Humanitarian & International Aid",
  "Housing & Homelessness",
  "Food Security & Agriculture",
  "Sports & Recreation",
  "Advocacy & Public Policy",
  "Animal Welfare",
  "Economic Empowerment",
  "Technology & Innovation (Nonprofit)",
];

interface MultiSelectFieldProps {
  value: string[]; // selected items from formData
  onChange: (values: string[]) => void;
}

function MultiSelectField({ value, onChange }: MultiSelectFieldProps) {
  const toggleItem = (item: string) => {
    const newValue = value.includes(item) ? value.filter((i) => i !== item) : [...value, item];
    onChange(newValue);
  };

  return (
    <div className="w-full space-y-2">
      <Label className="text-sm font-medium text-[#666D80]">
        Focus Types <span className="text-[#DF1C41]">*</span>
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {value.length > 0 ? `${value.length} selected` : "Select focus types"}
            <CaretDownIcon className="cursor-pointer" size={16} color="#c4bdbbff" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="no-scrollbar max-h-64 w-[var(--radix-popover-trigger-width)] overflow-y-auto"
          // style={{ width: "auto" }}
        >
          <div className="space-y-2">
            {focusTypes.map((item) => (
              <div key={item} className="flex items-center space-x-2 py-1">
                <Checkbox
                  id={item}
                  className="cursor-pointer"
                  checked={value.includes(item)}
                  onCheckedChange={() => toggleItem(item)}
                />
                <label htmlFor={item} className="cursor-pointer text-sm">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default OrganizationProfileTab;
