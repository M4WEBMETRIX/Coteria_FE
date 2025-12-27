import { Card, CardContent } from '@/components/ui/card';
import { Timer } from 'lucide-react';

interface RetentionOutlookCardProps {
    rate: number;
}

const RetentionOutlookCard = ({ rate }: RetentionOutlookCardProps) => {
    return (
        <div className='border-0 rounded-[16px] p-4  bg-[#1E1F2405]'>
            <div className=''>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl  flex items-center justify-center'>
                        <Timer className='w-7 h-7 text-[#414143]' />
                    </div>
                    <span className='font-semibold text-lg text-[#1E1F24] tracking-[-3%] leading-[28px]'>
                        Retention Outlook
                    </span>
                </div>

                <p className='text-sm text-[#1E1F24] leading-[20px] tracking-[-1%] font-medium'>
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
