// import axios from "axios";
import { api } from "./api";

export interface RegisterProps {
  name?: string;
  businessNumber: string;
  adminEmail: string;
  adminPassword: string;
}

export interface OnboardProps {
  firstName: string;
  lastName: string;
  jobTitle: string;
  hopingToImprove: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface LogoutProps {
  refreshToken: string | null;
}

export const registerOrganisation = async (payload: RegisterProps) => {
  const response = await api.post("/org/auth/register", payload);
  return response.data;
};

export const loginOrganisation = async (payload: LoginProps) => {
  const response = await api.post("/org/auth/login", payload);
  return response.data;
};

export const logoutOrganisation = async (payload: LogoutProps) => {
  const response = await api.post("/auth/logout", payload);
  return response.data;
};

export const onboardOrganisation = async (payload: OnboardProps) => {
  const response = await api.post("/org/onboarding", payload);
  return response.data;
};
