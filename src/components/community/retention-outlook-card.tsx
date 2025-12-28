import { Timer02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface RetentionOutlookCardProps {
    rate: number;
}

const RetentionOutlookCard = ({ rate }: RetentionOutlookCardProps) => {
    return (
        <div className='border-0 rounded-[16px] p-4  bg-[#1E1F2405]'>
            <div className=''>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl  flex items-center justify-center'>
                        <HugeiconsIcon icon={Timer02Icon} />
                    </div>
                    <span className='font-medium text-lg text-[#1E1F24] tracking-[-3%] leading-[28px]'>
                        Retention Outlook
                    </span>
                </div>

                <p className='text-sm text-[#1E1F24]/50 leading-[20px] tracking-[-1%] font-normal'>
                    Based on participation frequency and engagement decay
                    patterns.
                </p>

                <div className='mt-5'>
                    <span className='text-5xl font-medium text-[#1E1F24]'>
                        {rate}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RetentionOutlookCard;
