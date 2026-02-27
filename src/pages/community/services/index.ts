import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { publicGetFunction, publicPostFunction } from "./public-hooks";
import { toast } from "sonner";
const USE_GET_PUBLIC_COMMUNITY_API = "USE_GET_PUBLIC_COMMUNITY_API";
const USE_GET_PUBLIC_COMMUNITY_CAMPAIGNS_API = "USE_GET_PUBLIC_COMMUNITY_CAMPAIGNS_API";
const USE_GET_PUBLIC_CAMPAIGN_API = "USE_GET_PUBLIC_CAMPAIGN_API";

export const useGetPublicCommunityCampaigns = (slug: string | undefined) => {
  const URL = `/communities/${slug}/campaigns`;
  return useQuery({
    queryKey: [USE_GET_PUBLIC_COMMUNITY_CAMPAIGNS_API, slug],
    queryFn: () => publicGetFunction(URL),
    enabled: !!slug,
  });
};

export const useGetPublicCommunity = (slug: string | undefined) => {
  const URL = `/communities/${slug}`;
  return useQuery({
    queryKey: [USE_GET_PUBLIC_COMMUNITY_API, slug],
    queryFn: () => publicGetFunction(URL),
    enabled: !!slug,
  });
};

export const useGetPublicCampaign = (slug: string | undefined) => {
  const URL = `/campaigns/${slug}/donate`;
  return useQuery({
    queryKey: [USE_GET_PUBLIC_CAMPAIGN_API, slug],
    queryFn: () => publicGetFunction(URL),
    enabled: !!slug,
  });
};

export const useCreateDonation = (slug: string | undefined) => {
  const queryClient = useQueryClient();
  const URL = `/campaigns/${slug}/donate/checkout`;
  return useMutation({
    mutationFn: (payload: any) => publicPostFunction(URL, payload),
    onSuccess: () => {
      toast.success("Donation initiated successfully, proceeding to payment");
      queryClient.invalidateQueries({
        queryKey: [USE_GET_PUBLIC_CAMPAIGN_API],
      });
    },
    onError: (err: any) =>
      toast.error(err?.message || "Error creating donation, please try again.!"),
  });
};
