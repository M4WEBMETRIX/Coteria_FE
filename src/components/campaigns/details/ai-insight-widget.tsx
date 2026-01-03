import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SparklesIcon } from 'lucide-react';
// Using lucide-react Sparkles because HugeIcons usage might be tricky with finding exact icon names without checking.

const AiInsightWidget = () => {
    return (
        <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl overflow-hidden'>
            <CardContent className='p-4'>
                <div className='flex items-center gap-2 mb-3'>
                    <SparklesIcon className='w-4 h-4 text-[#12AA5B] fill-[#12AA5B]' />
                    <h3 className='text-sm font-semibold text-[#1E1F24]'>
                        Coterie AI Insight
                    </h3>
                </div>

                <div className='flex gap-3 mb-4'>
                    <div className='w-10 h-10 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center text-xl'>
                        🤖
                        {/* Placeholder for AI Robot Icon */}
                    </div>
                    <div className='bg-[#F2F4F7] p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-xs text-[#1E1F24] leading-5'>
                        Based on current activity, here are the most effective
                        actions to take today:
                    </div>
                </div>

                <Button className='w-full bg-[#12AA5B] hover:bg-[#12AA5B]/90 text-white font-medium text-xs h-9'>
                    Get More Insight
                    <SparklesIcon className='w-3 h-3 ml-2' />
                </Button>
            </CardContent>
        </Card>
    );
};

export default AiInsightWidget;
