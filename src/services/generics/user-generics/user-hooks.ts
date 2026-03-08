import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFunctionUserEnd, putFunctionUserEnd } from "./user-generic-index";
import { toast } from "sonner";

export const USE_GET_USER_PROFILE_API = "USE_GET_USER_PROFILE_API";
export const USE_GET_USER_COMMUNITIES_API = "USE_GET_USER_COMMUNITIES_API";
export const USE_GET_USER_ACTIVE_CAMPAIGNS_API = "USE_GET_USER_ACTIVE_CAMPAIGNS_API";
export const USE_GET_USER_SPECIFIC_CAMPAIGNS_API = "USE_GET_USER_SPECIFIC_CAMPAIGNS_API";
export const USE_GET_USER_SPECIFIC_COMMUNITY_API = "USE_GET_USER_SPECIFIC_COMMUNITY_API";
export const USE_GET_USER_DONATIONS_API = "USE_GET_USER_DONATIONS_API";

export const useGetEndUserProfile = () => {
  const URL = "/donor/profile";
  return useQuery({
    queryKey: [USE_GET_USER_PROFILE_API],
    queryFn: () => getFunctionUserEnd(URL),
  });
};

export const useUpdateEndUserProfile = () => {
  const queryClient = useQueryClient();
  const URL = "/donor/profile";
  return useMutation({
    mutationFn: (payload: any) => putFunctionUserEnd(payload, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_USER_PROFILE_API],
      });
      toast.success("profile updated successfully");
    },
    onError: (err: any) =>
      toast.error(err?.message || "Error updating profile, please try again.!"),
  });
};

export const useGetUserCommunities = () => {
  const URL = "/donor/communities/discover";
  return useQuery({
    queryKey: [USE_GET_USER_COMMUNITIES_API],
    queryFn: () => getFunctionUserEnd(URL),
  });
};

export const useGetUserSpecificCommunity = (communityId: string | undefined) => {
  const URL = `/communities/${communityId}`;
  return useQuery({
    queryKey: [USE_GET_USER_SPECIFIC_COMMUNITY_API, communityId],
    queryFn: () => getFunctionUserEnd(URL),
    enabled: !!communityId,
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

export const useGetUserDonations = () => {
  const URL = `/donor/donations`;
  return useQuery({
    queryKey: [USE_GET_USER_DONATIONS_API],
    queryFn: () => getFunctionUserEnd(URL),
  });
};

export const useGetDonationById = (id: string | undefined) => {
  const URL = `/donor/donations/${id}`;
  return useQuery({
    queryKey: [USE_GET_USER_DONATIONS_API, id],
    queryFn: () => getFunctionUserEnd(URL),
    enabled: !!id,
  });
};
