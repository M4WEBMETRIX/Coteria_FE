import { Button } from '@/components/ui/button';
import {
    Megaphone01Icon,
    Search01Icon,
    PromotionIcon,
    ArrowUpRight01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const OnboardingItem = ({
    icon,
    title,
    description,
    buttonText,
    onClick,
}: {
    icon: any;
    title: string;
    description: string;
    buttonText: string;
    onClick?: () => void;
}) => {
    return (
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between p-4  rounded-xl gap-4'>
            <div className='flex items-start gap-4'>
                <div className='p-3  rounded-full bg-[#F7FEE7]'>
                    <HugeiconsIcon icon={icon} size={18} color='#84CC16' />
                </div>
                <div>
                    <h4 className='text-xl text-[#1E1F24]  leading-[140%] mb-1 font-medium  '>
                        {title}
                    </h4>
                    <p className='text-base text-[#52525B] leading-[15px] tracking-[-0.28px] font-normal'>
                        {description}
                    </p>
                </div>
            </div>
            <Button
                variant='outline'
                className='w-full md:w-auto bg-white border-[#E0E1E6] text-[#09090B] font-semibold hover:bg-gray-50 rounded-lg px-4 text-base leading-[100%] py-[14.5px] h-10 gap-2 shrink-0'
                onClick={onClick}>
                {buttonText}
                <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={20}
                    color='#0A0A0A'
                />
            </Button>
        </div>
    );
};

const CampaignOnboardingWidget = () => {
    return (
        <div className='flex flex-col gap-3 p-1 border border-[#8B5CF6] bg-[#F5F3FF] rounded-2xl md:p-1.5'>
            <div className='flex flex-col gap-1 w-full  rounded-xl overflow-hidden'>
                <OnboardingItem
                    icon={Megaphone01Icon}
                    title='Launch Awareness'
                    description='Share your campaign to start visibility and early momentum.'
                    buttonText='Launch Awareness'
                />

                <OnboardingItem
                    icon={Search01Icon}
                    title='Find Amplifiers'
                    description='Identify supporters and influencers likely to help you reach a wider audience.'
                    buttonText='Find influencers'
                />

                <OnboardingItem
                    icon={PromotionIcon}
                    title='Make It Stick'
                    description='Send an early update to keep supporters engaged after they participate.'
                    buttonText='Send first update'
                />
            </div>
        </div>
    );
};

export default CampaignOnboardingWidget;
