import { api } from "../api";

export const getFunction = async (URL: string) => {
  const response = await api.get(URL);
  return response.data;
};

export const postFunction = async (payload: any, URL: string) => {
  const response = await api.post(URL, payload);
  return response.data;
};
