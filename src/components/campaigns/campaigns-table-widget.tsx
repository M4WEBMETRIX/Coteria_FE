import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    PlusSignIcon,
    MoreVerticalIcon,
    UserListFreeIcons,
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
import { useNavigate } from 'react-router-dom';

const campaignsData = [
    {
        id: 'EP2346172',
        name: 'Women Empower Program - Toronto',
        community: 'UNICEF',
        participants: '734,000',
        fundraised: '$145,034.32',
        status: 'Active',
        icon: 'https://github.com/shadcn.png', // Placeholder for campaign logo
    },
    {
        id: 'EP2346173',
        name: 'Women Empower Program - Toronto',
        community: 'Canada Helps',
        participants: '2,000',
        fundraised: '$20.00',
        status: 'Inactive',
        icon: 'https://github.com/shadcn.png',
    },
    {
        id: 'EP2346174',
        name: 'Women Empower Program - Toronto',
        community: 'Local NGO',
        participants: '150',
        fundraised: '$1,200.00',
        status: 'Active',
        icon: 'https://github.com/shadcn.png',
    },
];

const CampaignsTableWidget = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-[#FCFCFD] rounded-[24px] '>
            <div className='flex justify-between items-center mb-6 px-8'>
                <div className='flex items-center gap-4 text-[#1E1F24] font-medium text-lg'>
                    <HugeiconsIcon icon={UserListFreeIcons} size={24} />
                    <h3>Campaign Table</h3>
                </div>
                <Button className='bg-[#12AA5B] hover:bg-[#12AA5B]/90 text-white rounded-full px-6'>
                    <HugeiconsIcon
                        icon={PlusSignIcon}
                        size={20}
                        className='mr-2'
                    />
                    Add New Campaign
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className='border-b  border-[#E0E1E6] hover:bg-transparent text-sm'>
                        <TableHead className='font-medium text-[#1E1F24]/75 pl-8'>
                            Campaign
                        </TableHead>
                        <TableHead className='font-medium text-[#1E1F24]/75 w-[174px] text-left'>
                            Community
                        </TableHead>
                        <TableHead className='font-medium text-[#1E1F24]/75  w-[103px] text-center'>
                            Participants
                        </TableHead>
                        <TableHead className='font-medium text-[#1E1F24]/75  w-[111px] text-left'>
                            Fundraise
                        </TableHead>
                        <TableHead className='w-[50px]'></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {campaignsData.map((campaign) => (
                        <TableRow
                            key={campaign.id}
                            onClick={() =>
                                navigate(`/campaigns/${campaign.id}`)
                            }
                            className='hover:bg-gray-50 border-b border-[#E0E1E6] last:border-0 cursor-pointer transition-colors'>
                            <TableCell className='py-4 px-8'>
                                <div className='flex items-center gap-4'>
                                    <Avatar className='w-10 h-10'>
                                        <AvatarImage src={campaign.icon} />
                                        <AvatarFallback className='bg-[#12AA5B]/10 text-[#12AA5B] font-bold'>
                                            {campaign.name.substring(0, 1)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className='flex items-center gap-2 mb-1'>
                                            <span className='font-semibold text-[#1E1F24]'>
                                                {campaign.name}
                                            </span>
                                            <Badge
                                                className={`
                                                border-0 px-2 py-1 rounded-full text-[10px] font-medium uppercase
                                                ${
                                                    campaign.status === 'Active'
                                                        ? 'bg-[#47D198] text-[#FCFCFD] '
                                                        : 'bg-[#FF383C] text-white '
                                                }
                                            `}>
                                                {campaign.status}
                                            </Badge>
                                        </div>
                                        <p className='text-sm text-[#1E1F24]/50'>
                                            Campaign ID: {campaign.id}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className='text-[#1E1F24]/75 font-semibold'>
                                {campaign.community}
                            </TableCell>
                            <TableCell className='text-center text-[#1E1F24] font-medium'>
                                {campaign.participants}
                            </TableCell>
                            <TableCell className='text-left'>
                                <Badge className='bg-[#EFF0F3] text-[#1E1F24] font-semibold border-[#CDCED7] rounded-full px-2 text-sm'>
                                    {campaign.fundraised}
                                </Badge>
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                <button className='text-[#8B8D98] hover:text-[#0A0A0C]'>
                                    <HugeiconsIcon
                                        icon={MoreVerticalIcon}
                                        size={30}
                                        color='#1E1F24'
                                    />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CampaignsTableWidget;
