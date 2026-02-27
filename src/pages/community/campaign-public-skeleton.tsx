const CampaignPublicSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto max-w-7xl px-8 py-4">
          <div className="flex justify-between">
            <div className="h-10 w-48 rounded bg-gray-200" />

            <div className="flex gap-3">
              <div className="h-10 w-24 rounded bg-gray-200" />
              <div className="h-12 w-32 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}

      <div className="relative h-[350px] w-full bg-gray-200">
        {/* Floating Card */}
        <div className="relative mx-auto max-w-7xl px-8">
          {/* <div className="absolute right-0 bottom-0 m-8 h-[120px] w-100 rounded-xl bg-white p-6 shadow">
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="h-6 w-32 rounded bg-gray-200" />

                <div className="h-6 w-24 rounded bg-gray-200" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />

                <div className="h-2 w-full rounded bg-gray-200" />
              </div>

              <div className="h-12 w-full rounded bg-gray-200" />
            </div>
          </div> */}
        </div>
      </div>

      {/* Main Content */}

      <div className="container mx-auto max-w-7xl px-8 py-12">
        <div className="flex gap-8">
          {/* Left Column */}

          <div className="flex-1 space-y-8">
            {/* Title + Description */}

            <div className="space-y-4">
              <div className="h-8 w-96 rounded bg-gray-200" />

              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
                <div className="h-4 w-4/6 rounded bg-gray-200" />
                <div className="h-4 w-3/6 rounded bg-gray-200" />
              </div>
            </div>

            {/* Impact Highlights */}

            <div className="space-y-6">
              <div className="h-6 w-48 rounded bg-gray-200" />

              <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded bg-gray-200" />

                  <div className="h-6 w-32 rounded bg-gray-200" />
                </div>

                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded bg-gray-200" />

                  <div className="h-6 w-32 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}

          <div className="w-[350px] space-y-6">
            {/* Updates */}

            <div className="space-y-4 rounded bg-gray-100 p-4">
              <div className="h-6 w-56 rounded bg-gray-200" />

              {[1, 2].map((i) => (
                <div key={i} className="space-y-2 rounded bg-white p-4">
                  <div className="h-4 w-full rounded bg-gray-200" />

                  <div className="h-4 w-4/6 rounded bg-gray-200" />
                </div>
              ))}
            </div>

            {/* Events */}

            <div className="space-y-4 rounded bg-gray-100 p-4">
              <div className="h-6 w-48 rounded bg-gray-200" />

              {[1, 2].map((i) => (
                <div key={i} className="space-y-2 rounded bg-white p-4">
                  <div className="h-4 w-full rounded bg-gray-200" />

                  <div className="h-4 w-24 rounded bg-gray-200" />

                  <div className="h-4 w-5/6 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPublicSkeleton;
