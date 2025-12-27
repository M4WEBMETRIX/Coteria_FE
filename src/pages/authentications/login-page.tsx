import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import AuthLayout from './auth-layout';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <AuthLayout>
            <div className='flex min-h-screen'>
                <div className='flex-1 flex items-center justify-center h-screen overflow-auto'>
                    <div className='w-full max-w-130 h-full grid place-content-center'>
                        <div className='w-[448px]'>
                            <h2 className='text-[32px] text-center font-semibold leading-[100%] tracking-[1%] mb-3.5 text-[#0A0A0C]'>
                                Sign in to your account
                            </h2>
                            <p className='text-[#414143] text-sm leading-[140%] tracking-[0%] mb-12.5 text-center px-4'>
                                Sign in to manage your campaigns, track
                                community engagement and view your insights
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
                                            placeholder='Enter password'
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

                                {/* Forgot Password */}
                                <div className='flex justify-start'>
                                    <p className='text-sm text-[#414143]'>
                                        Forgot your password?{' '}
                                        <Link
                                            to='/auth/forgot-password'
                                            className='text-[#12AA5B] hover:underline font-medium'>
                                            Reset password
                                        </Link>
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type='submit'
                                    className='w-full bg-[#12AA5B] hover:bg-green-600 text-white font-semibold py-6 rounded-full text-lg'>
                                    Login
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

export default LoginPage;
