import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationsTabProps {
  formData: {
    transactionConfirmation: boolean;
    transactionFailed: boolean;
    transactionReceipt: boolean;
    transactionCompleted: boolean;
    transactionRefund: boolean;
    paymentReminder: boolean;
  };
  setFormData: (data: any) => void;
}

const NOTIFICATION_OPTIONS = [
  {
    id: "transactionConfirmation",
    title: "Transaction Confirmation",
    description:
      "You are to be prompted at the start of every transaction after the payment has been verified.",
  },
  {
    id: "transactionFailed",
    title: "Transaction Failed",
    description: "Alert for any notification, they offer instant notify of any event the action.",
  },
  {
    id: "transactionReceipt",
    title: "Transaction Receipt",
    description: "Alert users whenever there's new order for any outstanding before.",
  },
  {
    id: "transactionCompleted",
    title: "Transaction Completed",
    description:
      "Get notified when a file uploaded or the creation of new tasks is completed in place the home.",
  },
  {
    id: "transactionRefund",
    title: "Transaction Refund",
    description: "Get notified when the approval of those subs to all emails/sms notes via home.",
  },
  {
    id: "paymentReminder",
    title: "Payment Reminder",
    description:
      "Alert members when the contents of their payment until the accounted rating for customer.",
  },
];

const NotificationsTab = ({ formData, setFormData }: NotificationsTabProps) => {
  const handleToggle = (field: string, value: boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="font-ubuntu">
      <div className="flex justify-between p-6">
        <div className="w-[300px]">
          {" "}
          <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
            Push Notifications
          </h3>
          <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
            Get alerts for new orders, order processing updates, and when orders are completed or
            canceled.
          </p>
        </div>

        <div className="space-y-4">
          {NOTIFICATION_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-start justify-between rounded-lg p-4">
              <div className="flex-1 pr-4">
                <Label
                  htmlFor={option.id}
                  className="text-sm leading-[150%] font-medium tracking-[2%] text-[#0D0D12]"
                >
                  {option.title}
                </Label>
                <p className="mt-1 text-xs text-[#666D80]">{option.description}</p>
              </div>
              <Switch
                id={option.id}
                checked={formData[option.id as keyof typeof formData]}
                onCheckedChange={(checked) => handleToggle(option.id, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
