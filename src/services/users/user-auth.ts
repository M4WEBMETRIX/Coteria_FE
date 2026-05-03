import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  forgotPasswordUser,
  loginUser,
  registerUser,
  resetPasswordUser,
  userGoogleAuth,
  type UserLoginProps,
  type UserRegisterProps,
} from "./user-index";
import {
  getFunctionUserEnd,
  postFunctionUserEnd,
} from "../generics/user-generics/user-generic-index";
import { showErrorToast } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  removeEndUserFromLocalStorage,
  removeUserTokens,
} from "@/end-user-app/services/local-storage";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (payload: UserRegisterProps) => registerUser(payload),
    onSuccess: (response) => {
      const { token, refreshToken } = response.data;

      localStorage.setItem("userAccessToken", token);
      localStorage.setItem("userRefreshToken", refreshToken);

      // toast.success("You've successfully registered");
    },
    onError: (error) => {
      console.log("err", error);
      toast.error(error?.message);
    },
  });
};

export const useUserGoogleAuth = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: { idToken: string | any }) => userGoogleAuth(payload),
    onSuccess: (response) => {
      const { token, refreshToken } = response.data;

      localStorage.setItem("userAccessToken", token);
      localStorage.setItem("userRefreshToken", refreshToken);

      navigate("/user/dashboard?tab=community");

      // toast.success("You've successfully registered");
    },
    onError: (error) => {
      console.log("err", error);
      toast.error(error?.message);
    },
  });
};

export const useUserForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) => forgotPasswordUser(payload),
    onSuccess: () => {
      toast.success("Please check your mail to reset");
    },
    onError: (error) => {
      //   console.log("err-from query", error);
      showErrorToast(error?.message);
    },
  });
};

export const useUserResetPassword = () => {
  return useMutation({
    mutationFn: (payload: { token: any; newPassword: string }) => resetPasswordUser(payload),
    onSuccess: () => {
      toast.success("Password reset successfully, please try login.");
    },
    onError: (error) => {
      showErrorToast(error?.message);
    },
  });
};

export const useLoginUser = () => {
  //   const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: UserLoginProps) => loginUser(payload),
    onSuccess: (response) => {
      const { token, refreshToken } = response.data;

      localStorage.setItem("userAccessToken", token);
      localStorage.setItem("userRefreshToken", refreshToken);

      // toast.success("You've successfully login");
    },
    onError: (error) => {
      //   console.log("err-from query", error);
      toast.error(error?.message);
    },
  });
};

export const useGetReferralDetails = (code: string | null) => {
  const URL = `/links/resolve?code=${code}`;
  return useQuery({
    queryKey: ["referral-details"],
    queryFn: () => getFunctionUserEnd(URL),
    enabled: !!code,
  });
};

export const useDeactivateUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: { currentPassword: string; reason: string }) =>
      postFunctionUserEnd(payload, "/auth/account/deactivate"),
    onSuccess: () => {
      removeUserTokens();
      removeEndUserFromLocalStorage();
      toast.success("Your account has been deactivated successfully");
      navigate("/user/login");
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};
