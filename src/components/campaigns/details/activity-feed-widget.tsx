import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight } from 'lucide-react';

const activities = [
    {
        id: 1,
        user: 'Sarah M',
        action: 'shared campaign',
        icon: 'https://github.com/shadcn.png',
    },
    {
        id: 2,
        user: 'Michelle R',
        action: 'joined campaign',
        icon: 'https://github.com/shadcn.png',
    },
    {
        id: 3,
        user: 'Rebecca A',
        action: 'sent an application invite',
        icon: 'https://github.com/shadcn.png',
    },
];

const ActivityFeedWidget = () => {
    return (
        <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl'>
            <CardHeader className='flex flex-row items-center justify-between py-3 px-4 border-b border-[#E0E1E6]'>
                <CardTitle className='text-sm font-semibold text-[#1E1F24]'>
                    Activity Feed
                </CardTitle>
                <ChevronRight className='h-4 w-4 text-[#8B8D98]' />
            </CardHeader>
            <CardContent className='p-0'>
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className='flex items-center gap-3 p-3 border-b border-[#E0E1E6] last:border-0 hover:bg-gray-50 transition-colors'>
                        <Avatar className='w-8 h-8'>
                            <AvatarImage src={activity.icon} />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <p className='text-xs text-[#1E1F24]'>
                            <span className='font-semibold'>
                                {activity.user}
                            </span>{' '}
                            <span className='text-[#8B8D98]'>
                                {activity.action}
                            </span>
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default ActivityFeedWidget;
