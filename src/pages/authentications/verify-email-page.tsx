import AuthLayout from "./auth-layout";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useOrganisationResendVerificationEmail,
  useOrganisationVerifyEmail,
} from "@/services/auth";
import { useEffect } from "react";
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

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/setup-account");
    }
  }, [isSuccess]);

  return (
    <AuthLayout>
      <div>
        <p className="mt-3.5 mb-7.5 text-center text-base leading-5.5 tracking-[0%] text-[#414143]">
          After clicking "Verify email", you'll be redirected to set up your organisation account
          once verification is successful. This usually takes 2–3 minutes. If you experience any
          issues, click "Resend verification email".
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
              disabled={resendLoading}
              onClick={() => {
                resendVerificationEmail({});
              }}
              className="h-11.5 w-full cursor-pointer border-[#12AA5B] text-base leading-6.5 tracking-[0%] text-[#12AA5B] hover:bg-[#12AA5B]/90 hover:text-[#FFFFFF]"
              variant="outline"
            >
              {resendLoading ? "Resending verification email..." : "Resend verification email"}
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
