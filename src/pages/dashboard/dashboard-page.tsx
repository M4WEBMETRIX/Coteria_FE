import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Share2 } from 'lucide-react';
import { Check } from '@phosphor-icons/react';
import IMAGE_1 from '@/assets/images/dashboard-img-1.svg';
import IMAGE_2 from '@/assets/images/dashboard-img-2.png';
import IMAGE_3 from '@/assets/images/dashboard-img-3.jpg';
import IMAGE_4 from '@/assets/images/dashboard-img-4.png';
// import IMAGE_5 from '@/assets/images/dashboard-img-1.svg'

const DashboardPage = () => {
    const [donationAmount, setDonationAmount] = useState(100);
    const [donationFrequency, setDonationFrequency] = useState('monthly');
    // const [currentStep, setCurrentStep] = useState(2);

    const steps = [
        { id: 1, title: 'Activate Your Community', completed: true },
        { id: 2, title: 'Launch a Campaign', completed: true },
        { id: 3, title: 'See Influence in Action', completed: false },
        { id: 4, title: 'Fundraise, Anywhere', completed: false },
        { id: 5, title: 'Share Impact Stories', completed: false },
    ];

    const features = [
        {
            title: 'Activate Your Community',
            description:
                'Set up your community space where donors connect, invite others, and stay engaged beyond a single donation.',
            button: 'Create Community',
            icon: Users,
            color: 'bg-purple-50',
            image: IMAGE_1,
            content: (
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                    <div className='flex justify-between items-start mb-4'>
                        <div>
                            <h4 className='font-semibold text-gray-800'>
                                ABC Community
                            </h4>
                            <p className='text-sm text-gray-500'>#1234567</p>
                        </div>
                        <div className='text-right'>
                            <span className='text-xs text-gray-500 block'>
                                Debit
                            </span>
                            <span className='text-sm'>11:13</span>
                        </div>
                    </div>
                    <div className='space-y-2 mb-4'>
                        <div className='flex justify-between items-center text-sm'>
                            <span className='text-gray-500'>Debit</span>
                            <span>09:32</span>
                        </div>
                        <div className='flex justify-between items-center text-sm'>
                            <span className='text-gray-500'>Credit</span>
                            <span>07:57</span>
                        </div>
                    </div>
                    <div className='border-t pt-4'>
                        <p className='text-xs text-gray-500 mb-1'>
                            TOTAL BALANCE
                        </p>
                        <p className='text-3xl font-bold'>$50,000</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Launch a Campaign',
            description:
                'Run focused campaigns that spark participation and give donors a reason to return and share.',
            button: 'Launch a Campaign',
            image: IMAGE_2,
            icon: TrendingUp,
            color: 'bg-green-50',
            content: (
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                    <h4 className='font-medium text-gray-800 mb-4'>
                        Notify community about new campaign
                    </h4>
                    <div className='space-y-3'>
                        <div className='flex items-center space-x-3 p-2 bg-gray-50 rounded'>
                            <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs'>
                                BC
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium'>
                                    Blaise Cooper
                                </p>
                                <p className='text-xs text-gray-500'>
                                    blaise@coterie.me
                                </p>
                            </div>
                            <button className='px-3 py-1 bg-blue-500 text-white text-xs rounded'>
                                Notify
                            </button>
                        </div>
                        <div className='flex items-center space-x-3 p-2 bg-gray-50 rounded'>
                            <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs'>
                                MH
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium'>
                                    Mikaela Harry
                                </p>
                                <p className='text-xs text-gray-500'>
                                    mik@email.me
                                </p>
                            </div>
                        </div>
                    </div>
                    <button className='mt-4 text-sm text-gray-600 flex items-center'>
                        <span className='mr-2'>Donors</span>
                        <span className='bg-gray-200 rounded px-2 py-0.5'>
                            23
                        </span>
                    </button>
                </div>
            ),
        },
        {
            title: 'See Influence in Action',
            description:
                "Identify who's driving engagement, how generosity spreads, and where momentum is accelerating.",
            button: 'View Influence Map',
            icon: Share2,
            image: IMAGE_3,
            color: 'bg-blue-50',
            content: (
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative h-48'>
                    <svg className='w-full h-full' viewBox='0 0 300 150'>
                        <path
                            d='M 20 120 Q 80 80, 150 100 T 280 60'
                            fill='none'
                            stroke='#3b82f6'
                            strokeWidth='2'
                        />
                        <circle
                            cx='50'
                            cy='100'
                            r='20'
                            fill='#f59e0b'
                            className='cursor-pointer hover:opacity-80'
                        />
                        <circle
                            cx='150'
                            cy='100'
                            r='20'
                            fill='#3b82f6'
                            className='cursor-pointer hover:opacity-80'
                        />
                        <circle
                            cx='220'
                            cy='80'
                            r='20'
                            fill='#ec4899'
                            className='cursor-pointer hover:opacity-80'
                        />
                        <circle
                            cx='270'
                            cy='60'
                            r='24'
                            fill='#10b981'
                            className='cursor-pointer hover:opacity-80'
                        />
                    </svg>
                    <div className='absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs'>
                        +18%
                    </div>
                </div>
            ),
        },
        {
            title: 'Fundraise, Anywhere',
            description:
                'Accept donations via your existing tools while Coterie tracks engagement and network impact behind the scenes.',
            button: 'Connect Donation Tools',
            image: IMAGE_4,
            icon: DollarSign,
            color: 'bg-teal-50',
            content: (
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                    <h4 className='font-medium text-gray-800 mb-4 text-center'>
                        Donate to ABC Charity
                    </h4>
                    <div className='flex items-center justify-center space-x-4 mb-6'>
                        <button
                            onClick={() =>
                                setDonationAmount(
                                    Math.max(10, donationAmount - 10)
                                )
                            }
                            className='w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50'>
                            −
                        </button>
                        <div className='text-4xl font-bold'>
                            ${donationAmount}.00
                        </div>
                        <button
                            onClick={() =>
                                setDonationAmount(donationAmount + 10)
                            }
                            className='w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50'>
                            +
                        </button>
                    </div>
                    <div className='flex justify-center space-x-2'>
                        {['Daily', 'Weekly', 'Monthly'].map((freq) => (
                            <button
                                key={freq}
                                onClick={() =>
                                    setDonationFrequency(freq.toLowerCase())
                                }
                                className={`px-4 py-2 rounded-full text-sm ${
                                    donationFrequency === freq.toLowerCase()
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}>
                                {freq}
                            </button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: 'Share Impact Stories',
            description:
                'Automatically turn activity into clear, shareable impact stories that keep donors emotionally invested.',
            button: 'Create Impact Story',
            icon: Share2,
            image: IMAGE_1,
            color: 'bg-pink-50',
            content: (
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative h-48'>
                    <div className='absolute top-8 left-8 w-12 h-12 bg-orange-400 rounded-full border-4 border-white shadow-lg'></div>
                    <div className='absolute top-16 right-12 w-14 h-14 bg-blue-500 rounded-full border-4 border-white shadow-lg'></div>
                    <div className='absolute bottom-12 right-20 w-10 h-10 bg-purple-400 rounded-full border-4 border-white shadow-lg'></div>
                    <div className='absolute bottom-16 left-16 w-11 h-11 bg-green-500 rounded-full border-4 border-white shadow-lg'></div>
                    <div className='absolute top-1/2 right-8 w-12 h-12 bg-pink-400 rounded-full border-4 border-white shadow-lg'></div>
                    <svg
                        className='absolute inset-0 w-full h-full pointer-events-none'
                        viewBox='0 0 300 150'>
                        <path
                            d='M 50 80 Q 150 50, 240 100'
                            fill='none'
                            stroke='#e5e7eb'
                            strokeWidth='2'
                            strokeDasharray='4,4'
                        />
                        <path
                            d='M 60 120 Q 180 120, 220 90'
                            fill='none'
                            stroke='#e5e7eb'
                            strokeWidth='2'
                            strokeDasharray='4,4'
                        />
                    </svg>
                </div>
            ),
        },
    ];

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
                                    }`}>
                                    {step.completed ? (
                                        <Check className='w-6 h-6' />
                                    ) : (
                                        <span className='font-normal text-2xl'>
                                            {step.id}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`w-24.5 h-[0.5px] ${
                                        steps[index + 1].completed
                                            ? 'bg-green-500'
                                            : 'bg-gray-200'
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
                                className={`bg-[#F9F9F9] relative h-82.5 overflow-hidden rounded-2xl p-8 transition-all hover:shadow-sm`}>
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
                                {/* <div className='mt-6'>{feature.content}</div> */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
