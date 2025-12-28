import { useNavigate } from 'react-router-dom';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    CheckmarkBadge01Icon,
    AiChat02FreeIcons,
    Settings01Icon,
    LogoutCircle01Icon,
    ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import ProfilePIC from '@/assets/images/image-2.png';

const UserProfileMenu = () => {
    const navigate = useNavigate();

    function handleLogout() {
        navigate('/auth/login');
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className='outline-none'>
                    <Avatar className='w-12 h-12 cursor-pointer border-2 border-transparent hover:border-gray-200 transition-all'>
                        <AvatarImage
                            src={ProfilePIC}
                            className='object-cover'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </button>
            </PopoverTrigger>
            <PopoverContent
                className='w-[360px] p-3 rounded-[24px] shadow-[0px_8px_32px_0px_#00000029] '
                align='end'
                sideOffset={8}>
                {/* Header */}
                <div className='flex items-center gap-4 mb-4'>
                    <div className='relative'>
                        <Avatar className='w-12 h-12'>
                            <AvatarImage
                                src={ProfilePIC}
                                className='object-cover'
                            />
                            <AvatarFallback>MM</AvatarFallback>
                        </Avatar>
                        <div className='absolute -bottom-1 -right-1 bg-white rounded-full p-[2px]'>
                            <HugeiconsIcon
                                icon={CheckmarkBadge01Icon}
                                size={16}
                                className='text-white fill-[#12AA5B]'
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className='text-[#1E1F24] font-medium text-base leading-6 tracking-[-1%]'>
                            Mario Maurer
                        </h4>
                        <p className='text-[#8B8D98] text-sm leading-4 tracking-[-1%]'>
                            mariomaurer@hiresense.co.id
                        </p>
                    </div>
                </div>

                {/* Plan Card */}
                <div className='bg-[#EFF0F3] rounded-2xl p-4 mb-4'>
                    <div className='flex justify-between items-start mb-1'>
                        <div className='space-y-1'>
                            <h5 className='font-semibold text-[#0A0A0C] text-base'>
                                Pro Plan
                            </h5>
                            <p className='text-[#8B8D98] text-xs font-normal'>
                                234/10,000 AI messages remaining
                            </p>
                        </div>
                        <button
                            className='text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors'
                            style={{
                                background:
                                    'radial-gradient(34.12% 80.21% at 50% 7.29%, #12AA5B 0%, #026451 100%)',
                            }}>
                            Upgrade
                        </button>
                    </div>
                </div>

                {/* Menu Items */}
                <div className='space-y-2'>
                    {/* AI Helper */}
                    <div className='flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group'>
                        <div className='flex items-center gap-3'>
                            <HugeiconsIcon
                                icon={AiChat02FreeIcons}
                                size={22}
                                className='text-[#0A0A0C]'
                                strokeWidth={1.5}
                            />
                            <span className='font-medium text-[#0A0A0C] text-[15px]'>
                                AI Helper
                            </span>
                        </div>
                        <Switch />
                    </div>

                    {/* Settings */}
                    <div className='flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group'>
                        <div className='flex items-center gap-3'>
                            <HugeiconsIcon
                                icon={Settings01Icon}
                                size={22}
                                className='text-[#0A0A0C]'
                                strokeWidth={1.5}
                            />
                            <span className='font-medium text-[#0A0A0C] text-[15px]'>
                                Settings
                            </span>
                        </div>
                    </div>

                    {/* Logout */}
                    <div
                        className='flex items-center justify-between p-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer group  '
                        onClick={handleLogout}>
                        <div className='flex items-center gap-3'>
                            <HugeiconsIcon
                                icon={LogoutCircle01Icon}
                                size={22}
                                className='text-[#FF897E] rotate-270'
                                strokeWidth={1.5}
                            />
                            <span className='font-medium text-[#FF897E] text-[15px]'>
                                Logout
                            </span>
                        </div>
                        <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            size={18}
                            className='text-[#FF3B30] '
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default UserProfileMenu;
