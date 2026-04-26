import EmptyState from "@/components/reusable/empty-state";
import { Button } from "@/components/ui/button";
import { cn, getCurrencySymbol } from "@/lib/utils";
import { ArrowRightIcon, ArrowUpRightIcon, CaretRightIcon, TimerIcon } from "@phosphor-icons/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getTimeProgress,
  getTimeRemaining,
  getTruncatedText,
  MAX_LENGTH,
} from "./dashboard-campaigns";
import { useMemo } from "react";
import { getEndUserFromLocalStorage } from "@/end-user-app/services/local-storage";
import { useGetPublicSimilarCampaigns } from "@/pages/community/services";

const SimilarCampaigns = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isPublic = location.pathname.includes("public");
  // const [selectedCampaign, setSelectedCampaign] = useState<any | null>()

  const endUser = useMemo(() => {
    return getEndUserFromLocalStorage();
  }, []);

  const { data } = useGetPublicSimilarCampaigns(campaignId);
  //   isPending: similarCampaignsPending;
  const similarCampaigns = data?.data;

  return (
    <div className={cn("pb-6", isPublic ? "mx-auto mt-4 max-w-[1200px]" : "")}>
      {isPublic && (
        <svg
          className="mx-auto mb-[30px]"
          width="169"
          height="41"
          viewBox="0 0 169 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2723_1926)">
            <path
              d="M2.67442 18.4453C4.23834 16.1245 6.25082 14.313 8.68762 13.006C11.1511 11.6989 13.7213 11.1125 16.4223 11.2194C18.5561 11.3039 20.5734 11.9226 22.4937 13.0954C23.4297 13.6669 23.8006 14.8497 23.3642 15.8586L21.4778 20.222C20.7261 21.9589 18.2966 21.9887 17.4941 20.2766C16.5145 18.1919 15.6077 16.6736 14.7808 15.7269C13.4036 14.154 12.264 13.6471 11.3887 14.2335C10.4867 14.7926 9.90481 16.0201 9.61385 17.8614C9.29622 19.7026 9.34956 21.7278 9.77388 23.9691C10.1715 26.208 10.9668 28.1834 12.184 29.9427C13.4036 31.702 15.0718 32.7705 17.2176 33.1705C18.3306 33.3817 19.5987 33.2823 21.0098 32.8773C23.0199 32.3008 24.6541 34.6416 23.3715 36.3039C23.3618 36.3188 23.3496 36.3312 23.34 36.3462C22.2537 37.76 20.9298 38.7987 19.3926 39.492C17.8287 40.1852 16.3448 40.5331 14.9142 40.5331C12.1864 40.5331 9.72054 39.892 7.49711 38.6397C5.27125 37.36 3.49639 35.6802 2.17252 33.5457C0.848645 31.4112 0.186707 29.0382 0.186707 26.4515C0.288542 23.4572 1.11051 20.791 2.67442 18.4453Z"
              fill="#12AA5B"
            />
            <path
              d="M49.1167 13.1898C51.3692 14.5241 53.1707 16.3107 54.4946 18.5496C55.8452 20.7884 56.5338 23.2708 56.5338 25.9892C56.5338 28.7101 55.8452 31.2148 54.4946 33.4288C53.1707 35.6702 51.3692 37.4568 49.1167 38.7887C46.8375 40.123 44.3207 40.8163 41.5929 40.8163C38.8385 40.8163 36.3217 40.123 34.0425 38.7887C31.7899 37.4543 30.0151 35.6677 28.6645 33.4288C27.314 31.2148 26.6254 28.7076 26.6254 25.9892C26.6254 23.2683 27.314 20.7884 28.6645 18.5496C30.0151 16.3082 31.7899 14.5216 34.0425 13.1898C36.3217 11.8827 38.8385 11.1895 41.5929 11.1895C44.3207 11.1895 46.8375 11.8827 49.1167 13.1898ZM37.2212 13.8308C36.3192 13.965 35.7106 14.6583 35.3397 15.8833C34.9687 17.1108 34.8887 18.6838 35.1287 20.5772C35.313 22.498 35.8173 24.5505 36.6126 26.844C37.4079 29.1375 38.3608 31.1378 39.4471 32.9244C40.5066 34.711 41.6196 36.0976 42.7058 37.0319C43.8454 38.0184 44.8517 38.4731 45.7779 38.3116C46.6532 38.1774 47.2885 37.4841 47.6328 36.2591C47.9771 35.0862 48.0571 33.5133 47.8437 31.5925C47.6328 29.6718 47.1551 27.5919 46.3598 25.2984C45.5378 23.0049 44.6116 21.0046 43.5254 19.2453C42.4658 17.4861 41.3529 16.0995 40.2399 15.1105C39.2604 14.2582 38.3584 13.8035 37.5388 13.8035C37.4346 13.8035 37.3279 13.8035 37.2212 13.8308Z"
              fill="#12AA5B"
            />
            <path
              d="M69.8089 9.51922C69.7774 10.625 69.7337 11.527 69.6779 12.2302C69.6294 12.8315 70.0998 13.3409 70.6987 13.3335C71.2879 13.326 72.0008 13.3161 72.573 13.3086C73.138 13.3012 73.5986 13.7609 73.5986 14.3274C73.5986 14.8915 73.1452 15.3487 72.5851 15.3487H70.4005C69.9131 15.3487 69.4937 15.6966 69.404 16.1786C69.0984 17.8236 68.8899 19.7493 68.776 21.9087C68.6159 24.4681 68.6959 26.7889 68.9869 28.8687C69.2779 30.9486 69.8865 32.5761 70.8418 33.7216C71.4771 34.487 72.3014 34.9417 73.3295 35.0833C74.0884 35.1877 74.4764 36.0524 74.0375 36.6836C72.5851 38.7684 70.8685 40.0282 68.856 40.4158C66.3804 40.9202 63.9824 40.1847 61.662 38.2366C61.6353 38.2143 61.611 38.1919 61.5868 38.167C60.2581 36.8923 59.504 35.2772 59.3706 33.3489C59.2106 31.4281 59.2373 29.4552 59.4773 27.4275C59.5573 26.5727 59.6374 25.7478 59.6616 24.9476C59.8459 22.5199 59.8725 20.4675 59.7149 18.815C59.5889 17.503 59.3124 16.4917 58.8712 15.8109C58.6845 15.5201 58.362 15.3487 58.0201 15.3487H57.443C56.8829 15.3487 56.4295 14.8915 56.4295 14.3274V14.1659C56.4295 13.6888 56.7593 13.2813 57.22 13.1719C57.9837 12.9881 59.1451 12.6029 60.6945 12.0165C62.947 11.1369 64.8019 10.2572 66.2591 9.3751C67.0011 8.92534 67.7018 8.52528 68.3565 8.17243C69.0718 7.7848 69.9253 8.36128 69.8404 9.17383C69.8307 9.26328 69.821 9.35273 69.8137 9.44467C69.8113 9.46952 69.8089 9.49437 69.8089 9.51922Z"
              fill="#12AA5B"
            />
            <path
              d="M97.4163 13.9073C99.5039 15.5895 100.743 17.97 101.16 21.0239C101.172 21.1158 101.179 21.2102 101.184 21.3022C101.264 23.5833 100.76 25.3773 99.6688 26.6819C98.5825 28.0411 97.1786 28.8959 95.4305 29.2686C93.6823 29.6413 91.8807 29.5345 90.0259 28.9481C88.171 28.3616 86.5295 27.3205 85.1256 25.7749C83.7896 24.3561 82.8925 22.5173 82.4124 20.2834C82.3614 20.0523 82.102 19.938 81.9032 20.0647C81.7989 20.1318 81.7383 20.2511 81.7456 20.3778C81.9032 22.5695 82.536 24.6344 83.6659 26.575C84.8055 28.5753 86.3161 30.2278 88.171 31.4826C90.0259 32.7623 92.0383 33.4282 94.2642 33.5102C95.0595 33.5376 95.8572 33.463 96.6598 33.2792C98.7523 32.7996 100.365 35.1304 99.1014 36.8772C99.0699 36.9195 99.0384 36.9617 99.0069 37.0039C97.8939 38.4178 96.5967 39.4316 95.0595 40.0181C93.5489 40.6318 91.9874 40.8977 90.4235 40.8704C88.1443 40.843 85.9184 40.3908 83.7484 39.4838C81.5492 38.5769 79.721 37.1108 78.2371 35.031C76.7265 32.9785 75.907 30.2029 75.6936 26.7092C75.5093 24.3089 75.8536 22.1222 76.7532 20.1219C77.6794 18.0942 78.9524 16.3623 80.5939 14.9484C82.262 13.5097 84.0902 12.4685 86.1318 11.8275C87.4024 11.4547 88.6753 11.2684 89.9458 11.2932C92.7803 11.3205 95.2704 12.2027 97.4163 13.9073Z"
              fill="#12AA5B"
            />
            <path
              d="M124.546 12.3897C124.561 12.3996 124.573 12.4096 124.587 12.417C126.726 13.8806 127.313 16.8003 126.01 19.0466L125.142 20.545C124.09 22.3589 121.561 22.5552 120.247 20.9227L120.203 20.868C118.719 19.0267 117.289 18.2266 115.912 18.495C114.534 18.736 113.739 19.9088 113.502 22.0408C113.264 24.148 113.264 26.521 113.528 29.1351C113.766 31.7491 114.083 34.1495 114.43 36.3088L114.44 36.3734C114.782 38.5228 113.133 40.4685 110.973 40.4685H107.057C104.889 40.4685 103.197 38.575 103.437 36.4057C103.524 35.6131 103.614 34.7359 103.701 33.7743C104.019 30.6011 104.125 27.2143 103.992 23.5864C103.946 22.0309 103.808 20.5599 103.58 19.1733C103.1 16.2561 104.923 13.4582 107.791 12.822L112.226 11.838C113.087 11.6467 113.715 12.6382 113.182 13.3439C113.174 13.3538 113.167 13.3637 113.16 13.3737C112.391 14.3875 111.729 15.774 111.147 17.4811C110.626 19.0764 110.454 20.9997 110.628 23.2286C110.65 23.492 110.871 23.6957 111.133 23.6957C111.407 23.6957 111.625 23.4796 111.637 23.2037C111.7 21.7203 111.935 20.1573 112.364 18.5496C112.815 16.7357 113.848 15.0833 115.436 13.5899C117 12.1238 118.562 11.3237 120.152 11.1895C121.712 11.0578 123.169 11.4579 124.546 12.3897Z"
              fill="#12AA5B"
            />
            <path
              d="M134.039 11.572C131.282 12.1758 129.492 14.837 129.907 17.6474C129.994 18.2413 130.072 18.8749 130.137 19.5483C130.469 22.6792 130.554 26.1481 130.443 29.9226C130.394 31.6123 130.3 33.2597 130.164 34.8625C129.895 38.0008 132.385 40.687 135.513 40.687H136.003C139.181 40.687 141.645 37.9039 141.298 34.7208C140.956 31.5849 140.699 28.6031 140.527 25.7803C140.365 23.1116 140.355 20.2143 140.496 17.0759C140.656 13.5499 137.465 10.819 134.039 11.572Z"
              fill="#12AA5B"
            />
            <path
              d="M149.53 20.0681C149.729 19.9414 149.988 20.0557 150.039 20.2868C150.519 22.5206 151.416 24.3594 152.752 25.7783C154.156 27.3239 155.798 28.365 157.653 28.9514C159.507 29.5379 161.309 29.6447 163.057 29.272C164.805 28.8993 166.209 28.0445 167.295 26.6853C168.387 25.3782 168.891 23.5841 168.811 21.3055C168.808 21.2136 168.799 21.1192 168.787 21.0272C168.37 17.9734 167.131 15.5929 165.043 13.9106C162.897 12.2035 160.407 11.3239 157.573 11.2966C156.302 11.2692 155.029 11.4556 153.759 11.8308C151.719 12.4719 149.891 13.5106 148.221 14.9518C146.579 16.3657 145.306 18.0976 144.38 20.1252C143.48 22.1255 143.134 24.3122 143.32 26.7126C143.531 30.2063 144.353 32.9794 145.864 35.0344C147.348 37.1142 149.176 38.5802 151.375 39.4872C153.548 40.3942 155.773 40.8464 158.05 40.8738C159.614 40.9011 161.176 40.6352 162.686 40.0214C164.223 39.435 165.521 38.4212 166.634 37.0073C166.665 36.9651 166.697 36.9228 166.728 36.8806C167.994 35.1338 166.381 32.803 164.286 33.2825C163.484 33.4664 162.686 33.5434 161.891 33.5136C159.665 33.4341 157.653 32.7657 155.798 31.486C153.943 30.2336 152.432 28.5787 151.293 26.5784C150.163 24.6377 149.53 22.5728 149.372 20.3812C149.365 20.2545 149.426 20.1352 149.53 20.0681ZM152.047 16.9496C152.127 15.5904 152.575 14.7083 153.424 14.256C153.928 14.0697 154.457 14.0697 154.961 14.2287C156.552 14.8151 157.929 16.2812 159.069 18.6815C159.81 20.334 160.128 21.8274 160.048 23.1891C159.968 24.5483 159.52 25.4304 158.671 25.8553C157.798 26.2281 156.816 25.9895 155.756 25.1347C154.697 24.3072 153.795 23.0822 153.029 21.4546C152.284 19.8022 151.967 18.2815 152.047 16.9496Z"
              fill="#12AA5B"
            />
            <path
              d="M134.805 9.24818C137.336 9.24818 139.387 7.18337 139.387 4.6363C139.387 2.08922 137.336 0.0244141 134.805 0.0244141C132.274 0.0244141 130.222 2.08922 130.222 4.6363C130.222 7.18337 132.274 9.24818 134.805 9.24818Z"
              fill="#12AA5B"
            />
          </g>
          <defs>
            <clipPath id="clip0_2723_1926">
              <rect width="169" height="41" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      <div className="mb-9 flex items-center justify-between rounded-[8px] border border-[#DAFFA2] bg-[#F7FEE7] px-6 py-3">
        <p className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
          {isPublic ? (
            <>
              See the impact of your donation —{" "}
              <span className="font-semibold">
                <Link to="/user/signup">Join Coterie</Link>
              </span>{" "}
              for free & get updates, track your influence, and see who else you inspired to give
            </>
          ) : (
            <>You are viewing campaigns similar to the one you just donated to.</>
          )}
        </p>
        <Button
          onClick={() => navigate(isPublic ? "/user/signup" : "/user/dashboard?tab=campaigns")}
          className="mt-4 flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FFFFFF] px-6 py-2 text-sm font-medium text-[#3F3F46] hover:bg-[#FFFFFF]/90"
        >
          {isPublic ? (
            <>
              Join Coterie
              <ArrowUpRightIcon className="h-4 w-4" />
            </>
          ) : (
            <>
              View All Campaigns
              <ArrowRightIcon className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="">
        {similarCampaigns?.length === 0 ? (
          <EmptyState
            title="No campaigns yet."
            description="When campaigns are available, they will show up here."
            descriptionClassName="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]"
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(0,388px))]">
            {similarCampaigns?.map((campaign: any) => {
              // Calculate progress based on campaign type
              const progress =
                campaign?.type?.toLowerCase() === "time"
                  ? getTimeProgress(campaign?.startDate, campaign?.endDate)
                  : Math.min((campaign.totalRaisedCents / campaign.goalAmountCents) * 100, 100);
              return (
                <div
                  onClick={() => navigate(`/user/dashboard/campaign/${campaign?.id}`)}
                  key={campaign.id}
                  className="flex cursor-pointer gap-3 rounded-[6px] border border-[#E4E4E4] p-3 transition-all duration-300 lg:block lg:max-w-[413px] lg:rounded-[32px] lg:p-3"
                >
                  <div>
                    <div className="relative h-30 w-30 overflow-hidden rounded-[12px] bg-gray-100 lg:h-[272px] lg:w-full lg:rounded-[32px]">
                      <img
                        src={campaign?.imageUrl}
                        alt={campaign?.name + "image"}
                        className="h-full w-full object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-black/30" />

                      {/* Time remaining badge for Time campaigns */}
                      {campaign?.type?.toLowerCase() === "time" &&
                        campaign?.endDate &&
                        (() => {
                          const timeInfo = getTimeRemaining(campaign?.endDate);
                          return (
                            <div
                              className={`absolute bottom-3 left-2 flex items-center gap-1 rounded-full px-4 py-[7px] shadow-sm lg:left-3 ${
                                timeInfo.isUrgent
                                  ? "bg-[#FFF5F5] text-[#DF1C41]"
                                  : "bg-[#F2FFF4] text-[#12AA5B]"
                              }`}
                            >
                              <div>
                                <TimerIcon className="hidden lg:block" weight="fill" size={16} />
                              </div>

                              <span className="text-xs font-normal">{timeInfo.text}</span>
                            </div>
                          );
                        })()}
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="mb-2.5 flex items-center justify-between lg:mt-4">
                      <h2 className="line-clamp-1 text-sm leading-[120%] font-semibold tracking-[-0.5%] text-[#0F0F0F] lg:text-base lg:font-medium">
                        {campaign?.name}
                      </h2>
                    </div>

                    <p className="hidden w-full text-base leading-[24px] font-normal tracking-[-0.5%] text-[#404040] lg:inline-block lg:max-h-10">
                      {getTruncatedText(campaign?.description)}{" "}
                      {campaign?.description?.length > MAX_LENGTH && (
                        <span
                          className="cursor-pointer text-[#12AA5B]"
                          onClick={(e) => {
                            e.stopPropagation();
                            // handle expand
                          }}
                        >
                          Learn more
                        </span>
                      )}
                    </p>

                    {/* Progress Bar Custom */}
                    <div className="mt-2.5 mb-2.5 h-[9px] w-full overflow-hidden rounded-full bg-[#F3E9D8] lg:mt-3">
                      <div
                        className="h-full rounded-full bg-[#7CE993] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="mb-2.5 flex items-center justify-between gap-4">
                      <div className="flex w-full items-center gap-3">
                        {campaign?.type?.toLowerCase() === "time" ? (
                          <div className="flex flex-col gap-1 leading-[155%] font-normal tracking-[0%] lg:flex-row lg:items-end">
                            <span className="text-sm font-semibold text-[#0F0F0F] lg:text-[20px] lg:font-medium">
                              {getCurrencySymbol(campaign?.goalCurrency)}
                              {(campaign?.totalRaisedCents / 100)?.toLocaleString()}
                            </span>
                            <span className="text-xs font-normal text-[#666D80] lg:mb-1">
                              raised so far
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1 leading-[155%] font-normal tracking-[0%] lg:flex-row lg:items-end">
                            <span className="text-sm font-semibold text-[#0F0F0F] lg:text-[20px] lg:font-medium">
                              {getCurrencySymbol(campaign?.goalCurrency)}
                              {(campaign?.totalRaisedCents / 100)?.toLocaleString()}
                            </span>
                            <span className="text-xs font-normal text-[#666D80] lg:mb-1">
                              raised of {getCurrencySymbol(campaign?.goalCurrency)}
                              {campaign?.goalAmountCents
                                ? (campaign?.goalAmountCents / 100)?.toLocaleString()
                                : "0"}{" "}
                              goal
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-[#12AA5B]">{progress?.toFixed(0)}%</p>
                    </div>
                    <Button
                      variant={"outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        // setSelectedCampaign(campaign);
                        navigate(`/user/donate/${campaign?.slug}?userId=${endUser?.id}`);
                      }}
                      className="hidden h-[56px] w-full rounded-full border border-[#E5E5E5] bg-[#12AA5B] px-4 text-white hover:bg-[#12AA5B]/80 lg:flex lg:items-center lg:justify-between"
                    >
                      <div className="flex items-center text-base font-medium text-white">
                        Donate
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                        <ArrowRightIcon size={14} weight="bold" className="text-[#0F0F0F]" />
                      </div>
                    </Button>
                  </div>
                  <Button
                    onClick={() => {
                      //   setSelectedCampaign(campaign);
                      navigate(`/user/donate/${campaign?.slug}?userId=${endUser?.id}`);
                    }}
                    className="hidden h-10 rounded-full bg-[#12AA5B] px-4 text-white hover:bg-[#00b05b] lg:hidden"
                  >
                    <div className="flex items-center text-sm font-medium">
                      Donate
                      <CaretRightIcon size={14} weight="bold" className="text-white" />
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarCampaigns;
