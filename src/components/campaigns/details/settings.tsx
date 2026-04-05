import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useQueryState } from "nuqs";
import { StatusBadge } from "../campaigns-table-widget";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpdateCampaign, useUpdateCampaignStatus } from "@/services/generics/hooks";
import { useParams } from "react-router-dom";
import EndCampaignModal from "./end-campaign-modal";

const CAMPAIGN_SETTINGS_TABS = [
  { id: "basic-setting", label: "Basic setting" },
  { id: "visibility-access", label: "Visibility & Access" },
  // { id: "engagement-rules", label: "Engagement Rules" },
  // { id: "notifications", label: "Notifications & updates" },
  { id: "danger-zone", label: "Danger Zone" },
];

// ── Moved OUTSIDE Settings ───────────────────────────────────────────────────

const BasicSettings = ({
  formData,
  handleChange,
  data,
}: {
  formData: any;
  handleChange: (field: string, value: any) => void;
  data: any;
}) => (
  <div className="gap-8 lg:flex">
    <div className="w-full shrink-0 lg:w-[300px]">
      <h3 className="text-base font-semibold text-[#0A0A0C]">Campaign Details</h3>
      <p className="text-sm text-[#525866]">Control how this campaign behaves</p>
    </div>
    <div className="mt-3 flex-1 space-y-6 lg:mt-0">
      <div className="flex w-full justify-between">
        <p className="text-sm font-medium text-[#1E1F24]">Status</p>
        <StatusBadge status={data?.status} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="campaignName" className="text-sm font-medium text-[#344054]">
          Campaign Name <span className="text-[#DF1C41]">*</span>
        </Label>
        <Input
          disabled={
            data?.status?.toLowerCase() === "active" || data?.status?.toLowerCase() === "completed"
          }
          id="campaignName"
          value={formData.campaignName || ""}
          onChange={(e) => handleChange("campaignName", e.target.value)}
          className="bg-white"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="shortDescription" className="text-sm font-medium text-[#344054]">
          Short description <span className="text-[#DF1C41]">*</span>
        </Label>
        <Input
          maxLength={400}
          disabled={
            data?.status?.toLowerCase() === "active" || data?.status?.toLowerCase() === "completed"
          }
          id="shortDescription"
          value={formData.shortDescription || ""}
          onChange={(e) => handleChange("shortDescription", e.target.value)}
          className="bg-white"
        />
      </div>
    </div>
  </div>
);

const VisibilitySettings = ({
  formData,
  handleChange,
}: {
  formData: any;
  handleChange: (field: string, value: any) => void;
}) => (
  <div className="gap-8 lg:flex">
    <div className="w-full shrink-0 lg:w-[300px]">
      <h3 className="text-base font-semibold text-[#0A0A0C]">Visibility & Access Details</h3>
      <p className="text-sm text-[#525866]">Turning this off removes the campaign from insights</p>
    </div>
    <div className="mt-3 flex-1 space-y-6 lg:mt-0">
      <RadioGroup
        value={formData.visibility}
        onValueChange={(value) => handleChange("visibility", value)}
        className="space-y-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-sm font-medium text-[#344054]">Public</Label>
            <p className="text-xs text-[#525866]">Visible to everyone on the platform.</p>
          </div>
          <RadioGroupItem value="public" />
        </div>

        <div className="flex items-start justify-between">
          <div>
            <Label className="text-sm font-medium text-[#344054]">Community only</Label>
            <p className="text-xs text-[#525866]">Visible only to members of your community.</p>
          </div>
          <RadioGroupItem value="community" />
        </div>

        <div className="flex items-start justify-between">
          <div>
            <Label className="text-sm font-medium text-[#344054]">Invite-only</Label>
            <p className="text-xs text-[#525866]">Accessible only through invitations.</p>
          </div>
          <RadioGroupItem value="invite" />
        </div>
      </RadioGroup>
    </div>
  </div>
);

const EngagementRules = ({
  formData,
  handleChange,
}: {
  formData: any;
  handleChange: (field: string, value: any) => void;
}) => (
  <div className="gap-8 lg:flex">
    <div className="w-full shrink-0 lg:w-[300px]">
      <h3 className="text-base font-semibold text-[#0A0A0C]">Engagement Rules Details</h3>
      <p className="text-sm text-[#525866]">Turning this off removes the campaign from insights</p>
    </div>
    <div className="mt-3 flex-1 space-y-6 lg:mt-0">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#344054]">Allow repeat donations</p>
          <p className="text-xs text-[#525866]">
            Sent automatically to the customer after they place their order.
          </p>
        </div>
        <Switch
          checked={formData.allowRepeatDonations}
          onCheckedChange={(c) => handleChange("allowRepeatDonations", c)}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#344054]">Allow sharing</p>
          <p className="text-xs text-[#525866]">
            Sent automatically to the customer after they place their order.
          </p>
        </div>
        <Switch
          checked={formData.allowSharing}
          onCheckedChange={(c) => handleChange("allowSharing", c)}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#344054]">Include in influence scoring</p>
          <p className="text-xs text-[#525866]">
            Sent automatically to the customer after they place their order.
          </p>
        </div>
        <Switch
          checked={formData.includeInInfluenceScoring}
          onCheckedChange={(c) => handleChange("includeInInfluenceScoring", c)}
        />
      </div>
    </div>
  </div>
);

const NotificationSettings = ({
  formData,
  handleChange,
}: {
  formData: any;
  handleChange: (field: string, value: any) => void;
}) => (
  <div>
    <div className="gap-8 lg:flex">
      <div className="w-full shrink-0 lg:w-[300px]">
        <h3 className="text-base font-semibold text-[#0A0A0C]">Update reminder</h3>
        <p className="text-sm leading-[150%] tracking-[2%] text-[#666D80]">
          Helps keep donors engaged with regular updates
        </p>
      </div>
      <div className="mt-3 flex-1 space-y-8 lg:mt-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#344054]">Campaign update reminder</p>
              <p className="text-xs text-[#525866]">
                Sent automatically to the customer after they place their order.
              </p>
            </div>
            <Switch
              checked={formData.campaignUpdateReminder}
              onCheckedChange={(c) => handleChange("campaignUpdateReminder", c)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-[#525866]">Option</Label>
            <Select
              value={formData.reminderFrequency}
              onValueChange={(v) => handleChange("reminderFrequency", v)}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">every 7 days</SelectItem>
                <SelectItem value="14">every 14 days (recommended)</SelectItem>
                <SelectItem value="30">every 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
    <Separator className="my-6" />
    <div className="flex gap-8">
      <div className="w-[300px] shrink-0">
        <h3 className="text-base font-semibold text-[#0A0A0C]">Donor notification</h3>
        <p className="text-sm leading-[150%] tracking-[2%] text-[#666D80]">
          Select what donors should be notified about
        </p>
      </div>
      <div className="flex-1 space-y-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#0D0D12]">Campaign update reminder</p>
            <Checkbox
              checked={formData.notifyOnUpdate}
              onCheckedChange={(c) => handleChange("notifyOnUpdate", !!c)}
              className="data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#0D0D12]">Major milestones reached</p>
            <Checkbox
              checked={formData.notifyOnMilestone}
              onCheckedChange={(c) => handleChange("notifyOnMilestone", !!c)}
              className="data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#0D0D12]">Campaign ending soon</p>
            <Checkbox
              checked={formData.notifyOnEnding}
              onCheckedChange={(c) => handleChange("notifyOnEnding", !!c)}
              className="data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DangerZoneSettings = ({ data }: { data?: any }) => {
  const { id } = useParams();
  const [endValue, setEndValue] = useState("");
  const [pauseValue, setPauseValue] = useState("");
  const [activateValue, setActivateValue] = useState("");
  const [isEndCampaignModalOpen, setIsEndCampaignModalOpen] = useState(false);

  const {
    mutate: updateCampaignStatus,
    isPending: updateCampaignStatusPending,
    isSuccess,
  } = useUpdateCampaignStatus(id);

  const handleEndCampaign = () => {
    setEndValue("end");
    updateCampaignStatus({ status: "completed" });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsEndCampaignModalOpen(false);
    }
  }, [isSuccess]);

  const handlePauseCampaign = () => {
    setPauseValue("paused");
    updateCampaignStatus({ status: "paused" });
  };

  const handleActivateCampaign = () => {
    setActivateValue("active");
    updateCampaignStatus({ status: "active" });
  };

  console.log(data);

  return (
    <>
      <div className="gap-8 lg:flex">
        <div className="w-full shrink-0 lg:w-[300px]">
          <h3 className="text-base font-semibold text-[#0A0A0C]">Danger Zone</h3>
          <p className="text-sm text-[#525866]">
            These actions affect campaign availability and data.
          </p>
        </div>
        <div className="mt-3 flex-1 space-y-6 lg:mt-0">
          {data?.status?.toLowerCase() === "completed" ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm leading-[150%] font-medium tracking-[2%] text-[#0D0D12]">
                  {data?.status?.toLowerCase() === "completed"
                    ? "Campaign completed"
                    : "Activate campaign"}
                </p>
                <p className="text-xs leading-[150%] tracking-[2%] text-[#666D80]">
                  {data?.status?.toLowerCase() === "completed"
                    ? "Campaign has been completed"
                    : "Campaign will be active for new donations and engagement."}
                </p>
              </div>
              <Button
                onClick={handleActivateCampaign}
                variant="outline"
                disabled={
                  updateCampaignStatusPending || data?.status?.toLowerCase() === "completed"
                }
              >
                {updateCampaignStatusPending && activateValue === "active"
                  ? "Activating..."
                  : data?.status?.toLowerCase() === "completed"
                    ? "Completed"
                    : "Activate"}
              </Button>
            </div>
          ) : (
            <>
              {data?.status?.toLowerCase() === "paused" ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm leading-[150%] font-medium tracking-[2%] text-[#0D0D12]">
                      Activate campaign
                    </p>
                    <p className="text-xs leading-[150%] tracking-[2%] text-[#666D80]">
                      Campaign will be active for new donations and engagement.
                    </p>
                  </div>
                  <Button
                    onClick={handleActivateCampaign}
                    variant="outline"
                    disabled={
                      updateCampaignStatusPending || data?.status?.toLowerCase() === "completed"
                    }
                  >
                    {updateCampaignStatusPending && activateValue === "active"
                      ? "Activating..."
                      : data?.status?.toLowerCase() === "completed"
                        ? "Completed"
                        : "Activate"}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm leading-[150%] font-medium tracking-[2%] text-[#0D0D12]">
                      Pause campaign
                    </p>
                    <p className="text-xs leading-[150%] tracking-[2%] text-[#666D80]">
                      Temporarily stop donations and engagement.
                    </p>
                  </div>
                  <Button
                    onClick={handlePauseCampaign}
                    variant="outline"
                    disabled={updateCampaignStatusPending}
                  >
                    {updateCampaignStatusPending && pauseValue === "paused"
                      ? "Pausing..."
                      : "Pause"}
                  </Button>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm leading-[150%] font-medium tracking-[2%] text-[#0D0D12]">
                    End campaign
                  </p>
                  <p className="text-xs leading-[150%] tracking-[2%] text-[#666D80]">
                    End this campaign permanently. No new donations.
                  </p>
                </div>
                <Button
                  onClick={() => setIsEndCampaignModalOpen(true)}
                  variant="outline"
                  className="border-[#F3654A] px-5 text-[#F3654A] hover:bg-orange-50 hover:text-[#F3654A]"
                >
                  End
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <EndCampaignModal
        open={isEndCampaignModalOpen}
        onOpenChange={setIsEndCampaignModalOpen}
        handleEndCampaign={handleEndCampaign}
        isPending={updateCampaignStatusPending}
        endValue={endValue}
      />
    </>
  );
};

// ── Main component ───────────────────────────────────────────────────────────

const Settings = ({ data }: { data: any }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useQueryState("tab", { defaultValue: "basic-setting" });

  const initialFormData = useMemo(() => {
    return {
      campaignName: data?.name || "",
      shortDescription: data?.description || "",
      visibility: data?.visibility?.toLowerCase() || "public",
      isPrivate: false,
      visibleInInsights: true,
      eligibleForInfluencer: true,
      allowRepeatDonations: false,
      allowSharing: true,
      includeInInfluenceScoring: true,
      campaignUpdateReminder: true,
      reminderFrequency: "14",
      notifyOnUpdate: true,
      notifyOnMilestone: true,
      notifyOnEnding: true,
    };
  }, [data]);

  const [formData, setFormData] = useState(initialFormData);

  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialFormData);

  const { mutate: updateCampaign, isPending: updateCampaignLoading } = useUpdateCampaign(id);

  const handleSave = () => {
    const payload = {
      name: formData.campaignName,
      description: formData.shortDescription,
      visibility: formData.visibility,
    };
    updateCampaign(payload);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  useEffect(() => {
    if (!data) return;
    setFormData(initialFormData);
  }, [data, initialFormData]);

  const renderContent = () => {
    switch (activeTab) {
      case "basic-setting":
        return <BasicSettings formData={formData} handleChange={handleChange} data={data} />;
      case "visibility-access":
        return <VisibilitySettings formData={formData} handleChange={handleChange} />;
      case "engagement-rules":
        return <EngagementRules formData={formData} handleChange={handleChange} />;
      case "notifications":
        return <NotificationSettings formData={formData} handleChange={handleChange} />;
      case "danger-zone":
        return <DangerZoneSettings data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="font-ubuntu">
      <div className="mb-6 flex w-full items-center justify-between">
        <h2 className="text-xl font-semibold text-[#0A0A0C]">Settings</h2>
        {data?.status?.toLowerCase() !== "active" && isDirty && (
          <div className="flex gap-3">
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <Button
              disabled={updateCampaignLoading}
              onClick={handleSave}
              className="bg-[#12AA5B] hover:bg-[#0E8A4A]"
            >
              {updateCampaignLoading ? "Saving..." : "Save Change"}
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-hidden bg-white lg:flex lg:rounded-xl lg:border lg:border-[#E1E4EA]">
        <div className="w-full shrink-0 border-[#E1E4EA] bg-white lg:w-[240px] lg:border-r lg:p-4">
          <nav className="flex flex-nowrap overflow-x-auto lg:flex-col lg:space-y-1">
            {CAMPAIGN_SETTINGS_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-left text-sm leading-[150%] font-medium tracking-[2%] text-nowrap transition-colors",
                  activeTab === tab.id
                    ? "border border-[#DFE1E7] bg-[#F6F8FA] text-[#0D0D12]"
                    : "text-[#525866] hover:bg-gray-100 hover:text-[#666D80]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex-1 lg:mt-0 lg:p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;
