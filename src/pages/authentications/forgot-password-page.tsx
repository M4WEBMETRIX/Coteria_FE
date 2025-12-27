import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './auth-layout';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email });
        // After sending the link, navigate to the check-email page
        // For demonstration purposes, we'll just navigate
        navigate('/auth/check-email');
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
                            <p className='text-[#414143] text-sm leading-[140%] tracking-[0%] mb-12.5 text-center px-8'>
                                Enter the email address associated with your
                                Coterie account and we'll send you a link to
                                reset your password.
                            </p>

                            <form onSubmit={handleSubmit} className='space-y-6'>
                                {/* Email */}
                                <div>
                                    <Label
                                        htmlFor='email'
                                        className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143]'>
                                        Enter your organization email address
                                    </Label>
                                    <Input
                                        id='email'
                                        type='email'
                                        placeholder='you@organization.org'
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className='mt-2 h-12 bg-[#F6F6F6] px-2.5 py-5 border-0 rounded-lg'
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type='submit'
                                    className='w-full bg-[#12AA5B] hover:bg-green-600 text-white font-semibold py-6 rounded-full text-lg'>
                                    Send Reset Link
                                </Button>

                                {/* Signup Link */}
                                <p className='text-center text-sm text-[#414143]'>
                                    Don't have an account?{' '}
                                    <Link
                                        to='/auth/signup'
                                        className='text-[#12AA5B] hover:underline font-medium'>
                                        Create an account
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

export default ForgotPasswordPage;
