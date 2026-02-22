import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFunction, postFunction } from "./generic-index";
import type { createCommunityProps } from "./types";
import { toast } from "sonner";

const USE_GET_ORGANISATION_PROFILE_API = "USE_GET_ORGANISATION_PROFILE_API";
const USE_GET_ALL_COMMUNITIES_API = "USE_GET_ALL_COMMUNITIES_API";
const USE_GET_COMMUNITIES_DETAILS_STATS_API = "USE_GET_COMMUNITIES_DETAILS_STATS_API";

export const useGetOrganisationProfile = () => {
  const URL = "/org/profile";
  return useQuery({
    queryKey: [USE_GET_ORGANISATION_PROFILE_API],
    queryFn: () => getFunction(URL),
  });
};

export const useGetAllCommunities = () => {
  const URL = "/org/communities";
  return useQuery({
    queryKey: [USE_GET_ALL_COMMUNITIES_API],
    queryFn: () => getFunction(URL),
  });
};

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  const URL = "/org/communities";
  return useMutation({
    mutationFn: (payload: createCommunityProps) => postFunction(payload, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_ALL_COMMUNITIES_API],
      });
      toast.success("community created successfully");
    },
    onError: (err: any) => toast.error(err || "Error creating community, please try again.!"),
  });
};

export const useCommunityDetailsStats = (id: string | number | undefined) => {
  const URL = `/org/communities/${id}/stats`;
  return useQuery({
    queryKey: [USE_GET_COMMUNITIES_DETAILS_STATS_API, id],
    queryFn: () => getFunction(URL),
    enabled: !!id,
  });
};

export const useCreateInviteToCommunity = (id: string | undefined) => {
  //   const queryClient = useQueryClient();

  const URL = `/org/communities/${id}/join-links`;
  return useMutation({
    mutationFn: (payload: {}) => postFunction(payload, URL),
    onSuccess: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: [USE_GET_ALL_COMMUNITIES_API],
      //   });
      toast.success("Referral code generated");
    },
    onError: (err: any) => toast.error(err || "Error generating referral, please try again.!"),
  });
};
