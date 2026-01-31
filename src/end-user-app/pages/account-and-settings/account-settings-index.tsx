import { Button } from "@/components/ui/button";
import {
  Trophy,
  MapPin,
  WhatsappLogo,
  LinkedinLogo,
  XLogo,
  Plus,
  PencilSimple,
  CaretRightIcon,
  Leaf,
  ChartBar,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useUserAppBreadcrumb } from "@/components/user-app-breadcrumb";

const AccountSettingsIndex = () => {
  const navigate = useNavigate();

  useUserAppBreadcrumb({
    items: [{ label: "Account Settings", href: "/user/account-settings", isCurrentPage: true }],
  });

  return (
    <div className="mx-auto w-full space-y-8">
      <div className="flex items-start gap-8">
        {/* Left Sidebar - Profile Summary */}
        <div className="w-[300px] shrink-0 space-y-6">
          <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-6 text-center">
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200">
                <img
                  src="https://placehold.co/80x80/png"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start">
                <h3 className="line-clamp-1 text-[22px] leading-[155%] font-normal tracking-[0%] text-[#000000]">
                  Wale Johnson
                </h3>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#D5FBFF] px-3 py-1 text-base leading-[155%] font-normal tracking-[0%] text-[#067884]">
                  <Trophy weight="fill" /> Champion
                </div>
                <div className="mt-2 flex items-center justify-center gap-1 text-sm text-gray-500">
                  <MapPin weight="fill" /> Toronto
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate("/user/account-settings/edit")}
              className="h-10 w-full rounded-full bg-[#12AA5B] font-medium text-white hover:bg-[#0da055]"
            >
              Edit Profile <CaretRightIcon weight="bold" className="ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="border-b pb-4 text-lg leading-[140%] font-normal tracking-[-2%] text-[#000000]">
              Social Links
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-[10px] border border-[#EFEFEF] bg-white p-3">
                <div className="flex items-center gap-3">
                  <WhatsappLogo size={24} className="text-[#25D366]" weight="fill" />
                  <span className="font-medium text-gray-600">/waletoronto</span>
                </div>
                <PencilSimple className="cursor-pointer text-gray-400" />
              </div>
              <div className="flex items-center justify-between rounded-[10px] border border-[#EFEFEF] bg-white p-3">
                <div className="flex items-center gap-3">
                  <LinkedinLogo size={24} className="text-[#0077B5]" weight="fill" />
                  <span className="font-medium text-gray-600">/waletoronto</span>
                </div>
                <PencilSimple className="cursor-pointer text-gray-400" />
              </div>
              <div className="flex items-center justify-between rounded-[10px] border border-[#EFEFEF] bg-white p-3">
                <div className="flex items-center gap-3">
                  <XLogo size={24} className="text-black" weight="fill" />
                  <span className="font-medium text-gray-600">/waletoronto</span>
                </div>
                <PencilSimple className="cursor-pointer text-gray-400" />
              </div>
              <Button
                variant="outline"
                className="h-12 w-full justify-center rounded-[10px] border border-[#EFEFEF] font-medium text-gray-500"
              >
                <Plus className="mr-2" /> Add Social Links
              </Button>
            </div>
          </div>

          {/* Discover Widget (Mock matching visual) */}
          <div className="space-y-4 rounded-[16px] border border-[#ECEFF3] bg-white p-4">
            <div className="flex cursor-pointer items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7FDF3] text-[#12AA5B]">
                  <Leaf weight="fill" />
                </div>
                <span className="text-lg leading-[140%] font-normal tracking-[-2%] text-[#000000]">
                  Discover
                </span>
              </div>
              <CaretRightIcon className="text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Level 5</span>
                <span className="font-normal text-[#12AA5B]">+750</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[40%] rounded-full bg-[#12AA5B]" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6 rounded-[10px] border border-[#ECEFF3] bg-[#FCFCFC] px-4 py-6">
          {/* Tax Info Banner */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-[10px] border border-[#F6F6F6] bg-[#ECFFEE] px-4 py-2.5 md:flex-row">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCFFE3] text-[#02B128]">
                <Leaf weight="fill" size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg leading-[155%] font-normal tracking-[-2%] text-[#000000]">
                  Your donations are tax-deductible.
                </h3>
                <p className="text-lg leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                  <span
                    onClick={() => navigate("/user/receipt-taxes")}
                    className="cursor-pointer font-bold underline"
                  >
                    Click here
                  </span>{" "}
                  to track and download receipts for all your tax exempt donations made in the past.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Tracker */}
          <div className="flex flex-col gap-6 rounded-[10px] border border-[#ECEFF3] bg-white p-6 lg:flex-row">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#E7FDF3] text-[#12AA5B]">
                  <ChartBar weight="fill" />
                </div>
                <h3 className="text-2xl leading-[155%] font-normal tracking-[-2%] text-[#000000]">
                  How Your Impact Will Be Tracked
                </h3>
              </div>
              <p className="mb-1.75 text-base leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                As you participate and donate, Coterie helps you understand where your contributions
                go and how they create real outcomes over time.
              </p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-center gap-3 text-lg leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                  <div className="h-2 w-2 rounded-full bg-gray-500" />
                  See how funds are allocated by campaign and purpose
                </li>
                <li className="flex items-center gap-3 text-lg leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                  <div className="h-2 w-2 rounded-full bg-gray-500" />
                  Track community participation and shared effort
                </li>
              </ul>
              <Button className="h-12 w-78 rounded-full bg-[#12AA5B] px-6 text-base text-white hover:bg-[#0da055]">
                Learn how impact works <CaretRightIcon className="ml-2" />
              </Button>
            </div>
            {/* Mock Chart Graphic */}
            <div className="flex h-[200px] w-full items-end justify-center gap-2 lg:w-[300px]">
              <div className="h-[60%] w-4 rounded-t bg-[#A3A0FF]" />
              <div className="h-[20%] w-4 rounded-t bg-[#FFB1B1]" />
              <div className="h-[20%] w-4 rounded-t bg-[#5BD2F4]" />
              <div className="h-[40%] w-4 rounded-t bg-[#A3A0FF]" />
              <div className="h-[90%] w-4 rounded-t bg-[#FFB1B1]" />
              <div className="h-[65%] w-4 rounded-t bg-[#5BD2F4]" />
              <div className="h-[35%] w-4 rounded-t bg-[#A3A0FF]" />
              <div className="h-[50%] w-4 rounded-t bg-[#FFB1B1]" />
              <div className="h-[20%] w-4 rounded-t bg-[#5BD2F4]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Guidelines */}
            <div className="rounded-[10px] border border-[#ECEFF3] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#E7FDF3] text-[#12AA5B]">
                  <div className="h-2 w-2 rounded-sm bg-[#12AA5B]" />
                </div>
                <h3 className="text-2xl leading-[155%] font-normal tracking-[-2%] text-[#000000]">
                  Platform Guidelines
                </h3>
              </div>
              <h4 className="mb-4 text-lg leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                Rules of Engagement
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-lg leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-500" />
                  <span>
                    Understand our principles for{" "}
                    <span className="cursor-pointer underline">respectful participation.</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-lg leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-500" />
                  <span>
                    Stay informed of new <span className="cursor-pointer underline">policies.</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="rounded-[10px] border border-[#ECEFF3] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="serif flex h-8 w-8 items-center justify-center rounded bg-[#E7FDF3] font-bold text-[#12AA5B]">
                  i
                </div>
                <h3 className="text-2xl leading-[155%] font-normal tracking-[-2%] text-[#000000]">
                  Still need help?
                </h3>
              </div>
              <h4 className="mb-4 text-lg leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                Contact Support
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-lg leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-500" />
                  <span>Get in touch with our support team</span>
                </li>
                <li className="flex items-start gap-3 text-lg leading-[155%] font-normal tracking-[-2%] text-[#515151]">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-500" />
                  <span>24/7 customer agent</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsIndex;
