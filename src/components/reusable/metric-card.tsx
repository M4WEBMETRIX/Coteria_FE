import { cn } from '@/lib/utils'
import { Calendar } from '@phosphor-icons/react'
import { type ReactElement } from 'react'

interface MetricProps {
  title?: string
  icon?: ReactElement
  value?: string | number
  percentage?: number
}

const MetricCard = ({ title, icon, value, percentage = 0 }: MetricProps) => {
  return (
    <div className='p-4 border border-[#DFE1E7] rounded-[16px] h-34.25 shadow-[0px_1px_2px_0px_#DFE1E7]'>
      <div className='flex items-center justify-between'>
        <p className='font-medium text-sm leading-[150%] tracking-[2%] text-[#666D80]'>
          {title || 'title'}
        </p>
        <div className='h-9 w-9 rounded-[8px] border border-[#DFE1E7] flex items-center justify-center'>
          {icon || <Calendar />}
        </div>
      </div>
      <div className='space-y-2'>
        <p className='font-semibold text-[24px] leading-[130%] tracking-[0%] text-[#0D0D12]'>
          {value?.toLocaleString() || '1,234'}
        </p>
        <div className='font-medium text-xs leading-[150%] tracking-[2%] flex items-center gap-2'>
          <div
            className={cn(
              'px-1.5 py-0.5 text-xs rounded-[50px]',
              percentage < 0
                ? 'bg-[#FFF0F3] text-[#DF1C41]'
                : 'bg-[#EFFEFA] text-[#40C4AA]'
            )}
          >
            {percentage || '0.00'}%
          </div>
          <p className='text-sm text-[#666D80]'>from last month</p>
        </div>
      </div>
    </div>
  )
}

export default MetricCard
