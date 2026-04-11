import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFunctionUserEnd, postFunctionUserEnd, putFunctionUserEnd } from "./user-generic-index";
import { toast } from "sonner";

export const USE_GET_USER_PROFILE_API = "USE_GET_USER_PROFILE_API";
export const USE_GET_USER_COMMUNITIES_API = "USE_GET_USER_COMMUNITIES_API";
export const USE_GET_USER_ACTIVE_CAMPAIGNS_API = "USE_GET_USER_ACTIVE_CAMPAIGNS_API";
export const USE_GET_USER_SPECIFIC_CAMPAIGNS_API = "USE_GET_USER_SPECIFIC_CAMPAIGNS_API";
export const USE_GET_USER_SPECIFIC_COMMUNITY_API = "USE_GET_USER_SPECIFIC_COMMUNITY_API";
export const USE_GET_USER_DONATIONS_API = "USE_GET_USER_DONATIONS_API";
export const USE_GET_IMPACT_SCORE_API = "USE_GET_IMPACT_SCORE_API";
export const USE_GET_IMPACT_LEADERBOARD_API = "USE_GET_IMPACT_LEADERBOARD_API";
export const USE_GET_IMPACT_REFERRAL_TREE_API = "USE_GET_IMPACT_REFERRAL_TREE_API";

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

export const useGetUserCommunities = (page?: number, limit?: number) => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (limit) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();
  const URL = `/donor/communities/discover${queryString ? `?${queryString}` : ""}`;

  return useQuery({
    queryKey: [USE_GET_USER_COMMUNITIES_API, page, limit],
    queryFn: () => getFunctionUserEnd(URL),
  });
};

export const useJoinCommunity = (id: string | any) => {
  // const queryClient = useQueryClient();
  const URL = `/donor/communities/${id}/join`;
  return useMutation({
    mutationFn: (payload: any) => postFunctionUserEnd(payload, URL),
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: [USE_GET_USER_PROFILE_API],
      // });
      toast.success("You've joined this community");
    },
    onError: (err: any) =>
      toast.error(err?.message || "Error joining community, please try again.!"),
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

export const useGetUserActiveCampaigns = (page?: number, limit?: number) => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (limit) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();
  const URL = `/campaigns${queryString ? `?${queryString}` : ""}`;

  return useQuery({
    queryKey: [USE_GET_USER_ACTIVE_CAMPAIGNS_API, page, limit],
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

export const useGetImpactScore = () => {
  const URL = `/donor/impact/score`;
  return useQuery({
    queryKey: [USE_GET_IMPACT_SCORE_API],
    queryFn: () => getFunctionUserEnd(URL),
  });
};

export const useGetImpactLeaderboard = (page?: number, limit?: number) => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (limit) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();
  const URL = `/impact/leaderboard${queryString ? `?${queryString}` : ""}`;
  return useQuery({
    queryKey: [USE_GET_IMPACT_LEADERBOARD_API, page, limit],
    queryFn: () => getFunctionUserEnd(URL),
  });
};

export const useGetImpactReferralTree = (page?: number, limit?: number) => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (limit) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();
  // /v1/donor/referrals/tree
  const URL = `/donor/referrals/tree${queryString ? `?${queryString}` : ""}`;
  return useQuery({
    queryKey: [USE_GET_IMPACT_REFERRAL_TREE_API, page, limit],
    queryFn: () => getFunctionUserEnd(URL),
  });
};
