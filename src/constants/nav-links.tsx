import {
  BuildingApartmentIcon,
  ChartPieSliceIcon,
  ChatCircleDotsIcon,
  GearIcon,
  HandHeartIcon,
  PackageIcon,
  UserCircleIcon,
  UserIcon,
} from "@phosphor-icons/react";

export interface SubLink {
  name: string;
  icon: React.ReactNode;
  path: string;
  isBeta?: boolean;
}

export interface NavLinkSection {
  name: string;
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

      {
        name: "Donors",
        icon: <UserIcon size={20} weight="duotone" />,
        path: "/donors",
      },

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
      {
        name: "Team",
        icon: <UserCircleIcon size={20} weight="duotone" />,
        path: "/team",
      },
      {
        name: "Messages",
        icon: <ChatCircleDotsIcon size={20} weight="duotone" />,
        path: "/messages",
      },
      {
        name: "Reports",
        icon: <ChartPieSliceIcon size={20} weight="duotone" />,
        path: "/reports",
      },
      {
        name: "Settings",
        icon: <GearIcon size={20} weight="duotone" />,
        path: "/settings",
      },
    ],
  },
];
