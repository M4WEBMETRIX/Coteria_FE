import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateDonation } from ".";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getBaseUrl } from "@/lib/utils";
import { useQueryState } from "nuqs";

const formSchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .min(1, "Amount must be greater than 0"),

  donorEmail: z.string().email("Invalid email").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function DonationModal({
  open,
  onOpenChange,
  currency,
  campaignName = "",
  endUserId,
  componentCampaignId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currency: string;
  campaignName?: string;
  endUserId?: string;
  componentCampaignId?: string;
}) {
  const [userId] = useQueryState("userId");
  const [referralCode] = useQueryState("referral-code");
  const navigate = useNavigate();
  const { campaignId } = useParams();

  const passedID = campaignId || componentCampaignId;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      donorEmail: "",
    },
  });

  // Watch amount field dynamically
  const amount = useWatch({
    control,
    name: "amount",
  });

  const safeCurrency = currency || "CAD";

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: safeCurrency,
  }).format(amount || 0);

  const {
    mutate: createDonation,
    isPending: createDonationPending,
    isSuccess,
    data,
  } = useCreateDonation(passedID);

  // const successUrl =
  //   userId || endUserId
  //     ? `${getBaseUrl()}/user/dashboard?tab=community`
  //     : `${getBaseUrl()}/community/public/campaign/${passedID}`;
  // const cancelUrl =
  //   userId || endUserId
  //     ? `${getBaseUrl()}/user/dashboard?tab=community`
  //     : `${getBaseUrl()}/community/public/campaign/${passedID}`;

  const successUrl =
    userId || endUserId
      ? `${getBaseUrl()}/user/donation-success`
      : `${getBaseUrl()}/campaign/public/donation-success`;
  const cancelUrl =
    userId || endUserId
      ? `${getBaseUrl()}/user/dashboard?tab=community`
      : `${getBaseUrl()}/community/public/campaign/${passedID}`;

  const onSubmit = (values: FormValues) => {
    const payload = {
      slug: passedID,
      // amountCents: values.amount * 100,
      amountCents: Number((values.amount * 100).toFixed(0)),
      currency: currency || "CAD",
      ...(referralCode && { referralCode: referralCode }),
      ...(userId || endUserId
        ? { donorUserId: userId || endUserId }
        : { donorEmail: values.donorEmail }),
      successUrl: successUrl,
      cancelUrl: cancelUrl,
    };

    createDonation(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
      navigate(data?.data?.checkoutUrl);
    }
  }, [isSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Donation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Donation Amount</label>

            <Input
              type="number"
              step="0.01"
              placeholder="Enter amount"
              {...register("amount", { valueAsNumber: true })}
            />

            {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
          </div>

          {/* Live Amount Display */}
          {/* <div>
            <span className="text-sm text-gray-500">Total Amount</span>
            <div className="text-3xl font-bold">{formattedAmount}</div>
          </div> */}

          {/* Email */}
          {!userId && !endUserId && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>

              <Input placeholder="email@example.com (optional)" {...register("donorEmail")} />

              {errors.donorEmail && (
                <p className="text-sm text-red-500">{errors.donorEmail.message}</p>
              )}
            </div>
          )}

          <p className="text-sm text-gray-500">
            {" "}
            You are about to donate {formattedAmount} to{" "}
            <span className="font-bold">{campaignName}</span>.
            {/* Provide an email if you'd like a
            receipt.{" "} */}
          </p>

          <DialogFooter>
            <Button
              disabled={createDonationPending || amount <= 0}
              type="submit"
              className="w-full"
            >
              {createDonationPending ? "Loading..." : "Confirm & Donate"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
