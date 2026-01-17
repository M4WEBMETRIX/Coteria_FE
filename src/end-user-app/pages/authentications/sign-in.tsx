import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff } from "lucide-react";

import UserAuthLayout from "./layout";
import { Eye } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const UserSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <UserAuthLayout>
      <div className="">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-1.5">
            <Label
              className="text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]"
              htmlFor="name"
            >
              Name/Email<span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name or email"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-15.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
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
                placeholder="Enter your password"
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-15.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 pr-10 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
              />
              {formData.password && (
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
              )}
            </div>
          </div>

          <Link
            to="/user/forgot-password"
            className="flex items-center justify-end text-right text-base leading-[160%] tracking-[0%] text-[#6F6F6F] hover:text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>

          {/* Submit Button */}
          <Button
            type="submit"
            className="h-16 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
          >
            Log in
          </Button>
        </form>

        {/* Sign In Link */}
        {/* <p className="mt-5 text-left text-sm leading-[160%] font-medium tracking-[0%] text-[#6F6F6F]">
          Already have an account?{" "}
          <a href="#" className="text-[#000000] hover:text-blue-600 hover:underline">
            Log In Here
          </a>
        </p> */}
      </div>
    </UserAuthLayout>
  );
};

export default UserSignIn;
