import GrowthChart from '@/components/community/growth-chart';
import MembersWidget from '@/components/community/members-widget';
import InsightBanner from '@/components/community/insight-banner';
import RecommendationsPanel from '@/components/community/recommendations-panel';
import CommunityHealthCard from '@/components/community/community-health-card';
import RetentionOutlookCard from '@/components/community/retention-outlook-card';
import { ChartBarHorizontalIcon, PlusIcon } from '@phosphor-icons/react';
import { Dot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CreateCommunityDialog from '@/components/community/create-community-dialog';
import { Button } from '@/components/ui/button';
import { ChartBubble01Icon, Plus } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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
        <div className='space-y-8  mx-auto w-full font-inter'>
            <div className='grid grid-cols-2 gap-6 '>
                <div>
                    <div className='flex gap-4 justify-start   items-center'>
                        <div className='mr-4'>
                            <div className='w-12 h-12 bg-[#EFF0F3] rounded-[12px] grid place-content-center'>
                                <HugeiconsIcon icon={ChartBubble01Icon} />
                            </div>
                        </div>
                        <div>
                            <p className='text-[#1E1F24] font-bold text-2xl'>
                                Women Empowerment - Toronto{' '}
                            </p>
                            <div className='text-[#1E1F24]/50 flex justify-start items-center text-sm font-medium leading-[25px] tracking-[-1%] font-inter'>
                                <p>1,284 members</p> <Dot size={15} />
                                <p>Active</p>
                                <Dot size={15} />
                                <p>Created Mar 2025</p>
                            </div>
                        </div>{' '}
                    </div>

                    <div className='rounded-4xl bg-[#FCFCFD]'>
                        <div className='mb-6 space-y-4 mt-2'>
                            <p className='text-sm text-[#1E1F24]/75 font-medium leading-[20px] tracking-[-1%]'>
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
                        <Button
                            variant='ghost'
                            className='border-b cursor-pointer hover:bg-transparent rounded-b-none border-[#8B8D98]'>
                            <PlusIcon size={10} />
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
