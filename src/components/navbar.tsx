import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfilePIC from '@/assets/images/image-2.png';
import Logo from '@/assets/icons/coterie.svg';

const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Community', path: '/community' },
    { name: 'Campaigns', path: '/campaigns' },
    { name: 'Insights', path: '/insights' },
    { name: 'Donors', path: '/donors' },
    { name: 'Settings', path: '/settings' },
];

const Navbar = () => {
    return (
        <nav className=' h-24 w-full bg-white  flex items-center px-8 justify-between sticky top-0 z-50'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
                <h1 className='text-3xl font-bold tracking-tight text-[#0A0A0C] font-serif'>
                    <img src={Logo} alt='Logo' className='w-[155px] h-[37px]' />
                </h1>
            </div>

            {/* Navigation Links */}
            <div className='flex items-center gap-2'>
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                'px-6 py-3 rounded-full text-base font-medium transition-colors',
                                isActive
                                    ? 'bg-[#F7F7F7] text-[#1E1F24]'
                                    : 'text-[#1E1F24] hover:text-[#1E1F24]'
                            )
                        }>
                        {item.name}
                    </NavLink>
                ))}
            </div>

            {/* Right Section: Search, Notifications, Profile */}
            <div className='flex items-center gap-4'>
                {/* Search Bar */}
                <div className='relative flex items-center'>
                    <Search className='absolute left-3.5 w-5 h-5 text-[#41414380]' />
                    <input
                        type='text'
                        placeholder='Quick search here...'
                        className='h-12 w-full max-w-[235px] bg-[#FCFCFD] pl-11 pr-4 rounded-full text-sm outline-none placeholder:text-[#41414380] focus:ring-1 focus:ring-gray-200 transition-all'
                    />
                </div>

                {/* Notifications */}
                <button className='w-12 h-12 flex items-center justify-center rounded-full bg-[#FCFCFD] transition-colors text-[#0A0A0C]'>
                    <Bell className='w-5 h-5' />
                </button>

                {/* User Profile */}
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={ProfilePIC} className='  object-cover ' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};

export default Navbar;
