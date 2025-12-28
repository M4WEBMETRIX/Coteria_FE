import { SparklesIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '../ui/button'
import ROBOTIMAGE from '@/assets/images/robot.jpg'
import { useQueryState } from 'nuqs'

const InsightsCard = () => {
  const [, setTab] = useQueryState('tab')

  return (
    <div className='bg-[#FCFCFD] p-4 w-full rounded-[40px] max-h-85'>
      <header className='h-16 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div>
            <HugeiconsIcon
              icon={SparklesIcon}
              size={28}
              color='#12AA5B'
              strokeWidth={1.5}
            />
          </div>
          <p className='text-[#1E1F24] text-xl font-medium leading-7 tracking-[-3%]'>
            AI Insight
          </p>
        </div>
        <p className='text-[#1E1F24] text-sm font-semibold leading-5 tracking-[-2%]'>
          Re-Generate
        </p>
      </header>

      <div className='h-60 overflow-auto space-y-3 no-scrollbar'>
        {[
          {
            image: ROBOTIMAGE,
            text: 'Engagement increased over the past 48 hours due to a combination of two factors.',
          },
          {
            image: ROBOTIMAGE,
            text: 'Engagement increased over the past 48 hours due to a combination of two factors.',
          },
          {
            image: ROBOTIMAGE,
            text: 'Engagement increased over the past 48 hours due to a combination of two factors.',
          },
          {
            image: ROBOTIMAGE,
            text: 'Engagement increased over the past 48 hours due to a combination of two factors.',
          },
          {
            image: ROBOTIMAGE,
            text: 'Engagement increased over the past 48 hours due to a combination of two factors.',
          },
        ].map((content, index) => (
          <div key={index} className='flex items-start gap-3'>
            <img
              src={content?.image}
              alt=''
              className='h-10.25 w-8 object-center object-cover'
            />

            <p className='p-3 rounded-[16px] bg-[#EFF0F3] text-[#1E1F24] text-sm font-semibold leading-5 tracking-[-1%]'>
              {content?.text}
            </p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => setTab('ai_insight')}
        className='bg-[radial-gradient(circle_at_top,#EA4335,#A82C00)] cursor-pointer flex items-center gap-3
    hover:scale-[1.02] transition h-12 rounded-full mt-2 w-full text-[#FCFCFD] text-base font-semibold leading-6 tracking-[-2%]'
      >
        Get More Insight
        <div>
          <HugeiconsIcon
            icon={SparklesIcon}
            size={28}
            color='#FCFCFD'
            strokeWidth={2.5}
          />
        </div>
      </Button>
    </div>
  )
}

export default InsightsCard
