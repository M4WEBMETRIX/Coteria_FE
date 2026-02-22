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
import { removeTokens, removeUserTokens } from "@/end-user-app/services/local-storage";
import { useLocation, useNavigate } from "react-router-dom";

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

export const useLoginOrganisation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: LoginProps) => loginOrganisation(payload),
    onSuccess: (response) => {
      const { token, refreshToken, organizationSummary } = response.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);

      //   console.log(organizationSummary);

      toast.success("You've successfully login");

      if (organizationSummary?.requiresOnboarding) {
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
