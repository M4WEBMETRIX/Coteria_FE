import { HugeiconsIcon } from '@hugeicons/react';
import { Sparkle, SparklesIcon, Stars } from '@hugeicons/core-free-icons';

const InsightBanner = () => {
    return (
        <div className='border-0 bg-[#12AA5B] text-white overflow-hidden relative mt-5  px-4 py-[13.5px] rounded-[24px]'>
            <div className=' flex gap-3 relative z-10'>
                <div className='mt-1'>
                    <HugeiconsIcon icon={SparklesIcon} />
                </div>
                <div className='space-y-1'>
                    <p className='text-sm font-normal leading-[20px] tracking-[-1%] '>
                        Community growth is being driven primarily by influencer
                        sharing rather than direct campaign traffic.
                        Influencer-led joins convert 2× higher than average.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InsightBanner;
