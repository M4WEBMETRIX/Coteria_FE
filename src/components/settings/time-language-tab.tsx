import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";

interface TimeLanguageTabProps {
  formData: {
    timezone: string;
    language: string;
  };
  setFormData: (data: any) => void;
}

const TimeLanguageTab = ({ formData, setFormData }: TimeLanguageTabProps) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="font-ubuntu">
      {/* Time Section */}
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          {" "}
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Time
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Set your preferred time zone to ensure that all activities align with your local time.
          </p>
        </div>

        <div className="grid min-w-[532px] space-y-4">
          {" "}
          <div>
            <div className="space-y-2">
              <Label
                htmlFor="timezone"
                className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
              >
                Time Zone *
              </Label>
              <p className="mb-2 text-xs text-[#525866]">This sets the date + time in the info</p>
              <Select
                value={formData.timezone}
                onValueChange={(value) => handleChange("timezone", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-8">Booked of Time (PDT)</SelectItem>
                  <SelectItem value="utc-5">Eastern Time (EDT)</SelectItem>
                  <SelectItem value="utc+0">Greenwich Mean Time (GMT)</SelectItem>
                  <SelectItem value="utc+1">Central European Time (CET)</SelectItem>
                  <SelectItem value="utc+8">China Standard Time (CST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Separator />
      {/* Language Section */}
      <div className="flex w-full justify-between p-6">
        <div className="w-[300px]">
          {" "}
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Set your Language
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Choose the language. All text and communication will be displayed in the language you
            select.
          </p>
        </div>

        <div className="w-full max-w-[532px] space-y-2">
          <Label
            htmlFor="siteLanguage"
            className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
          >
            Language
          </Label>
          <Select
            value={formData.language}
            onValueChange={(value) => handleChange("language", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-us">English (United States)</SelectItem>
              <SelectItem value="en-gb">English (UK)</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TimeLanguageTab;
