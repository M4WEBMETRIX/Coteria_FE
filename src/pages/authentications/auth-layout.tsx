import TestimonialCarousel from '@/pages/authentications/testimonial-carousel';
import LOGO from '@/assets/icons/coterie.svg';
import BOTTOM_PATTERN from '@/assets/icons/bottom_left.svg';
import TOP_PATTERN from '@/assets/icons/top_right.svg';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex min-h-screen'>
            {/* Left Panel */}
            <div className='hidden lg:overflow-hidden lg:relative lg:flex lg:w-145 lg:max-w-145 bg-linear-to-br from-green-500 to-green-600 flex-col justify-between text-white'>
                <img
                    src={TOP_PATTERN}
                    className='absolute -top-1.5 -right-10 w-23 h-28.25'
                    alt='bottom_pattern'
                />
                <div>
                    <div className='p-12.5'>
                        <div className='bg-white px-7.5 py-4.5 w-max rounded-full flex items-center justify-center mb-16'>
                            <img
                                src={LOGO}
                                className='h-7.25 w-31.25'
                                alt='coterie_logo'
                            />
                        </div>

                        <h1 className='text-[44px] font-semibold mb-6 leading-11 tracking-[0%]'>
                            Turn one-time
                            <br />
                            donations into lasting
                            <br />
                            community support
                        </h1>

                        <p className='text-white text-lg leading-5.5 tracking-[0%]'>
                            Coterie helps organizations retain donors, activate
                            their
                            <br />
                            community, and understand what actually drives
                            repeat
                            <br />
                            giving without replacing your existing donation
                            tools.
                        </p>
                    </div>

                    <TestimonialCarousel />
                </div>

                <img
                    src={BOTTOM_PATTERN}
                    className='absolute -bottom-24 w-72.5 h-55.75'
                    alt='bottom_pattern'
                />
            </div>

            <div className='w-full max-w-130 h-full  mx-auto'>{children}</div>
        </div>
    );
};

export default AuthLayout;
