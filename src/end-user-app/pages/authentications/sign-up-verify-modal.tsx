import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { maskEmail } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
// import { getNameFromEmail, setUserToLocalStorage } from "@/end-user-app/services/local-storage";

export default function EmailVerificationFlow({
  showVerification,
  setShowVerification,
  email,
}: {
  showVerification: boolean;
  setShowVerification: (show: boolean) => void;
  email: string;
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (showVerification) {
      setShowSuccess(true);
      setShowVerification(false);
    }
  }, [showVerification]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setShowVerification(false);
    setShowSuccess(true);
  };

  const handleResend = () => {
    setCode(["", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleClick = () => {
    setLoading(true);

    // setUserToLocalStorage({
    //   id: "123",
    //   name: getNameFromEmail(email),
    //   email: email,
    // });

    setTimeout(() => {
      setLoading(false);
      navigate("/user/dashboard");
    }, 2000);
  };

  return (
    <>
      {/* Email Verification Modal */}
      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <button
            onClick={() => setShowVerification(false)}
            className="absolute top-4 right-4 flex h-6.5 w-6.5 cursor-pointer items-center justify-center rounded-sm bg-[#F6F8FA] shadow-[0_1px_2px_0px_#F6F8FA]"
          >
            <X color="#000000" className="h-4.5 w-4.5" />
          </button>

          <div className="flex flex-col items-center py-4 text-center">
            {/* Icon */}
            <svg
              className="mb-3"
              width="50"
              height="49"
              viewBox="0 0 50 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8337 44.9171H29.167C37.0237 44.9171 40.9521 44.9171 43.3929 42.5251C45.8337 40.1331 45.8337 36.2833 45.8337 28.5837C45.8337 20.8841 45.8337 17.0343 43.3929 14.6424C42.6375 13.902 41.7384 13.3909 40.6245 13.0379C40.6254 13.384 40.6254 13.738 40.6254 14.098L40.6253 18.5042C40.6253 18.5641 40.6259 18.6294 40.6265 18.6995C40.6327 19.3946 40.643 20.5595 40.1336 21.6254C39.6242 22.6912 38.7044 23.4293 38.1556 23.8696C38.1008 23.9136 38.0483 23.9557 38.0017 23.9937L34.8631 26.5569C33.0699 28.0215 31.5089 29.2965 30.1056 30.181C28.593 31.1344 26.9568 31.8396 25.0003 31.8396C23.0439 31.8396 21.4077 31.1344 19.8951 30.181C18.4918 29.2965 16.9308 28.0215 15.1376 26.5569L11.999 23.9937C11.952 23.9554 11.9005 23.914 11.8451 23.8696C11.2963 23.4293 10.3765 22.6913 9.86707 21.6254C9.35766 20.5595 9.36799 19.3946 9.37415 18.6995C9.37477 18.6294 9.37535 18.5641 9.37535 18.5042L9.37534 14.098C9.37531 13.7375 9.37528 13.3837 9.37617 13.0372C8.26234 13.3902 7.36371 13.9015 6.60777 14.6424C4.16699 17.0343 4.16699 20.8841 4.16699 28.5837C4.16699 36.2833 4.16699 40.1331 6.60777 42.5251C9.04854 44.9171 12.9769 44.9171 20.8337 44.9171Z"
                fill="#45D884"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.9997 21.641L16.9982 24.0898C20.8245 27.2146 22.7377 28.777 25.0005 28.777C27.2633 28.777 29.1765 27.2146 33.0028 24.0898L36.0013 21.641C36.7385 21.0389 37.1071 20.7379 37.3038 20.3264C37.5005 19.9148 37.5005 19.4446 37.5005 18.5041V14.2916C37.5005 13.637 37.5005 13.0269 37.4967 12.4576C37.4723 8.84163 37.293 6.8699 35.975 5.57829C34.4495 4.08331 31.9943 4.08331 27.0838 4.08331H22.9172C18.0067 4.08331 15.5515 4.08331 14.026 5.57829C12.708 6.8699 12.5249 8.84163 12.5005 12.4576C12.4967 13.0269 12.5005 13.637 12.5005 14.2916V18.5041C12.5005 19.4446 12.5005 19.9148 12.6972 20.3264C12.8939 20.7379 13.2625 21.0389 13.9997 21.641ZM19.2712 12.25C19.2712 11.4043 19.9707 10.7187 20.8337 10.7187H29.167C30.0299 10.7187 30.7295 11.4043 30.7295 12.25C30.7295 13.0957 30.0299 13.7812 29.167 13.7812H20.8337C19.9707 13.7812 19.2712 13.0957 19.2712 12.25ZM21.3545 18.375C21.3545 17.5293 22.054 16.8437 22.917 16.8437H27.0837C27.9466 16.8437 28.6462 17.5293 28.6462 18.375C28.6462 19.2207 27.9466 19.9062 27.0837 19.9062H22.917C22.054 19.9062 21.3545 19.2207 21.3545 18.375Z"
                fill="#45D884"
              />
            </svg>

            {/* Title */}
            <DialogTitle className="mb-2 text-2xl leading-[150%] font-medium tracking-[-2%]">
              Email Verification
            </DialogTitle>

            {/* Description */}
            <p className="mb-5 text-base leading-[160%] tracking-[0%] text-[#6F6F6F]">
              Please enter the code that has been sent to
              <br />
              <span className="text-[#45D884]">{maskEmail(email)}</span>
            </p>

            {/* Code Input */}
            <div className="mb-5 flex gap-5">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-17.5 w-[61.8px] text-center text-lg leading-[155%] font-medium tracking-[0%] focus-visible:ring-[#45D884]"
                />
              ))}
            </div>

            {/* Resend Link */}
            <p className="mb-5 text-base font-light text-[#6F6F6F]">
              Didn't receive the code?{" "}
              <button onClick={handleResend} className="font-medium text-[#000000] hover:underline">
                Resend
              </button>
            </p>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              className="h-11.5 w-full bg-[#45D884] py-6 text-white hover:bg-[#45D884]/90"
            >
              Verify Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent showCloseButton={false} className="sm:h-max sm:max-w-md">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#45D884]">
              <Check className="h-12 w-12 stroke-3 text-white" />
            </div>

            {/* Title */}
            <h2 className="mb-2 text-2xl leading-[150%] font-medium tracking-[-2%]">
              You're All Set
            </h2>

            {/* Description */}
            <p className="mb-5 text-base leading-[160%] tracking-[0%] text-[#6F6F6F]">
              Be ready to be part of our exploration where learning meets no limit
            </p>

            {/* Log In Button */}
            <Button
              loading={loading}
              onClick={handleClick}
              className="w-full bg-[#45D884] py-6 text-white hover:bg-[#45D884]/90"
            >
              Log In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
