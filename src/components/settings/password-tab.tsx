import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordTabProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  setFormData: (data: any) => void;
}

const PasswordTab = ({ formData, setFormData }: PasswordTabProps) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="font-ubuntu">
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          {" "}
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Password
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Change or view your password
          </p>
        </div>

        <div className="grid min-w-[532px] space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="currentPassword"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Current Password <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="newPassword"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              New Password <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              placeholder="Enter new password"
            />{" "}
            <p className="leading-[150% ] mb-1 text-xs tracking-[2%] text-[#818898]">
              Must be at least 8 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Confirm new password"
            />{" "}
            <p className="leading-[150% ] mb-1 text-xs tracking-[2%] text-[#818898]">
              Must be at least 8 characters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordTab;
