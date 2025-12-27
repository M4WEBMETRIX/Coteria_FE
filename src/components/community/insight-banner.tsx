import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const InsightBanner = () => {
    return (
        <div className='border-0 bg-[#12AA5B] text-white overflow-hidden relative mt-5  px-4 py-[13.5px] rounded-[24px]'>
            <div className=' flex gap-3 relative z-10'>
                <div className='mt-1'>
                    <Sparkles className='w-7 h-7 text-white' />
                </div>
                <div className='space-y-1'>
                    <p className='text-sm font-medium leading-[20px] tracking-[-1%] '>
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
