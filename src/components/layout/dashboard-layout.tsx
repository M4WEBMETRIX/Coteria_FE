import React from 'react';
import Navbar from '../navbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen bg-[#FDFDFD]'>
            <Navbar />
            <main className='p-8'>{children}</main>
        </div>
    );
};

export default DashboardLayout;
