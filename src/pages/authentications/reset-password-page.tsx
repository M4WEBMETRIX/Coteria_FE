import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CheckCircle } from '@phosphor-icons/react';
import AuthLayout from './auth-layout';

const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordRequirements = [
        { text: '8 characters minimum', met: password.length >= 8 },
        { text: 'One number', met: /\d/.test(password) },
        { text: 'One uppercase character', met: /[A-Z]/.test(password) },
        {
            text: 'One special character',
            met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        },
        { text: 'One lowercase character', met: /[a-z]/.test(password) },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ password, confirmPassword });
    };

    return (
        <AuthLayout>
            <div className='flex min-h-screen'>
                <div className='flex-1 flex items-center justify-center h-screen overflow-auto'>
                    <div className='w-full max-w-130 h-full grid place-content-center'>
                        <div className='w-[448px]'>
                            <h2 className='text-[32px] text-center font-semibold leading-[100%] tracking-[1%] mb-3.5 text-[#0A0A0C]'>
                                Reset your password
                            </h2>
                            <p className='text-[#414143] text-sm leading-[140%] tracking-[0%] mb-12.5 text-center'>
                                Create a new password for your account.
                            </p>

                            <form onSubmit={handleSubmit} className='space-y-6'>
                                {/* Email (Display only or disabled for security context) */}
                                <div>
                                    <Label
                                        htmlFor='email'
                                        className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143]'>
                                        Use your organization email address
                                    </Label>
                                    <Input
                                        id='email'
                                        type='email'
                                        value='you@organization.org'
                                        disabled
                                        className='mt-2 h-12 bg-[#F6F6F6] px-2.5 py-5 border-0 rounded-lg opacity-60'
                                    />
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
                                            className='h-12 bg-[#F6F6F6] px-2.5 py-5 border-0 rounded-lg pr-12'
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
                                            className='h-12 bg-[#F6F6F6] px-2.5 py-5 border-0 rounded-lg pr-12'
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
                                <div className='grid grid-cols-2 mt-4 gap-y-3 gap-x-4'>
                                    {passwordRequirements.map((req, index) => (
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
                                    ))}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type='submit'
                                    className='w-full bg-[#12AA5B] hover:bg-green-600 text-white font-semibold py-6 rounded-full text-lg'>
                                    Reset Password
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ResetPasswordPage;
