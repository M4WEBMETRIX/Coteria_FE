import React from 'react'
import AuthLayout from './auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, Question } from '@phosphor-icons/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import STRIPE_LOGO from '@/assets/icons/stripe_logo.svg'

const roles = ['Designer', 'Fundraiser', 'Developer', 'Executive']

const StepOne: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className='max-w-130 mx-auto'>
      <div className='mt-4'>
        <h2 className='text-[32px] leading-[100%] tracking-[1%] font-semibold'>
          Tell us a bit about you
        </h2>
      </div>

      <p className='text-base text-[#414143] mt-3.5 mb-7.5'>
        That will help us better account setup for you
      </p>

      <div className='grid grid-cols-2 gap-4 mb-6'>
        <div>
          <Label className='block text-base font-medium leading-5.5 text-[#414143] mb-2'>
            First name
          </Label>
          <Input
            placeholder='Enter first name'
            className='h-12 bg-[#FAFAFA] text-[#0A0A0C] px-2.5 py-5 rounded-xl border-0'
          />
        </div>
        <div>
          <Label className='block text-base font-medium leading-5.5 text-[#414143] mb-2'>
            Last name
          </Label>
          <Input
            placeholder='Enter last name'
            className='h-12 bg-[#FAFAFA] text-[#0A0A0C] px-2.5 py-5 rounded-xl border-0'
          />
        </div>
      </div>

      <div className='mb-8'>
        <Label className='block text-base font-medium leading-5.5 text-[#414143] mb-2'>
          Select your job role
        </Label>
        <div>
          <Select>
            <SelectTrigger className='w-full h-12! min-h-12! 20 bg-[#FAFAFA] text-[#0A0A0C] px-2.5 rounded-xl border-0'>
              <SelectValue placeholder='Select a role' />
            </SelectTrigger>
            <SelectContent
              side='bottom'
              align='start'
              sideOffset={8}
              className='w-full'
            >
              {roles.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex items-center gap-5'>
        <Button
          className='w-30.75 text-base font-medium hover:bg-[#12AA5B]/90 cursor-pointer py-6 rounded-full bg-[#12AA5B]'
          onClick={onNext}
        >
          Next
        </Button>
        <button className='w-22.75 text-center text-base font-medium text-[#12AA5B]'>
          Skip
        </button>
      </div>
    </div>
  )
}

const StepTwo: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const options = [
    'Improve donor retention and repeat participation',
    'Increase community engagement around our campaigns',
    'Gain better visibility into donor behavior and impact',
    'Strengthen transparency and reporting',
    'Other',
  ]

  const [selected, setSelected] = React.useState<number | null>(0)

  return (
    <div className='max-w-130 mx-auto'>
      <div className='mt-4'>
        <h2 className='text-[32px] leading-[100%] tracking-[1%] font-semibold'>
          What are you hoping to improve with Coterie?
        </h2>
      </div>

      <p className='text-base text-[#414143] mt-3.5 mb-7.5'>
        We'll tailor your dashboard, insights, and recommendations based on what
        matters most to your organization.
      </p>

      <div className='space-y-5 mb-8'>
        <RadioGroup
          value={String(selected ?? '')}
          onValueChange={(v) => setSelected(Number(v))}
        >
          {options.map((o, i) => {
            const id = `option-${i}`

            return (
              <Label
                htmlFor={id}
                key={o}
                className={`flex items-center border rounded-md px-3.5 py-7.5 cursor-pointer ${
                  selected === i
                    ? 'border-[#12AA5B] bg-[#12AA5B]/11 text-[#12AA5B]'
                    : 'bg-white text-[#0A0A0C] border-[#C3C3C3]'
                }`}
              >
                <RadioGroupItem
                  id={id}
                  value={String(i)}
                  className={cn(
                    'mr-4 h-5 w-5',
                    selected === i
                      ? 'border border-[#12AA5B]'
                      : ' border border-[#0A0A0C]'
                  )}
                />

                <p className='cursor-pointer text-base leading-4 tracking-[1%]'>
                  {o}
                </p>
              </Label>
            )
          })}
        </RadioGroup>
      </div>
      <div className='flex items-center gap-4 pb-6'>
        <Button
          className='text-base font-medium hover:bg-[#12AA5B]/90 cursor-pointer py-6 px-11 rounded-full bg-[#12AA5B]'
          onClick={onNext}
        >
          Connect Stripe
        </Button>
      </div>
    </div>
  )
}

const StepThree: React.FC = () => {
  return (
    <div className='max-w-130 h-[55vh] flex items-center justify-center mx-auto text-center'>
      <div>
        <div className='mt-4 flex items-center justify-center'>
          <h2 className='text-[32px] leading-[100%] tracking-[1%] font-semibold flex items-center'>
            Connect with{' '}
            <span className='pl-1.75'>
              <img
                src={STRIPE_LOGO}
                className='w-21.25 bg-cover'
                alt='stripe-logo'
              />
            </span>{' '}
            <div className='flex items-center gap-0.5 pt-1.5 pl-3.25'>
              <span className='text-[#12AA5B] text-[12px] leading-5.5 tracking-[0%]'>
                Why
              </span>{' '}
              <div>
                <Question color='#12AA5B' size={16} />
              </div>
            </div>
          </h2>
        </div>

        <p className='text-base leading-5.5 tracking-[0%] text-[#414143] mt-3.5 mb-7.5'>
          You'll be redirected to Stripe to securely connect your account. This
          usually takes 2–3 minutes.
        </p>

        <div className='mb-6'>
          <Button
            className='h-11.5 bg-[#554AFF] cursor-pointer hover:bg-[#554AFF]/90 w-full text-white text-base leading-6.5 tracking-[0%]'
            variant='secondary'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

const SetupAccountPage: React.FC = () => {
  const [step, setStep] = React.useState(1)

  return (
    <AuthLayout>
      <div className='grid place-content-center w-full'>
        <div className='max-w-185 w-185'>
          <div className='mt-12.5 flex items-center justify-between text-[#0A0A0C] font-semibold text-2xl'>
            <p>Account set up</p>
            <p>{step}/3</p>
          </div>
          <div className='w-full bg-gray-200 h-2 rounded-full mt-6 mb-4'>
            <div
              className={`h-2 rounded-full bg-green-500`}
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className='mt-6'>
            <ArrowLeft
              className='cursor-pointer'
              onClick={() => {
                if (step === 1) {
                  return
                } else if (step === 2) {
                  setStep(1)
                } else if (step === 3) {
                  setStep(2)
                } else {
                  setStep(1)
                }
              }}
              color='0A0A0C'
              size={24}
            />
          </div>

          {step === 1 && <StepOne onNext={() => setStep(2)} />}
          {step === 2 && <StepTwo onNext={() => setStep(3)} />}
          {step === 3 && <StepThree />}
        </div>
      </div>
    </AuthLayout>
  )
}

export default SetupAccountPage
