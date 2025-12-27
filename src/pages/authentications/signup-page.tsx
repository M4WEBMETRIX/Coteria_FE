import { useState } from 'react';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle } from '@phosphor-icons/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AuthLayout from './auth-layout';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldError,
} from '@/components/ui/field';
import { Label } from '@/components/ui/label';

const signupSchema = z
    .object({
        email: z
            .string()
            .email('Please enter a valid organization email address'),
        businessNumber: z.string().min(1, 'Business number is required'),
        password: z
            .string()
            .min(8, '8 characters minimum')
            .regex(/[a-z]/, 'One lowercase character')
            .regex(/[A-Z]/, 'One uppercase character')
            .regex(/\d/, 'One number')
            .regex(/[!@#$%^&*(),.?":{}|<>]/, 'One special character'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        newsletter: z.enum(['default', 'none']).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type SignupValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isValid },
    } = useForm<SignupValues>({
        mode: 'onChange',
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: '',
            businessNumber: '',
            password: '',
            confirmPassword: '',
            newsletter: 'default',
        },
    });

    const password = watch('password', '');

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

    const onSubmit = (data: SignupValues) => {
        console.log(data, 'Form');
        setLoading(true);
        setTimeout(() => setLoading(false), 3000);
    };

    return (
        <AuthLayout>
            <div className='flex min-h-screen '>
                <div className='flex-1 flex items-center justify-center h-screen overflow-auto '>
                    <div className='w-full  h-full grid place-content-center'>
                        <div className=''>
                            <h2 className='text-[32px] text-center font-semibold leading-[100%] tracking-[1%] mb-3.5 text-[#0A0A0C]'>
                                Create your Organization account
                            </h2>
                            <p className='text-[#414143] leading-[100%] tracking-[0%] mb-12.5 text-center'>
                                Get started with a free trial. No credit card
                                required.
                            </p>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className='space-y-4 px-2'>
                                {/* Email */}
                                <Field>
                                    <FieldLabel
                                        htmlFor='email'
                                        className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143]'>
                                        Use your organization email address
                                    </FieldLabel>
                                    <FieldContent>
                                        <Input
                                            id='email'
                                            type='email'
                                            placeholder='you@organization.org'
                                            {...register('email')}
                                            className=' h-12 bg-[#F6F6F6] px-2.5 py-5 border-0 rounded-lg'
                                        />
                                        <FieldError errors={[errors.email]} />
                                    </FieldContent>
                                </Field>

                                {/* Business Number */}
                                <Field>
                                    <FieldLabel
                                        htmlFor='business-number'
                                        className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143] flex items-center gap-1'>
                                        Organization / Charity Business Number*
                                        <span className='flex items-center gap-1 text-[#12AA5B] text-sm font-normal'>
                                            why{' '}
                                            <HelpCircle className='w-4 h-4 ' />
                                        </span>
                                    </FieldLabel>
                                    <FieldContent>
                                        <div className='relative '>
                                            <Input
                                                id='business-number'
                                                type='text'
                                                placeholder='Registered charity number'
                                                {...register('businessNumber')}
                                                className='h-12 bg-[#F6F6F6] px-2.5 py-5 border-0 rounded-lg'
                                            />
                                            <HelpCircle className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                        </div>
                                        <FieldError
                                            errors={[errors.businessNumber]}
                                        />
                                    </FieldContent>
                                </Field>

                                {/* Password */}
                                <Field>
                                    <FieldLabel
                                        htmlFor='password'
                                        className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143]'>
                                        Password*
                                    </FieldLabel>
                                    <FieldContent>
                                        <div className='relative '>
                                            <Input
                                                id='password'
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder='Create password'
                                                {...register('password')}
                                                className='h-12 bg-[#F6F6F6] px-2.5 py-5 border-0 rounded-lg pr-12'
                                            />
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                                                {showPassword ? (
                                                    <EyeOff className='w-4 h-4' />
                                                ) : (
                                                    <Eye className='w-4 h-4' />
                                                )}
                                            </button>
                                        </div>
                                        <FieldError
                                            errors={[errors.password]}
                                        />
                                    </FieldContent>
                                </Field>

                                {/* Confirm Password */}
                                <Field>
                                    <FieldLabel
                                        htmlFor='confirm-password'
                                        className='text-base font-medium leading-5.5 tracking-[0%] text-[#414143]'>
                                        Confirm Password*
                                    </FieldLabel>
                                    <FieldContent>
                                        <div className='relative '>
                                            <Input
                                                id='confirm-password'
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder='Confirm password'
                                                {...register('confirmPassword')}
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
                                        <FieldError
                                            errors={[errors.confirmPassword]}
                                        />
                                    </FieldContent>
                                </Field>

                                {/* Password Requirements */}
                                <div className='grid grid-cols-2 mt-4 gap-2.5'>
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

                                {/* Newsletter Checkbox */}
                                <Controller
                                    name='newsletter'
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue='comfortable'>
                                            <div className='flex items-center gap-3'>
                                                <RadioGroupItem
                                                    className="h-5 w-5 rounded-full border border-gray-300
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
                                                    I'd like to receive product
                                                    updates and best practices
                                                    from Coterie
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    )}
                                />

                                {/* Terms */}
                                <p className='text-sm text-[#414143] font-light leading-[100%] tracking-[1%]'>
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
                                    loading={loading}
                                    disabled={!isValid}
                                    type='submit'
                                    className='w-full bg-[#12AA5B] hover:bg-green-600 text-white font-semibold py-6 rounded-[24px]'>
                                    {loading
                                        ? 'Creating account...'
                                        : 'Get started free'}
                                </Button>

                                {/* Login Link */}
                                <p className='text-center text-sm text-[#0A0A0C]'>
                                    Already have an account?{' '}
                                    <Link
                                        to='/auth/login'
                                        className='text-green-600 hover:underline font-normal'>
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
