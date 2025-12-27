import AuthLayout from './auth-layout';
import { Link } from 'react-router-dom';
import gmail from '@/assets/icons/gmail.svg';
import outlook from '@/assets/icons/microsoft_outlook.svg';

const CheckEmailPage = () => {
    // In a real app, you'd get the email from state or a query param
    const email = 'you@organization.org';

    return (
        <AuthLayout>
            <div className='flex min-h-screen'>
                <div className='flex-1 flex items-center justify-center h-screen overflow-auto'>
                    <div className='w-full  h-full grid place-content-center'>
                        <div className=' text-left max-w-[446px]'>
                            <h2 className='text-[32px] font-semibold leading-[100%] tracking-[1%] mb-3.5 text-[#0A0A0C]'>
                                Check your email
                            </h2>
                            <p className='text-[#414143]  text-base leading-[140%] tracking-[0%] mb-12.5 '>
                                We've sent an email to{' '}
                                <span className='font-semibold'>{email}</span>{' '}
                                with a link <br /> to activate your account
                            </p>

                            <div className='flex  items-center justify-start gap-6 mb-40'>
                                <a
                                    href='https://mail.google.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex items-center gap-2.5  rounded-lg  py-2  text-[#143DF2] underline'>
                                    <img
                                        src={gmail}
                                        alt='Gmail-icon'
                                        className='w-[32.25px] h-[32px]'
                                    />
                                    <span className='text-base font-normal '>
                                        Open Gmail
                                    </span>
                                </a>
                                <a
                                    href='https://outlook.live.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex items-center gap-2.5  rounded-lg px-4 py-2  font-normal text-base text-[#143DF2] underline'>
                                    <img
                                        src={outlook}
                                        alt='Outlook-icon'
                                        className='w-[32.25px] h-[32px]'
                                    />
                                    <span className='text-base font-normal '>
                                        Open Outlook
                                    </span>
                                </a>
                            </div>

                            <p className='text-xl text-[#0A0A0C] mb-2 font-semibold'>
                                Didn't get an email? Check your spam folder!
                            </p>
                            <Link
                                to='/auth/forgot-password'
                                className='text-[#026451] underline text-base font-normal text-left'>
                                Re-enter your email and try again
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default CheckEmailPage;
