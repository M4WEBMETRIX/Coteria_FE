import { z } from "zod";

export enum EventType {
  ONLINE = "online",
  VENUE = "venue",
}

export const eventFormSchema = z.object({
  // Step 1: Event Type
  eventType: z.nativeEnum(EventType),

  // Step 2: Basic Info
  title: z.string().min(1, "Event title is required").max(100, "Title is too long"),
  category: z.string().min(1, "Category is required"),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(140, "Summary must be 140 characters or less"),
  tags: z.array(z.string()).optional(),

  // Step 3: Location / Online Setup
  // For online events
  platform: z.string().optional(), // e.g., 'google_meet', 'zoom'
  eventLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  attendeeRequirements: z.array(z.string()).optional(),

  // For venue events (placeholder for now based on design focus)
  venueAddress: z.string().optional(),

  // Step 4: Date & Time
  isRecurring: z.boolean().default(false),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().min(1, "End date is required"),
  endTime: z.string().min(1, "End time is required"),
  timezone: z.string().min(1, "Timezone is required"),
  displayStartTime: z.boolean().default(true),
  displayEndTime: z.boolean().default(true),
  displayTimezone: z.boolean().default(false),

  // Step 5: Details
  heroImage: z.any().optional(), // File or string URL
  description: z.string().min(1, "Description is required"),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

export const defaultValues: Partial<EventFormValues> = {
  eventType: EventType.ONLINE,
  tags: [],
  attendeeRequirements: [],
  isRecurring: false,
  displayStartTime: true,
  displayEndTime: true,
  displayTimezone: false,
  timezone: "GMT+1 (West Africa Time)", // Default from design
};
