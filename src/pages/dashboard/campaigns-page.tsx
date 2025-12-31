import ActiveCampaignsWidget from '@/components/campaigns/active-campaigns-widget';
import ActivityCalendarWidget from '@/components/campaigns/activity-calendar-widget';
import { useBreadcrumb } from '@/components/breadcrumb-navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateCampaignModal from '@/components/campaigns/create-campaign-modal';

import EmptyCampaigns from '../../assets/icons/empty-campaigns.svg';

const CampaignsPage = () => {
    useBreadcrumb({
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Campaigns', href: '/campaigns', isCurrentPage: true },
        ],
    });

    const [CampaignsData, setCampaignsData] = useState([]);
    return (
        <div className='flex flex-col gap-6 w-full h-full'>
            {CampaignsData.length > 0 ? (
                <div className='grid grid-cols-12 gap-8'>
                    <div className='col-span-4'>
                        <ActiveCampaignsWidget />
                    </div>
                    <div className='col-span-8'>
                        <ActivityCalendarWidget />
                    </div>
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
                    <CreateCampaignModal />
                </div>
            )}
            {/* Bottom Row: Full Width */}
            {/* <div className='w-full'>
                <CampaignsTableWidget />
            </div> */}
        </div>
    );
};

export default CampaignsPage;
