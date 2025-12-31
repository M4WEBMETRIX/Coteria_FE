import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { useBreadcrumb } from '@/components/breadcrumb-navigation';

import { HugeiconsIcon } from '@hugeicons/react';
import {
    CovariateFreeIcons,
    TimeHalfPassFreeIcons,
    ChartColumnIcon,
} from '@hugeicons/core-free-icons';

const Campaigndetails = () => {
    const { id } = useParams();
    useBreadcrumb({
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Campaigns', href: '/campaigns' },
            { label: id || 'Details', isCurrentPage: true },
        ],
    });

    return (
        <div className='max-w-[600px] w-full font-inter'>
            <div className='rounded-[24px] p-2 bg-[#FCFCFD]'>
                {/* Header */}
                <div className='mb-6 space-y-1'>
                    <h1 className='text-2xl font-bold text-[#0A0A0C] tracking-tight'>
                        Women Empowerment – Campaign
                    </h1>
                    <p className='text-[#1E1F24] font-medium text-sm'>
                        1,284 members · Active · Created Mar 2025
                    </p>
                </div>

                {/* Main Stats Card */}
                <div className='bg-[#12AA5B] rounded-[24px] p-8 text-white mb-8 relative overflow-hidden'>
                    <h2 className='text-5xl font-semibold tracking-tight leading-none mb-2'>
                        $542,000
                    </h2>
                    <div className='flex items-center justify-between'>
                        <p className='text-white/80 font-medium'>
                            Total Raised for this Campaign
                        </p>
                        <Button className='bg-white text-[#12AA5B] text-sm font-semibold rounded-full px-6 h-10'>
                            Withdraw Money
                        </Button>
                    </div>
                </div>

                {/* Metrics List */}
                <div className='space-y-6'>
                    {/* Item 1 */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <HugeiconsIcon
                                icon={TimeHalfPassFreeIcons}
                                size={24}
                                className='text-[#0A0A0C]'
                                strokeWidth={1.5}
                            />
                            <span className='font-medium text-[#1E1F24]/75 text-sm'>
                                Pending Approvals
                            </span>
                        </div>
                        <span className='font-semibold text-[#1E1F24]/75 text-sm'>
                            12 requests
                        </span>
                    </div>

                    {/* Item 2 */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <HugeiconsIcon
                                icon={ChartColumnIcon}
                                size={24}
                                className='text-[#0A0A0C]'
                                strokeWidth={1.5}
                            />
                            <span className='font-medium text-[#1E1F24]/75 text-sm'>
                                Average Salary
                            </span>
                        </div>
                        <span className='font-semibold text-[#1E1F24]/75 text-sm'>
                            $4,520
                        </span>
                    </div>

                    {/* Item 3 */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <HugeiconsIcon
                                icon={CovariateFreeIcons}
                                size={24}
                                className='text-[#0A0A0C]'
                                strokeWidth={1.5}
                            />
                            <span className='font-medium text-[#1E1F24]/75 text-sm'>
                                Overtime Costs
                            </span>
                        </div>
                        <span className='font-semibold text-[#1E1F24]/75 text-sm'>
                            $18,200
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Campaigndetails;
