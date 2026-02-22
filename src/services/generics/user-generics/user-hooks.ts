import { useQuery } from "@tanstack/react-query";
import { getFunctionUserEnd } from "./user-generic-index";

export const USE_GET_USER_PROFILE_API = "USE_GET_USER_PROFILE_API";

export const useGetEndUserProfile = () => {
  const URL = "/donor/profile";
  return useQuery({
    queryKey: [USE_GET_USER_PROFILE_API],
    queryFn: () => getFunctionUserEnd(URL),
  });
};
