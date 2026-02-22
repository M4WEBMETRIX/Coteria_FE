import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginUser, registerUser, type UserLoginProps, type UserRegisterProps } from "./user-index";
// import { useNavigate } from "react-router-dom";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (payload: UserRegisterProps) => registerUser(payload),
    onSuccess: (response) => {
      const { token, refreshToken } = response.data;

      localStorage.setItem("userAccessToken", token);
      localStorage.setItem("userRefreshToken", refreshToken);

      toast.success("You've successfully registered");
    },
    onError: (error) => {
      console.log("err", error);
      toast.error(error?.message);
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

      toast.success("You've successfully login");
    },
    onError: (error) => {
      //   console.log("err-from query", error);
      toast.error(error?.message);
    },
  });
};
