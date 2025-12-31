import { useBreadcrumb } from '@/components/breadcrumb-navigation';

const MessagesPage = () => {
    useBreadcrumb({
        items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Messages', href: '/messages', isCurrentPage: true },
        ],
    });

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold text-[#0A0A0C]'>Messages</h1>
            </div>
            <div className='p-8 bg-white rounded-xl border border-gray-100 flex items-center justify-center min-h-[400px]'>
                <div className='text-center'>
                    <p className='text-gray-500'>
                        Messages page content coming soon
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;
