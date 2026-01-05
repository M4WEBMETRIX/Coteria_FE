import AIInsight from '@/components/dashboard/ai-insight'
import ActivityCalendarPanel from '@/components/dashboard/dashboard-right-panel'
import GetStartedPage from '@/components/dashboard/get-started'
import InsightsCard from '@/components/dashboard/insights-card'
import MonitorAndScore from '@/components/dashboard/monitor-and-score'
import OverviewCard from '@/components/dashboard/overview-card'
import { useQueryState } from 'nuqs'
import { useBreadcrumb } from '@/components/breadcrumb-navigation'
import MetricCard from '@/components/reusable/metric-card'

const DashboardPage = () => {
  useBreadcrumb({
    items: [
      { label: "Home", href: "/dashboard" },
      { label: "Dashboard", href: "/dashboard", isCurrentPage: true },
    ],
  });

  const isOnboarded = true

  const [tab] = useQueryState('tab', {
    defaultValue: 'metrics',
  })

  return (
    <>
      {isOnboarded ? (
        <main className='w-full'>
          <h1 className='text-[#0D0D12] font-semibold text-[20px] leading-[135%] tracking-[0%]'>
            Dashboard
          </h1>
          <MetricCard />
          {/* <section className='w-[60%]'>
                        <OverviewCard />
                        <div className='flex items-start gap-6 mt-6 w-full'>
                            <InsightsCard />
                            <MonitorAndScore />
                        </div>
                    </section>
                    <section className='w-[40%]'>
                        {tab === 'ai_insight' ? (
                            <AIInsight />
                        ) : (
                            <ActivityCalendarPanel />
                        )}
                    </section> */}
        </main>
      ) : (
        <GetStartedPage />
      )}
    </>
  )
}

export default DashboardPage
