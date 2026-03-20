import React, { useEffect } from "react";
import AuthLayout from "./auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Question } from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, getBaseUrl } from "@/lib/utils";
import STRIPE_LOGO from "@/assets/icons/stripe_logo.svg";
import type { OnboardProps } from "@/services";
import { useConnectStripe, useLogoutOrganisation, useOnboardOrganisation } from "@/services/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useQueryState } from "nuqs";
import { removeOrgUserFromLocalStorage } from "@/end-user-app/services/local-storage";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  data: OnboardProps;
  setData: React.Dispatch<React.SetStateAction<OnboardProps>>;
  onNext: () => void;
  handleLogout?: () => void;
  logoutPending?: boolean;
}

const roles = ["Designer", "Fundraiser", "Developer", "Executive"];

const StepOne: React.FC<IProps> = ({ onNext, data, setData, handleLogout, logoutPending }) => {
  const [errors, setErrors] = React.useState({ firstName: "", lastName: "" });

  return (
    <div className="mx-auto max-w-130">
      <div className="mt-4">
        <h2 className="text-[32px] leading-[100%] font-semibold tracking-[1%]">
          Tell us a bit about you
        </h2>
      </div>

      <p className="mt-3.5 mb-7.5 text-base text-[#414143]">
        That will help us better account setup for you
      </p>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block text-base leading-5.5 font-medium text-[#414143]">
            First name
          </Label>
          <Input
            value={data.firstName}
            onChange={(e) => {
              const value = e.target.value;
              setData((prev) => ({ ...prev, firstName: value }));
              setErrors((prev) => ({
                ...prev,
                firstName: value.length > 200 ? "First name must not exceed 200 characters" : "",
              }));
            }}
            placeholder="Enter first name"
            className="h-12 rounded-xl border-0 bg-[#FAFAFA] px-2.5 py-5 text-[#0A0A0C]"
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
        </div>
        <div>
          <Label className="mb-2 block text-base leading-5.5 font-medium text-[#414143]">
            Last name
          </Label>
          <Input
            value={data.lastName}
            onChange={(e) => {
              const value = e.target.value;
              setData((prev) => ({ ...prev, lastName: value }));
              setErrors((prev) => ({
                ...prev,
                lastName: value.length > 200 ? "Last name must not exceed 200 characters" : "",
              }));
            }}
            placeholder="Enter last name"
            className="h-12 rounded-xl border-0 bg-[#FAFAFA] px-2.5 py-5 text-[#0A0A0C]"
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
        </div>
      </div>

      <div className="mb-8">
        <Label className="mb-2 block text-base leading-5.5 font-medium text-[#414143]">
          Select your job role
        </Label>
        <div>
          <Select
            value={data.jobTitle}
            onValueChange={(value) => setData((prev) => ({ ...prev, jobTitle: value }))}
          >
            <SelectTrigger className="20 h-12! min-h-12! w-full rounded-xl border-0 bg-[#FAFAFA] px-2.5 text-[#0A0A0C]">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent side="bottom" align="start" sideOffset={8} className="w-full">
              {roles.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Button
            className="w-30.75 cursor-pointer rounded-full bg-[#12AA5B] py-6 text-base font-medium hover:bg-[#12AA5B]/90"
            onClick={onNext}
            disabled={!!errors.firstName || !!errors.lastName}
          >
            Next
          </Button>
          {/* <button
            onClick={onNext}
            className="w-22.75 cursor-pointer text-center text-base font-medium text-[#12AA5B]"
          >
            Skip
          </button> */}
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
  );
};

const StepTwo: React.FC<IProps> = ({ data, setData, handleLogout, logoutPending }) => {
  const navigate = useNavigate();
  const isFormFilled =
    data?.firstName === "" ||
    data?.hopingToImprove === "" ||
    data?.jobTitle === "" ||
    data?.lastName === "";

  const options = [
    "Improve donor retention and repeat participation",
    "Increase community engagement around our campaigns",
    "Gain better visibility into donor behavior and impact",
    "Strengthen transparency and reporting",
    "Other",
  ];

  const { mutate: onboardMutate, isPending, isSuccess } = useOnboardOrganisation();

  const handleSubmit = () => {
    onboardMutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      // Use replace to prevent back-navigation to setup after onboarding
      navigate("/community", { replace: true });

      setData({
        firstName: "",
        lastName: "",
        jobTitle: "",
        hopingToImprove: "",
      });
    }
  }, [isSuccess]);

  return (
    <div className="mx-auto max-w-130">
      <div className="mt-4">
        <h2 className="text-[32px] leading-[100%] font-semibold tracking-[1%]">
          What are you hoping to improve with Coterie?
        </h2>
      </div>

      <p className="mt-3.5 mb-7.5 text-base text-[#414143]">
        We'll tailor your dashboard, insights, and recommendations based on what matters most to
        your organization.
      </p>

      <div className="mb-8 space-y-5">
        <RadioGroup
          value={data.hopingToImprove}
          onValueChange={(value) => setData((prev) => ({ ...prev, hopingToImprove: value }))}
          // value={String(selected ?? '')}
          // onValueChange={(v) => setSelected(Number(v))}
        >
          {options.map((o, i) => {
            const id = `option-${i}`;

            return (
              <Label
                htmlFor={id}
                key={i}
                className={`flex cursor-pointer items-center rounded-md border px-3.5 py-7.5 ${
                  data.hopingToImprove?.toLocaleLowerCase() === o?.toLocaleLowerCase()
                    ? "border-[#12AA5B] bg-[#12AA5B]/11 text-[#12AA5B]"
                    : "border-[#C3C3C3] bg-white text-[#0A0A0C]"
                }`}
              >
                <RadioGroupItem
                  id={id}
                  value={o}
                  className={cn(
                    "mr-4 h-5 w-5",
                    data.hopingToImprove?.toLocaleLowerCase() === o?.toLocaleLowerCase()
                      ? "border border-[#12AA5B]"
                      : "border border-[#0A0A0C]"
                  )}
                />

                <p className="cursor-pointer text-base leading-4 tracking-[1%]">{o}</p>
              </Label>
            );
          })}
        </RadioGroup>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 pb-6">
          <Button
            disabled={isFormFilled}
            className="cursor-pointer rounded-full bg-[#12AA5B] px-11 py-6 text-base font-medium hover:bg-[#12AA5B]/90"
            onClick={handleSubmit}
          >
            {isPending ? "Saving..." : "Save & Continue"}
          </Button>
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
  );
};

const StepThree: React.FC = () => {
  const navigate = useNavigate();

  const { mutate: connectStripeMutate, isPending } = useConnectStripe();

  const handleConnectStripe = () => {
    connectStripeMutate({
      returnUrl: `${getBaseUrl({ target: "org" })}/community`,
      refreshUrl: `${getBaseUrl({ target: "org" })}/community`,
    });
  };

  return (
    <div className="mx-auto flex h-[55vh] max-w-130 items-center justify-center text-center">
      <div>
        <div className="mt-4 flex items-center justify-center">
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
        </div>

        <p className="mt-3.5 mb-7.5 text-base leading-5.5 tracking-[0%] text-[#414143]">
          You'll be redirected to Stripe to securely connect your account. This usually takes 2–3
          minutes.
        </p>

        <div className="mb-6 space-y-4">
          <Button
            onClick={handleConnectStripe}
            className="h-11.5 w-full cursor-pointer bg-[#554AFF] text-base leading-6.5 tracking-[0%] text-white hover:bg-[#554AFF]/90"
            variant="secondary"
          >
            {isPending ? "Initializing..." : "Continue"}
          </Button>
          <div className="mb-6">
            <Button
              onClick={() => navigate("/community", { replace: true })}
              className="h-11.5 w-full cursor-pointer border-[#554AFF] text-base leading-6.5 tracking-[0%] text-[#554AFF] hover:bg-[#554AFF]/90 hover:text-[#FFFFFF]"
              variant="outline"
            >
              Skip for later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SetupAccountPage: React.FC = () => {
  const [activePage, setActivePage] = useQueryState("page", { defaultValue: "details" });
  // const [step, setStep] = React.useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }
  const [formData, setFormData] = React.useState<OnboardProps>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    hopingToImprove: "",
  });

  function getStep() {
    if (activePage === "details") {
      return 1;
    } else if (activePage === "improve") {
      return 2;
    } else if (activePage === "stripe") {
      return 3;
    }
  }

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

  return (
    <AuthLayout>
      <div className="grid w-full place-content-center">
        <div className="w-185 max-w-185">
          <div className="mt-12.5 flex items-center justify-between text-2xl font-semibold text-[#0A0A0C]">
            <p>Account set up</p>
            <p>{getStep()}/2</p>
          </div>
          <div className="mt-6 mb-4 h-2 w-full rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full bg-green-500`}
              style={{ width: `${((getStep() as number) / 2) * 100}%` }}
            />
          </div>

          {activePage !== "details" && (
            <div className="mt-6">
              <ArrowLeft
                className="cursor-pointer"
                onClick={() => {
                  if (activePage === "details") {
                    return;
                  } else if (activePage === "improve") {
                    setActivePage("details");
                  } else if (activePage === "stripe") {
                    setActivePage("improve");
                  } else {
                    setActivePage("details");
                  }
                }}
                color="0A0A0C"
                size={24}
              />
            </div>
          )}

          {activePage === "details" && (
            <StepOne
              data={formData}
              setData={setFormData}
              onNext={() => setActivePage("improve")}
              handleLogout={handleLogout}
              logoutPending={logoutPending}
            />
          )}
          {activePage === "improve" && (
            <StepTwo
              data={formData}
              setData={setFormData}
              onNext={() => setActivePage("stripe")}
              handleLogout={handleLogout}
              logoutPending={logoutPending}
            />
          )}
          {activePage === "stripe" && <StepThree />}
        </div>
      </div>
    </AuthLayout>
  );
};

export default SetupAccountPage;
