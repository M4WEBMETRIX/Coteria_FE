import { userApi } from "./user-api";

export interface UserRegisterProps {
  email: string;
  phoneNumber?: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  referralCode?: string;
}

export interface UserLoginProps {
  email: string;
  password: string;
}

export const registerUser = async (payload: UserRegisterProps) => {
  const response = await userApi.post("/donor/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload: UserLoginProps) => {
  const response = await userApi.post("/donor/auth/login", payload);
  return response.data;
};
