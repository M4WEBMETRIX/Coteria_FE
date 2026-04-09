import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOrgUserFromLocalStorage } from "@/end-user-app/services/local-storage";
import { useEffect, useMemo } from "react";

interface MyAccountTabProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  setFormData: (data: any) => void;
}

const MyAccountTab = ({ formData, setFormData }: MyAccountTabProps) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const orgUser = useMemo(() => {
    return getOrgUserFromLocalStorage();
  }, []);

  useEffect(() => {
    if (orgUser?.businessEmail) {
      setFormData((prev: any) => ({
        ...prev,
        email: orgUser?.currentUser?.email,
        phone: orgUser?.currentUser?.phone,
        firstName: orgUser?.currentUser?.firstName,
        lastName: orgUser?.currentUser?.lastName,
      }));
    }
  }, [orgUser?.businessEmail]);

  return (
    <div className="font-inter">
      <div className="justify-between p-3 lg:flex lg:p-6">
        <div className="w-[300px]">
          {" "}
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Account Owner Details
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            This information is linked to your organization account and used for access,
            communication, and administrative actions.
          </p>
        </div>
        <div className="grid space-y-4 lg:min-w-[532px]">
          <div className="flex w-full items-start gap-4">
            <div className="w-full space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
              >
                First Name <span className="text-sm text-[#DF1C41]">*</span>
              </Label>
              <Input
                disabled
                id="firstName"
                className="w-full"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="w-full space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
              >
                Last Name <span className="text-sm text-[#DF1C41]">*</span>
              </Label>
              <Input
                disabled
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Email Address <span className="text-sm text-[#DF1C41]">*</span>
            </Label>
            <Input
              disabled
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="johndoe@example.com"
            />
          </div>

          {/* <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm leading-[150%] font-medium tracking-[2%] text-[#666D80]"
            >
              Phone Number (optional)
            </Label>
            <Input
              disabled
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="User's phone number"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyAccountTab;
