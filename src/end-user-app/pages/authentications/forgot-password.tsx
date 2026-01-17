import LogoSvgCode from "../logo-svg-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { maskEmail } from "@/lib/utils";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmailStep: React.FC<{ onNext: (email: string) => void }> = ({ onNext }) => {
  const [email, setEmail] = React.useState("");
  return (
    <div className="mx-auto max-w-129 py-12 text-center">
      <h2 className="mb-3 text-[40px] leading-[120%] font-medium tracking-[-2%]">
        Email Confirmation
      </h2>
      <p className="mb-7.5 text-base leading-[120%] font-light tracking-[0%] text-[#6F6F6F]">
        Enter the email address associated with your account.
      </p>

      <div className="mb-7.5 text-left">
        <Label className="mb-1.5 text-base leading-[155%] font-medium tracking-[0%] text-[#0D0D12]">
          Email<span className="text-red-500">*</span>
        </Label>
        <Input
          className="h-15.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <Button
        onClick={() => onNext(email)}
        className="h-16 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
      >
        Verify
      </Button>
    </div>
  );
};

const CodeStep: React.FC<{ email: string; onNext: () => void; onBack: () => void }> = ({
  email,
  onNext,
  //   onBack,
}) => {
  const [code, setCode] = React.useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const next = [...code];
    next[index] = val;
    setCode(next);
    if (val && index < inputsRef.current.length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const next = [...code];

      if (next[index]) {
        // If current box has value → clear it
        next[index] = "";
        setCode(next);
      } else if (index > 0) {
        // Move to previous box and clear it
        next[index - 1] = "";
        setCode(next);
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");

    const next = [...code];
    pasted.forEach((char, i) => {
      next[i] = char;
    });

    setCode(next);
    inputsRef.current[pasted.length - 1]?.focus();
  };

  return (
    <div className="mx-auto max-w-129 py-12 text-center">
      <h2 className="mb-3 text-[40px] leading-[120%] font-medium tracking-[-2%]">
        Email Verification
      </h2>
      <p className="mb-7.5 text-base leading-[120%] font-light tracking-[0%] text-[#6F6F6F]">
        Please enter the code that has been sent to{" "}
        <span className="font-medium text-[#45D884]">{maskEmail(email)}</span>
      </p>

      <div className="mb-7.5 flex items-center justify-center gap-3">
        {code.map((c, i) => (
          <input
            key={i}
            // ref={(el) => (inputsRef.current[i] = el)}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={c}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={`h-17.5 w-[61.8px] rounded-[10px] border border-[#ECEFF3] text-center text-lg leading-[155%] font-medium tracking-[0%] focus:ring-2 focus:ring-[#45D884] focus:outline-none`}
          />
        ))}
      </div>

      <Button
        onClick={onNext}
        className="h-16 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
      >
        Verify Code
      </Button>
      <div className="mt-7.5 text-base leading-[160%] font-medium tracking-[0%] text-[#6F6F6F]">
        Didn't receive the code?{" "}
        <button
          className="cursor-pointer text-[#000000] hover:text-green-500 hover:underline"
          onClick={() => alert("Resend")}
        >
          Resend
        </button>
      </div>
      {/* <div className="mt-4 text-left">
        <button className="text-muted-foreground text-sm" onClick={onBack}>
          Back
        </button>
      </div> */}
    </div>
  );
};

const PasswordStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [pw, setPw] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
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
          className="h-15.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
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
          className="h-15.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
        />
      </div>

      <Button
        onClick={onNext}
        className="h-16 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
      >
        Create Password
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
        className="h-16 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
      >
        Log In
      </Button>
    </div>
  );
};

const UserForgotPassword = () => {
  const [step, setStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white">
      <LogoSvgCode className="absolute top-8 left-8" />

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-xl">
          {step === 0 && (
            <EmailStep
              onNext={(e) => {
                // if (!email) return;
                setEmail(e);
                setStep(1);
              }}
            />
          )}
          {step === 1 && (
            <CodeStep email={email} onNext={() => setStep(2)} onBack={() => setStep(0)} />
          )}
          {step === 2 && <PasswordStep onNext={() => setStep(3)} />}
          {step === 3 && <SuccessStep onLogin={() => navigate("/user/login")} />}
        </div>
      </div>
    </div>
  );
};

export default UserForgotPassword;
