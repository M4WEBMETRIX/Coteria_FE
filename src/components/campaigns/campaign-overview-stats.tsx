import { Card, CardContent } from '@/components/ui/card';
import {
    Money03Icon,
    ArrowUp01Icon,
    Tick02Icon,
    Cancel01Icon,
    Coins01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface StatsCardProps {
    title: string;
    value: string;
    icon: any;
    iconColor?: string;
    iconBg?: string;
}

const StatsCard = ({
    title,
    value,
    icon,
    iconColor = '#12AA5B',
    iconBg = '#E7F6EC',
}: StatsCardProps) => {
    return (
        <div className='border-[#DFE1E7] border p-4 shadow-sm bg-[#FFFFFF] rounded-xl h-[107px] w-full'>
            <div className=' flex flex-col gap-2 justify-between h-full'>
                <div className='flex justify-between items-start mb-4'>
                    <span className='text-xs leading-[150%] font-normal text-[#8B8D98] traxcking-[2%]'>
                        {title}
                    </span>
                    <div
                        className='p-1 rounded-full'
                        style={{ backgroundColor: iconBg }}>
                        <HugeiconsIcon
                            icon={icon}
                            size={16}
                            color={iconColor}
                            strokeWidth={2.5}
                        />
                    </div>
                </div>
                <h3 className='text-2xl font-semibold text-[#0D0D12] leading-[130%] tracking-[0%]'>
                    {value}
                </h3>
            </div>
        </div>
    );
};

const CampaignOverviewStats = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
            {/* 1. Campaign Active - Icon: Dollar Sign in Green Circle */}
            <StatsCard
                title='Campaign Active'
                value='4'
                icon={Coins01Icon}
                iconBg='#E7F6EC'
                iconColor='#12AA5B'
            />
            {/* 2. Total Raised - Icon: Minus/Dash in Green Circle */}
            <StatsCard
                title='Total Raised'
                value='$245,000'
                icon={ArrowUp01Icon}
                iconBg='#E7F6EC'
                iconColor='#12AA5B'
            />
            {/* 3. Total Goal - Icon: Check in Green Circle */}
            <StatsCard
                title='Total Goal'
                value='$1,200,000'
                icon={Tick02Icon}
                iconBg='#E7F6EC'
                iconColor='#12AA5B'
            />
            {/* 4. Campaign Closed - Icon: X in Green Circle */}
            <StatsCard
                title='Campaign Closed'
                value='4'
                icon={Cancel01Icon}
                iconBg='#E7F6EC'
                iconColor='#12AA5B'
            />
        </div>
    );
};

export default CampaignOverviewStats;
