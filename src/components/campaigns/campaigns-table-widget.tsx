import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    MoreHorizontalIcon,
    Search01Icon,
    FilterHorizontalIcon,
    ArrowDown01Icon,
    ArrowUp01Icon,
    ArrowDown01,
    ArrowUp01,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const campaignsData = [
    {
        id: '1',
        title: 'Strength in Unity: Cancer Patient Support Program',
        participants: 126,
        trend: 'up',
        lastActivity: '2h ago',
        goalAmount: '$500.00',
        raised: '-',
        status: 'Draft',
    },
    {
        id: '2',
        title: 'Journey of Hope: Empowering Cancer Survivors',
        participants: 32,
        trend: 'down',
        lastActivity: '3 days ago',
        goalAmount: '$500.00',
        raised: '$100.00',
        status: 'Active',
    },
    {
        id: '3',
        title: 'Light of Hope: Cancer Awareness and Support',
        participants: 126,
        trend: 'up',
        lastActivity: '2h ago',
        goalAmount: '$500.00',
        raised: '$500.00',
        status: 'Paused',
    },
    {
        id: '4',
        title: 'Radiant Futures: A Cancer Support Initiative',
        participants: 0,
        trend: 'down',
        lastActivity: '50 days ago',
        goalAmount: '$500.00',
        raised: '-',
        status: 'Suspended',
    },
];

const StatusBadge = ({ status }: { status: string }) => {
    let styles = '';
    switch (status) {
        case 'Active':
            styles = 'bg-[##FFFFFF] text-[#339D88] border-[#339D88]'; // Greenish
            break;
        case 'Draft':
            styles = 'bg-[##FFFFFF] text-[#D39C3D] border-[#D39C3D]'; // Yellowish/Orange
            break;
        case 'Paused':
            styles = 'bg-[##FFFFFF] text-[#AF52DE] border-[#AF52DE]'; // Purple
            break;
        case 'Suspended':
            styles = 'bg-[##FFFFFF] text-[#DF1C41] border-[#DF1C41]'; // Red
            break;
        default:
            styles = 'bg-gray-100 text-gray-600 border-gray-200';
    }

    // Dot color mapping
    const dotColor =
        {
            Active: 'bg-[#0F974F]',
            Draft: 'bg-[#B96004]',
            Paused: 'bg-[#9747FF]',
            Suspended: 'bg-[#E02D3C]',
        }[status] || 'bg-gray-400';

    return (
        <div
            className={`flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full border ${styles}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            <span className='text-xs font-medium'>{status}</span>
        </div>
    );
};

const CampaignsTableWidget = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-white font-ubuntu rounded-xl border border-[#DFE1E7] overflow-hidden'>
            {/* Header Controls */}
            <div className='flex flex-col md:flex-row justify-between items-center p-4 gap-4 border-b border-[#E0E1E6]'>
                <h3 className=' font-bold text-[#0D0D12] text-base leading-[150%] tracking-[2%] whitespace-nowrap mr-auto md:mr-0'>
                    Campigns Table
                </h3>

                <div className='flex items-center gap-3 w-full md:w-auto'>
                    <div className='relative w-full md:w-[320px]'>
                        <HugeiconsIcon
                            icon={Search01Icon}
                            size={20}
                            className='absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8D98]'
                        />
                        <Input
                            placeholder='Search'
                            className='pl-10 h-10 bg-white border-[#E0E1E6] rounded-lg w-full'
                        />
                    </div>
                    <Button
                        variant='outline'
                        className='h-10 gap-2 text-[#5E606A] border-[#E0E1E6] hover:bg-gray-50 bg-white rounded-lg'>
                        <HugeiconsIcon icon={FilterHorizontalIcon} size={20} />
                        Filter
                    </Button>
                    <Button
                        variant='outline'
                        className='h-10 gap-2 text-[#5E606A] border-[#E0E1E6] hover:bg-gray-50 bg-white rounded-lg'>
                        <HugeiconsIcon icon={ArrowDown01Icon} size={20} />
                        Sort by
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
                <Table>
                    <TableHeader className='bg-[#F6F8FA] border border-[#DFE1E7]'>
                        <TableRow className='hover:bg-transparent border-b border-[#E0E1E6] text-[#666D80] text-sm leading-[150%]'>
                            <TableHead className='w-[40px] pl-4'>
                                <Checkbox className='border-[#CDCED7] data-[state=checked]:bg-[#12AA5B] data-[state=checked]:border-[#12AA5B]' />
                            </TableHead>
                            <TableHead className='font-medium text-[#666D80] w-[60px]'>
                                No
                            </TableHead>
                            <TableHead className='font-medium text-[#666D80]  min-w-[250px]'>
                                Campaign Title
                            </TableHead>
                            <TableHead className='font-medium text-[#666D80] '>
                                Participation
                            </TableHead>
                            <TableHead className='font-medium text-[#666D80]'>
                                Last Activity
                            </TableHead>
                            <TableHead className='font-medium text-[#666D80]'>
                                Goal Amount
                            </TableHead>
                            <TableHead className='font-medium text-[#666D80]'>
                                Raised
                            </TableHead>
                            <TableHead className='font-medium text-[#666D80]'>
                                Status
                            </TableHead>
                            <TableHead className='font-medium w-[50px]'>
                                {' '}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaignsData.map((campaign) => (
                            <TableRow
                                key={campaign.id}
                                onClick={() =>
                                    navigate(`/campaigns/${campaign.id}`)
                                }
                                className='hover:bg-gray-50 border-b border-[#E0E1E6] last:border-0 cursor-pointer group'>
                                <TableCell className='pl-4 py-4'>
                                    <Checkbox
                                        onClick={(e) => e.stopPropagation()}
                                        className='border-[#CDCED7] data-[state=checked]:bg-[#12AA5B] data-[state=checked]:border-[#12AA5B]'
                                    />
                                </TableCell>
                                <TableCell className='text-[#0D0D12]  text-sm leading-[150%] tracking-[2%]'>
                                    {campaign.id}
                                </TableCell>
                                <TableCell className=' text-[#0D0D12] text-sm leading-[150%] tracking-[2%] max-w-[300px] truncate'>
                                    {campaign.title}
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-1.5'>
                                        <span className='text-[#0D0D12]  text-sm leading-[150%] tracking-[2%]'>
                                            {campaign.participants} participants
                                        </span>
                                        {campaign.trend === 'up' ? (
                                            <HugeiconsIcon
                                                icon={ArrowUp01}
                                                size={16}
                                                className='text-[#12AA5B]'
                                            />
                                        ) : (
                                            <HugeiconsIcon
                                                icon={ArrowDown01}
                                                size={16}
                                                className='text-[#F04438]'
                                            />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className='text-[#0D0D12] text-sm leading-[150%] tracking-[2%]'>
                                    {campaign.lastActivity}
                                </TableCell>
                                <TableCell className='text-[#0D0D12]  text-sm leading-[150%] tracking-[2%]'>
                                    {campaign.goalAmount}
                                </TableCell>
                                <TableCell className='text-[#0D0D12]  text-sm leading-[150%] tracking-[2%]'>
                                    {campaign.raised}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={campaign.status} />
                                </TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='h-8 w-8 text-[#8B8D98]'>
                                        <HugeiconsIcon
                                            icon={MoreHorizontalIcon}
                                            size={20}
                                            color='#666D80'
                                        />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Pagination placeholder if needed? Not shown in screenshot, but good to have padding at bottom or standard footer */}
        </div>
    );
};

export default CampaignsTableWidget;
