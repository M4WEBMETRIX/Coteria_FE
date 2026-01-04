import React, { useState, type ReactNode, createContext } from 'react'
import Navbar from '../navbar'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'

export interface LayoutContextType {
  setBreadcrumbComponent: (component: ReactNode | null) => void
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
)

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [breadcrumbComponent, setBreadcrumbComponent] =
    useState<ReactNode | null>(null)
  return (
    <LayoutContext.Provider value={{ setBreadcrumbComponent }}>
      <div className='min-h-screen bg-white flex'>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className='flex-1 flex flex-col px-8'>
          <Navbar breadcrumbs={breadcrumbComponent} />
          <main className='flex-1 py-6 bg-white h-[calc(100vh-150px)] min-w-0'>
            {children}
          </main>
          {/* Removed redundant Outlet */}
        </div>
      </div>
    </LayoutContext.Provider>
  )
}

export default DashboardLayout
