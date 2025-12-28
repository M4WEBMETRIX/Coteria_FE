import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle03FreeIcons } from '@hugeicons/core-free-icons';

const RecommendationsPanel = () => {
    return (
        <div className='border-0 shadow-none  w-full '>
            <div className=' p-6'>
                <div className='flex items-center gap-4'>
                    <div className='w-6 h-6 rounded-full  flex items-center justify-center'>
                        <span className='text-xs'>
                            {' '}
                            <HugeiconsIcon icon={CheckmarkCircle03FreeIcons} />
                        </span>
                    </div>
                    <p className='text-xl font-medium leading-7 tracking-[-3%] text-[#1E1F24] '>
                        Recommendations Panel
                    </p>
                </div>
                <p className='text-sm font-medium tracking-[-1%] leading-5  text-[#1E1F24]/75 mt-2 '>
                    Find the best actions to improve workforce performance with
                    AI-driven analysis.
                </p>
            </div>

            <div className='flex items-start gap-3 p-6 bg-white  w-full rounded-full shadow'>
                <Checkbox id='rec1' className='mt-1 border-[#E5E5E5]' />
                <div className='flex-1 space-y-1 '>
                    <div className='flex items-center justify-between gap-2'>
                        <label
                            htmlFor='rec1'
                            className='text-sm font-medium text-[#0A0A0C] cursor-pointer'>
                            Activate Influencers
                        </label>
                    </div>
                    <div className='flex items-center gap-1.5 text-xs text-[#414143]'>
                        <Sparkles className='w-3 h-3 text-[#414143]' />
                        <span>Activate 2–3 influencers to extend reach</span>
                    </div>
                </div>{' '}
                <Badge className='bg-[#FF8A8A] hover:bg-[#FF8A8A] text-white border-0 text-sm px-3 py-[2px] flex items-center'>
                    Recommended Action
                </Badge>
            </div>
        </div>
    );
};

export default RecommendationsPanel;
