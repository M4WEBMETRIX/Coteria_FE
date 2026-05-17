const DashboardImpactSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Left column */}
        <div className="space-y-6">
          {/* Hero card */}
          <div className="rounded-[20px] bg-gray-100 p-6 space-y-4">
            <div className="h-4 w-48 rounded bg-gray-200" />
            <div className="h-12 w-56 rounded bg-gray-200" />
            <div className="h-3 w-40 rounded bg-gray-200" />
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-[12px] bg-white p-3 space-y-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <div className="h-5 w-10 rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Ripple card */}
          <div className="rounded-[20px] border border-[#ECEFF3] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-40 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="flex gap-3 pt-1">
                  <div className="h-10 w-36 rounded-full bg-gray-200" />
                  <div className="h-10 w-36 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* People inspired */}
          <div className="rounded-[20px] border border-[#ECEFF3] bg-white p-6 space-y-4">
            <div className="flex justify-between">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-4 w-14 rounded bg-gray-200" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-3 w-24 rounded bg-gray-200" />
                  <div className="h-3 w-40 rounded bg-gray-200" />
                </div>
                <div className="space-y-1 text-right">
                  <div className="h-3 w-16 rounded bg-gray-200 ml-auto" />
                  <div className="h-4 w-20 rounded bg-gray-200 ml-auto" />
                </div>
              </div>
            ))}
          </div>

          {/* Impact breakdown */}
          <div className="rounded-[20px] border border-[#ECEFF3] bg-white p-6 space-y-3">
            <div className="h-5 w-40 rounded bg-gray-200" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-[12px] bg-gray-50 px-4 py-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-3 w-48 rounded bg-gray-200" />
                </div>
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            ))}
            <div className="h-10 w-full rounded-[10px] bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardImpactSkeleton;
