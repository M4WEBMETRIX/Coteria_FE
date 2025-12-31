import { Link, NavLink, useLocation } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Logo from '@/assets/icons/coterie.svg';
import {
    CaretLeftIcon,
    CaretRightIcon,
    // CaretDownIcon,
} from '@phosphor-icons/react';
import { HelpCircleIcon, Logout01Icon } from 'hugeicons-react';
import { useState } from 'react';
import { sidebarLinks } from '@/constants/nav-links';
import { Separator } from '@/components/ui/separator';

// Mock translation function for now
const t = (key: string) => key;

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const location = useLocation();

    return (
        <aside
            className={cn(
                'min-h-screen font-inter bg-[#F6F8FA] border-r border-gray-100 flex flex-col transition-all duration-300 relative z-50 ',
                isSidebarOpen ? 'w-64' : 'w-16'
            )}>
            {/* Logo */}
            <div className='h-[72px] flex items-center px-4 border-b border-[#DFE1E7] justify-between shrink-0'>
                {isSidebarOpen && (
                    <Link to='/dashboard'>
                        <img
                            src={Logo}
                            alt='Coterie'
                            className='w-[120px] h-auto'
                        />
                    </Link>
                )}

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={cn(
                        'w-6 h-6 bg-white border-[#DFE1E7] border rounded-[6px] cursor-pointer flex items-center justify-center hover:bg-gray-200 transition-colors',
                        !isSidebarOpen && 'mx-auto'
                    )}>
                    {isSidebarOpen ? (
                        <CaretLeftIcon className='w-4 h-4 text-[#0D0D12]' />
                    ) : (
                        <CaretRightIcon className='w-4 h-4 text-[#0D0D12]' />
                    )}
                </button>
            </div>

            {/* Profile Completion Banner - Only show when open */}

            <nav
                className={cn(
                    'p-2 overflow-y-auto shrink-0 flex-1',
                    isSidebarOpen ? 'tiny-scrollbar' : 'no-scrollbar'
                )}>
                {isSidebarOpen && (
                    <div
                        className='mt-5 px-4 py-2 rounded-[8px]  h-[40px] bg-[#FFF0F3]'
                        style={{ boxShadow: '0px 1px 2px 0px #E4E5E73D' }}>
                        <p className='text-base leading-[150%] tracking-[2%] font-medium text-[#DF1C41] mb-1'>
                            Profile 50% complete
                        </p>
                    </div>
                )}
                <ul
                    className={cn(
                        'flex w-full flex-col gap-2',
                        isSidebarOpen ? '' : 'items-center'
                    )}>
                    {sidebarLinks.map((link, index) => {
                        // const isSectionOpen = openSections[link.name];

                        return (
                            <li
                                key={index}
                                className='flex flex-col justify-center w-full'>
                                {isSidebarOpen && (
                                    <>
                                        {link.name !== 'Main' && (
                                            <p
                                                className='text-sm leading-[150%] tracking-[2%] font-semibold text-[#A4ACB9] mb-1 flex items-center justify-between p-2 cursor-pointer uppercase hover:text-black select-none'
                                                // onClick={() =>
                                                //     handleSectionClick(
                                                //         link.name
                                                //     )
                                                // }
                                            >
                                                {link.name}

                                                {/* {link.hasSubLinks && (
                                                    <CaretDownIcon
                                                        size={14}
                                                        weight='bold'
                                                        color='#64748B'
                                                        className={cn(
                                                            'text-[#99A0AE] transition-transform duration-300',
                                                            isSectionOpen
                                                                ? ''
                                                                : '-rotate-90'
                                                        )}
                                                    />
                                                )} */}
                                            </p>
                                        )}
                                    </>
                                )}

                                {!isSidebarOpen && (
                                    <div className='w-full px-2'>
                                        <Separator className='bg-[#E1E4EA] w-full my-2' />
                                    </div>
                                )}

                                {/* Render Sublinks if section is open or if we are just ignoring section collapse for "Main" (implied) or if sidebar is closed (we might show icons) */}
                                {/* Actually, for the requested behavior: "Main" doesn't have a header. "Other" does.
                                When sidebar is CLOSED, we show all icons in a list, maybe separated.
                                When sidebar is OPEN, we respect the collapsible state.
                             */}

                                <TooltipProvider delayDuration={0}>
                                    <ul className='flex flex-col items-center w-full gap-1'>
                                        {link.subLinks.map(
                                            (subLink, subIndex: number) => {
                                                const LinkContent = (
                                                    <NavLink
                                                        to={subLink.path}
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            cn(
                                                                'w-full flex border border-transparent px-3 py-[10px] items-center gap-2 text-sm text-[#99A0AE] cursor-pointer rounded-md group transition-all duration-200',
                                                                isActive
                                                                    ? 'bg-white text-primary600 font-medium  text-[#717171]'
                                                                    : 'hover:bg-white  hover:text-[#717171]',
                                                                isSidebarOpen
                                                                    ? 'justify-start'
                                                                    : 'justify-center'
                                                            )
                                                        }>
                                                        <span
                                                            className={cn(
                                                                'shrink-0',
                                                                location.pathname.includes(
                                                                    subLink.path
                                                                )
                                                                    ? 'text-[#0A0A0C]'
                                                                    : 'text-gray-500 group-hover:text-[#0A0A0C]'
                                                            )}>
                                                            {subLink.icon}
                                                        </span>

                                                        {isSidebarOpen && (
                                                            <span className='truncate'>
                                                                {t(
                                                                    subLink.name
                                                                )}
                                                            </span>
                                                        )}
                                                    </NavLink>
                                                );

                                                return (
                                                    <li
                                                        className='w-full relative'
                                                        key={subIndex}>
                                                        {isSidebarOpen ? (
                                                            LinkContent
                                                        ) : (
                                                            <Tooltip>
                                                                <TooltipTrigger
                                                                    asChild>
                                                                    {
                                                                        LinkContent
                                                                    }
                                                                </TooltipTrigger>
                                                                <TooltipContent
                                                                    side='right'
                                                                    className='font-medium bg-black text-white border-black ml-2'>
                                                                    {t(
                                                                        subLink.name
                                                                    )}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        )}
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </TooltipProvider>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Actions */}
            <div className='mt-auto p-2 border-t border-gray-100 shrink-0'>
                <div className='flex flex-col gap-1'>
                    <button
                        className={cn(
                            'w-full flex items-center gap-2 p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#0A0A0C] transition-colors group relative',
                            isSidebarOpen ? 'justify-start' : 'justify-center'
                        )}>
                        <HelpCircleIcon className='w-4 h-4 text-gray-500 shrink-0' />
                        {isSidebarOpen && <span>Help & Support</span>}
                        {!isSidebarOpen && (
                            <span className='absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 text-xs hidden group-hover:block w-max p-2 font-medium rounded-md bg-white border border-[#e1e4ea] shadow-md z-[90] text-gray-700'>
                                Help & Support
                            </span>
                        )}
                    </button>
                    <button
                        className={cn(
                            'w-full flex items-center gap-2 p-2 rounded-lg text-sm font-medium text-[#FF4D4F] hover:bg-red-50 transition-colors group relative',
                            isSidebarOpen ? 'justify-start' : 'justify-center'
                        )}>
                        <Logout01Icon className='w-4 h-4 shrink-0' />
                        {isSidebarOpen && <span>Logout</span>}
                        {!isSidebarOpen && (
                            <span className='absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 text-xs hidden group-hover:block w-max p-2 font-medium rounded-md bg-white border border-[#e1e4ea] shadow-md z-[90] text-red-600'>
                                Logout
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
