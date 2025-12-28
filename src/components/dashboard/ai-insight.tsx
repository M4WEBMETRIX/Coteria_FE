import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'
import { X } from '@phosphor-icons/react'
import { ArrowUpDoubleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useQueryState } from 'nuqs'

export default function AIInsight() {
  const [, setTab] = useQueryState('tab')

  const [inputValue, setInputValue] = useState('')

  const suggestions = [
    'Why did engagement spike recently?',
    'What should I do today?',
    'Summarize a campaign',
    'Find influencers',
    'Is our community healthy right now?',
    'What changed this week?',
    'Compare campaign performance for me',
  ]

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  return (
    <Card className='w-full bg-[#FCFCFD] shadow-none border-0 rounded-2xl overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between p-4'>
        <h2 className='text-[24px] leading-8 tracking-[-3%] font-medium text-[#1E1F24]'>
          AI Helper
        </h2>
        <Button
          onClick={() => setTab('metrics')}
          variant='ghost'
          size='icon'
          className='h-8 w-8 rounded-full hover:bg-slate-100'
        >
          <X size={20} className='h-5 w-5 text-[#1E1F24]' />
        </Button>
      </div>

      {/* Content */}
      <div className='mt-20 space-y-6 max-w-106 h-167 overflow-auto mx-auto'>
        {/* Welcome Section */}
        <div className='flex flex-col items-center text-center space-y-3'>
          <div className='h-19 w-19 rounded-full bg-[#003D29] border border-[#12AA5B] flex items-center justify-center'>
            <Sparkles className='h-6 w-6 text-white' />
          </div>
          <div>
            <h3 className='text-lg leading-[150%] tracking-[-2%] text-[#1E1F24] font-medium'>
              Welcome, Janet! 👋
            </h3>
            <p className='text-sm font-medium text-[#8B8D98] leading-5 tracking-[-1%] mt-1'>
              I'm here to help you with answers, ideas, or anything you need.
            </p>
            <p className='text-sm font-medium text-[#8B8D98] leading-5 tracking-[-1%]'>
              Just start typing below!
            </p>
          </div>
        </div>

        {/* Suggestions Label */}

        <div className='flex items-center w-full gap-3'>
          <div className='flex-1 h-px bg-[#1E1F24]/10' />
          <div className='text-center'>
            <span className='text-sm font-medium text-[#8B8D98] leading-5 tracking-[-1%]'>
              Suggestion...
            </span>
          </div>
          <div className='flex-1 h-px bg-[#1E1F24]/10' />
        </div>

        {/* Suggestion Buttons */}
        <div className='space-y-2'>
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant='ghost'
              className='w-full justify-center text-sm font-medium text-[#1E1F24] leading-5 tracking-[-1%] bg-[#EFF0F3] hover:bg-[#EFF0F3]/90 h-auto py-2 rounded-full'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className='px-4 pb-4'>
        <div className='relative'>
          <Input
            type='text'
            placeholder='Ask anything to senseAI...'
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            className='w-full pl-10 h-14 pr-12 py-3 text-sm font-medium text-[#8B8D98] leading-5 tracking-[-1%] placeholder:text-sm placeholder:font-medium placeholder:text-[#8B8D98] placeholder:leading-5 placeholder:tracking-[-1%] rounded-full bg-[#EFF0F3] border-0 focus:border-0 focus:ring-0'
          />
          <Sparkles className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
          <Button
            size='icon'
            className='absolute right-1.5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-sm'
          >
            <HugeiconsIcon
              icon={ArrowUpDoubleIcon}
              size={28}
              color='#FCFCFD'
              strokeWidth={2.5}
            />
          </Button>
        </div>
      </div>
    </Card>
  )
}
