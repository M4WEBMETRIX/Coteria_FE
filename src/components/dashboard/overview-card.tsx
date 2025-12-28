import { FingerPrintCheckIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { CaretDown } from '@phosphor-icons/react'
import EngagementActivityChart from './engagement-activity-chart'

const OverviewCard = () => {
  return (
    <div className='bg-[#1E1F24]/2 rounded-[28px] h-99.5'>
      <header className='p-4'>
        <div className='flex items-center justify-between '>
          <div className='flex items-center gap-3'>
            <div className='p-2.5'>
              <HugeiconsIcon
                icon={FingerPrintCheckIcon}
                size={28}
                color='currentColor'
                strokeWidth={1}
              />
            </div>
            <p className='text-[#1E1F24] text-[32px] font-medium leading-10 tracking-[-3%]'>
              Overview
            </p>
          </div>
          <div>
            <Select>
              <SelectTrigger className='w-max border-0 shadow-none cursor-pointer flex items-center justify-between'>
                <SelectValue className='' placeholder='August 2025' />
                <CaretDown />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='apple' className='cursor-pointer'>
                  September 2025
                </SelectItem>
                <SelectItem value='banana' className='cursor-pointer'>
                  October 2025
                </SelectItem>
                <SelectItem value='blueberry' className='cursor-pointer'>
                  November 2025
                </SelectItem>
                <SelectItem value='grapes' className='cursor-pointer'>
                  December 2025
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className='text-[#1E1F24]/50 text-sm font-medium leading-5 tracking-[-1%] mt-2'>
          A real-time view of participation, momentum, and reach
        </p>
      </header>
      <section className='px-6 mt-1 flex'>
        <div className='space-y-4'>
          {[
            {
              id: 1,
              value: '1,284',
              text: 'participants',
            },
            {
              id: 1,
              value: '$103,000',
              text: 'raised this month',
            },
          ].map((content) => (
            <div className='w-55 h-[123.5px] flex items-end'>
              <div>
                <p className='text-[#1E1F24] text-[48px] font-medium leading-15 tracking-[-3%]'>
                  {content?.value}
                </p>
                <p className='text-[#1E1F24]/50 text-sm font-medium leading-5 tracking-[-1%]'>
                  {content?.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <EngagementActivityChart />
      </section>
    </div>
  )
}

export default OverviewCard
