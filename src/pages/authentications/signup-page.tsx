import { useState } from 'react';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label';
import { CheckCircle } from '@phosphor-icons/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AuthLayout from './auth-layout';
import { Link } from 'react-router-dom';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordRequirements = [
        { text: 'One lowercase character', met: /[a-z]/.test(password) },
        { text: 'One uppercase character', met: /[A-Z]/.test(password) },
        { text: '8 characters minimum', met: password.length >= 8 },
        { text: 'One number', met: /\d/.test(password) },
        {
            text: 'One special character',
            met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e, 'Form');
    };

    return (
        <AuthLayout>
            {/* Right Panel */}
            <div className='flex min-h-screen'>
                <div className='flex-1 flex items-center justify-center h-screen overflow-auto '>
                    <div className='w-full max-w-130 h-full grid place-content-center'>
                        <div className=''>
                            <h2 className='text-[32px] text-center font-semibold leading-[100%] tracking-[1%] mb-3.5 text-[#0A0A0C]'>
                                Create your Organization account
                            </h2>
                            <p className='text-[#414143] leading-[100%] tracking-[0%] mb-12.5 text-center'>
                                Get started with a free trial. No credit card
                                required.
                            </p>

                            <form onSubmit={handleSubmit} className='space-y-6'>
                                {/* Email */}
                                <div>
                                    <Label
                                        htmlFor='email'
                                        className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143]'>
                                        Use your organization email address
                                    </Label>
                                    <Input
                                        id='email'
                                        type='email'
                                        placeholder='you@organization.org'
                                        className='mt-2 h-12 bg-[#F6F6F6] px-2.5 py-5 border-0'
                                    />
                                </div>

                                {/* Business Number */}
                                <div>
                                    <Label
                                        htmlFor='business-number'
                                        className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143] flex items-center gap-1'>
                                        Organization / Charity Business Number*
                                        <HelpCircle className='w-4 h-4 text-gray-400' />
                                    </Label>
                                    <div className='relative mt-2'>
                                        <Input
                                            id='business-number'
                                            type='text'
                                            placeholder='Registered charity number'
                                            className='h-12 bg-[#F6F6F6] px-2.5 py-5 border-0'
                                        />
                                        <HelpCircle className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <Label
                                        htmlFor='password'
                                        className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143]'>
                                        Password*
                                    </Label>
                                    <div className='relative mt-2'>
                                        <Input
                                            id='password'
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder='Create password'
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className='h-12 bg-[#F6F6F6] px-2.5 py-5 border-0'
                                        />
                                        <button
                                            type='button'
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                            {showPassword ? (
                                                <EyeOff className='w-4 h-4' />
                                            ) : (
                                                <Eye className='w-4 h-4' />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    {/* Confirm Password */}
                                    <div>
                                        <Label
                                            htmlFor='confirm-password'
                                            className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143]'>
                                            Confirm Password*
                                        </Label>
                                        <div className='relative mt-2'>
                                            <Input
                                                id='confirm-password'
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder='Confirm password'
                                                value={confirmPassword}
                                                onChange={(e) =>
                                                    setConfirmPassword(
                                                        e.target.value
                                                    )
                                                }
                                                className='h-12 bg-[#F6F6F6] px-2.5 py-5 border-0'
                                            />
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                                {showConfirmPassword ? (
                                                    <EyeOff className='w-4 h-4' />
                                                ) : (
                                                    <Eye className='w-4 h-4' />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Password Requirements */}
                                    <div className='grid grid-cols-2 mt-4 gap-2.5'>
                                        {passwordRequirements.map(
                                            (req, index) => (
                                                <div
                                                    key={index}
                                                    className='flex items-center gap-2 text-sm'>
                                                    <CheckCircle
                                                        weight='fill'
                                                        size={18}
                                                        color={
                                                            req.met
                                                                ? '#12AA5B'
                                                                : '#0A0A0C57'
                                                        }
                                                    />

                                                    <span
                                                        className={
                                                            req.met
                                                                ? 'text-[#12AA5B]'
                                                                : 'text-[#0A0A0C57]'
                                                        }>
                                                        {req.text}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Newsletter Checkbox */}

                                <RadioGroup defaultValue='comfortable'>
                                    <div className='flex items-center gap-3'>
                                        <RadioGroupItem
                                            className="
        h-5 w-5 rounded-full border border-gray-300
        data-[state=checked]:border-green-500
        relative
        after:content-[''] after:absolute after:rounded-full
        after:inset-1/3 after:bg-green-500
      "
                                            value='default'
                                            id='newsletter'
                                        />
                                        <Label
                                            htmlFor='newsletter'
                                            className='text-sm text-[#414143] font-normal leading-[100%] tracking-[1%] cursor-pointer'>
                                            I'd like to receive product updates
                                            and best practices from Coterie
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {/* Terms */}
                                <p className='text-sm text-[#414143] leading-[100%] tracking-[1%]'>
                                    By creating an account, you agree to
                                    Coterie's{' '}
                                    <a
                                        href='#'
                                        className='text-[#12AA5B] hover:underline'>
                                        Terms of Service
                                    </a>{' '}
                                    and confirming that you have reviewed and
                                    accepted the{' '}
                                    <a
                                        href='#'
                                        className='text-[#12AA5B] hover:underline'>
                                        Privacy Policy
                                    </a>
                                    .
                                </p>

                                {/* Submit Button */}
                                <Button
                                    type='submit'
                                    className='w-full bg-[#12AA5B] hover:bg-green-600 text-white font-semibold py-6 rounded-[24px]'>
                                    Get started free
                                </Button>

                                {/* Login Link */}
                                <p className='text-center text-sm text-gray-600'>
                                    Already have an account?{' '}
                                    <Link
                                        to='/auth/login'
                                        className='text-green-600 hover:underline font-medium'>
                                        Login
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default SignupPage;
