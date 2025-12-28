import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useQueryState } from 'nuqs'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  //   Cell,
} from 'recharts'

export default function EngagementActivityChart() {
  const [, setTab] = useQueryState('tab')
  const data = [
    { day: 'Mon', bar1: 30, bar2: 45, bar3: 25 },
    { day: 'Tue', bar1: 20, bar2: 35, bar3: 40 },
    { day: 'Wed', bar1: 15, bar2: 25, bar3: 30 },
    { day: 'Thu', bar1: 85, bar2: 90, bar3: 95 },
    { day: 'Fri', bar1: 75, bar2: 80, bar3: 70 },
    { day: 'Sat', bar1: 35, bar2: 40, bar3: 30 },
    { day: 'Sun', bar1: 25, bar2: 30, bar3: 35 },
  ]

  return (
    <div className='w-full h-full mx-auto p-6 rounded-lg relative'>
      <div className='absolute z-30 w-full'>
        <div className='flex items-center gap-2.5'>
          <Button className='flex items-center gap-2.5 py-2 px-3 rounded-full text-sm leading-5 tracking-[-1%] text-[#1E1F24] bg-[#EFF0F3] hover:bg-[#EFF0F3]/90'>
            <HugeiconsIcon
              icon={ArrowLeftIcon}
              size={20}
              color='#1E1F24'
              strokeWidth={2.5}
            />
            1st-7th
          </Button>

          <Button className='flex items-center gap-2.5 py-2 px-3 rounded-full text-sm leading-5 tracking-[-1%] text-[#1E1F24] bg-[#EFF0F3] hover:bg-[#EFF0F3]/90'>
            <HugeiconsIcon
              icon={ArrowRightIcon}
              size={20}
              color='#1E1F24'
              strokeWidth={2.5}
            />
            21st-28th
          </Button>
        </div>
        <p className='uppercase text-sm leading-5 tracking-[-1%] font-medium text-[#1E1F24]/50 mt-4'>
          Engagement Activity
        </p>
        <p className='flex-1 h-px bg-[#1E1F24]/5 w-[86%] mt-2' />
      </div>

      <Button
        onClick={() => setTab('ai_insight')}
        className='absolute z-30 right-0 top-21.5 bg-[radial-gradient(circle_at_top,#EA4335,#A82C00)] cursor-pointer
          hover:scale-[1.02] transition rounded-full w-max py-1! px-2 text-[#FCFCFD] text-xs font-semibold leading-4 tracking-[-1%]'
      >
        Get AI Insight
      </Button>
      <div className='h-62'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            margin={{ right: 30, left: 20, bottom: 0 }}
            // barGap={2}
            barCategoryGap='0%'
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#f0f0f0'
              strokeOpacity={0}
              vertical={false}
            />
            <XAxis
              dataKey='day'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 14 }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Bar
              dataKey='bar1'
              fill='#10b981'
              radius={[20, 20, 20, 20]}
              maxBarSize={20}
            />
            <Bar
              dataKey='bar2'
              fill='#10b981'
              radius={[20, 20, 20, 20]}
              maxBarSize={20}
            />
            <Bar
              dataKey='bar3'
              fill='#10b981'
              radius={[20, 20, 20, 20]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
