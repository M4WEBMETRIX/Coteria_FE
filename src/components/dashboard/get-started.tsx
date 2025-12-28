import React from 'react'
import { Check } from '@phosphor-icons/react'
import IMAGE_1 from '@/assets/images/dashboard-img-1.svg'
import IMAGE_2 from '@/assets/images/dashboard-img-2.png'
import IMAGE_3 from '@/assets/images/dashboard-img-3.jpg'
import IMAGE_4 from '@/assets/images/dashboard-img-4.png'

const GetStartedPage = () => {
  const steps = [
    { id: 1, title: 'Activate Your Community', completed: true },
    { id: 2, title: 'Launch a Campaign', completed: true },
    { id: 3, title: 'See Influence in Action', completed: false },
    { id: 4, title: 'Fundraise, Anywhere', completed: false },
    { id: 5, title: 'Share Impact Stories', completed: false },
  ]

  const features = [
    {
      title: 'Activate Your Community',
      description:
        'Set up your community space where donors connect, invite others, and stay engaged beyond a single donation.',
      button: 'Create Community',

      image: IMAGE_1,
    },
    {
      title: 'Launch a Campaign',
      description:
        'Run focused campaigns that spark participation and give donors a reason to return and share.',
      button: 'Launch a Campaign',
      image: IMAGE_2,
    },
    {
      title: 'See Influence in Action',
      description:
        "Identify who's driving engagement, how generosity spreads, and where momentum is accelerating.",
      button: 'View Influence Map',

      image: IMAGE_3,
    },
    {
      title: 'Fundraise, Anywhere',
      description:
        'Accept donations via your existing tools while Coterie tracks engagement and network impact behind the scenes.',
      button: 'Connect Donation Tools',
      image: IMAGE_4,
    },
    {
      title: 'Share Impact Stories',
      description:
        'Automatically turn activity into clear, shareable impact stories that keep donors emotionally invested.',
      button: 'Create Impact Story',
      image: IMAGE_1,
    },
  ]

  return (
    <div className=''>
      {/* Header */}
      <div className='text-center py-12 px-4'>
        <h1 className='text-[40px] leading-16 -tracking-[2.24px] font-medium text-[#212121]'>
          Your Community Starts Here
        </h1>
        <p className='text-[20px] leading-8 -tracking-[0.4px] text-[#454545]'>
          Everything you do on Coterie grows from this.
        </p>
      </div>

      {/* Progress Steps */}
      <div className='max-w-4xl mx-auto px-4 mb-16'>
        <div className='flex items-center justify-center gap-1.5'>
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className='flex flex-col items-center'>
                <div
                  className={`w-10.5 h-10.5 rounded-full flex items-center justify-center transition-all ${
                    step.completed
                      ? 'bg-[#12AA5B] text-white'
                      : 'bg-white border border-[#D1D5DB] text-[#D1D5DB]'
                  }`}
                >
                  {step.completed ? (
                    <Check className='w-6 h-6' />
                  ) : (
                    <span className='font-normal text-2xl'>{step.id}</span>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-24.5 h-[0.5px] ${
                    steps[index + 1].completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className=' mx-auto pb-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
          {features.map((feature, index) => {
            // const Icon = feature.icon
            return (
              <div
                key={index}
                className={`bg-[#F9F9F9] relative h-82.5 overflow-hidden rounded-2xl p-8 transition-all hover:shadow-sm`}
              >
                <div className='mb-4'>
                  <div className='h-21.5'>
                    <h3 className='text-base font-medium leading-7 -tracking-[0.4px] text-[#212121] mb-2'>
                      {feature.title}
                    </h3>
                    <p className='text-[10.3px] leading-3.75 -tracking-[0.28px] text-[#454545] mb-2'>
                      {feature.description}
                    </p>
                  </div>
                  <button className='px-4 py-2 bg-[#12AA5B]/8 text-[#12AA5B] rounded-lg text-[13px] font-semibold hover:bg-green-700 transition-colors'>
                    {feature.button}
                  </button>
                </div>
                <img
                  src={feature?.image}
                  alt={feature.title}
                  className='absolute bottom-0 object-cover object-center h-40 w-full'
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GetStartedPage
