import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFunction, postFunction, putFunction } from "./generic-index";
import type { createCampaignProps, createCommunityProps } from "./types";
import { toast } from "sonner";
import { showErrorToast } from "@/lib/utils";

const USE_GET_ORGANISATION_PROFILE_API = "USE_GET_ORGANISATION_PROFILE_API";
const USE_GET_ALL_COMMUNITIES_API = "USE_GET_ALL_COMMUNITIES_API";
const USE_GET_COMMUNITIES_DETAILS_STATS_API = "USE_GET_COMMUNITIES_DETAILS_STATS_API";
const USE_GET_SUBSCRIPTION_PLANS_API = "USE_GET_SUBSCRIPTION_PLANS_API";
const USE_GET_SUBSCRIPTION_INVOICES_API = "USE_GET_SUBSCRIPTION_INVOICES";
const USE_GET_ALL_CAMPAIGNS_API = "USE_GET_ALL_CAMPAIGNS_API";
const USE_GET_CURRENCIES_API = "USE_GET_CURRENCIES_API";
const USE_GET_CAMPAIGN_CATEGORIES_API = "USE_GET_CAMPAIGN_CATEGORIES_API";
const USE_GET_COMMUNITIES_STATS_API = "USE_GET_COMMUNITIES_STATS_API";
const USE_GET_CAMPAIGN_DETAILS_API = "USE_GET_CAMPAIGN_DETAILS_API";

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  const URL = "/org/campaigns";
  return useMutation({
    mutationFn: (payload: createCampaignProps) => postFunction(payload, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_ALL_CAMPAIGNS_API],
      });
      toast.success("campaign created successfully");
    },
    onError: (err: any) => showErrorToast(err, "Error creating campaign, please try again.!"),
  });
};

export const useCampaignDetails = (id: string | number | undefined) => {
  const URL = `/org/campaigns/${id}`;
  return useQuery({
    queryKey: [USE_GET_CAMPAIGN_DETAILS_API, id],
    queryFn: () => getFunction(URL),
    enabled: !!id,
  });
};

export const useGetCurrencies = () => {
  const URL = "/currencies";
  return useQuery({
    queryKey: [USE_GET_CURRENCIES_API],
    queryFn: () => getFunction(URL),
  });
};

export const useGetCampaigns = (params: { sort: string; search: string }) => {
  const URL = `/org/campaigns?sort=${params?.sort}&search=${params?.search}`;
  return useQuery({
    queryKey: [USE_GET_ALL_CAMPAIGNS_API, params?.sort, params?.search],
    queryFn: () => getFunction(URL),
  });
};

export const useGetCampaignCategories = () => {
  const URL = "/campaigns/categories";
  return useQuery({
    queryKey: [USE_GET_CAMPAIGN_CATEGORIES_API],
    queryFn: () => getFunction(URL),
  });
};

export const useGetOrganisationProfile = () => {
  const URL = "/org/profile";
  return useQuery({
    queryKey: [USE_GET_ORGANISATION_PROFILE_API],
    queryFn: () => getFunction(URL),
  });
};

export const useGetAllCommunities = (params?: { sort?: string; search?: string }) => {
  const URL = `/org/communities?sort=${params?.sort}&search=${params?.search}`;
  return useQuery({
    queryKey: [USE_GET_ALL_COMMUNITIES_API, params?.sort, params?.search],
    queryFn: () => getFunction(URL),
    // enabled: !!params?.sort && !!params?.search,
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

      queryClient.invalidateQueries({
        queryKey: [USE_GET_COMMUNITIES_STATS_API],
      });
      toast.success("community created successfully");
    },
    onError: (err: any) =>
      toast.error(err?.message || "Error creating community, please try again.!"),
  });
};

export const useCommunityStats = () => {
  const URL = `/org/communities/stats`;
  return useQuery({
    queryKey: [USE_GET_COMMUNITIES_STATS_API],
    queryFn: () => getFunction(URL),
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
      // toast.success("Referral code generated");
    },
    onError: (err: any) =>
      toast.error(err?.message || "Error generating referral, please try again.!"),
  });
};

export const useGetSubscriptionPlans = () => {
  const URL = `/org/subscription`;
  return useQuery({
    queryKey: [USE_GET_SUBSCRIPTION_PLANS_API],
    queryFn: () => getFunction(URL),
  });
};

export const useGetSubscriptionInvoices = () => {
  const URL = `/org/subscription/invoices`;
  return useQuery({
    queryKey: [USE_GET_SUBSCRIPTION_INVOICES_API],
    queryFn: () => getFunction(URL),
  });
};

export const useChangeBillingType = () => {
  const queryClient = useQueryClient();

  const URL = `/org/subscription/plan`;
  return useMutation({
    mutationFn: (payload: any) => putFunction(payload, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_SUBSCRIPTION_PLANS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_SUBSCRIPTION_PLANS_API],
      });
      toast.success("Bliling plan changed successfully");
    },
    onError: (err: any) =>
      toast.error(err?.message || "Error changing billing plan, please try again.!"),
  });
};

export const useActivateBilling = () => {
  const queryClient = useQueryClient();

  const URL = `/org/subscription/checkout`;
  return useMutation({
    mutationFn: (payload: any) => postFunction(payload, URL),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_SUBSCRIPTION_PLANS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_SUBSCRIPTION_PLANS_API],
      });

      const checkoutUrl = response?.data?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
      toast.success("You are being checked out");
    },
    onError: (err: any) => toast.error(err?.message || "Error checking out, please try again.!"),
  });
};
