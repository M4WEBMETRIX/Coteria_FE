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
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getOrgUserFromLocalStorage } from "@/end-user-app/services/local-storage";

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
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { slug, campaignId } = useParams();

  const orgUser = useMemo(() => {
    return getOrgUserFromLocalStorage();
  }, []);

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

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount || 0);

  const {
    mutate: createDonation,
    isPending: createDonationPending,
    isSuccess,
  } = useCreateDonation(campaignId);

  const onSubmit = (values: FormValues) => {
    const payload = {
      slug: campaignId,
      amountCents: values.amount,
      currency: orgUser?.defaultCurrency,
      //   donorUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      donorEmail: values.donorEmail,
      //   referrerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      successUrl: `/community/public/${slug}/campaign/${campaignId}`,
      cancelUrl: `/community/public/${slug}/campaign/${campaignId}`,
    };

    createDonation(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>

            <Input placeholder="email@example.com (optional)" {...register("donorEmail")} />

            {errors.donorEmail && (
              <p className="text-sm text-red-500">{errors.donorEmail.message}</p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {" "}
            You are about to donate {formattedAmount}. Provide an email if you'd like a
            receipt.{" "}
          </p>

          <DialogFooter>
            <Button disabled={createDonationPending} type="submit" className="w-full">
              {createDonationPending ? "Loading..." : "Confirm & Pay"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
