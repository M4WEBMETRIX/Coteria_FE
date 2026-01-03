import { Card } from '@/components/ui/card';

// Simplified version for the specific layout in screenshot
const PulseStatsWidget = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl p-4'>
                <div className='flex justify-between mb-2'>
                    <span className='text-sm text-[#5E606A] font-medium'>
                        Awareness
                    </span>
                </div>
                <div className='flex items-baseline gap-2 mb-1'>
                    <span className='text-2xl font-bold text-[#1E1F24]'>
                        3,542
                    </span>
                    <span className='text-xs font-semibold text-[#12AA5B] bg-[#E7F6EC] px-1.5 py-0.5 rounded'>
                        +15.0
                    </span>
                    {/* Tiny chart icon substitute */}
                    <svg
                        width='20'
                        height='10'
                        viewBox='0 0 20 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M1 9L5 5L9 8L15 2L19 4'
                            stroke='#12AA5B'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
                <div className='flex items-center gap-4 text-[10px] text-[#8B8D98]'>
                    <span>Impression</span>
                    <span>vs Last 7 Days</span>
                </div>
            </Card>

            <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl p-4'>
                <div className='flex justify-between mb-2'>
                    <span className='text-sm text-[#5E606A] font-medium'>
                        Participation
                    </span>
                </div>
                <div className='flex items-baseline gap-2 mb-1'>
                    <span className='text-2xl font-bold text-[#1E1F24]'>
                        429
                    </span>
                    <span className='text-xs font-semibold text-[#12AA5B] bg-[#E7F6EC] px-1.5 py-0.5 rounded'>
                        +10.0
                    </span>
                    <svg
                        width='20'
                        height='10'
                        viewBox='0 0 20 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M1 9L5 5L9 8L15 2L19 4'
                            stroke='#12AA5B'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
                <div className='flex items-center gap-4 text-[10px] text-[#8B8D98]'>
                    <span>Participant</span>
                    <span>Conversion rate</span>
                </div>
            </Card>

            <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl p-4'>
                <div className='flex justify-between mb-2'>
                    <span className='text-sm text-[#5E606A] font-medium'>
                        Influence
                    </span>
                </div>
                <div className='flex items-baseline gap-2 mb-1'>
                    <span className='text-2xl font-bold text-[#1E1F24]'>
                        33%
                    </span>
                    <span className='text-xs font-semibold text-[#2E90FA] bg-[#F5FAFF] px-1.5 py-0.5 rounded text-[#175CD3]'>
                        +20.0
                    </span>
                </div>
                <div className='flex items-center gap-4 text-[10px] text-[#8B8D98]'>
                    <span>5 active influencers</span>
                </div>
            </Card>

            <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl p-4'>
                <div className='flex justify-between mb-2'>
                    <span className='text-sm text-[#5E606A] font-medium'>
                        Momentum
                    </span>
                </div>
                <div className='flex items-center justify-between mb-1'>
                    <span className='text-2xl font-bold text-[#1E1F24]'>
                        Growing
                    </span>
                    {/* Bar chart icon */}
                    <div className='flex items-end gap-0.5 h-4'>
                        <div className='w-1 h-2 bg-[#2E90FA] rounded-sm'></div>
                        <div className='w-1 h-3 bg-[#2E90FA] rounded-sm'></div>
                        <div className='w-1 h-4 bg-[#175CD3] rounded-sm'></div>
                        <div className='w-1 h-3 bg-[#2E90FA] rounded-sm'></div>
                    </div>
                </div>
                <div className='flex items-center gap-4 text-[10px] text-[#8B8D98]'>
                    {/* Empty placeholder to match height */}
                    <span>&nbsp;</span>
                </div>
            </Card>
        </div>
    );
};

export default PulseStatsWidget;
