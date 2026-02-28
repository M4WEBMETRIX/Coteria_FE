import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { getOrgUserFromLocalStorage } from "@/end-user-app/services/local-storage";
import { useEffect, useMemo } from "react";
import { useGetCurrencies } from "@/services/generics/hooks";

interface OrganizationProfileTabProps {
  formData: {
    organizationName: string;
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
  // console.log(currencies);

  const orgUser = useMemo(() => {
    return getOrgUserFromLocalStorage();
  }, []);

  useEffect(() => {
    if (orgUser) {
      setFormData((prev: any) => ({
        ...prev,
        organizationName: orgUser?.name,
        currency: orgUser?.defaultCurrency,
      }));
    }
  }, [orgUser]);

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
