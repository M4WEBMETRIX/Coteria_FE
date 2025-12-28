import { Stars } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sparkles } from 'lucide-react';

interface CommunityHealthCardProps {
    score: number;
}

const CommunityHealthCard = ({ score }: CommunityHealthCardProps) => {
    return (
        <div className='border-0 p-4  bg-[#12AA5B] rounded-[16px] text-white overflow-hidden relative  flex flex-col justify-start'>
            <div className='flex flex-col justify-between items-start h-full '>
                <div className='flex items-center gap-2 mb-4'>
                    <HugeiconsIcon icon={Stars} />
                    <span className='font-medium text-lg'>
                        Community Health Score
                    </span>
                </div>

                <div>
                    <span className='text-5xl font-medium tracking-tight'>
                        {score}%
                    </span>
                    <p className='text-base text-[#FCFCFD] font-medium opacity-90 mt-1'>
                        Engagement Score (Company-wide)
                    </p>
                    <p className='text-sm mt-2 text-[#FCFCFD] opacity-65 leading-relaxed max-w-xs'>
                        This score reflects how active, resilient, and engaged
                        your community is over time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommunityHealthCard;
