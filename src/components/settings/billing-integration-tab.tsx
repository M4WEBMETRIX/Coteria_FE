import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Bell, Download, MoreHorizontal } from "lucide-react";
import {
  useActivateBilling,
  useChangeBillingType,
  useGetSubscriptionInvoices,
  useGetSubscriptionPlans,
} from "@/services/generics/hooks";
import { formatFullDate, getBaseUrl, getCurrencySymbol } from "@/lib/utils";
import EmptyCampaigns from "../../assets/icons/empty-campaigns.svg";
import { useEffect, useMemo, useState } from "react";
import { getOrgUserFromLocalStorage } from "@/end-user-app/services/local-storage";
import BillingIntegrationSkeleton from "./skeleton/billing-skeleton";

interface BillingIntegrationTabProps {
  formData: {
    apiKey: string;
    billingPeriod: string;
    emailAddress: string | undefined | any;
  };
  setFormData: (data: any) => void;
}

// interface ChangeBillingPopoverProps {
//   onChange?: (value: string) => void;
// }

// const BILLING_HISTORY = [
//   { invoice: "#018298", date: "May 31, 2025", plan: "Pro Plan", amount: "$79" },
//   { invoice: "#015274", date: "April 30, 2025", plan: "Basic Plan", amount: "$29" },
// ];

const BillingIntegrationTab = ({ formData, setFormData }: BillingIntegrationTabProps) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const orgUser = useMemo(() => {
    return getOrgUserFromLocalStorage();
  }, []);
  // console.log("orgUser", orgUser);
  useEffect(() => {
    if (orgUser?.businessEmail) {
      setFormData((prev: any) => ({
        ...prev,
        emailAddress: orgUser.businessEmail,
      }));
    }
  }, [orgUser?.businessEmail]);

  const { data: subscription, isPending: isLoading } = useGetSubscriptionPlans();
  const { data: subscriptionInvoices, isPending: invoicesLoading } = useGetSubscriptionInvoices();
  const { mutate: activateMutate, isPending } = useActivateBilling();

  // console.log("invoices", subscriptionInvoices);

  // console.log("sub", subscription);

  const handleActivate = () => {
    activateMutate({
      successUrl: `${getBaseUrl()}/settings?tab=billing-integration`,
    });
  };

  // const test = true

  if (isLoading || invoicesLoading) {
    return <BillingIntegrationSkeleton />;
  }

  return (
    <div className="font-ubuntu">
      {/* API Integration / Payment Methods Section */}
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            API integration
          </h3>
          <p className="text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Manage your payment methods securely. Add, update, or remove your credit/debit cards.
          </p>
        </div>
        <div className="w-[532px]">
          <div className="flex items-center justify-between rounded-xl border border-[#E1E4EA] bg-white p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-12 items-center justify-center rounded border border-[#E1E4EA] bg-white text-xs font-bold text-[#00579F]">
                VISA
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-[#0A0A0C]">•••• •••• •••• 7228</p>
                <p className="text-xs text-[#525866]">Expiry 10/26</p>
              </div>
            </div>
            <button className="text-[#525866]">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Billing Section */}
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Billing
          </h3>
          <p className="text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Review and update your billing information to ensure accurate and timely payments.
          </p>
        </div>
        <div className="w-[532px] space-y-6">
          {/* Billing Period Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-[#0A0A0C]">Billing Period</h4>
              <p className="text-sm text-[#525866]">
                Next billing on {formatFullDate(subscription?.data?.nextBillingAt)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ChangeBillingPopover billingCode={subscription?.data?.plan?.code} />
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Plan Card */}
          <div className="rounded-xl border border-[#E1E4EA] bg-white p-5">
            <div className="mb-4 flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="text-base font-semibold text-[#0A0A0C]">
                  {subscription?.data?.plan?.name} Plan
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#0A0A0C]">
                    {getCurrencySymbol(subscription?.data?.plan?.currency)}
                    {""}
                    {subscription?.data?.plan?.unitAmount / 100}
                  </span>
                  <span className="text-sm text-[#525866]">/ month</span>
                </div>
                <p className="text-sm text-[#525866]">{subscription?.data?.plan?.description}</p>
              </div>
              <Button
                disabled={subscription?.data?.status === "active"}
                onClick={handleActivate}
                variant="outline"
                className="h-8 text-xs font-medium"
              >
                {subscription?.data?.status === "active" ? (
                  "Activated"
                ) : (
                  <>{isPending ? "Activating..." : "Activate"}</>
                )}
              </Button>
            </div>
            {/* <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <button className="text-xs font-medium text-[#DF1C41]">Change Plan</button>
              <Button variant="outline" className="h-8 text-xs font-medium">
                Change Plan
              </Button>
            </div> */}
          </div>

          {/* Billing History Table */}
          <div className="overflow-hidden rounded-xl border border-[#E1E4EA] bg-white">
            <div className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1fr_auto] gap-4 bg-[#F5F7FA] px-4 py-3 text-xs font-medium text-[#525866]">
              <span>Invoice #</span>
              <span>Date</span>
              <span>Plan</span>
              <span>Amount</span>
              <span className="w-8"></span>
            </div>
            {subscriptionInvoices?.data?.items?.length === 0 ? (
              <div className="mt-6 flex flex-col items-center justify-center">
                <img
                  src={EmptyCampaigns}
                  alt="empty-campaigns"
                  className="mb-3 h-[72px] w-[72px]"
                />
                <p className="trackin-[-2%] pb-2 text-center text-base leading-6 font-semibold text-[#1E1F24]">
                  No invoices yet.
                </p>

                <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
                  When you’re billed, your invoices will show up here.
                </p>
              </div>
            ) : (
              <>
                {subscriptionInvoices?.data?.items?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1fr_auto] items-center gap-4 border-t border-[#E1E4EA] px-4 py-3 text-sm text-[#0A0A0C]"
                  >
                    <span className="line-clamp-1 font-medium">{item.invoiceNumber}</span>
                    <span className="w-max text-nowrap">{formatFullDate(item.periodStart)}</span>
                    <span className="line-clamp-1">{item.plan}</span>
                    <span>
                      {getCurrencySymbol(item.currency)}
                      {item.amount / 100}
                    </span>
                    <Button
                      onClick={() => window.open(item?.downloadUrl, "_blank")}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Email Address Section */}
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Email address
          </h3>
          <p className="text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Invoice will be sent to this email address.
          </p>
        </div>
        <div className="w-[532px] space-y-2">
          <Label htmlFor="emailAddress" className="text-xs font-medium text-[#525866]">
            Email Address <span className="text-[#DF1C41]">*</span>
          </Label>
          <Input
            id="emailAddress"
            disabled
            value={formData.emailAddress}
            onChange={(e) => handleChange("emailAddress", e.target.value)}
            className="h-10"
            placeholder="user email"
          />
        </div>
      </div>
    </div>
  );
};

export function ChangeBillingPopover({ billingCode }: { billingCode: string }) {
  const [selectedBilling, setSelectedBilling] = useState("");
  const [open, setOpen] = useState(false);

  const billingType = [
    { id: 1, label: "Monthly", value: "monthly" },
    { id: 2, label: "Quarterly", value: "quarterly" },
    { id: 3, label: "Annual", value: "annual" },
  ];

  const { mutate, isPending } = useChangeBillingType();

  const handleSelect = (value: string) => {
    setSelectedBilling(value);

    const payload = {
      planCode: billingCode,
      billingInterval: value,
      returnUrl: `${getBaseUrl()}/settings?tab=billing-integration`,
    };

    mutate(payload);

    console.log(selectedBilling);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9 min-w-[200px] text-sm font-medium">
          {isPending ? (
            "Changing billing..."
          ) : (
            <>{selectedBilling ? selectedBilling : "Change Billing Period"}</>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2">
        <div className="flex flex-col gap-1">
          {billingType.map((billing) => (
            <button
              key={billing.id}
              onClick={() => handleSelect(billing.value)}
              className="hover:bg-muted rounded-md px-3 py-2 text-left text-sm"
            >
              {billing.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default BillingIntegrationTab;
