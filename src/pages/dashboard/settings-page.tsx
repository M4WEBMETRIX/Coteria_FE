import { useBreadcrumb } from "@/components/breadcrumb-navigation";

const SettingsPage = () => {
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/settings", isCurrentPage: true },
    ],
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[#0A0A0C]">Settings</h1>
      <div className="">Settings Content Goes Here</div>
    </div>
  );
};

export default SettingsPage;
