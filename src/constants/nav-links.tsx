import { Home04FreeIcons, User03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import {
    UserGroupIcon,
    MoneyBag01Icon,
    UserIcon,
    Message01Icon,
    FileScriptIcon,
    Settings02Icon,
} from 'hugeicons-react';

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
        name: 'Manage your community',
        hasSubLinks: true,
        isDropdownActive: true,
        subLinks: [
            {
                name: 'Dashboard',
                icon: (
                    <HugeiconsIcon
                        primaryColor='#717171'
                        icon={Home04FreeIcons}
                        size={24}
                        strokeWidth={1.5}
                    />
                ),
                path: '/dashboard',
            },

            {
                name: 'Community',
                icon: (
                    <HugeiconsIcon
                        primaryColor='#717171'
                        icon={User03Icon}
                        size={24}
                        strokeWidth={1.5}
                    />
                ),
                path: '/community',
            },
            {
                name: 'Campaigns',
                icon: (
                    <HugeiconsIcon
                        primaryColor='#717171'
                        icon={User03Icon}
                        size={24}
                        strokeWidth={1.5}
                    />
                ),
                path: '/campaigns',
            },
            {
                name: 'Donors',
                icon: <UserGroupIcon className='w-4 h-4' />,
                path: '/donors',
            },
            {
                name: 'Donations',
                icon: <MoneyBag01Icon className='w-4 h-4' />,
                path: '/donations',
            },
        ],
    },
    {
        name: 'Other',
        hasSubLinks: true,
        isDropdownActive: true, // Default open for now, logic will handle toggling
        subLinks: [
            {
                name: 'Team',
                icon: <UserIcon className='w-4 h-4' />,
                path: '/team',
            },
            {
                name: 'Messages',
                icon: <Message01Icon className='w-4 h-4' />,
                path: '/messages',
            },
            {
                name: 'Reports',
                icon: <FileScriptIcon className='w-4 h-4' />,
                path: '/reports',
            },
            {
                name: 'Settings',
                icon: <Settings02Icon className='w-4 h-4' />,
                path: '/settings',
            },
        ],
    },
];
