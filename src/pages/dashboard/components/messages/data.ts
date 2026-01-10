export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string; // ISO string or formatted time
  isMe: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  unreadCount?: number;
  messages: Message[];
}

export const users: User[] = [
  {
    id: "1",
    name: "Title Name",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "3",
    name: "James Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "4",
    name: "Emma Thompson",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "5",
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  },
];

export const conversations: Conversation[] = [
  {
    id: "1",
    user: users[0],
    lastMessage: "Description",
    messages: [
      {
        id: "m1",
        content:
          "Engagement increased over the past 48 hours due to a combination of two factors:\n\n• The Housing Campaign reached 75% of its participation goal, which typically drives higher sharing.\n\n• Two high-influence community members shared the campaign, leading to 19 new participants within 6 hours.\n\nSimilar spikes occurred earlier this month when updates were sent mid-week.",
        senderId: "1",
        timestamp: "09:02 AM",
        isMe: false,
      },
      {
        id: "m2",
        content:
          "Based on current activity, here are the most effective actions to take today:\n• Send a short follow-up update to the Housing Campaign while engagement is still high.\n• Invite 2–3 suggested influencers to help extend reach beyond your core supporters.\n• Review Campaign B, which has seen declining participation over the past 7 days.",
        senderId: "1",
        timestamp: "09:02 AM",
        isMe: false,
      },
    ],
  },
  {
    id: "2",
    user: users[1],
    lastMessage: "Sure, let me check that for you.",
    messages: [
      {
        id: "m3",
        content: "Hey, do you have the report?",
        senderId: "me",
        timestamp: "10:00 AM",
        isMe: true,
      },
      {
        id: "m4",
        content: "Sure, let me check that for you.",
        senderId: "2",
        timestamp: "10:05 AM",
        isMe: false,
      },
    ],
  },
  {
    id: "3",
    user: users[2],
    lastMessage: "Meeting rescheduled to 3 PM",
    messages: [],
  },
  {
    id: "4",
    user: users[3],
    lastMessage: "Thanks for the update!",
    messages: [],
  },
  {
    id: "5",
    user: users[4],
    lastMessage: "Can we schedule a call?",
    messages: [],
  },
];
