import GrowthChart from '@/components/community/growth-chart';
import MembersWidget from '@/components/community/members-widget';
import InsightBanner from '@/components/community/insight-banner';
import RecommendationsPanel from '@/components/community/recommendations-panel';
import CommunityHealthCard from '@/components/community/community-health-card';
import RetentionOutlookCard from '@/components/community/retention-outlook-card';
import { ChartBarHorizontalIcon } from '@phosphor-icons/react';
import { Dot, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CreateCommunityDialog from '@/components/community/create-community-dialog';
import { Button } from '@/components/ui/button';

const CommunityPage = () => {
    // Sample data matching the mockup
    const communityInfo = {
        name: 'Women Empowerment - Toronto',
        membersConfig: {
            count: 1284,
            status: 'Active',
            created: 'Mar 2025',
        },
        description:
            'Track how your community grows, engages, and amplifies your campaigns over time.',
    };

    const stats = {
        newMembersPercentage: 54,
        returningMembersPercentage: 46,
        healthScore: 82,
        retentionRate: 87,
    };

    return (
        <div className='space-y-8 max-w-[1400px] mx-auto w-full'>
            {/* Header Section */}

            {/* Actions */}
            {/* <div className='flex items-center gap-3'>
                <CreateCommunityDialog />
                <Button
                    variant='outline'
                    className='rounded-full border-[#E5E5E5] text-[#0A0A0C] font-medium px-4 h-12'>
                    <Plus className='w-4 h-4 mr-2' />
                    Invite Members
                </Button>
            </div> */}
            {/* Main Content Grid */}
            <div className='grid grid-cols-2 gap-6 '>
                <div>
                    <div className='flex gap-4 justify-start   items-center'>
                        <div className='mr-4'>
                            <div className='w-12 h-12 bg-[#EFF0F3] rounded-[12px] grid place-content-center'>
                                <ChartBarHorizontalIcon className='w-6 h-6 text-[#12AA5B]' />
                            </div>
                        </div>
                        <div>
                            <p className='text-[#0A0A0C] font-medium'>
                                Women Empowerment - Toronto{' '}
                            </p>
                            <div className='flex justify-start items-center'>
                                <p>1284</p> <Dot />
                                <p>Active</p>
                                <Dot />
                                <p>Created Mar 2025</p>
                            </div>
                        </div>{' '}
                    </div>

                    <div className='rounded-4xl bg-[#FCFCFD]'>
                        <div className='mb-6 space-y-4'>
                            <p className='text-sm text-[#414143] leading-relaxed'>
                                Track how your community grows, engages, and
                                amplifies your campaigns over time.
                            </p>
                            <div className='flex items-center gap-2'>
                                <Badge className='bg-[#12AA5B] hover:bg-[#12AA5B] text-white rounded-full px-4 py-1.5'>
                                    Growth Trends
                                </Badge>
                                <Badge
                                    variant='secondary'
                                    className='bg-[#F6F6F6] text-[#414143] hover:bg-[#F6F6F6] rounded-full px-4 py-1.5'>
                                    Influence Drivers
                                </Badge>
                                <Badge
                                    variant='secondary'
                                    className='bg-[#F6F6F6] text-[#414143] hover:bg-[#F6F6F6] rounded-full px-4 py-1.5'>
                                    Churn Risk
                                </Badge>
                            </div>
                        </div>{' '}
                        <GrowthChart />
                    </div>
                    <div className='grid grid-cols-2 gap-6 h-[323px] mt-[18px]'>
                        <CommunityHealthCard score={stats.healthScore} />
                        <RetentionOutlookCard rate={stats.retentionRate} />
                    </div>
                </div>

                <div className='w-full'>
                    <div className='flex justify-end items-center gap-6 mb-4'>
                        {' '}
                        <CreateCommunityDialog />
                        <Button variant='ghost'>
                            <Plus />
                            Invite members
                        </Button>
                    </div>

                    {/* Members Widget */}
                    <div className='bg-[#FCFCFD] p-4 rounded-[16px]'>
                        <MembersWidget
                            newMembersPercentage={stats.newMembersPercentage}
                            returningMembersPercentage={
                                stats.returningMembersPercentage
                            }
                        />
                    </div>

                    {/* Insight Banner */}
                    <InsightBanner />

                    {/* Recommendations */}
                    <RecommendationsPanel />
                </div>

                {/* Spacing for visual alignment */}

                {/* </div> */}

                {/* Right Column (Stats + Insights + Actions) */}
            </div>
        </div>
    );
};

export default CommunityPage;
