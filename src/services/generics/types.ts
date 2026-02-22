export interface createCommunityProps {
  name: string;
  visibility: string;
  description: string;
  allowedDomains?: string[];
  whitelistedEmails?: string[];
}
