import { useBreadcrumb } from '@/components/breadcrumb-navigation';

const InsightsPage = () => {
    useBreadcrumb({
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Insights', href: '/insights', isCurrentPage: true },
        ],
    });

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-semibold text-[#0A0A0C]'>Insights</h1>
            <div className=''>Insights Content Goes Here</div>
        </div>
    );
};

export default InsightsPage;
