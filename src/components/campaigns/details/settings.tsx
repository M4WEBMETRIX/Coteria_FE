import { useState } from "react";
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

const CAMPAIGN_SETTINGS_TABS = [
  { id: "basic-setting", label: "Basic setting" },
  { id: "visibility-access", label: "Visibility & Access" },
  { id: "engagement-rules", label: "Engagement Rules" },
  { id: "notifications", label: "Notifications & updates" },
  { id: "danger-zone", label: "Danger Zone" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("basic-setting");
  const [formData, setFormData] = useState({
    // Basic
    campaignName: "John Doe",
    shortDescription: "Coterie",

    // Visibility
    isPrivate: false,
    visibleInInsights: true,
    eligibleForInfluencer: true,

    // Engagement
    allowRepeatDonations: false,
    allowSharing: true,
    includeInInfluenceScoring: true,

    // Notifications
    campaignUpdateReminder: true,
    reminderFrequency: "14",
    notifyOnUpdate: true,
    notifyOnMilestone: true,
    notifyOnEnding: true,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const BasicSettings = ({
    formData,
    handleChange,
  }: {
    formData: any;
    handleChange: (field: string, value: any) => void;
  }) => (
    <div className="flex gap-8">
      <div className="w-[300px] shrink-0">
        <h3 className="text-base font-semibold text-[#0A0A0C]">Campaign Details</h3>
        <p className="text-sm text-[#525866]">Control how this campaign behaves</p>
      </div>
      <div className="flex-1 space-y-6">
        <div className="flex justify-end">
          <div className="flex items-center gap-1.5 rounded-full border border-[#B2DDFF] bg-[#EFF8FF] px-2.5 py-0.5 text-[#175CD3]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#175CD3]" />
            <span className="text-xs font-medium">Active</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="campaignName" className="text-sm font-medium text-[#344054]">
            Campaign Name <span className="text-[#DF1C41]">*</span>
          </Label>
          <Input
            id="campaignName"
            value={formData.campaignName}
            onChange={(e) => handleChange("campaignName", e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="shortDescription" className="text-sm font-medium text-[#344054]">
            Short description <span className="text-[#DF1C41]">*</span>
          </Label>
          <Input
            id="shortDescription"
            value={formData.shortDescription}
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
    <div className="flex gap-8">
      <div className="w-[300px] shrink-0">
        <h3 className="text-base font-semibold text-[#0A0A0C]">Visibility & Access Details</h3>
        <p className="text-sm text-[#525866]">
          Turning this off removes the campaign from insights
        </p>
      </div>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#344054]">Private</p>
            <p className="text-xs text-[#525866]">
              Sent automatically to the customer after they place their order.
            </p>
          </div>
          <Switch
            checked={formData.isPrivate}
            onCheckedChange={(c) => handleChange("isPrivate", c)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#344054]">Visible in Community insights</p>
            <p className="text-xs text-[#525866]">
              Sent automatically to the customer after they place their order.
            </p>
          </div>
          <Switch
            checked={formData.visibleInInsights}
            onCheckedChange={(c) => handleChange("visibleInInsights", c)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#344054]">Eligible for influencer activation</p>
            <p className="text-xs text-[#525866]">
              Sent automatically to the customer after they place their order.
            </p>
          </div>
          <Switch
            checked={formData.eligibleForInfluencer}
            onCheckedChange={(c) => handleChange("eligibleForInfluencer", c)}
          />
        </div>
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
    <div className="flex gap-8">
      <div className="w-[300px] shrink-0">
        <h3 className="text-base font-semibold text-[#0A0A0C]">Engagement Rules Details</h3>
        <p className="text-sm text-[#525866]">
          Turning this off removes the campaign from insights
        </p>
      </div>
      <div className="flex-1 space-y-6">
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
    <div className="flex gap-8">
      <div className="w-[300px] shrink-0">
        <h3 className="text-base font-semibold text-[#0A0A0C]">Update reminder</h3>
        <p className="text-sm text-[#525866]">Helps keep donors engaged with regular updates</p>
      </div>
      <div className="flex-1 space-y-8">
        <div className="space-y-4">
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

        <div className="space-y-4 border-t border-[#E1E4EA] pt-8">
          <div className="-mt-8 mb-4">
            <h3 className="text-base font-semibold text-[#0A0A0C]">Donor notification</h3>
            <p className="text-sm text-[#525866]">Select what donors should be notified about</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#344054]">Campaign update reminder</p>
            <Checkbox
              checked={formData.notifyOnUpdate}
              onCheckedChange={(c) => handleChange("notifyOnUpdate", !!c)}
              className="data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#344054]">Major milestones reached</p>
            <Checkbox
              checked={formData.notifyOnMilestone}
              onCheckedChange={(c) => handleChange("notifyOnMilestone", !!c)}
              className="data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#344054]">campaign ending soon</p>
            <Checkbox
              checked={formData.notifyOnEnding}
              onCheckedChange={(c) => handleChange("notifyOnEnding", !!c)}
              className="data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const DangerZoneSettings = () => (
    <div className="flex gap-8">
      <div className="w-[300px] shrink-0">
        <h3 className="text-base font-semibold text-[#0A0A0C]">Danger Zone</h3>
        <p className="text-sm text-[#525866]">
          These actions affect campaign availability and data.
        </p>
      </div>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#344054]">Pause campaign</p>
            <p className="text-xs text-[#525866]">Temporarily stop donations and engagement.</p>
          </div>
          <Button variant="outline">Pause</Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#344054]">End campaign</p>
            <p className="text-xs text-[#525866]">
              End this campaign permanently. No new donations.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-[#F3654A] text-[#F3654A] hover:bg-orange-50 hover:text-[#F3654A]"
          >
            End
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "basic-setting":
        return <BasicSettings formData={formData} handleChange={handleChange} />;
      case "visibility-access":
        return <VisibilitySettings formData={formData} handleChange={handleChange} />;
      case "engagement-rules":
        return <EngagementRules formData={formData} handleChange={handleChange} />;
      case "notifications":
        return <NotificationSettings formData={formData} handleChange={handleChange} />;
      case "danger-zone":
        return <DangerZoneSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="font-ubuntu">
      {/* Header */}
      <div className="mb-6 flex w-full items-center justify-between">
        <h2 className="text-xl font-semibold text-[#0A0A0C]">Settings</h2>
        <div className="flex gap-3">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-[#12AA5B] hover:bg-[#0E8A4A]">Save Change</Button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex overflow-hidden rounded-xl border border-[#E1E4EA] bg-white">
        {/* Sidebar */}
        <div className="w-[240px] shrink-0 border-r border-[#E1E4EA] bg-white p-4">
          <nav className="space-y-1">
            {CAMPAIGN_SETTINGS_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-left text-sm leading-[150%] font-medium tracking-[2%] transition-colors",
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

        {/* Content */}
        <div className="flex-1 p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;
