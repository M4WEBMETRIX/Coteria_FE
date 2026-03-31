import LogoSvgCode from "../logo-svg-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { maskEmail } from "@/lib/utils";
import { useUserForgotPassword } from "@/services/users/user-auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailStep = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const { mutate: forgotPasswordMutate, isPending, isSuccess } = useUserForgotPassword();

  const handleSubmit = () => {
    forgotPasswordMutate({ email });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/user/login");
    }
  }, [isSuccess]);

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
          className="h-12.5 w-full rounded-[10px] border border-[#DFE1E7] px-2 py-3 text-base leading-[160%] tracking-[0%] text-[#0D0D12]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <Button
        disabled={isPending || !email}
        // onClick={() => onNext(email)}
        onClick={handleSubmit}
        className="h-12.5 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
      >
        {isPending ? "Sending link..." : "Verify"}
      </Button>
    </div>
  );
};

// const CodeStep: React.FC<{ email: string; onNext: () => void; onBack: () => void }> = ({
//   email,
//   onNext,
//   //   onBack,
// }) => {
//   const [code, setCode] = React.useState<string[]>(["", "", "", "", "", ""]);
//   const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

//   const handleChange = (index: number, val: string) => {
//     if (val.length > 1) val = val.slice(-1);
//     const next = [...code];
//     next[index] = val;
//     setCode(next);
//     if (val && index < inputsRef.current.length - 1) inputsRef.current[index + 1]?.focus();
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Backspace") {
//       e.preventDefault();

//       const next = [...code];

//       if (next[index]) {
//         // If current box has value → clear it
//         next[index] = "";
//         setCode(next);
//       } else if (index > 0) {
//         // Move to previous box and clear it
//         next[index - 1] = "";
//         setCode(next);
//         inputsRef.current[index - 1]?.focus();
//       }
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const pasted = e.clipboardData.getData("text").slice(0, 6).split("");

//     const next = [...code];
//     pasted.forEach((char, i) => {
//       next[i] = char;
//     });

//     setCode(next);
//     inputsRef.current[pasted.length - 1]?.focus();
//   };

//   return (
//     <div className="mx-auto max-w-129 py-12 text-center">
//       <h2 className="mb-3 text-[40px] leading-[120%] font-medium tracking-[-2%]">
//         Email Verification
//       </h2>
//       <p className="mb-7.5 text-base leading-[120%] font-light tracking-[0%] text-[#6F6F6F]">
//         Please enter the code that has been sent to{" "}
//         <span className="font-medium text-[#45D884]">{maskEmail(email)}</span>
//       </p>

//       <div className="mb-7.5 flex items-center justify-center gap-3">
//         {code.map((c, i) => (
//           <input
//             key={i}
//             // ref={(el) => (inputsRef.current[i] = el)}
//             ref={(el) => {
//               inputsRef.current[i] = el;
//             }}
//             value={c}
//             onChange={(e) => handleChange(i, e.target.value)}
//             onKeyDown={(e) => handleKeyDown(i, e)}
//             onPaste={handlePaste}
//             className={`h-17.5 w-[61.8px] rounded-[10px] border border-[#ECEFF3] text-center text-lg leading-[155%] font-medium tracking-[0%] focus:ring-2 focus:ring-[#45D884] focus:outline-none`}
//           />
//         ))}
//       </div>

//       <Button
//         onClick={onNext}
//         className="h-12.5 w-full border border-[#ECEFF3] bg-[#45D884] text-center leading-[160%] font-medium tracking-[0%] text-white hover:bg-[#45D884]/90"
//       >
//         Verify Code
//       </Button>
//       <div className="mt-7.5 text-base leading-[160%] font-medium tracking-[0%] text-[#6F6F6F]">
//         Didn't receive the code?{" "}
//         <button
//           className="cursor-pointer text-[#000000] hover:text-green-500 hover:underline"
//           onClick={() => alert("Resend")}
//         >
//           Resend
//         </button>
//       </div>
//       {/* <div className="mt-4 text-left">
//         <button className="text-muted-foreground text-sm" onClick={onBack}>
//           Back
//         </button>
//       </div> */}
//     </div>
//   );
// };

const UserForgotPassword = () => {
  // const [step, setStep] = React.useState(0);
  // const [email, setEmail] = React.useState("");
  // const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white">
      <LogoSvgCode className="absolute top-8 left-8" />

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-xl">
          {/* {step === 0 && ( */}
          <EmailStep />
          {/* )} */}
          {/* {step === 1 && (
            <CodeStep email={email} onNext={() => setStep(2)} onBack={() => setStep(0)} />
          )}
          {step === 2 && <PasswordStep onNext={() => setStep(3)} />}
          {step === 3 && <SuccessStep onLogin={() => navigate("/user/login")} />} */}
        </div>
      </div>
    </div>
  );
};

export default UserForgotPassword;
