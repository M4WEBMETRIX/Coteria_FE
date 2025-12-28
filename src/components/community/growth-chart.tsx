import { LineChart, Line, XAxis, CartesianGrid, YAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    // ChartConfig,
} from '@/components/ui/chart';

const chartData = [
    { month: 'Jan', lastYear: 10, thisMonth: 15 },
    { month: 'Feb', lastYear: 20, thisMonth: 22 },
    { month: 'Mar', lastYear: 30, thisMonth: 35 },
    { month: 'Apr', lastYear: 28, thisMonth: 45 },
    { month: 'May', lastYear: 40, thisMonth: 38 },
    { month: 'Jun', lastYear: 50, thisMonth: 48 },
    { month: 'Jul', lastYear: 60, thisMonth: 65 },
];

const chartConfig = {
    thisMonth: {
        label: 'This Month',
        color: '#12AA5B',
    },
    lastYear: {
        label: 'Last Year',
        color: '#FBBF24',
    },
} satisfies any;

const GrowthChart = () => {
    return (
        <section className='p-4  shadow-none flex flex-row justify-start items-center'>
            <div className='flex flex-col items-start gap-8 mt-4 '>
                <div className='space-y-1'>
                    <h4 className='text-sm font-semibold text-[#0A0A0C]'>
                        This Month
                    </h4>
                    <div className='flex flex-col text-xs text-[#9CA3AF] space-y-0.5'>
                        <span>High-confidence influencers (4)</span>
                        <span>Emerging influencers (9)</span>
                    </div>
                </div>
                <div className='space-y-1'>
                    <h4 className='text-sm font-semibold text-[#0A0A0C]'>
                        Last year
                    </h4>
                    <div className='flex flex-col text-xs text-[#9CA3AF] space-y-0.5'>
                        <span>High-confidence influencers (1)</span>
                        <span>Emerging influencers (3)</span>
                    </div>
                </div>
            </div>
            <div className='p-0 w-full '>
                <ChartContainer
                    config={chartConfig}
                    className='min-h-[250px] w-full'>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                        <CartesianGrid
                            strokeDasharray='3 3'
                            vertical={true}
                            horizontal={true}
                            stroke='#E5E5E5'
                        />
                        <XAxis
                            dataKey='month'
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            // dy={0}
                            tickMargin={8}
                        />
                        <YAxis hide />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                            type='monotone'
                            dataKey='thisMonth'
                            stroke='var(--color-thisMonth)'
                            strokeWidth={2}
                            dot={{
                                r: 4,
                                fill: '#12AA5B',
                                stroke: '#fff',
                                strokeWidth: 2,
                            }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type='monotone'
                            dataKey='lastYear'
                            stroke='var(--color-lastYear)'
                            strokeWidth={2}
                            dot={{
                                r: 4,
                                fill: '#FBBF24',
                                stroke: '#fff',
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        </section>
    );
};

export default GrowthChart;
