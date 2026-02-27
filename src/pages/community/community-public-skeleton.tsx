const CommunityPublicSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse bg-white">
      {/* Hero Skeleton */}
      <div className="h-[426px] w-full bg-gray-200" />

      <div className="container mx-auto max-w-7xl px-8 py-12">
        <div className="flex gap-8">
          {/* Campaign Skeleton */}
          <div className="flex-1 space-y-8">
            <div className="space-y-3">
              <div className="h-6 w-72 rounded bg-gray-200" />
              <div className="h-8 w-96 rounded bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4 rounded-[10px] border p-5">
                  <div className="h-48 w-full rounded bg-gray-200" />

                  <div className="space-y-3">
                    <div className="h-5 w-40 rounded bg-gray-200" />

                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-gray-200" />
                      <div className="h-3 w-3/4 rounded bg-gray-200" />
                    </div>

                    <div className="h-2 w-full rounded bg-gray-200" />

                    <div className="flex justify-between">
                      <div className="h-6 w-24 rounded bg-gray-200" />

                      <div className="h-6 w-16 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}

          <div className="w-[350px] space-y-6">
            <div className="space-y-4 rounded border p-6">
              <div className="flex gap-3">
                <div className="h-16 w-16 rounded-full bg-gray-200" />

                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-gray-200" />

                  <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-gray-200" />

                <div className="h-3 w-5/6 rounded bg-gray-200" />

                <div className="h-3 w-4/6 rounded bg-gray-200" />
              </div>
            </div>

            <div className="space-y-4 rounded bg-gray-100 p-6">
              <div className="h-5 w-48 rounded bg-gray-200" />

              {[1, 2].map((i) => (
                <div key={i} className="space-y-2 rounded border bg-white p-4">
                  <div className="h-4 w-40 rounded bg-gray-200" />

                  <div className="h-3 w-full rounded bg-gray-200" />

                  <div className="h-3 w-3/4 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPublicSkeleton;
