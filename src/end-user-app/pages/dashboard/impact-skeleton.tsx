const DashboardImpactSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-8">
      {/* Header */}
      <div className="flex justify-center">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8 w-64 rounded bg-gray-200" />
          <div className="mx-auto h-5 w-96 rounded bg-gray-200" />
        </div>
      </div>

      {/* Cards */}
      <div className="rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Card */}
          <div className="space-y-4 rounded-[10px] border border-[#ECEFF3] bg-white p-6">
            <div className="h-12 w-40 rounded bg-gray-200" />
            <div className="h-6 w-48 rounded bg-gray-200" />
            <div className="h-5 w-56 rounded bg-gray-200" />
          </div>

          {/* Right Card */}
          <div className="space-y-4 rounded-[10px] border border-[#ECEFF3] bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-24 rounded bg-gray-200" />
              <div className="h-6 w-40 rounded bg-gray-200" />
            </div>
            <div className="h-14 w-full rounded-[20px] bg-gray-200" />
          </div>
        </div>

        {/* Direct Referrals */}
        <div className="mt-10 space-y-6">
          <div className="h-8 w-56 rounded bg-gray-200" />

          <div className="space-y-6 rounded-[10px] border border-[#ECEFF3] bg-white p-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="h-12 w-12 rounded-full bg-gray-200" />

                  {/* Text */}
                  <div className="space-y-2">
                    <div className="h-5 w-40 rounded bg-gray-200" />
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="h-4 w-48 rounded bg-gray-200" />
                  </div>
                </div>

                {/* Right side */}
                <div className="space-y-2 text-right">
                  <div className="ml-auto h-5 w-16 rounded bg-gray-200" />
                  <div className="ml-auto h-4 w-32 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardImpactSkeleton;
