export type ResourceType =
  | "pdf"
  | "image"
  | "presentation"
  | "spreadsheet"
  | "audio"
  | "archive"
  | "video"
  | "other";

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  size: string;
  description: string;
  tags: string[];
  createdAt: string;
  modifiedAt: string;
  owner: {
    name: string;
    avatar?: string;
  };
  sharedWith: {
    name: string;
    avatar?: string;
  }[];
  previewUrl?: string; // For images
  extension: string; // e.g., .pdf, .pptx
}
