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
              <h3 className="text-[50px] leading-[150%] font-medium text-[#12AA5B]">$3,250</h3>
              <p className="text-2xl leading-[150%] font-normal text-[#888787]">
                Referred Donations
              </p>
            </div>
            <Button className="h-14 w-full max-w-102.75 justify-center rounded-[20px] border border-[#BDFFCA] bg-[#DCFFE3] text-lg leading-[150%] font-medium text-[#02B128] hover:bg-[#d0fbe4]">
              <div className="flex items-center gap-4">
                <Trophy size={24} weight="fill" />
                Reach Milestones
                <CaretRightIcon size={24} className="ml-2" />
              </div>
            </Button>
            <p className="text-2xl leading-[150%] font-normal text-[#888787]">
              3 referrals away from reaching the next level
            </p>
          </div>

          {/* People Referred Card */}
          <div className="space-y-6 rounded-[10px] border border-[#ECEFF3] bg-white p-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[50px] leading-[150%] font-medium text-[#000000]">30</h3>
                <p className="text-2xl leading-[150%] font-normal text-[#888787]">
                  People Referred
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[60%] rounded-full bg-[#12AA5B]" />
              </div>
            </div>
            <div className="flex items-center justify-between text-2xl leading-[150%] font-normal text-[#888787]">
              <span className="flex items-center gap-6">
                Amplifier Badge Earned
                {/* + $280 <span className="text-gray-400">Bonus Earned</span> */}
              </span>
              <span>45 Days</span>
            </div>
            <Button className="h-14 w-full rounded-[20px] border border-[#BDFFCA] bg-[#12AA5B] text-lg font-medium text-white hover:bg-[#0da055]">
              Refer More Family <CaretRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <h3 className="text-[30px] leading-[150%] font-medium tracking-[0%] text-[#000000]">
            Direct Referrals
          </h3>
          <div className="rounded-[10px] border border-[#ECEFF3] bg-white">
            <div className="p-6">
              {directReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className={`flex items-center justify-between border-b py-6 last:border-b-0`}
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
                        <div className="h-full w-full rounded-full bg-[#FFD3D8]" />
                      )}
                      {referral.id === 1 && (
                        <div className="absolute -right-1 -bottom-1">
                          {/* Status dot or icon if needed */}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-lg leading-[150%] font-normal tracking-[0%] text-[#000000]">
                          {referral.name}
                        </p>
                        {referral.location && (
                          <div className="flex items-center gap-1 text-base leading-[150%] font-normal text-[#888787]">
                            <MapPin size={16} weight="fill" className="text-gray-400" />
                            {referral.location}
                          </div>
                        )}
                        {referral.status && (
                          <span
                            className={`rounded px-2 py-0.5 text-xs font-normal ${referral.status.color}`}
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
                          <p className="text-base leading-[150%] font-normal text-[#888787]">
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
                      className={`text-lg leading-[150%] font-normal tracking-[0%] ${referral.id === 1 || referral.id === 3 ? "text-[#12AA5B]" : "text-[#12AA5B]"}`}
                    >
                      ${referral.amount.toLocaleString()}
                      {/* <CaretRightIcon size={14} color="#000000" /> */}
                    </p>
                    <p className="text-sm font-medium text-[#888787]">
                      {referral.id === 1
                        ? "3 Boosts"
                        : referral.id === 3
                          ? "+4 Friends Referred"
                          : "Referred 5 Friends"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Volunteer Highlight Card */}
            <div className="space-y-4 rounded-b-[10px] border-t border-t-[#F6F6F6] bg-[#EEFFF1] p-6">
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
                    <p className="text-lg leading-[150%] font-normal tracking-[0%] text-[#000000]">
                      Liz Jacob
                    </p>
                    <span className="text-base leading-[150%] font-normal text-[#595959]">
                      Volunteer
                    </span>
                  </div>
                  <p className="text-base leading-[150%] font-normal text-[#595959]">
                    24+ Referred
                  </p>
                </div>
              </div>
              <p className="text-base leading-[150%] font-normal text-[#595959]">
                "This community is making Toronto greener, one tree at a time. I'm so proud to be
                part of it."
              </p>
              <p className="text-base leading-[150%] font-normal text-[#595959]">
                — Liz Jacob - Volunteer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardImpact;
