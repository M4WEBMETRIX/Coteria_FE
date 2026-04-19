import { useEffect, useMemo } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueryState } from "nuqs";
import { ArrowRightIcon, CreditCardIcon, CheckCircleIcon, XIcon } from "@phosphor-icons/react";
import Logo from "@/assets/icons/coterie.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetPublicCampaign, useCreateDonation } from "./services";
import { getCurrencySymbol, getBaseUrl } from "@/lib/utils";
import { getEndUserFromLocalStorage } from "@/end-user-app/services/local-storage";

const PRESET_AMOUNTS = [50, 100, 150, 500, 800, 1000];

const formSchema = z.object({
  amount: z
    .number({ required_error: "Amount is required", invalid_type_error: "Amount must be a number" })
    .min(1, "Amount must be greater than 0"),
  donorEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  isAnonymous: z.boolean().default(false),
  joinCoterie: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const DonatePage = () => {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [userId] = useQueryState("userId");
  const [referralCode] = useQueryState("referral-code");

  const endUser = useMemo(() => {
    return getEndUserFromLocalStorage();
  }, []);

  const { data: publicCampaignData, isPending } = useGetPublicCampaign(campaignId);
  const campaign = publicCampaignData?.data;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: { amount: 0, donorEmail: "", isAnonymous: false, joinCoterie: true },
  });

  useEffect(() => {
    if (endUser) {
      setValue("donorEmail", endUser?.email);
    }
  }, [endUser]);

  const amount = useWatch({ control, name: "amount" });
  const isAnonymous = useWatch({ control, name: "isAnonymous" });
  const joinCoterie = useWatch({ control, name: "joinCoterie" });

  const safeCurrency = campaign?.goalCurrency || "CAD";
  const currencySymbol = getCurrencySymbol(safeCurrency);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: safeCurrency,
    minimumFractionDigits: 2,
  }).format(amount || 0);

  const {
    mutate: createDonation,
    isPending: createDonationPending,
    isSuccess,
    data,
  } = useCreateDonation(campaignId);

  const successUrl = userId
    ? `${getBaseUrl({ target: "donor" })}/user/donation-success`
    : `${getBaseUrl({ target: "donor" })}/campaign/public/donation-success`;
  const cancelUrl = userId
    ? `${getBaseUrl({ target: "donor" })}/user/dashboard?tab=community`
    : `${getBaseUrl({ target: "donor" })}/community/public/campaign/${campaignId}`;

  const onSubmit = (values: FormValues) => {
    const payload = {
      slug: campaignId,
      amountCents: Number((values.amount * 100).toFixed(0)),
      currency: safeCurrency,
      ...(referralCode && { referralCode }),
      ...(userId ? { donorUserId: userId } : { donorEmail: values.donorEmail }),
      successUrl,
      cancelUrl,
    };
    createDonation(payload);
  };

  useEffect(() => {
    if (isSuccess) navigate(data?.data?.checkoutUrl);
  }, [isSuccess]);

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9F9F9]">
        <Link to="/dashboard">
          <img src={Logo} alt="Coterie" className="h-auto w-[120px]" />
        </Link>
        <div className="mt-6 min-h-[75vh] w-full max-w-[560px] animate-pulse space-y-6 rounded-[24px] bg-white p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="h-[100px] w-[100px] rounded-[12px] bg-gray-200" />
            <div className="flex-1 space-y-2 pt-2">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-6 w-48 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-20 rounded-[12px] bg-gray-200" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-9 flex-1 rounded-full bg-gray-200" />
            ))}
          </div>
          <div className="h-14 rounded-[12px] bg-gray-200" />
          <div className="h-14 rounded-[12px] bg-gray-200" />
          <div className="h-14 rounded-full bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9F9F9] px-4 py-10">
      <Link to="/dashboard">
        <img src={Logo} alt="Coterie" className="h-auto w-[120px]" />
      </Link>
      <div className="mt-10 w-full max-w-[634px] rounded-[24px] border border-[#E5E5E5] bg-white p-7">
        {/* Campaign Header */}
        <div className="mb-6 flex gap-4">
          <div className="h-[160px] w-[160px] shrink-0 overflow-hidden rounded-[12px] bg-gray-100">
            {campaign?.campaignImageUrl && (
              <img
                src={campaign.campaignImageUrl}
                alt={campaign.campaignName}
                className="h-full w-full object-cover grayscale"
              />
            )}
          </div>
          <div className="flex flex-col py-[17.5px]">
            <p className="mb-2.5 text-sm font-normal text-[#000000]">
              {campaign?.donationsCount
                ? `${campaign.donationsCount >= 1000 ? (campaign.donationsCount / 1000).toFixed(1) + "K" : campaign.donationsCount} donations`
                : "0 donations"}
            </p>
            <h1 className="mb-2.5 text-[22px] leading-[130%] font-semibold text-[#0F0F0F]">
              {campaign?.campaignName}
            </h1>
            <p className="text-sm text-[#525252]">{campaign?.community?.name}</p>
            {campaign?.charityNumber && (
              <p className="text-sm text-[#525252]">{campaign.charityNumber}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Amount Input */}
          <div className="relative rounded-[20px] border border-[#E5E5E5] bg-[#FAFAFA] px-3 pt-4 pb-4">
            <label className="mb-1 block text-sm font-normal text-[#737373]">Enter Donation</label>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] font-medium text-[#0F0F0F]">{currencySymbol}</span>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field }) => (
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="0"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      className="w-full bg-transparent text-[32px] font-semibold text-[#0F0F0F] outline-none placeholder:text-[#C0C0C0]"
                    />
                  )}
                />
              </div>
              {amount > 0 && (
                <button
                  type="button"
                  onClick={() => setValue("amount", 0)}
                  className="cursor-pointer text-[#0F0F0F] hover:text-[#0F0F0F]"
                >
                  <XIcon size={20} />
                </button>
              )}
            </div>
            {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>}
          </div>

          {/* Preset Amounts */}
          <div className="mb-5 flex flex-wrap gap-2">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setValue("amount", preset)}
                className={`cursor-pointer rounded-full border px-4 py-[14px] text-sm font-medium transition-all ${
                  amount === preset
                    ? "border-[#12AA5B] bg-[#12AA5B] text-white"
                    : "border-[#E4E4E4] bg-white text-[#0F0F0F] hover:border-[#12AA5B]"
                }`}
              >
                {currencySymbol}
                {preset.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Email — only for guests */}
          {/* {!userId && ( */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-[#0F0F0F]">Email Address</label>
            <Input
              placeholder="e.g johndoe@gmail.com"
              className="h-[52px] rounded-[20px] border-[#E5E5E5] bg-[#FAFAFA] text-sm placeholder:text-[#C0C0C0]"
              {...register("donorEmail")}
            />
            {errors.donorEmail && (
              <p className="mt-1 text-xs text-red-500">{errors.donorEmail.message}</p>
            )}
          </div>
          {/* )} */}

          {/* Payment Method */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#0F0F0F]">Payment Method</label>
            <div className="flex items-center justify-between rounded-full border border-[#E5E5E5] bg-[#FFFFFF] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#F5F5F5]">
                  <CreditCardIcon size={18} className="text-[#6B6B6B]" />
                </div>
                <span className="text-base font-medium text-[#0F0F0F]">Credit Card</span>
              </div>
              <div className="h-5 w-5 rounded-full border-2 border-[#E5E5E5] bg-white" />
            </div>
          </div>

          {/* Summary */}
          <div className="mt-5">
            <div className="flex items-center justify-between pb-4">
              <span className="text-sm font-medium text-[#0F0F0F]">Your donation</span>
              <span className="text-sm font-medium text-[#0F0F0F]">{formattedAmount}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-4">
              <span className="text-sm font-medium text-[#0F0F0F]">Total</span>
              <span className="text-sm font-medium text-[#0F0F0F]">{formattedAmount}</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-5">
            {/* Anonymous */}
            <label className="flex cursor-pointer items-center gap-3">
              <button
                type="button"
                onClick={() => setValue("isAnonymous", !isAnonymous)}
                className="cursor-pointer"
                // mt-0.5 shrink-0
                // className={`relative h-6 w-11 rounded-full transition-colors ${
                //   isAnonymous ? "bg-[#12AA5B]" : "bg-[#E4E4E4]"
                // }`}
              >
                {/* <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    isAnonymous ? "translate-x-5.5" : "translate-x-0.5"
                  }`}
                /> */}

                {isAnonymous ? (
                  <CheckCircleIcon size={24} weight="fill" className="text-[#45D884]" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-1 border-[#E4E4E4] bg-[#F6F8FA]" />
                )}
              </button>
              <span className="text-sm text-[#404040]">Keep this donation anonymous</span>
            </label>

            {/* Join Coterie */}
            {!userId && (
              <label className="flex cursor-pointer items-start gap-3">
                <button
                  type="button"
                  onClick={() => setValue("joinCoterie", !joinCoterie)}
                  className="cursor-pointer p-0"
                >
                  {joinCoterie ? (
                    <div>
                      <CheckCircleIcon size={24} weight="fill" className="text-[#45D884]" />
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full border-1 border-[#E4E4E4] bg-[#F6F8FA]" />
                  )}
                </button>
                <span className="text-sm leading-[150%] text-[#0F0F0F]">
                  See the impact of your donation — <span className="font-bold">Join Coterie</span>{" "}
                  for free &amp; get updates, track your influence, and see who else you inspired to
                  give.
                </span>
              </label>
            )}
          </div>

          {/* CTA */}
          <Button
            type="submit"
            disabled={createDonationPending || !amount || amount <= 0}
            className="flex h-[56px] w-full items-center justify-between rounded-full bg-[#12AA5B] px-[14px] text-white hover:bg-[#0da055] disabled:opacity-50"
          >
            <span className="flex-1 text-center text-base font-medium">
              {createDonationPending ? "Processing..." : "Donate Now"}
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <ArrowRightIcon size={16} weight="bold" className="text-[#0F0F0F]" />
            </div>
          </Button>

          {/* Legal */}
          <p className="text-left text-sm leading-[160%] text-[#404040]">
            By choosing the payment method above, you agree to the Coterie's{" "}
            <a href="#" className="underline hover:text-[#0F0F0F]">
              Terms of Service
            </a>{" "}
            and acknowledge the{" "}
            <a href="#" className="underline hover:text-[#0F0F0F]">
              Privacy Notice
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default DonatePage;
