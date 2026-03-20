import AuthLayout from "./auth-layout";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useOrganisationResendVerificationEmail,
  useOrganisationVerifyEmail,
} from "@/services/auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [token] = useQueryState("token");

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  const {
    mutateAsync: verifyEmail,
    isSuccess,
    isPending: verifyLoading,
  } = useOrganisationVerifyEmail();
  const { mutateAsync: resendVerificationEmail, isPending: resendLoading } =
    useOrganisationResendVerificationEmail();

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    }
  }, [token]);

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

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/setup-account");
    }
  }, [isSuccess]);

  return (
    <AuthLayout>
      <div>
        <p className="mt-3.5 mb-7.5 text-center text-base leading-5.5 tracking-[0%] text-[#414143]">
          After clicking “Verify Email,” you will be redirected to set up your organization account
          once the verification is successful. This process usually takes about 2–3 minutes. If you
          encounter any issues, please click “Resend Verification Email.”
        </p>

        <div className="mb-6 space-y-4">
          <Button
            disabled={!token || verifyLoading}
            onClick={() => {
              if (token) {
                verifyEmail({ token });
              }
            }}
            className="h-11.5 w-full cursor-pointer bg-[#12AA5B] text-base leading-6.5 tracking-[0%] text-white hover:bg-[#12AA5B]/90"
            variant="secondary"
          >
            {verifyLoading ? "Verifying email..." : "Verify email"}
          </Button>
          <div className="mb-6">
            <Button
              disabled={resendLoading || countdown > 0}
              onClick={handleResend}
              className="h-11.5 w-full cursor-pointer border-[#12AA5B] text-base leading-6.5 tracking-[0%] text-[#12AA5B] hover:bg-[#12AA5B]/90 hover:text-[#FFFFFF] disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
              variant="outline"
            >
              {resendLoading
                ? "Resending verification email..."
                : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend verification email"}
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
