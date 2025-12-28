import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    ArrowRight01Icon,
    ArrowRight02Icon,
    Vynil01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const weekDays = [
    { day: 'Mon', date: '17', active: false },
    { day: 'Tue', date: '18', active: false },
    { day: 'Wed', date: '19', active: false },
    { day: 'Thu', date: '20', active: false },
    { day: 'Fri', date: '21', active: true },
    { day: 'Sat', date: '22', active: false, dots: 2 },
    { day: 'Sun', date: '23', active: false, dots: 4 },
];

const activities = [
    {
        id: 1,
        user: 'Sarah',
        action: 'Invited',
        target: '3 new supporters',
        time: 'Now - 12:30 PM',
        hasBadge: true,
        avatars: [
            'https://github.com/shadcn.png',
            'https://github.com/shadcn.png',
        ],
        highlight: true,
    },
    {
        id: 2,
        user: '5 supporters',
        action: 'completed a vote',
        time: '02:00 PM - 03:30 PM',
        highlight: false,
    },
    {
        id: 3,
        user: 'Campaign X',
        action: 'crossed 100 participants',
        time: '03:45 PM - 05:00 PM',
        highlight: false,
    },
];

const ActivityCalendarWidget = () => {
    return (
        <div className='h-full'>
            <div className='p-2'>
                <h3 className='text-2xl font-semibold mb-8 text-[#0A0A0C]'>
                    August 2025
                </h3>

                {/* Calendar Strip */}
                <div className='flex justify-between items-start mb-10'>
                    {weekDays.map((day) => (
                        <div
                            key={day.date}
                            className='flex flex-col items-center gap-3'>
                            <span className='text-sm text-[#8B8D98] font-medium'>
                                {day.day}
                            </span>
                            <div
                                className={`
                                w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all
                                ${
                                    day.active
                                        ? 'bg-[#12AA5B] text-white shadow-lg shadow-[#12AA5B]/20 scale-110'
                                        : 'text-[#8B8D98] hover:bg-white hover:text-[#0A0A0C]'
                                }
                            `}>
                                {day.date}
                            </div>
                            {day.dots && (
                                <div className='flex gap-1'>
                                    {Array.from({ length: day.dots }).map(
                                        (_, i) => (
                                            <div
                                                key={i}
                                                className='w-1 h-1 rounded-full bg-[#12AA5B]'
                                            />
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Activity List */}
                <div className='space-y-4 rounded-2xl bg-[#EFF0F3] '>
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className={`px-4 py-5 border-[#CDCED7] border-b last:border-b-0 rounded-none`}>
                            <div className='flex justify-between items-start '>
                                <div className='flex items-center gap-1 flex-wrap'>
                                    <span
                                        className={`font-semibold ${
                                            activity.highlight
                                                ? 'text-[#12AA5B]'
                                                : 'text-[#717171]'
                                        }`}>
                                        {activity.user}
                                    </span>
                                    <span
                                        className={`font-medium ${
                                            activity.highlight
                                                ? 'text-[#717171]'
                                                : 'text-[#12AA5B]'
                                        }`}>
                                        {activity.action}
                                    </span>
                                    {activity.target && (
                                        <span className='font-semibold text-[#12AA5B]'>
                                            {activity.target}
                                        </span>
                                    )}
                                    {activity.hasBadge && (
                                        <Badge className='bg-[#FF897E] text-white  border-0 ml-2 rounded-full px-2.5'>
                                            <HugeiconsIcon
                                                icon={Vynil01Icon}
                                                size={24}
                                                color='#ffffff'
                                                strokeWidth={1.5}
                                            />{' '}
                                            Badge Earned
                                        </Badge>
                                    )}
                                </div>
                                {activity.avatars && (
                                    <div className='flex -space-x-2'>
                                        {activity.avatars.map((src, i) => (
                                            <Avatar
                                                key={i}
                                                className='w-8 h-8 border-2 border-white'>
                                                <AvatarImage src={src} />
                                                <AvatarFallback>
                                                    U
                                                </AvatarFallback>
                                            </Avatar>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className='text-sm text-[#8B8D98]'>
                                {activity.time}
                            </p>
                        </div>
                    ))}
                </div>

                <div className='mt-6 flex justify-end'>
                    <button className='flex items-center gap-2 text-sm font-semibold text-[#1E1F24] hover:text-[#12AA5B] transition-colors group'>
                        View all activity
                        <HugeiconsIcon
                            icon={ArrowRight02Icon}
                            size={16}
                            className='group-hover:translate-x-1 transition-transform'
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivityCalendarWidget;
