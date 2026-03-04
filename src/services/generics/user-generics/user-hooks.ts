import { useQuery } from "@tanstack/react-query";
import { getFunctionUserEnd } from "./user-generic-index";

export const USE_GET_USER_PROFILE_API = "USE_GET_USER_PROFILE_API";
export const USE_GET_USER_COMMUNITIES_API = "USE_GET_USER_COMMUNITIES_API";
export const USE_GET_USER_ACTIVE_CAMPAIGNS_API = "USE_GET_USER_ACTIVE_CAMPAIGNS_API";
export const USE_GET_USER_SPECIFIC_CAMPAIGNS_API = "USE_GET_USER_SPECIFIC_CAMPAIGNS_API";

export const useGetEndUserProfile = () => {
  const URL = "/donor/profile";
  return useQuery({
    queryKey: [USE_GET_USER_PROFILE_API],
    queryFn: () => getFunctionUserEnd(URL),
  });
};

export const useGetUserCommunities = () => {
  const URL = "/donor/communities/discover";
  return useQuery({
    queryKey: [USE_GET_USER_COMMUNITIES_API],
    queryFn: () => getFunctionUserEnd(URL),
  });
};

export const useGetUserActiveCampaigns = () => {
  const URL = "/campaigns";
  return useQuery({
    queryKey: [USE_GET_USER_ACTIVE_CAMPAIGNS_API],
    queryFn: () => getFunctionUserEnd(URL),
  });
};

export const useGetUserSpecificCampaigns = (campaignId: string | undefined) => {
  const URL = `/campaigns/${campaignId}`;
  return useQuery({
    queryKey: [USE_GET_USER_SPECIFIC_CAMPAIGNS_API, campaignId],
    queryFn: () => getFunctionUserEnd(URL),
    enabled: !!campaignId,
  });
};
