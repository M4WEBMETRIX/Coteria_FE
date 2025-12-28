import ActiveCampaignsWidget from '@/components/campaigns/active-campaigns-widget';
import ActivityCalendarWidget from '@/components/campaigns/activity-calendar-widget';
import CampaignsTableWidget from '@/components/campaigns/campaigns-table-widget';

const CampaignsPage = () => {
    return (
        <div className=' mx-auto w-full font-inter space-y-5'>
            {/* Top Row: 40% - 60% split */}
            <div className='grid grid-cols-12 gap-8'>
                <div className='col-span-4'>
                    <ActiveCampaignsWidget />
                </div>
                <div className='col-span-8'>
                    <ActivityCalendarWidget />
                </div>
            </div>

            {/* Bottom Row: Full Width */}
            <div className='w-full'>
                <CampaignsTableWidget />
            </div>
        </div>
    );
};

export default CampaignsPage;
