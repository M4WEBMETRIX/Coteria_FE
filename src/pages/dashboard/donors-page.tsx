import { useBreadcrumb } from '@/components/breadcrumb-navigation';

const DonorsPage = () => {
    useBreadcrumb({
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Donors', href: '/donors', isCurrentPage: true },
        ],
    });

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-semibold text-[#0A0A0C]'>Donors</h1>
            <div className=''>Donors Content Goes Here</div>
        </div>
    );
};

export default DonorsPage;
