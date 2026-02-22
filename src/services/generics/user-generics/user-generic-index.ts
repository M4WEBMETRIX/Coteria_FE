import { userApi } from "@/services/users/user-api";

export const getFunctionUserEnd = async (URL: string) => {
  const response = await userApi.get(URL);
  return response.data;
};

export const postFunctionUserEnd = async (payload: any, URL: string) => {
  const response = await userApi.post(URL, payload);
  return response.data;
};
