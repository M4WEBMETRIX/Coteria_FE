import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff } from "lucide-react";

import UserAuthLayout from "@/end-user-app/layout/layout";
import { Eye } from "@phosphor-icons/react";
import EmailVerificationFlow from "./sign-up-verify-modal";
import { useQueryState } from "nuqs";
import ExtendedLineageModal from "./referral-lineage-modal";

const UserSignUp = () => {
  const [isReferrer] = useQueryState("referral-code");
  const [isExtendedLineageOpen, setIsExtendedLineageOpen] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(
    isReferrer
      ? {
          name: "",
          email: "",
          password: "",
        }
      : {
          name: "Wale Abba",
          email: "wale.abba@coterie.com",
          password: "testpassword123",
        }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <UserAuthLayout isReferrer={isReferrer ? true : false}>
      <div className="">
        {isReferrer && (
          <div className="mt-2.5 mb-7.5 flex items-center justify-between">
            <div
              className="cursor-pointer text-xs leading-[160%] font-medium tracking-[0.1px] underline hover:text-blue-500"
              onClick={() => setIsExtendedLineageOpen(true)}
            >
              Click here to view all referrals
            </div>
            <div className="flex -space-x-3">
              {lineageMembers.map((member, index) => (
                <img
                  key={member.id}
                  src={member.image}
                  alt={`Member ${index + 1}`}
                  className="h-7.75 w-7.75 rounded-full object-cover object-center"
                />
              ))}
            </div>
          </div>
        )}
        <ExtendedLineageModal isOpen={isExtendedLineageOpen} setIsOpen={setIsExtendedLineageOpen} />
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-1.5">
            <Label
              className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
              htmlFor="name"
            >
              Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <Label
              className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
              htmlFor="email"
            >
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <Label
              className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
              htmlFor="password"
            >
              Password<span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 pr-10 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6" />
                ) : (
                  <Eye weight="duotone" className="h-6 w-6 text-[#919191]" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            // type="submit"
            type="button"
            onClick={() => setShowVerification(true)}
            className="h-12.5 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
          >
            Create Account
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="mt-5 text-left text-sm leading-[160%] font-medium tracking-[0%] text-[#6F6F6F]">
          Already have an account?{" "}
          <a href="/user/login" className="text-[#000000] hover:text-blue-600 hover:underline">
            Log In Here
          </a>
        </p>
      </div>
      <EmailVerificationFlow
        email={formData.email}
        showVerification={showVerification}
        setShowVerification={setShowVerification}
      />
    </UserAuthLayout>
  );
};

export default UserSignUp;

const lineageMembers = [
  { id: 1, image: "https://i.pravatar.cc/150?img=1" },
  { id: 2, image: "https://i.pravatar.cc/150?img=2" },
  { id: 3, image: "https://i.pravatar.cc/150?img=3" },
  { id: 4, image: "https://i.pravatar.cc/150?img=4" },
  { id: 5, image: "https://i.pravatar.cc/150?img=5" },
];
