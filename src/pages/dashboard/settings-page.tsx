import { useState } from "react";
import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import all tab components
import OrganizationProfileTab from "@/components/settings/organization-profile-tab";
import MyAccountTab from "@/components/settings/my-account-tab";
import BillingIntegrationTab from "@/components/settings/billing-integration-tab";
import AccessRolesTab from "@/components/settings/access-roles-tab";
import PrivacyDataTab from "@/components/settings/privacy-data-tab";
import LinkAccountTab from "@/components/settings/link-account-tab";
import TimeLanguageTab from "@/components/settings/time-language-tab";
import NotificationsTab from "@/components/settings/notifications-tab";
import PasswordTab from "@/components/settings/password-tab";
import DangerZoneTab from "@/components/settings/danger-zone-tab";

const SETTINGS_TABS = [
  { id: "organization-profile", label: "Organization Profile" },
  { id: "my-account", label: "My Account" },
  { id: "billing-integration", label: "Billing & Integration" },
  { id: "access-roles", label: "Access & Roles" },
  { id: "privacy-data", label: "Privacy & Data" },
  { id: "link-account", label: "Link Account" },
  { id: "time-language", label: "Time & Language" },
  { id: "notifications", label: "Notifications" },
  { id: "password", label: "Password" },
  { id: "danger-zone", label: "Danger Zone" },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("organization-profile");

  // Centralized form state for all tabs
  const [formData, setFormData] = useState({
    // Organization Profile
    organizationName: "Coterie",
    industry: "",
    language: "en",
    currency: "usd",
    addressStreet: "",
    addressCity: "Los Angeles",
    addressState: "",
    addressCountry: "us",
    addressPostalCode: "90029",

    // My Account
    fullName: "",
    email: "johndoe@gmail.com",
    phone: "+1 (212) 555 4567",

    // Billing & Integration
    apiKey: "2716",
    billingPeriod: "monthly",
    emailAddress: "coteriegloteam@mail.com",

    // Link Account
    instagram: "https://www.instagram.com/koterie",
    facebook: "https://www.facebook.com/koterie",
    twitter: "https://www.twitter.com/coterie",
    youtube: "https://www.youtube.com/coterie",

    // Time & Language
    timezone: "utc-8",
    siteLanguage: "en-us",

    // Notifications
    transactionConfirmation: true,
    transactionFailed: false,
    transactionReceipt: false,
    transactionCompleted: true,
    transactionRefund: false,
    paymentReminder: false,

    // Password
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",

    // Danger Zone
    deactivateAccount: false,
  });

  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/settings", isCurrentPage: true },
    ],
  });

  const handleSaveChanges = () => {
    // Handle saving all changes
    console.log("Saving changes:", formData);
    // You can add API calls here to save the data
    alert("Changes saved successfully!");
  };

  const handleCancel = () => {
    // Reset form or navigate away
    console.log("Changes cancelled");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "organization-profile":
        return <OrganizationProfileTab formData={formData} setFormData={setFormData} />;
      case "my-account":
        return <MyAccountTab formData={formData} setFormData={setFormData} />;
      case "billing-integration":
        return <BillingIntegrationTab formData={formData} setFormData={setFormData} />;
      case "access-roles":
        return <AccessRolesTab />;
      case "privacy-data":
        return <PrivacyDataTab />;
      case "link-account":
        return <LinkAccountTab formData={formData} setFormData={setFormData} />;
      case "time-language":
        return (
          <TimeLanguageTab
            formData={{ timezone: formData.timezone, language: formData.siteLanguage }}
            setFormData={(data: any) =>
              setFormData((prev) => ({
                ...prev,
                timezone: data.timezone ?? prev.timezone,
                siteLanguage: data.language ?? prev.siteLanguage,
              }))
            }
          />
        );

      case "password":
        return <PasswordTab formData={formData} setFormData={setFormData} />;
      case "notifications":
        return <NotificationsTab formData={formData} setFormData={setFormData} />;
      case "danger-zone":
        return <DangerZoneTab formData={formData} setFormData={setFormData} />;
      default:
        return <OrganizationProfileTab formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="font-ubuntu">
      {/* Header */}
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#0A0A0C]">Settings</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} className="bg-[#079455] hover:bg-[#0E8A4A]">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-[200px] shrink-0 rounded-l-[16px] border p-4" b>
          <nav className="space-y-3">
            {SETTINGS_TABS.map((tab) => (
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

        {/* Tab Content */}
        <div className="flex-1 rounded-r-[16px] border border-l-0 border-[#E1E4EA] bg-white">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
