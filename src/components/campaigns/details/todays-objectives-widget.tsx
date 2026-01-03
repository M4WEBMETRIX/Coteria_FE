import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Share01Icon,
    UserAdd01Icon,
    Mail01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const data = [
    { name: '2 days', value: 2000, active: false },
    { name: '0.of', value: 3000, active: false },
    { name: 'April 4', value: 4500, active: true },
    { name: 'Oct', value: 2780, active: false },
    { name: 'April 4', value: 1890, active: false },
    { name: 'Apr 6', value: 2390, active: false },
    { name: 'April 6', value: 3490, active: false },
    { name: 'April 14', value: 2000, active: false },
];

const TodaysObjectivesWidget = () => {
    return (
        <div className='space-y-4 h-full  flex flex-col'>
            <div className='flex justify-between items-center'>
                <h3 className='text-base font-semibold text-[#1E1F24]'>
                    Today's Objectives
                </h3>
                <div className='flex gap-2'>
                    <div className='flex items-center gap-1 bg-white border border-[#E0E1E6] rounded-md px-2 py-1'>
                        {/* Icons for time/filter */}
                        <div className='w-4 h-4 rounded-full border border-gray-300'></div>
                        <div className='w-4 h-4 rounded-full border border-gray-300'></div>
                        <div className='w-4 h-4 rounded-full border border-gray-300'></div>
                    </div>
                </div>
            </div>

            <div className='flex gap-2'>
                <Button
                    variant='outline'
                    className='h-8 gap-2 bg-white border-[#E0E1E6] text-[#5E606A] text-xs'>
                    <HugeiconsIcon icon={Share01Icon} size={14} />
                    Share
                </Button>
                <Button
                    variant='outline'
                    className='h-8 gap-2 bg-white border-[#E0E1E6] text-[#5E606A] text-xs'>
                    <HugeiconsIcon icon={UserAdd01Icon} size={14} />
                    Invite
                </Button>
                <div className='flex items-center ml-auto gap-2'>
                    <Button
                        variant='outline'
                        className='h-8 gap-2 bg-white border-[#E0E1E6] text-[#5E606A] text-xs'>
                        <HugeiconsIcon icon={Mail01Icon} size={14} />
                        Send Update
                    </Button>
                    <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8 bg-white border-[#E0E1E6]'>
                        <span className='text-xs'>v</span>
                    </Button>
                </div>
            </div>

            <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl flex-1 min-h-[250px] relative'>
                <CardContent className='p-4 h-full'>
                    <div className='absolute top-4 left-4 z-10'>
                        <span className='text-xs text-[#8B8D98]'>
                            [od 8.2pr]
                        </span>
                    </div>

                    {/* Floating Stats Card inside Chart */}
                    <div className='absolute top-10 right-20 z-10 bg-white p-3 rounded-xl shadow-lg border border-[#E0E1E6] w-[200px]'>
                        <div className='flex justify-between items-start mb-2'>
                            <div>
                                <h4 className='text-xl font-bold text-[#1E1F24] gap-1 flex items-center'>
                                    +42{' '}
                                    <span className='text-xs font-normal text-[#5E606A] ml-1'>
                                        new participants
                                    </span>
                                </h4>
                            </div>
                            <div className='w-2 h-2 rounded-full bg-[#12AA5B]'></div>
                        </div>
                        <div className='h-[1px] bg-[#E0E1E6] my-2' />
                        <div className='flex items-center gap-2 mb-1'>
                            <div className='w-1.5 h-1.5 bg-[#FDB022] rounded-full'></div>
                            <span className='text-xs text-[#5E606A]'>
                                80% driven
                            </span>
                        </div>
                        <p className='text-[10px] text-[#8B8D98] pl-3.5'>
                            by high-confidence amplifiers
                        </p>
                    </div>

                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={data}>
                            <CartesianGrid
                                strokeDasharray='3 3'
                                vertical={false}
                                stroke='#E0E1E6'
                            />
                            <XAxis
                                dataKey='name'
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#8B8D98' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#8B8D98' }}
                            />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Bar
                                dataKey='value'
                                radius={[4, 4, 0, 0]}
                                barSize={30}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.active ? '#12AA5B' : '#88D9A8'
                                        }
                                    /> // Active green vs lighter green
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default TodaysObjectivesWidget;
