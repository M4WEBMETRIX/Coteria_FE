import {
  // BookIcon,
  BuildingApartmentIcon,
  // CalendarDotsIcon,
  GearIcon,
  HandHeartIcon,
  // CalendarDotsIcon,
  // ChartPieSliceIcon,
  // ChatCircleDotsIcon,
  // ChatsCircleIcon,
  // DoorIcon,
  // GearIcon,
  // HandHeartIcon,
  PackageIcon,
  // QuestionIcon,
  ReceiptIcon,
  SquaresFourIcon,
  UserIcon,
  // UserCircleIcon,
  // UserIcon,
} from "@phosphor-icons/react";

export interface SubLink {
  name: string;
  icon: React.ReactNode;
  path: string;
  isBeta?: boolean;
}

export interface NavLinkSection {
  name?: string;
  hasSubLinks: boolean;
  isDropdownActive: boolean;
  subLinks: SubLink[];
}

export const sidebarLinks: NavLinkSection[] = [
  {
    name: "Manage your community",
    hasSubLinks: true,
    isDropdownActive: true,
    subLinks: [
      {
        name: "Community",
        icon: <BuildingApartmentIcon size={20} weight="duotone" />,
        path: "/community",
      },
      // {
      //   name: "Dashboard",
      //   icon: (
      //     //   <HugeiconsIcon
      //     //     primaryColor="#079455"
      //     //     icon={Home04FreeIcons}
      //     //     size={20}
      //     //     strokeWidth={1.5}
      //     //   />
      //     <HouseSimple size={20} weight="duotone" />
      //   ),
      //   path: "/dashboard",
      // },

      // {
      //   name: "Donors",
      //   icon: <UserIcon size={20} weight="duotone" />,
      //   path: "/donors",
      // },

      {
        name: "Campaigns",
        icon: <PackageIcon size={20} weight="duotone" />,
        path: "/campaigns",
      },
      {
        name: "Donations",
        icon: <HandHeartIcon size={20} weight="duotone" />,
        path: "/donations",
      },
    ],
  },
  {
    name: "Other",
    hasSubLinks: true,
    isDropdownActive: true, // Default open for now, logic will handle toggling
    subLinks: [
      // {
      //   name: "Team",
      //   icon: <UserCircleIcon size={20} weight="duotone" />,
      //   path: "/team",
      // },
      // {
      //   name: "Messages",
      //   icon: <ChatCircleDotsIcon size={20} weight="duotone" />,
      //   path: "/messages",
      // },
      // {
      //   name: "Reports",
      //   icon: <ChartPieSliceIcon size={20} weight="duotone" />,
      //   path: "/reports",
      // },
      {
        name: "Settings",
        icon: <GearIcon size={20} weight="duotone" />,
        path: "/settings",
      },
    ],
  },
];

export const userSidebarLinks: NavLinkSection[] = [
  {
    // name: "Manage your community",
    hasSubLinks: true,
    isDropdownActive: true,
    subLinks: [
      {
        name: "World",
        icon: <SquaresFourIcon size={20} weight="regular" />,
        path: "/user/dashboard",
      },
      // {
      //   name: "Events",
      //   icon: <CalendarDotsIcon size={20} weight="regular" />,
      //   path: "/user/events",
      // },
      {
        name: "Receipt  & taxes",
        icon: <ReceiptIcon size={20} weight="regular" />,
        path: "/user/receipt-taxes",
      },
      {
        name: "Account & settings ",
        icon: <UserIcon size={20} weight="regular" />,
        path: "/user/account-settings",
      },
      // {
      //   name: "My Communities",
      //   icon: <BookIcon size={20} weight="regular" />,
      //   path: "/user/communities",
      // },

      // {
      //   name: "Campaign",
      //   icon: <CalendarDotsIcon size={20} weight="regular" />,
      //   path: "/user/campaign",
      // },
      // {
      //   name: "rooms",
      //   icon: <DoorIcon size={20} weight="regular" />,
      //   path: "/user/rooms",
      // },
      // {
      //   name: "Messages",
      //   icon: <ChatsCircleIcon size={20} weight="regular" />,
      //   path: "/user/messages",
      // },
      // {
      //   name: "Help & transparency",
      //   icon: <QuestionIcon size={20} weight="regular" />,
      //   path: "/user/help-transparency",
      // },
    ],
  },
];
