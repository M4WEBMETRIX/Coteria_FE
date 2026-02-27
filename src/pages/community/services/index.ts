import { useQuery } from "@tanstack/react-query";
import { publicGetFunction } from "./public-hooks";
const USE_GET_PUBLIC_COMMUNITY_API = "USE_GET_PUBLIC_COMMUNITY_API";

export const useGetPublicCommunity = (slug: string | undefined) => {
  const URL = `/communities/${slug}`;
  return useQuery({
    queryKey: [USE_GET_PUBLIC_COMMUNITY_API, slug],
    queryFn: () => publicGetFunction(URL),
    enabled: !!slug,
  });
};
