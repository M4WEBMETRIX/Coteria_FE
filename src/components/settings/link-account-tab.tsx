import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LinkAccountTabProps {
  formData: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
  setFormData: (data: any) => void;
}

const LinkAccountTab = ({ formData, setFormData }: LinkAccountTabProps) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          {" "}
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Link Account
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Link required social handles
          </p>
        </div>
        <div className="grid min-w-[532px] space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="instagram"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Instagram
            </Label>
            <Input
              id="instagram"
              value={formData.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="https://www.instagram.com/koterie"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="facebook"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Facebook
            </Label>
            <Input
              id="facebook"
              value={formData.facebook}
              onChange={(e) => handleChange("facebook", e.target.value)}
              placeholder="https://www.facebook.com/koterie"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="twitter"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Twitter
            </Label>
            <Input
              id="twitter"
              value={formData.twitter}
              onChange={(e) => handleChange("twitter", e.target.value)}
              placeholder="https://www.twitter.com/coterie"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="youtube"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              YouTube
            </Label>
            <Input
              id="youtube"
              value={formData.youtube}
              onChange={(e) => handleChange("youtube", e.target.value)}
              placeholder="https://www.youtube.com/coterie"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkAccountTab;
