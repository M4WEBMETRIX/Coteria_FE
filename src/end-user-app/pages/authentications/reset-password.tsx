import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import LogoSvgCode from "../logo-svg-code";
import { useNavigate } from "react-router-dom";
import { useQueryState } from "nuqs";
import { useUserResetPassword } from "@/services/users/user-auth";

const PasswordStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [token] = useQueryState("token");

  const [pw, setPw] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const { mutate, isPending, isSuccess } = useUserResetPassword();

  const onSubmit = () => {
    if (pw !== confirm) {
      alert("Passwords do not match");
      return;
    }

    mutate({
      token,
      newPassword: confirm,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onNext();
    }
  }, [isSuccess]);

  return (
    <div className="mx-auto max-w-129 py-12 text-center">
      <h2 className="mb-3 text-[40px] leading-[120%] font-medium tracking-[-2%]">
        Create New Password
      </h2>
      <p className="mb-7.5 text-base leading-[120%] font-light tracking-[0%] text-[#6F6F6F]">
        Your new password must be different from the previous one.
      </p>

      <div className="mb-7.5 text-left">
        <Label className="mb-1.5 text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]">
          New Password<span className="text-red-500">*</span>
        </Label>
        <Input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Enter your password"
          className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
        />
      </div>
      <div className="mb-7.5 text-left">
        <Label className="mb-1.5 text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]">
          Confirm New Password<span className="text-red-500">*</span>
        </Label>
        <Input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Enter your password"
          className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
        />
      </div>

      <Button
        disabled={!pw || !confirm}
        onClick={onSubmit}
        className="h-12.5 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
      >
        {isPending ? "Creating Password..." : "Create Password"}
      </Button>
    </div>
  );
};

const SuccessStep: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <div className="mx-auto mb-[38.33px] flex h-21 w-21 items-center justify-center rounded-full bg-[#45D884]">
        <svg
          className="h-12 w-12 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-87.25">
        <h2 className="mb-3 text-[40px] leading-[120%] font-medium tracking-[-2%]">
          Password Reset Successfully!
        </h2>
        <p className="mb-7.5 text-base leading-[120%] font-light tracking-[0%] text-[#6F6F6F]">
          Your password has been updated. Please log in again using your new password.
        </p>
      </div>
      <Button
        onClick={onLogin}
        className="h-12.5 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
      >
        Log In
      </Button>
    </div>
  );
};

const UserResetPassword = () => {
  const [step, setStep] = React.useState(0);

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white">
      <LogoSvgCode className="absolute top-8 left-8" />

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-xl">
          {step === 2 && <PasswordStep onNext={() => setStep(3)} />}
          {step === 3 && <SuccessStep onLogin={() => navigate("/user/login")} />}
        </div>
      </div>
    </div>
  );
};

export default UserResetPassword;
