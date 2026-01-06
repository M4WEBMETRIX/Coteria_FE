import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MyAccountTabProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
  };
  setFormData: (data: any) => void;
}

const MyAccountTab = ({ formData, setFormData }: MyAccountTabProps) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="font-ubuntu">
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          {" "}
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Account Setting
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            This is your info that will be linked/connected to your account details, profile, and
            others.
          </p>
        </div>
        <div className="grid min-w-[532px] space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Full Name <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Email Address <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="johndoe@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Phone Number (optional)
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (212) 555 4567"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountTab;
