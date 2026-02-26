import { api } from "../api";

export const getFunction = async (URL: string) => {
  const response = await api.get(URL);
  return response.data;
};

export const postFunction = async (payload: any, URL: string) => {
  const response = await api.post(URL, payload);
  return response.data;
};

export const putFunction = async (payload: any, URL: string) => {
  const response = await api.put(URL, payload);
  return response.data;
};

export const deleteFunction = async (payload: any, URL: string) => {
  const response = await api.delete(URL, payload);
  return response.data;
};
