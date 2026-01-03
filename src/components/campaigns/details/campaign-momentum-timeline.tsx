import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: '2.April', uv: 1000, pv: 2400, amt: 2400 },
    { name: '4.April', uv: 3000, pv: 1398, amt: 2210 },
    { name: '5.April', uv: 2000, pv: 9800, amt: 2290 },
    { name: '4.April', uv: 2780, pv: 3908, amt: 2000 },
    { name: '4.April', uv: 1890, pv: 4800, amt: 2181 },
    { name: '4.April', uv: 2390, pv: 3800, amt: 2500 },
    { name: '2.April', uv: 3490, pv: 4300, amt: 2100 },
    { name: '4.April', uv: 3000, pv: 1398, amt: 2210 },
    { name: '4.April', uv: 2000, pv: 9800, amt: 2290 },
    { name: '4.April', uv: 2780, pv: 3908, amt: 2000 },
];

const CampaignMomentumTimeline = () => {
    return (
        <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl mt-6'>
            <CardContent className='p-4'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-sm font-semibold text-[#1E1F24]'>
                        Campaign Momentum Timeline
                    </h3>
                    <div className='bg-[#FCFCFD] border border-[#E0E1E6] px-2 py-1 rounded text-xs text-[#5E606A]'>
                        Last 7 days
                    </div>
                </div>

                {/* Legend */}
                <div className='flex items-center gap-6 mb-4 text-xs'>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-1 bg-[#12AA5B] rounded-full'></div>
                        <span className='text-[#8B8D98]'>Awareness</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-1 bg-[#88D9A8] rounded-full'></div>
                        <span className='text-[#8B8D98]'>Interest</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-1 bg-[#FDB022] rounded-full'></div>
                        <span className='text-[#8B8D98]'>Participants</span>
                    </div>
                    <div className='flex items-center gap-2 ml-auto'>
                        <div className='w-8 h-1 bg-[#2E90FA] rounded-full'></div>
                        <span className='text-[#8B8D98]'>Influencer</span>
                        <span className='text-[#1E1F24] font-semibold'>
                            323
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='text-[#8B8D98]'>Participation</span>
                        <div className='w-6 h-4 bg-[#F2F4F7] rounded flex items-center justify-center text-[10px]'>
                            2
                        </div>
                    </div>
                </div>

                <div className='h-[100px] w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <AreaChart
                            data={data}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient
                                    id='colorUv'
                                    x1='0'
                                    y1='0'
                                    x2='0'
                                    y2='1'>
                                    <stop
                                        offset='5%'
                                        stopColor='#12AA5B'
                                        stopOpacity={0.1}
                                    />
                                    <stop
                                        offset='95%'
                                        stopColor='#12AA5B'
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                cursor={{
                                    stroke: '#12AA5B',
                                    strokeWidth: 1,
                                    strokeDasharray: '4 4',
                                }}
                            />
                            <Area
                                type='monotone'
                                dataKey='uv'
                                stroke='#12AA5B'
                                strokeWidth={2}
                                fillOpacity={1}
                                fill='url(#colorUv)'
                            />
                            <Area
                                type='monotone'
                                dataKey='pv'
                                stroke='#2E90FA'
                                strokeWidth={2}
                                fillOpacity={0}
                                fill='transparent'
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                {/* Custom X Axis Labels below */}
                <div className='flex justify-between text-[10px] text-[#8B8D98] mt-2 px-2'>
                    <span>2.April</span>
                    <span>4.April</span>
                    <span>4.April</span>
                    <span>4.April</span>
                    <span>4.April6</span>
                    {/* <span>10:30am</span> // Placeholder time */}
                    {/* <span>.2April3</span> */}
                </div>
            </CardContent>
        </Card>
    );
};

export default CampaignMomentumTimeline;
