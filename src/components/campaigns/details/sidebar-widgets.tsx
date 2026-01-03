import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export const WhatsHappeningWidget = () => {
    return (
        <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl'>
            <CardHeader className='py-3 px-4 border-b border-[#E0E1E6]'>
                <CardTitle className='text-sm font-semibold text-[#1E1F24]'>
                    What's Happening
                </CardTitle>
            </CardHeader>
            <CardContent className='p-4 space-y-4'>
                <div className='flex gap-2 items-start'>
                    <div className='w-1.5 h-1.5 rounded-full bg-[#12AA5B] mt-1.5 flex-shrink-0'></div>
                    <p className='text-xs text-[#5E606A] leading-5'>
                        Momentum is growing steadily from two community leaders,
                        sharing insights, care tips, networks...
                    </p>
                </div>
                <div className='flex gap-2 items-start'>
                    <div className='w-1.5 h-1.5 rounded-full bg-[#12AA5B] mt-1.5 flex-shrink-0'></div>
                    <p className='text-xs text-[#5E606A] leading-5'>
                        Influencer led shares - convert to participants at a $6
                        higher rate than direct shares.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export const RequestParticipantsWidget = () => {
    return (
        <Card className='border-[#E0E1E6] shadow-sm bg-[#F2FDE6] rounded-xl border border-[#12AA5B]/20'>
            <CardHeader className='flex flex-row items-center justify-between py-3 px-4 border-b border-[#12AA5B]/10'>
                <CardTitle className='text-sm font-semibold text-[#1E1F24]'>
                    Request from Participants
                </CardTitle>
                <ChevronRight className='h-4 w-4 text-[#1E1F24]' />
            </CardHeader>
            <CardContent className='p-4'>
                <p className='text-[10px] text-[#5E606A] mb-3 leading-4'>
                    100+ participants in "Housing Support Drive" request for a
                    new campaign
                </p>
                <Button className='w-full bg-[#12AA5B] hover:bg-[#12AA5B]/90 text-white font-medium text-xs h-8'>
                    Share our campaign
                </Button>
            </CardContent>
        </Card>
    );
};
