import AuthLayout from "./auth-layout";
import { Navigate, useLocation } from "react-router-dom";
import gmail from "@/assets/icons/gmail.svg";
import outlook from "@/assets/icons/microsoft_outlook.svg";
import { useOrganisationResendVerificationEmail } from "@/services/auth";
import { Button } from "@/components/ui/button";

const CheckEmailPage = () => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  const email = location.state?.email || "your mail";

  const { mutateAsync: resendVerificationEmail, isPending: resendLoading } =
    useOrganisationResendVerificationEmail();

  return (
    <AuthLayout>
      <div className="flex min-h-screen">
        <div className="flex h-screen flex-1 items-center justify-center overflow-auto">
          <div className="grid h-full w-full place-content-center">
            <div className="max-w-[446px] text-left">
              <h2 className="mb-3.5 text-[32px] leading-[100%] font-semibold tracking-[1%] text-[#0A0A0C]">
                Check your email
              </h2>
              <p className="mb-12.5 text-base leading-[140%] tracking-[0%] text-[#414143]">
                We've sent an email to <span className="font-semibold">{email}</span> with a link to
                activate your account
              </p>

              <div className="mb-40 flex items-center justify-start gap-6">
                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-lg py-2 text-[#143DF2] underline"
                >
                  <img src={gmail} alt="Gmail-icon" className="h-[32px] w-[32.25px]" />
                  <span className="text-base font-normal">Open Gmail</span>
                </a>
                <a
                  href="https://outlook.live.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-lg px-4 py-2 text-base font-normal text-[#143DF2] underline"
                >
                  <img src={outlook} alt="Outlook-icon" className="h-[32px] w-[32.25px]" />
                  <span className="text-base font-normal">Open Outlook</span>
                </a>
              </div>

              <p className="mb-2 text-xl font-semibold text-[#0A0A0C]">
                Didn't get an email? Check your spam folder!
              </p>
              <div className="flex items-center">
                <Button
                  variant={"link"}
                  // to="/auth/forgot-password"
                  onClick={() => resendVerificationEmail({})}
                  className="px-0 text-left text-base font-normal text-[#026451] underline"
                >
                  Resend verification email
                </Button>
                {resendLoading && (
                  <p className="text-sm font-normal text-[#026451]">Sending email...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CheckEmailPage;
