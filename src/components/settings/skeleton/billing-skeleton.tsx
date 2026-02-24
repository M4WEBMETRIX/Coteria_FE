// BillingIntegrationSkeleton.tsx
const BillingIntegrationSkeleton = () => {
  return (
    <div className="font-ubuntu animate-pulse">
      {/* API Integration Section */}
      <div className="flex justify-between p-6">
        <div className="w-[300px] space-y-3">
          <div className="h-5 w-40 rounded bg-gray-200" />
          <div className="h-4 w-64 rounded bg-gray-200" />
          <div className="h-4 w-52 rounded bg-gray-200" />
        </div>

        <div className="w-[532px]">
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-12 rounded bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-200" />
              </div>
            </div>
            <div className="h-5 w-5 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Billing Section */}
      <div className="flex justify-between p-6">
        <div className="w-[300px] space-y-3">
          <div className="h-5 w-32 rounded bg-gray-200" />
          <div className="h-4 w-64 rounded bg-gray-200" />
          <div className="h-4 w-56 rounded bg-gray-200" />
        </div>

        <div className="w-[532px] space-y-6">
          {/* Billing Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-4 w-48 rounded bg-gray-200" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-[200px] rounded bg-gray-200" />
              <div className="h-9 w-9 rounded bg-gray-200" />
            </div>
          </div>

          {/* Plan Card */}
          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex justify-between">
              <div className="space-y-3">
                <div className="h-5 w-36 rounded bg-gray-200" />
                <div className="h-6 w-28 rounded bg-gray-200" />
                <div className="h-4 w-60 rounded bg-gray-200" />
              </div>
              <div className="h-8 w-24 rounded bg-gray-200" />
            </div>
          </div>

          {/* Billing History Table */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="space-y-3 px-4 py-3">
              {[1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1fr_auto] items-center gap-4"
                >
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-4 w-16 rounded bg-gray-200" />
                  <div className="h-8 w-8 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Email Section */}
      <div className="flex justify-between p-6">
        <div className="w-[300px] space-y-3">
          <div className="h-5 w-32 rounded bg-gray-200" />
          <div className="h-4 w-64 rounded bg-gray-200" />
        </div>

        <div className="w-[532px] space-y-3">
          <div className="h-3 w-24 rounded bg-gray-200" />
          <div className="h-10 w-full rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default BillingIntegrationSkeleton;
