import AuthLayout from "./auth-layout";
import { Navigate, useLocation } from "react-router-dom";
import gmail from "@/assets/icons/gmail.svg";
import outlook from "@/assets/icons/microsoft_outlook.svg";
import { useLogoutOrganisation, useOrganisationResendVerificationEmail } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { removeOrgUserFromLocalStorage } from "@/end-user-app/services/local-storage";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CheckEmailPage = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  const email = location.state?.email || "your mail";

  const { mutateAsync: resendVerificationEmail, isPending: resendLoading } =
    useOrganisationResendVerificationEmail();

  const isUserPath = location.pathname.includes("user");

  const { mutate: logoutMutate, isPending: logoutPending } = useLogoutOrganisation();

  const refreshToken = isUserPath
    ? localStorage.getItem("userRefreshToken")
    : localStorage.getItem("refreshToken");

  const handleLogout = () => {
    logoutMutate(
      { refreshToken },
      {
        onSettled: () => {
          // Clean up synchronously before navigating to prevent blank screen.
          // onSettled fires on both success and error, ensuring cleanup always happens.
          removeOrgUserFromLocalStorage();
          queryClient.clear();
          navigate("/auth/login", { replace: true });
        },
      }
    );
  };

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || resendLoading) return;
    try {
      await resendVerificationEmail({});
      setCountdown(60);
    } catch (error) {
      // Errors are handled by the mutation hook via toast
    }
  };

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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    variant={"link"}
                    onClick={handleResend}
                    disabled={countdown > 0 || resendLoading}
                    className="px-0 text-left text-base font-normal text-[#026451] underline disabled:text-gray-400 disabled:no-underline"
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend verification email"}
                  </Button>
                  {resendLoading && (
                    <p className="text-sm font-normal text-[#026451]">Sending email...</p>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  disabled={logoutPending}
                  className="w-max cursor-pointer text-center text-base font-medium text-[#414143]"
                >
                  {logoutPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CheckEmailPage;
