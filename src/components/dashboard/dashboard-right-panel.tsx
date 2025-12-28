'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { HugeiconsIcon } from '@hugeicons/react'
import { GpsSignal01Icon } from '@hugeicons/core-free-icons'

export default function ActivityCalendarPanel() {
  return (
    <div className='w-full space-y-4'>
      {/* Calendar Header */}
      <Card className='rounded-2xl border-0 shadow-none p-0'>
        <CardHeader className='pb-3 px-4 pt-4'>
          <h2 className='text-[32px] text-[#1E1F24] leading-10 tracking-[-3%] font-medium'>
            August 2025
          </h2>
        </CardHeader>

        <CardContent className='space-y-2 p-0'>
          {/* Days Row */}
          <div className='grid grid-cols-7 text-sm leading-5 tracking-[-1%] font-medium text-[#1E1F24]/25'>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className='text-center'>
                {d}
              </div>
            ))}
          </div>

          <div className='grid grid-cols-7 gap-y-2 text-xl leading-7 tracking-[-3%] font-medium'>
            {[17, 18, 19, 20, 21, 22, 23].map((day) => (
              <div key={day} className='flex flex-col items-center gap-1'>
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full',
                    day === 21
                      ? 'bg-[#12AA5B] text-[#FCFCFD] font-medium'
                      : 'text-[#1E1F24]/25'
                  )}
                >
                  {day}
                </div>

                {/* activity dots */}
                {day >= 22 && (
                  <div className='flex gap-1'>
                    {[...Array(day === 23 ? 3 : 2)].map((_, i) => (
                      <span
                        key={i}
                        className='h-1.5 w-1.5 rounded-full bg-[#12AA5B]'
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Activity List */}
          <div className='mt-4 rounded-[24px] bg-[#EFF0F3] m-2'>
            <ActivityItem
              title={
                <>
                  <span className='text-emerald-600 font-medium'>Sarah</span>{' '}
                  invited{' '}
                  <span className='text-emerald-600'>3 new supporters</span>
                </>
              }
              time='Now - 12:30 PM'
              hasBadge={true}
              right={
                <div className='flex items-center gap-2'>
                  <div className='flex -space-x-2'>
                    <Avatar className='h-7 w-7 border'>
                      <AvatarImage src='/avatar-2.png' />
                      <AvatarFallback>E</AvatarFallback>
                    </Avatar>
                    <Avatar className='h-7 w-7 border'>
                      <AvatarImage src='/avatar-1.png' />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <Avatar className='h-7 w-7 border'>
                      <AvatarImage src='/avatar-2.png' />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              }
            />

            <Separator className='bg-[#CDCED7]' />

            <ActivityItem
              title={
                <>
                  <span className='text-emerald-600 font-medium'>James</span>{' '}
                  shared the{' '}
                  <span className='text-emerald-600'>Housing Campaign</span>
                </>
              }
              time='12:45 PM - 01:45 PM'
            />

            <Separator className='bg-[#CDCED7]' />

            <ActivityItem
              title={
                <>
                  5 supporters{' '}
                  <span className='text-emerald-600'>completed a vote</span>
                </>
              }
              time='02:00 PM - 03:30 PM'
            />

            <Separator className='bg-[#CDCED7]' />

            <ActivityItem
              title={
                <>
                  <span className='text-emerald-600'>Campaign X</span> crossed
                  100 participants
                </>
              }
              time='03:45 PM - 05:00 PM'
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Participation */}
      <div className='rounded-[28px] bg-[#1E1F24]/2 p-0 border-0 shadow-none'>
        <header className='p-4'>
          <div className='flex items-center text-[20px] leading-7 tracking-[-3%] text-[#1E1F24] gap-4 font-medium'>
            <div className='p-2.5'>
              <HugeiconsIcon
                icon={GpsSignal01Icon}
                size={28}
                color='#1E1F24'
                strokeWidth={1.5}
              />
            </div>{' '}
            Recent Participation
          </div>
        </header>
        <div className='space-y-3'>
          <div className='flex items-center justify-between px-4 pt-5.25 pb-7.5'>
            <div className='space-y-[9.5px]'>
              <div className='text-lg leading-[150%] tracking-[-2%] text-[#1E1F24] font-medium'>
                Latest:{' '}
                <Badge className='ml-2 bg-[#FFCD46] text-[#1E1F24] font-semibold h-6 text-sm leading-5 tracking-[-2%] hover:bg-[#FFCD46]/90'>
                  Influencer-driven joins
                </Badge>
              </div>
              <p className='text-sm font-medium text-[#1E1F24]/75 leading-5 tracking-[-1%]'>
                12 people joined via influencer shares today
              </p>
            </div>
            <span className='text-lg leading-[150%] tracking-[-2%]  font-medium text-[#1E1F24]'>
              08:12 AM
            </span>
          </div>

          <Separator className='bg-[#E0E1E6]' />

          <div className='flex items-center justify-between text-xs px-5 pt-1 pb-4'>
            <span className='text-sm font-medium text-[#1E1F24]/50 leading-5 tracking-[-1%]'>
              230+ other recent updates
            </span>
            <button className='cursor-pointer text-sm font-semibold text-[#1E1F24] py-2.5 leading-5 tracking-[-1%] border-b border-b-[#8B8D98]'>
              See All Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({
  title,
  time,
  right,
  hasBadge,
}: {
  title: React.ReactNode
  time: string
  right?: React.ReactNode
  hasBadge?: boolean
}) {
  return (
    <div className='flex items-start justify-between gap-3 p-4'>
      <div className='space-y-1'>
        <div className='flex items-center gap-3'>
          <p className='text-[17px] leading-6 tracking-[0%] font-semibold'>
            {title}
          </p>
          {hasBadge && (
            <Badge className='bg-[#FF897E] text-sm h-6 leading-5 tracking-[-1%] text-[#FCFCFD] hover:bg-red-100'>
              <div className='flex items-center justify-center bg-[#FF897E] h-3.5 w-3.5 rounded-full border-2 border-[#FCFCFD]'>
                <p className='bg-[#FCFCFD] h-1.5 w-1.5 rounded-full' />
              </div>
              Badge Earned
            </Badge>
          )}
        </div>
        <p className='text-xs leading-5 tracking-[-1%] font-medium text-[#1E1F24]/50'>
          {time}
        </p>
      </div>

      {right}
    </div>
  )
}
