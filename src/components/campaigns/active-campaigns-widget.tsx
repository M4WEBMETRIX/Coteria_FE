import { Badge } from '@/components/ui/badge';
import { UserGroup03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Analytics from '@/assets/icons/Analytics.svg';

// const data = [
//     { value: 40 },
//     { value: 30 },
//     { value: 45 },
//     { value: 35 },
//     { value: 55 },
//     { value: 45 },
//     { value: 60 },
// ];

const campaigns = [
    { id: 1, name: 'Campaign Name 1', performance: 98 },
    { id: 2, name: 'Campaign Name 2', performance: 95 },
    { id: 3, name: 'Campaign Name 3', performance: 92 },
];

const ActiveCampaignsWidget = () => {
    return (
        <div className=' text-white border-0 overflow-hidden shadow-none rounded-[24px]'>
            <div className='bg-[#12AA5B] p-4 rounded-[16px]'>
                <div className='flex justify-between items-start'>
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-[#FCFCFD] rounded-lg '>
                            <HugeiconsIcon
                                icon={UserGroup03Icon}
                                size={24}
                                color='#1E1F24'
                                strokeWidth={1.5}
                            />
                        </div>
                        <h3 className='text-xl font-medium'>
                            Active Campaigns
                        </h3>
                    </div>
                    <Select defaultValue='all-time'>
                        <SelectTrigger className='w-auto bg-transparent h-auto min-h-0 gap-2 text-xs font-medium border-0 px-3 py-1.5 rounded-full  transition-colors text-white focus:ring-0 focus:ring-offset-0 [&>svg]:opacity-100 [&>svg]:text-white'>
                            <SelectValue placeholder='Select period' />
                        </SelectTrigger>
                        <SelectContent align='end' className='min-w-[100px]'>
                            <SelectItem value='all-time'>All Time</SelectItem>
                            <SelectItem value='monthly'>Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='mt-8 '>
                    <h2 className='text-5xl font-semibold tracking-[-3%] leading-[60px]'>
                        250
                    </h2>
                    <p className='text-white/50 mt-1 font-medium text-sm leading-5 tracking-[-1%]'>
                        Campaigns currently running across your communities
                    </p>
                </div>
            </div>
            <div className='bg-[#FCFCFD]  p-4 rounded-[16px]'>
                {' '}
                <div className='flex gap-3 mt-4 text-sm'>
                    <Badge className='bg-[#003D29] hover:bg-[#0A0A0C]/90 text-white border-0 px-3 py-1.5 gap-1.5 rounded-full font-medium'>
                        High Momentum
                    </Badge>
                    <Badge className='bg-[#EFF0F3] text-[#0A0A0C] hover:bg-white/90 border-0 px-3 py-1.5 gap-1.5 rounded-full font-medium'>
                        ⚠️ Needs Attention
                    </Badge>
                </div>
                <div className='space-y-4 mt-4  p-4 rounded-xl backdrop-blur-sm'>
                    {campaigns?.map((campaign) => (
                        <div
                            key={campaign.id}
                            className='flex items-center text-[#1E1F24]/75 justify-between group cursor-pointer'>
                            <p className='font-semibold  group-hover:text-[#1E1F24]/90 transition-colors'>
                                {campaign.name}
                            </p>
                            <div className='flex items-center '>
                                <img
                                    src={Analytics}
                                    alt=''
                                    className='w-[50px] h-[20px]'
                                />
                                <span className='text-sm font-medium '>
                                    {campaign.performance}% Performance Index
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActiveCampaignsWidget;
