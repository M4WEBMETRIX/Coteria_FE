import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFunction, patchFunction, postFunction, putFunction } from "./generic-index";
import type { createCampaignProps, createCommunityProps } from "./types";
import { toast } from "sonner";
import { showErrorToast } from "@/lib/utils";
import { postFunctionUserEnd } from "./user-generics/user-generic-index";

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
const USE_GET_CAMPAIGNS_STATS_API = "USE_GET_CAMPAIGNS_STATS_API";
const USE_GET_ORGANISATION_DONATIONS_API = "USE_GET_ORGANISATION_DONATIONS_API";
const USE_GET_ORGANISATION_DONATION_DETAILS_API = "USE_GET_ORGANISATION_DONATION_DETAILS_API";
const USE_GET_CAMPAIGN_ENGAGEMENT_API = "USE_GET_CAMPAIGN_ENGAGEMENT_API";
const USE_GET_ORGANISATION_EVENTS_API = "USE_GET_ORGANISATION_EVENTS_API";
const USE_GET_ORG_COMMUNITIES_DETAILS = "USE_GET_ORG_COMMUNITIES_DETAILS";
const USE_GET_CAMPAIGN_BASIC_API = "USE_GET_CAMPAIGN_BASIC_API";

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  const URL = "/org/campaigns";
  return useMutation({
    mutationFn: (payload: createCampaignProps) => postFunction(payload, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_ALL_CAMPAIGNS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGNS_STATS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGN_DETAILS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGN_ENGAGEMENT_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGN_BASIC_API],
      });
      toast.success("campaign created successfully");
    },
    onError: (err: any) => showErrorToast(err, "Error creating campaign, please try again.!"),
  });
};

export const useUpdateCampaign = (id: string | number | undefined) => {
  const queryClient = useQueryClient();

  const URL = `/org/campaigns/${id}`;
  return useMutation({
    mutationFn: (payload: createCampaignProps) => putFunction(payload, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_ALL_CAMPAIGNS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGNS_STATS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGN_DETAILS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGN_ENGAGEMENT_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGN_BASIC_API],
      });
      toast.success("campaign updated successfully");
    },
    onError: (err: any) => showErrorToast(err, "Error updating campaign, please try again.!"),
  });
};

export const useUpdateCampaignStatus = (id: string | number | undefined) => {
  const queryClient = useQueryClient();

  const URL = `/org/campaigns/${id}/status`;
  return useMutation({
    mutationFn: (payload: { status: string }) => patchFunction(payload, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_ALL_CAMPAIGNS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGNS_STATS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGN_DETAILS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGN_ENGAGEMENT_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_CAMPAIGN_BASIC_API],
      });
      toast.success("campaign status updated successfully");
    },
    onError: (err: any) =>
      showErrorToast(err, "Error updating campaign status, please try again.!"),
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

export const useGetCampaignBasic = (params?: { search?: string; page?: number; limit?: number }) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("q", params.search);

  const URL = `/org/campaigns/basic${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return useQuery({
    queryKey: [USE_GET_CAMPAIGN_BASIC_API, params?.page, params?.limit, params?.search],
    queryFn: () => getFunction(URL),
  });
};

export const useGetCampaignEngagement = (id: string | number | undefined) => {
  const URL = `/org/campaigns/${id}/engagement`;
  return useQuery({
    queryKey: [USE_GET_CAMPAIGN_ENGAGEMENT_API, id],
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

export const useUpdateOrganisationProfile = () => {
  const queryClient = useQueryClient();
  const URL = "/org/profile";
  return useMutation({
    mutationFn: (payload: any) => putFunction(payload, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_ORGANISATION_PROFILE_API],
      });
      toast.success("profile updated successfully");
    },
    onError: (err: any) =>
      toast.error(err?.message || "Error updating profile, please try again.!"),
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

      queryClient.invalidateQueries({
        queryKey: [USE_GET_ORG_COMMUNITIES_DETAILS],
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

export const useCampaignStats = () => {
  const URL = `/org/campaigns/stats`;
  return useQuery({
    queryKey: [USE_GET_CAMPAIGNS_STATS_API],
    queryFn: () => getFunction(URL),
  });
};

export const useGetOrganisationDonations = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.sort) queryParams.append("sort", params.sort);

  const URL = `/org/donations${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return useQuery({
    queryKey: [
      USE_GET_ORGANISATION_DONATIONS_API,
      params?.page,
      params?.limit,
      params?.search,
      params?.sort,
    ],
    queryFn: () => getFunction(URL),
  });
};

export const useGetOrganisationDonationDetails = (id: string | number | undefined) => {
  const URL = `/org/donations/${id}`;
  return useQuery({
    queryKey: [USE_GET_ORGANISATION_DONATION_DETAILS_API, id],
    queryFn: () => getFunction(URL),
    enabled: !!id,
  });
};

export const useCommunityDetails = (id: string | number | undefined) => {
  const URL = `/org/communities/${id}`;
  return useQuery({
    queryKey: [USE_GET_ORG_COMMUNITIES_DETAILS, id],
    queryFn: () => getFunction(URL),
    enabled: !!id,
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

export const useCreateShortenedUrl = () => {
  //   const queryClient = useQueryClient();

  const URL = `/url-short-links`;
  return useMutation({
    mutationFn: (payload: { Url: string }) => postFunction(payload, URL),
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

export const useCreateShortenedUrlUserEnd = () => {
  //   const queryClient = useQueryClient();

  const URL = `/url-short-links`;
  return useMutation({
    mutationFn: (payload: { Url: string }) => postFunctionUserEnd(payload, URL),
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

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  const URL = `/org/subscription/cancel`;
  return useMutation({
    mutationFn: (payload: any) => postFunction(payload, URL),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [USE_GET_SUBSCRIPTION_PLANS_API],
      });

      queryClient.invalidateQueries({
        queryKey: [USE_GET_SUBSCRIPTION_PLANS_API],
      });

      const checkoutUrl = response?.data?.url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
      toast.success("You are being redirected to Stripe");
    },
    onError: (err: any) =>
      toast.error(err?.message || "Error cancelling subscription, please try again.!"),
  });
};

export const useGetOrganisationEvents = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.sort) queryParams.append("sort", params.sort);

  const URL = `/org/events${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return useQuery({
    queryKey: [
      USE_GET_ORGANISATION_EVENTS_API,
      params?.page,
      params?.limit,
      params?.search,
      params?.sort,
    ],
    queryFn: () => getFunction(URL),
  });
};
