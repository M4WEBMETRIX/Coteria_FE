import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
    { name: 'High-confidence', value: 2, color: '#2E90FA' }, // Blue
    { name: 'Emerging', value: 4, color: '#9747FF' }, // Purple
    { name: 'Broadcast', value: 14, color: '#F04438' }, // Red (using red for bottom segment based on image, looks like reddish orange?)
    // Actually screenshot: Blue (High conf), Purple (Emerging?), Red/Orange (Broadcast?)
    // Let's approximate colors:
    // High-confidence: Blue #2E90FA
    // Emerging: Purple? The screenshot shows a big red chunk, purple chunk, blue chunk.
    // The legend says: High-confidence (Blue), Emerging (Greenish?), Broadcast (Red).
    // Wait, let's look at legend dots:
    // High-confidence: Blue
    // Emerging: Greenish/Teal?
    // Broadcast: Red
    // But the chart itself has: Blue, Purple, Orange/Red.
    // I'll stick to a nice palette: Blue, Purple, Orange.
];

const DriverAnalysisWidget = () => {
    return (
        <Card className='border-[#E0E1E6] shadow-sm bg-white rounded-xl h-full'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-base font-semibold text-[#1E1F24]'>
                    Driver Analysis
                </CardTitle>
                <ChevronDown className='h-4 w-4 text-[#8B8D98]' />
            </CardHeader>
            <CardContent>
                <div className='bg-[#F9FAFB] p-3 rounded-lg border border-[#E0E1E6] mb-4'>
                    <div className='flex items-start gap-2'>
                        <div className='w-2 h-2 mt-1.5 rounded-full bg-[#12AA5B]'></div>
                        <div>
                            <p className='text-xs text-[#5E606A] leading-4'>
                                Community leader shared <br /> outside of
                                network
                            </p>
                        </div>
                    </div>
                    <div className='h-[1px] bg-[#E0E1E6] my-2' />
                    <div className='flex items-start gap-2'>
                        <div className='w-2 h-2 mt-1.5 rounded-full bg-[#12AA5B]'></div>
                        <div>
                            <p className='text-xs text-[#5E606A] leading-4'>
                                Personal campaign <br /> update sent at 2:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm font-semibold text-[#1E1F24]'>
                        Amplifiers
                    </span>
                    <span className='text-xs text-[#8B8D98] flex items-center gap-1'>
                        2 detected <ChevronDown className='w-3 h-3' />
                    </span>
                </div>
                <p className='text-[10px] text-[#8B8D98] mb-4'>
                    High-confidence amplifiers consistently drive participation.
                </p>

                <div className='relative h-[160px] w-full flex justify-center mb-4'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                            <Pie
                                data={data}
                                cx='50%'
                                cy='50%'
                                innerRadius={45}
                                outerRadius={65}
                                paddingAngle={0}
                                dataKey='value'
                                startAngle={180}
                                endAngle={0}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className='absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                        <span className='text-xs font-semibold text-[#1E1F24]'>
                            Overview
                        </span>
                    </div>
                </div>

                <div className='space-y-2'>
                    <div className='flex items-center justify-between text-xs'>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 rounded-full bg-[#2E90FA]'></div>
                            <span className='text-[#5E606A]'>
                                High-confidence
                            </span>
                        </div>
                        <span className='font-medium text-[#1E1F24]'>2</span>
                        <div className='w-6 h-3 bg-[#E0F2FE] rounded-full relative'>
                            <div className='absolute right-0.5 top-0.5 w-2 h-2 bg-[#2E90FA] rounded-full'></div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between text-xs'>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 rounded-full bg-[#9747FF]'></div>
                            <span className='text-[#5E606A]'>Emerging</span>
                        </div>
                        <span className='font-medium text-[#1E1F24]'>4</span>
                        <div className='w-6 h-3 bg-[#F4EBFF] rounded-full relative'>
                            <div className='absolute left-0.5 top-0.5 w-2 h-2 bg-[#9747FF] rounded-full'></div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between text-xs'>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 rounded-full bg-[#F04438]'></div>
                            <span className='text-[#5E606A]'>Broadcast</span>
                        </div>
                        <span className='font-medium text-[#1E1F24]'>14</span>
                        <div className='w-6 h-3 bg-[#FEF3F2] rounded-full relative'>
                            <div className='absolute left-0.5 top-0.5 w-2 h-2 bg-[#F04438] rounded-full'></div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DriverAnalysisWidget;
