import {
  Clapping02Icon,
  SparklesIcon,
  WorkflowCircle03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '../ui/button'

const MonitorAndScore = () => {
  return (
    <div className='space-y-[21.5px] w-full'>
      <div className='w-full bg-[#FCFCFD] p-4 rounded-[28px] max-h-85'>
        <div className='flex items-center gap-4'>
          <div className='h-12 w-12 rounded-[12px] bg-[#EFF0F3] flex items-center justify-center'>
            <HugeiconsIcon
              icon={Clapping02Icon}
              size={28}
              color='#1E1F24'
              strokeWidth={1.5}
            />
          </div>
          <p className='text-[#1E1F24] text-[20px] font-medium leading-7 tracking-[-3%]'>
            Community Health Score
          </p>
        </div>
        <p className='text-[#1E1F24]/75 text-sm font-medium leading-5 tracking-[-1%] mt-2'>
          Community Health Score
        </p>
        <div className='py-[21.25px] mt-4 flex items-center justify-between'>
          <div className=''>
            <span className='text-[#1E1F24] text-[32px] font-medium leading-10 tracking-[-3%]'>
              80%
            </span>
            <span className='text-[#1E1F24]/50 text-sm font-medium leading-5 tracking-[-1%]'>
              Engagement
            </span>
          </div>
          <Button className='text-sm font-medium leading-5 tracking-[-2%] bg-[#47D198] hover:bg-[#47D198]/90 text-[#FCFCFD] h-7 rounded-full'>
            Great!
          </Button>
        </div>
      </div>
      <div className='w-full'>
        <div className='flex items-center gap-4'>
          <div className='h-12 w-12 rounded-[12px] bg-[#FCFCFD] flex items-center justify-center'>
            <HugeiconsIcon
              icon={WorkflowCircle03Icon}
              size={28}
              color='#1E1F24'
              strokeWidth={1.5}
            />
          </div>
          <p className='text-[#1E1F24] text-[20px] font-medium leading-7 tracking-[-3%]'>
            Campaign Load Monitor
          </p>
        </div>

        <div className='pt-4.25 pb-3.5 mt-4 flex items-center justify-between'>
          <div className='space-x-1'>
            <span className='text-[#1E1F24] text-[32px] font-medium leading-10 tracking-[-3%]'>
              5
            </span>
            <span className='text-[#1E1F24]/50 text-sm font-medium leading-5 tracking-[-1%]'>
              campaigns competing for attention this week
            </span>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div>
            <HugeiconsIcon
              icon={SparklesIcon}
              size={28}
              color='#12AA5B'
              strokeWidth={1.5}
            />
          </div>
          <p className='text-[#12AA5B] text-sm font-medium leading-5 tracking-[-1%]'>
            AI detects and flag when you burn out audiences unintentionally.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MonitorAndScore
