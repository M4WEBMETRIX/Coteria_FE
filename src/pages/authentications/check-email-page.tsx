import AuthLayout from "./auth-layout";
import { useLocation, useNavigate } from "react-router-dom";
import gmail from "@/assets/icons/gmail.svg";
import outlook from "@/assets/icons/microsoft_outlook.svg";
import {
  useOrganisationResendVerificationEmail,
  useOrganisationVerifyEmail,
} from "@/services/auth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

const CheckEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token] = useQueryState("token");

  const email = location.state?.email;

  //   const token = localStorage.getItem("accessToken");
  const {
    mutateAsync: verifyEmail,
    isSuccess,
    isPending: verifyLoading,
  } = useOrganisationVerifyEmail();
  const { mutateAsync: resendVerificationEmail, isPending: resendLoading } =
    useOrganisationResendVerificationEmail();

  //   useEffect(() => {
  //     if (token) {
  //       verifyEmail({ token });
  //     }
  //   }, [token]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/setup-account");
    }
  }, [isSuccess]);

  return (
    <AuthLayout>
      {token ? (
        <div>
          {/* <div className="mt-4 flex items-center justify-center">
                  <h2 className="flex items-center text-[32px] leading-[100%] font-semibold tracking-[1%]">
                    Connect with{" "}
                    <span className="pl-1.75">
                      <img src={STRIPE_LOGO} className="w-21.25 bg-cover" alt="stripe-logo" />
                    </span>{" "}
                    <div className="flex items-center gap-0.5 pt-1.5 pl-3.25">
                      <span className="text-[12px] leading-5.5 tracking-[0%] text-[#12AA5B]">Why</span>{" "}
                      <div>
                        <Question color="#12AA5B" size={16} />
                      </div>
                    </div>
                  </h2>
                </div> */}

          <p className="mt-3.5 mb-7.5 text-center text-base leading-5.5 tracking-[0%] text-[#414143]">
            You'll be redirected to set up your organisation account after verification. This
            usually takes 2–3 minutes.
          </p>

          <div className="mb-6 space-y-4">
            <Button
              disabled={!token || verifyLoading}
              onClick={() => {
                if (token) {
                  verifyEmail({ token });
                }
              }}
              className="h-11.5 w-full cursor-pointer bg-[#12AA5B] text-base leading-6.5 tracking-[0%] text-white hover:bg-[#554AFF]/90"
              variant="secondary"
            >
              Verify email
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
                Resend verification email
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen">
          <div className="flex h-screen flex-1 items-center justify-center overflow-auto">
            <div className="grid h-full w-full place-content-center">
              <div className="max-w-[446px] text-left">
                <h2 className="mb-3.5 text-[32px] leading-[100%] font-semibold tracking-[1%] text-[#0A0A0C]">
                  Check your email
                </h2>
                <p className="mb-12.5 text-base leading-[140%] tracking-[0%] text-[#414143]">
                  We've sent an email to <span className="font-semibold">{email}</span> with a link
                  to activate your account
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
                    className="text-left text-base font-normal text-[#026451] underline"
                  >
                    Re-enter your email and try again
                  </Button>
                  {resendLoading && (
                    <p className="text-sm font-normal text-[#026451]">Sending email...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default CheckEmailPage;
