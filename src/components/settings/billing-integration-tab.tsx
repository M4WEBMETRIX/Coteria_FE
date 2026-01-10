import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Download, MoreHorizontal } from "lucide-react";

interface BillingIntegrationTabProps {
  formData: {
    apiKey: string;
    billingPeriod: string;
    emailAddress: string;
  };
  setFormData: (data: any) => void;
}

const BILLING_HISTORY = [
  { invoice: "#018298", date: "May 31, 2025", plan: "Pro Plan", amount: "$79" },
  { invoice: "#015274", date: "April 30, 2025", plan: "Basic Plan", amount: "$29" },
];

const BillingIntegrationTab = ({ formData, setFormData }: BillingIntegrationTabProps) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

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
              <p className="text-sm text-[#525866]">Next billing on March 18, 2025</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-9 text-sm font-medium">
                Change Billing Period
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Plan Card */}
          <div className="rounded-xl border border-[#E1E4EA] bg-white p-5">
            <div className="mb-4 flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="text-base font-semibold text-[#0A0A0C]">Basic Plan</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#0A0A0C]">$29</span>
                  <span className="text-sm text-[#525866]">/ month</span>
                </div>
                <p className="text-sm text-[#525866]">All the basics for starting a new business</p>
              </div>
              <Button variant="outline" className="h-8 text-xs font-medium">
                Downgrade
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <button className="text-xs font-medium text-[#DF1C41]">Change Plan</button>
              <Button variant="outline" className="h-8 text-xs font-medium">
                Change Plan
              </Button>
            </div>
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
            {BILLING_HISTORY.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1fr_auto] items-center gap-4 border-t border-[#E1E4EA] px-4 py-3 text-sm text-[#0A0A0C]"
              >
                <span className="font-medium">{item.invoice}</span>
                <span>{item.date}</span>
                <span>{item.plan}</span>
                <span>{item.amount}</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
            value={formData.emailAddress}
            onChange={(e) => handleChange("emailAddress", e.target.value)}
            className="h-10"
            placeholder="coteriegloteam@mail.com"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingIntegrationTab;
