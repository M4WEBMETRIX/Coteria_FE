import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface MembersWidgetProps {
    newMembersPercentage: number;
    returningMembersPercentage: number;
}

const MembersWidget = ({
    newMembersPercentage,
    returningMembersPercentage,
}: MembersWidgetProps) => {
    return (
        <div className=' '>
            <div className='pb-4'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-[12px] bg-[#EFF0F3] flex items-center justify-center'>
                        <Users className='w-7 h-7 text-[#1E1F24]' />
                    </div>
                    <p className='text-xl font-medium text-[#1E1F24] leading-7 tracking-[-3%]'>
                        Total Community Members
                    </p>
                </div>{' '}
                <div>
                    <p className='text-xs text-[#1E1F24]  leading-7 tracking-[-1%] font-medium'>
                        AI highlights representation trends and their impact on
                        engagement and performance.
                    </p>
                </div>
            </div>
            <div className='space-y-6'>
                {/* Visual Bars with gaps */}
                <div className='flex gap-2 h-3'>
                    <div
                        className='bg-[#12AA5B] rounded h-full'
                        style={{ width: `${newMembersPercentage}%` }}
                    />
                    <div
                        className='bg-[#4ADE80] rounded h-full'
                        style={{ width: `${returningMembersPercentage}%` }}
                    />
                </div>

                {/* Stats */}
                <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <div className='w-1.5 h-4 bg-[#12AA5B] rounded-sm' />
                            <span className='text-lg font-medium text-[#0A0A0C]'>
                                {newMembersPercentage}%
                            </span>
                            <Badge className='bg-[#1E1F24] hover:bg-[#1E1F24] text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1'>
                                +2.3%
                            </Badge>
                        </div>
                        <span className='text-sm text-[#414143]'>
                            New members
                        </span>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <div className='w-1.5 h-4 bg-[#12AA5B] rounded-sm' />
                            <span className='text-lg font-medium text-[#0A0A0C]'>
                                {returningMembersPercentage}%
                            </span>
                            <Badge className='bg-[#1E1F24] hover:bg-[#1E1F24] text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1'>
                                +1.3%
                            </Badge>
                        </div>
                        <span className='text-sm text-[#414143]'>
                            Returning members
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembersWidget;
