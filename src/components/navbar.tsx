import { Search, Bell } from 'lucide-react';
import UserProfileMenu from '@/components/user-profile-menu';
import type { ReactNode } from 'react';

interface NavbarProps {
    breadcrumbs: ReactNode;
}

const Navbar = ({ breadcrumbs }: NavbarProps) => {
    return (
        <nav className='h-[72px] w-full bg-white border-b border-gray-100 flex items-center px-8 justify-between sticky top-0 z-50'>
            {/* Breadcrumb */}
            <div className='flex items-center'>{breadcrumbs}</div>

            {/* Right Section: Search, Notifications, Profile */}
            <div className='flex items-center gap-4'>
                {/* Search Bar */}
                {/* <div className='relative flex items-center'>
                    <Search className='absolute left-3.5 w-5 h-5 text-[#41414380]' />
                    <input
                        type='text'
                        placeholder='Quick search here...'
                        className='h-12 w-full max-w-[235px] bg-[#FCFCFD] pl-11 pr-4 rounded-full text-sm outline-none placeholder:text-[#41414380] focus:ring-1 focus:ring-gray-200 transition-all'
                    />
                </div> */}
                <button className='w-12 h-12 flex items-center justify-center rounded-full bg-[#FCFCFD] transition-colors text-[#0A0A0C] border-[#DFE1E7] border'>
                    <Search className='w-5 h-5' />
                </button>
                {/* Notifications */}
                <button className='w-12 h-12 flex relative items-center justify-center rounded-full bg-[#FCFCFD] transition-colors text-[#0A0A0C] border-[#DFE1E7] border'>
                    <div className='bg-[#DF1C41] rounded-full absolute right-3 top-2 w-3 h-3' />
                    <Bell className='w-5 h-5' />
                </button>

                {/* User Profile */}
                <UserProfileMenu />
            </div>
        </nav>
    );
};

export default Navbar;
