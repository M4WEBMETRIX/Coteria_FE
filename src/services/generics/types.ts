export interface createCampaignProps {
  name: string;
  visibility: string;
  description: string;
  goalType?: string;
  communityId?: string;
  categoryId?: string;
  goalAmountCents?: number | string;
  startDate?: string;
  endDate?: string;
}

export interface createCommunityProps {
  name: string;
  visibility: string;
  description: string;
  allowedDomains?: string[];
  whitelistedEmails?: string[];
}
