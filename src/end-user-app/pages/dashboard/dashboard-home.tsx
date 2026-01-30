import { ArrowUpRightIcon, CaretRightIcon, CheckIcon } from "@phosphor-icons/react";

const DashboardHome = () => {
  const sampleImpactData = [
    {
      icon: <CheckIcon color="#02B128" size={16} weight="bold" />,
      title: "You shared help",
      subTitle: (
        <>
          <span className="font-medium text-[#000000]">4 people</span> are going to the Hall of Fame
          Dinner and Induction Ceremony
        </>
      ),
      period: "Today",
      iconBg: "#E7FFF4",
    },
    {
      icon: <CheckIcon color="#C58804" size={16} weight="bold" />,
      title: "You participated in Cast and Craft Festival",
      subTitle: "Earned 3XP for your participation",
      period: "",
      iconBg: "#FFF2D5",
    },
    {
      icon: <CheckIcon color="#C58804" size={16} weight="bold" />,
      title: "You reached Consistency Streak ",
      subTitle: "This week",
      period: "7 Days Active",
      iconBg: "#FFF2D5",
    },
  ];

  const happeningData = [
    {
      icon: <CheckIcon color="#C58804" size={16} weight="bold" />,
      title: "Salmon Museum & Friends Lotto",
      subTitle: "Event starting today",
      period: "2hrs ago",
      iconBg: "#FFF2D5",
    },
    {
      icon: <CheckIcon color="#02B128" size={16} weight="bold" />,
      title: (
        <>
          New Member joined{" "}
          <span className="font-medium text-[#000000] underline">ASM Bursaries</span>
        </>
      ),
      subTitle: "5 mins ago",
      period: "See More",
      iconBg: "#E7FFF4",
    },
  ];

  const nextStepsData = [
    {
      icon: <CheckIcon color="#C58804" size={16} weight="bold" />,
      title: "2 Polls are opened",
      subTitle: "35 people already voted",
      btnBg: "#12AA5B",
      btnBorder: "#9FE3BD",
      btnText: "Cast your votes",
      onClick: () => {},
      image: (
        <svg
          width="84"
          height="84"
          viewBox="0 0 84 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M83.1042 51.9732L83.1917 52.2316L83.2875 52.6482L83.3292 53.0649V80.2149C83.3289 80.9713 83.0542 81.7019 82.5562 82.2712C82.0581 82.8405 81.3705 83.2099 80.6208 83.3107L80.2042 83.3399H3.125C2.36984 83.3398 1.64024 83.0664 1.07112 82.57C0.502003 82.0737 0.131868 81.388 0.0291665 80.6399L0 80.2149V53.1315L0.00833372 52.9149L0.0500003 52.5566C0.09814 52.3392 0.163627 52.126 0.245833 51.919L11.7458 26.8399C11.9627 26.3658 12.2948 25.9535 12.7118 25.6406C13.1288 25.3276 13.6175 25.124 14.1333 25.0482L14.5833 25.0191L25.1667 25.0149L21.875 30.7232L21.5958 31.2649H16.5833L7.99167 50.0065H75.2917L66.8458 31.8982L70.4375 25.6607C70.7181 25.8718 70.9569 26.1274 71.1542 26.4274L71.375 26.8232L83.1042 51.9732ZM47.3542 0.239885L47.7375 0.427385L69.3542 12.9399C70.7208 13.7316 71.2625 15.4024 70.6833 16.8274L70.4958 17.2107L58.8 37.5065H63.5417C64.3391 37.4984 65.1094 37.7955 65.6949 38.3368C66.2804 38.8782 66.6369 39.6229 66.6912 40.4185C66.7455 41.2141 66.4936 42.0004 65.9871 42.6163C65.4806 43.2322 64.7578 43.6312 63.9667 43.7316L63.5417 43.7607L55.2 43.7565V43.7691H38.2042L38.1917 43.7565H19.7917C19.0049 43.7492 18.2498 43.4453 17.6772 42.9055C17.1047 42.3657 16.7569 41.6298 16.7032 40.8448C16.6496 40.0598 16.894 39.2834 17.3877 38.6708C17.8815 38.0581 18.5882 37.6543 19.3667 37.5399L19.7917 37.5107L27.3875 37.5065L26.6292 37.0691C25.976 36.6904 25.4819 36.0882 25.2383 35.3735C24.9948 34.6589 25.0182 33.8803 25.3042 33.1815L25.4875 32.7982L43.475 1.56488C44.2667 0.194052 45.9333 -0.351782 47.3542 0.231551M47.3125 7.39822L32.4542 33.2149L39.8625 37.5065H51.6L63.5375 16.7857L47.3125 7.39822Z"
            fill="#45D884"
          />
        </svg>
      ),
    },
    {
      icon: <CheckIcon color="#02B128" size={16} weight="bold" />,
      title: "Open Action",
      subTitle: "2 Campaigns in your Community",
      btnBg: "#ECA50D",
      btnBorder: "#FFF2D5",
      btnText: "Donations",
      onClick: () => {},
      image: "",
    },
  ];

  const activeCampaignsData = [
    {
      icon: <CheckIcon color="#02B128" size={16} weight="bold" />,
      title: "John Keith-King Collection",
      subTitle: "340+ Members",
      period: "",
      iconBg: "#E7FFF4",
    },
  ];

  return (
    <div className="flex w-full items-start gap-4">
      <div className="w-[55%] space-y-3">
        <div className="no-scrollbar h-[421px] overflow-y-auto rounded-[10px] bg-[#F6FAF9] p-6">
          <p className="mb-6 text-[24px] leading-[155%] font-medium tracking-[0%] text-[#000000]">
            Your Impact
          </p>
          <div className="space-y-6 rounded-[20px] border border-[#ECEFF3] bg-[#FFFFFF] p-6">
            {sampleImpactData?.map((impact, index) => {
              return (
                <div
                  className="flex items-start gap-4 border-b border-b-[#EBEBEB] pb-6 last:border-0 last:pb-0"
                  key={index}
                >
                  <div>
                    <div
                      style={{
                        backgroundColor: impact?.iconBg,
                      }}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ECEFF3]"
                    >
                      {impact?.icon}
                    </div>
                  </div>
                  <div className="w-full space-y-0.5">
                    <div className="flex w-full items-center justify-between">
                      <p className="line-clamp-1 text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                        {impact?.title}
                      </p>
                      <p className="text-base leading-[155%] font-normal tracking-[0%] text-[#9C9C9C]">
                        {impact?.period}
                      </p>
                    </div>
                    <p className="text-base leading-[155%] font-normal tracking-[0%] text-[#9C9C9C]">
                      {impact?.subTitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="no-scrollbar h-[421px] overflow-y-auto rounded-[10px] bg-[#F6FAF9] p-6">
          <p className="mb-3 text-[24px] leading-[155%] font-medium tracking-[0%] text-[#000000]">
            What’s Happening?
          </p>
          <div className="space-y-3">
            {happeningData?.map((impact, index) => {
              return (
                <div className="rounded-[20px] border border-[#ECEFF3] bg-[#FFFFFF] p-6">
                  <div className="flex items-start gap-4" key={index}>
                    <div>
                      <div
                        style={{
                          backgroundColor: impact?.iconBg,
                        }}
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ECEFF3]"
                      >
                        {impact?.icon}
                      </div>
                    </div>
                    <div className="w-full space-y-0.5">
                      <div className="flex w-full items-center justify-between">
                        <p className="text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                          {impact?.title}
                        </p>
                        <p className="text-base leading-[155%] font-normal tracking-[0%] text-[#9C9C9C]">
                          {impact?.period}
                        </p>
                      </div>
                      <p className="text-base leading-[155%] font-normal tracking-[0%] text-[#9C9C9C]">
                        {impact?.subTitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[45%] space-y-3">
        <div className="h-[445px] rounded-[10px] bg-[#F6FAF9] p-4.5">
          <p className="mb-4 flex items-center justify-between border-b border-b-[#D7D7D7] pb-2 text-[24px] leading-[155%] font-medium tracking-[0%] text-[#000000]">
            Next Steps
            <div>
              <CaretRightIcon weight="bold" color="#919191" size={18} />
            </div>
          </p>
          <div className="space-y-3">
            {nextStepsData?.map((nextStep, index) => {
              return (
                <div className="rounded-[20px] border border-[#ECEFF3] bg-[#FFFFFF] p-6">
                  <div className="flex items-start gap-4" key={index}>
                    <div className="w-full space-y-0.5">
                      <p className="text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                        {nextStep?.title}
                      </p>
                      <p className="text-base leading-[155%] font-normal tracking-[0%] text-[#9C9C9C]">
                        {nextStep?.subTitle}
                      </p>
                      <button
                        style={{
                          backgroundColor: nextStep?.btnBg,
                        }}
                        className="mt-3 flex h-11 w-full max-w-[186px] cursor-pointer items-center justify-center gap-3 rounded-[100px] text-base leading-[155%] font-normal tracking-[0%] text-[#9C9C9C] text-white"
                      >
                        {nextStep?.btnText}
                        <div>
                          <ArrowUpRightIcon weight="bold" size={18} />
                        </div>
                      </button>
                    </div>

                    {nextStep?.image !== "" && <div>{nextStep?.image}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-[445px] rounded-[10px] bg-[#F6FAF9] p-4.5">
          <p className="mb-4 text-[24px] leading-[155%] font-medium tracking-[0%] text-[#000000]">
            Active Campaigns
          </p>
          <div className="space-y-3">
            {activeCampaignsData?.map((activeCampaign, index) => {
              return (
                <div className="rounded-[20px] border border-[#ECEFF3] bg-[#FFFFFF] p-6">
                  <div className="flex items-start gap-4" key={index}>
                    <div>
                      <div
                        style={{
                          backgroundColor: activeCampaign?.iconBg,
                        }}
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ECEFF3]"
                      >
                        {activeCampaign?.icon}
                      </div>
                    </div>
                    <div className="w-full space-y-0.5">
                      <div className="flex w-full items-center justify-between">
                        <p className="text-lg leading-[155%] font-normal tracking-[0%] text-[#000000]">
                          {activeCampaign?.title}
                        </p>
                        <p className="text-base leading-[155%] font-normal tracking-[0%] text-[#9C9C9C]">
                          {activeCampaign?.period}
                        </p>
                      </div>
                      <p className="text-base leading-[155%] font-normal tracking-[0%] text-[#9C9C9C]">
                        {activeCampaign?.subTitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
