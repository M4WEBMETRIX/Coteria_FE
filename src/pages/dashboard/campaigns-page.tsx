import ActiveCampaignsWidget from '@/components/campaigns/active-campaigns-widget';
import ActivityCalendarWidget from '@/components/campaigns/activity-calendar-widget';
import CampaignsTableWidget from '@/components/campaigns/campaigns-table-widget';
import CampaignOverviewStats from '@/components/campaigns/campaign-overview-stats';
import CampaignOnboardingWidget from '@/components/campaigns/campaign-onboarding-widget';
import { useBreadcrumb } from '@/components/breadcrumb-navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateCampaignModal from '@/components/campaigns/create-campaign-modal';
import { Cancel01Icon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import EmptyCampaigns from '../../assets/icons/empty-campaigns.svg';

const CampaignsPage = () => {
    useBreadcrumb({
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Campaigns', href: '/campaigns', isCurrentPage: true },
        ],
    });

    // Initialize with data to show the populated state
    const [CampaignsData, setCampaignsData] = useState<any>([1]);

    const [justCreated, setJustCreated] = useState<any>(true);

    return (
        <div className='flex flex-col gap-6 w-full h-full font-inter '>
            {CampaignsData.length > 0 ? (
                <div className='flex flex-col gap-6'>
                    {/* Success Banner */}
                    {justCreated && (
                        <div className='flex items-center justify-between px-6 py-3 bg-[#F7FEE7] border border-[#84CC16] rounded-xl text-[#1E1F24]'>
                            <span className=' text-lg leading-[140%] tracking-[0%] text-[#3F3F46]'>
                                “{CampaignsData[0].title}” was created
                                successfully
                            </span>
                            <div className='flex items-center gap-4'>
                                <Button
                                    variant='ghost'
                                    className='h-8 border border-[#E4E4E7] bg-white px-2 py-[5px] text-[#09090B] p-0 hover:bg-transparent font-semibold gap-1 text-xm leading-[155%] tracking-[0%] shadow-[0px_-3px_0px_0px_#00000014_inset]'>
                                    Manage Campaign
                                    <HugeiconsIcon
                                        icon={ArrowUpRight01Icon}
                                        size={16}
                                        color='#0A0A0A'
                                    />
                                </Button>
                                <button className='text-[#1E1F24] hover:text-[#12AA5B]'>
                                    <HugeiconsIcon
                                        icon={Cancel01Icon}
                                        color='#3F3F46'
                                        size={24}
                                    />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Onboarding Widget */}
                    {justCreated && <CampaignOnboardingWidget />}

                    {/* Section Header */}
                    <div className='flex justify-between items-end mt-4'>
                        <h2 className='text-xl font-bold text-[#0D0D12] leading-[135%]'>
                            All Campaign
                        </h2>
                        <Button
                            variant='outline'
                            className='bg-white text-[#0D0D12] px-4 py-[]9.5px] border-[#E0E1E6] font-bold text-sm leading-[150%]'>
                            Generate Report
                        </Button>
                    </div>

                    {/* Stats */}
                    <CampaignOverviewStats />

                    {/* Table */}
                    <CampaignsTableWidget />
                </div>
            ) : (
                <div className='flex flex-col my-auto place-content-center w-full items-center justify-center h-full'>
                    <img
                        src={EmptyCampaigns}
                        alt='empty-campaigns'
                        className='w-[106px] h-[106px] mb-3'
                    />
                    <p className='pb-4 text-[#1E1F24] text-center text-base leading-6 trackin-[-2%] font-semibold'>
                        Create your first campaign
                    </p>
                    <p className='pb-6 max-w-[552px] text-center font-medium text-[#8B8D98] text-sm leading-5 tracking-[-1%]'>
                        A campaign gives your community a clear reason to act,
                        whether that’s supporting a cause, raising awareness, or
                        mobilizing people around a moment.
                    </p>
                    <CreateCampaignModal
                        setCampaignsData={setCampaignsData}
                        setJustCreated={setJustCreated}
                    />
                </div>
            )}
        </div>
    );
};

export default CampaignsPage;
