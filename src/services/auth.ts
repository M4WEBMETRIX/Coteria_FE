import { useMutation } from "@tanstack/react-query";
import {
  loginOrganisation,
  logoutOrganisation,
  onboardOrganisation,
  registerOrganisation,
  type LoginProps,
  type LogoutProps,
  type OnboardProps,
  type RegisterProps,
} from ".";
import { toast } from "sonner";
import {
  removeEndUserFromLocalStorage,
  removeOrgUserFromLocalStorage,
  removeTokens,
  removeUserTokens,
} from "@/end-user-app/services/local-storage";
import { useLocation, useNavigate } from "react-router-dom";
import { postFunction } from "./generics/generic-index";

export const useRegisterOrganisation = () => {
  return useMutation({
    mutationFn: (payload: RegisterProps) => registerOrganisation(payload),
    onSuccess: (response) => {
      const { token, refreshToken } = response.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);

      toast.success("You've successfully registered");
    },
    onError: (error) => {
      //   console.log("err", error);
      toast.error(error?.message);
    },
  });
};

export const useOrganisationVerifyEmail = () => {
  return useMutation({
    mutationFn: (payload: { token: string }) => postFunction(payload, "/auth/verify-email"),
    onSuccess: () => {
      toast.success("Please check your email for further instructions");
    },
    onError: (error) => {
      if (error?.message?.toLocaleLowerCase() === "invalid or expired token") {
        toast.error("Please click resend verification email to get a new link");
      } else {
        toast.error(error?.message);
      }
    },
  });
};

export const useOrganisationResendVerificationEmail = () => {
  return useMutation({
    mutationFn: (payload: any) => postFunction(payload, "/auth/resend-verification"),
    onSuccess: () => {
      toast.success("Please check your email for further instructions");
    },
    onError: (error) => {
      //   console.log("err", error);
      toast.error(error?.message);
    },
  });
};

export const useLoginOrganisation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: LoginProps) => loginOrganisation(payload),
    onSuccess: (response) => {
      const { token, refreshToken, organizationSummary, requiresEmailVerification, email } =
        response.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);

      //   console.log(organizationSummary);

      toast.success("You've successfully login");
      if (organizationSummary?.requiresOnboarding && requiresEmailVerification) {
        navigate("/auth/check-email", {
          state: {
            email: email,
          },
        });
        // console.log("requiresOnboarding");
      } else if (organizationSummary?.requiresOnboarding && !requiresEmailVerification) {
        navigate("/auth/setup-account");
        // console.log("requiresOnboarding");
      } else {
        navigate("/community");
        // console.log("heyyyyy");
      }
    },
    onError: (error) => {
      //   console.log("err-from query", error);
      toast.error(error?.message);
    },
  });
};

export const useLogoutOrganisation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserPath = location.pathname.includes("user");

  return useMutation({
    mutationFn: (payload: LogoutProps) => logoutOrganisation(payload),
    onSuccess: () => {
      if (isUserPath) {
        removeUserTokens();
      } else {
        removeTokens();
      }
      toast.success("You've successfully logged out");
    },
    onError: (error) => {
      if (isUserPath) {
        removeUserTokens();
        removeEndUserFromLocalStorage();
      } else {
        removeTokens();
        removeOrgUserFromLocalStorage();
      }

      navigate("/auth/login");
      console.log("err", error);
      toast.error(error?.message);
    },
  });
};

export const useOnboardOrganisation = () => {
  return useMutation({
    mutationFn: (payload: OnboardProps) => onboardOrganisation(payload),
    onSuccess: (response) => {
      console.log(response);
      toast.success("You've successfully onboarded");
    },
    onError: (error) => {
      console.log("err", error);
      toast.error(error?.message);
    },
  });
};
