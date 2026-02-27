import { userApi } from "@/services/users/user-api";

export const publicGetFunction = async (url: string) => {
  const response = await userApi.get(url);
  return response.data;
};

export const publicPostFunction = async (url: string, payload: any) => {
  const response = await userApi.post(url, payload);
  return response.data;
};

export const publicPutFunction = async (url: string, payload: any) => {
  const response = await userApi.put(url, payload);
  return response.data;
};

export const publicDeleteFunction = async (url: string) => {
  const response = await userApi.delete(url);
  return response.data;
};
