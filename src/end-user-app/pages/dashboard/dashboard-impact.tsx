import { Button } from "@/components/ui/button";
import { CaretRightIcon, MapPin, Trophy } from "@phosphor-icons/react";

const directReferrals = [
  {
    id: 1,
    name: "Nick Daniels",
    avatar: "https://placehold.co/40x40/png",
    location: "",
    status: { label: "You", color: "bg-[#E7FDF3] text-[#0F973D]" }, // Mocking logic for "You" tag
    boosts: 3,
    referralId: "D234",
    amount: 1240,
    subText: "3 Boosts",
  },
  {
    id: 2,
    name: "Anonymous",
    avatar: "", // No avatar
    location: "Toronto",
    status: null,
    amount: 120,
    subText: "Referred 5 Friends",
    referredUsers: [1, 2, 3], // Mock for mini avatars
  },
  {
    id: 3,
    name: "Ben Smith",
    avatar: "https://placehold.co/40x40/png",
    location: "Toronto",
    status: null,
    amount: 140,
    subText: "+4 Friends Referred",
    referredUsers: [1, 2, 3],
  },
  {
    id: 4,
    name: "John Maguire",
    avatar: "https://placehold.co/40x40/png",
    location: "Toronto",
    status: { label: "$150", color: "bg-[#E7FDF3] text-[#0F973D]" },
    amount: 95,
    subText: "Referred 5 Friends",
    referredUsers: [1, 2, 3],
  },
];

const DashboardImpact = () => {
  return (
    <div className="w-full space-y-8">
      <div className="flex w-full items-center justify-center">
        <div className="max-w-159.5 gap-4 space-y-1 text-center">
          <h2 className="text-center text-[32px] leading-[100%] font-bold tracking-[0%] text-[#000000]">
            Referral Lineage
          </h2>
          <div className="w-full">
            <p className="text-2xl leading-[30.92px] font-normal tracking-[0%] text-[#82828A]">
              See how your referrals have spread and the impact they have inspired.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-[#F6F6F6] bg-[#FCFCFC] p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Referred Donations Card */}
          <div className="space-y-6 rounded-[10px] border border-[#ECEFF3] bg-white p-6">
            <div className="space-y-1">
              <h3 className="text-4xl font-bold text-[#12AA5B]">$3,250</h3>
              <p className="font-medium text-gray-500">Referred Donations</p>
            </div>
            <Button className="h-14 w-full justify-between border border-[#d2fff6] bg-[#E7FFFA] text-base font-medium text-[#12AA5B] hover:bg-[#d0fbe4]">
              <div className="flex items-center gap-2">
                <Trophy size={20} weight="fill" />
                Reach Milestones
              </div>
              <CaretRightIcon size={16} />
            </Button>
            <p className="text-sm text-gray-500">3 referrals away from a $100 boost</p>
          </div>

          {/* People Referred Card */}
          <div className="space-y-6 rounded-[10px] border border-[#ECEFF3] bg-white p-6">
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-semibold text-[#000000]">30</h3>
                <p className="font-medium text-gray-500">People Referred</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[60%] rounded-full bg-[#12AA5B]" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                + $280 <span className="text-gray-400">Bonus Earned</span>
              </span>
              <span>45 Days</span>
            </div>
            <Button className="h-12 w-full rounded-full bg-[#12AA5B] text-base font-medium text-white hover:bg-[#0da055]">
              Refer More Family <CaretRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <h3 className="text-[30px] leading-[150%] font-medium tracking-[0%] text-[#000000]">
            Direct Referrals
          </h3>
          <div className="space-y-4">
            {directReferrals.map((referral) => (
              <div
                key={referral.id}
                className={`flex items-center justify-between rounded-xl border border-[#ECEFF3] p-4 ${
                  referral.id === 1 ? "border-[#FFF9EA] bg-[#FFF9EA]" : "bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${referral.avatar ? "overflow-hidden" : "bg-[#FFD3D8]"}`}
                  >
                    {referral.avatar ? (
                      <img
                        src={referral.avatar}
                        alt={referral.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#FFD3D8]" />
                    )}
                    {referral.id === 1 && (
                      <div className="absolute -right-1 -bottom-1">
                        {/* Status dot or icon if needed */}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold text-[#1E1F24]">{referral.name}</p>
                      {referral.location && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={12} weight="fill" className="text-gray-400" />
                          {referral.location}
                        </div>
                      )}
                      {referral.status && (
                        <span
                          className={`textxs rounded px-2 py-0.5 font-medium ${referral.status.color}`}
                        >
                          {referral.status.label}
                        </span>
                      )}
                    </div>
                    {referral.subText && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {referral.referredUsers && (
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="h-6 w-6 rounded-full border-2 border-white bg-gray-200"
                              />
                            ))}
                          </div>
                        )}
                        <p>
                          {referral.id === 1
                            ? `${referral.boosts} Boosts D234`
                            : referral.id === 3
                              ? "$55 - +$85 referred"
                              : "$120 referred"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${referral.id === 1 || referral.id === 3 ? "text-[#12AA5B]" : "text-[#12AA5B]"}`}
                  >
                    ${referral.amount.toLocaleString()}
                  </p>
                  <p className="text-xs font-medium text-gray-400">
                    {referral.id === 1
                      ? "3 Boosts"
                      : referral.id === 3
                        ? "+4 Friends Referred"
                        : "Referred 5 Friends"}
                  </p>
                </div>
              </div>
            ))}

            {/* Volunteer Highlight Card */}
            <div className="space-y-4 rounded-xl bg-[#F0FDF4] p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
                  <img
                    src="https://placehold.co/48x48/png"
                    alt="Volunteer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-[#1E1F24]">Liz Jacob</p>
                    <span className="text-gray-500">Volunteer</span>
                  </div>
                  <p className="text-sm text-gray-500">24+ Referred</p>
                </div>
              </div>
              <p className="text-[#475467] italic">
                "This community is making Toronto greener, one tree at a time. I'm so proud to be
                part of it."
              </p>
              <p className="text-sm font-medium text-gray-500">— Liz Jacob - Volunteer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardImpact;
