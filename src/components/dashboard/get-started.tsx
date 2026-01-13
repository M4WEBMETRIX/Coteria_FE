import React, { useState } from "react";
import { Check } from "@phosphor-icons/react";
import IMAGE_1 from "@/assets/images/dashboard-img-1.svg";
import IMAGE_2 from "@/assets/images/dashboard-img-2.png";
import IMAGE_3 from "@/assets/images/dashboard-img-5.png";
import IMAGE_4 from "@/assets/images/dashboard-img-4.png";
import IMAGE_6 from "@/assets/images/dashboard-img-6.png";
import CreateCampaignModal from "../campaigns/create-campaign-modal";
import CreateCommunityModal from "../community/create-community-modal";
import CoterieLogo from "./catorie-logo-svg-code";
import { Button } from "../ui/button";
import { useQueryState } from "nuqs";

const GetStartedPage = () => {
  const [isSetupCompleted, setIsSetupCompleted] = useQueryState("isSetupCompleted", {
    defaultValue: "false",
  });
  const [isCommunityOpen, setIsCommunityOpen] = useState<boolean>(false);
  const [
    // communityData,
    setCommunityData,
  ] = useState([]);

  const [isCampaignOpen, setIsCampaignOpen] = useState(false);
  const [
    // campaignsData,
    setCampaignsData,
  ] = useState([]);
  const [
    // justCreated,
    setJustCreated,
  ] = useState(true);

  const steps = [
    { id: 1, title: "Activate Your Community", completed: true },
    { id: 2, title: "Launch a Campaign", completed: true },
    { id: 3, title: "See Influence in Action", completed: false },
    { id: 4, title: "Fundraise, Anywhere", completed: false },
    { id: 5, title: "Share Impact Stories", completed: false },
  ];

  const features = [
    {
      title: "Activate Your Community",
      description:
        "Set up your community space where donors connect, invite others, and stay engaged beyond a single donation.",
      button: "Create Community",
      onclick: () => setIsCommunityOpen(true),
      image: IMAGE_2,
    },
    {
      title: "Launch a Campaign",
      description:
        "Run focused campaigns that spark participation and give donors a reason to return and share.",
      onclick: () => setIsCampaignOpen(true),
      button: "Launch a Campaign",
      image: IMAGE_1,
    },
    {
      title: "See Influence in Action",
      description:
        "Identify who's driving engagement, how generosity spreads, and where momentum is accelerating.",
      button: "View Influence Map",

      image: IMAGE_3,
    },
    {
      title: "Fundraise, Anywhere",
      description:
        "Accept donations via your existing tools while Coterie tracks engagement and network impact behind the scenes.",
      button: "Connect Donation Tools",
      image: IMAGE_4,
    },
    {
      title: "Share Impact Stories",
      description:
        "Automatically turn activity into clear, shareable impact stories that keep donors emotionally invested.",
      button: "Create Impact Story",
      image: IMAGE_6,
    },
  ];

  return (
    <>
      <CreateCommunityModal
        customOpen={isCommunityOpen}
        setCustomOpen={setIsCommunityOpen}
        setCommunityData={setCommunityData}
        isCustom={true}
      />
      <CreateCampaignModal
        isCustom={true}
        customOpen={isCampaignOpen}
        setCustomOpen={setIsCampaignOpen}
        setCampaignsData={setCampaignsData}
        setJustCreated={setJustCreated}
      />
      <div className="h-full w-full bg-white">
        <div className="fixed top-0 left-0 w-full p-6">
          <CoterieLogo />
        </div>
        <div className="mt-5 flex w-full flex-col items-center justify-center">
          {/* Header */}
          <div className="px-4 py-14 text-center">
            <h1 className="text-[40px] leading-16 font-medium -tracking-[2.24px] text-[#212121]">
              Your Community Starts Here
            </h1>
            <p className="text-[20px] leading-8 -tracking-[0.4px] text-[#454545]">
              Everything you do on Coterie grows from this.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mx-auto mb-16 max-w-4xl px-4">
            <div className="flex items-center justify-center gap-1.5">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10.5 w-10.5 items-center justify-center rounded-full transition-all ${
                        step.completed
                          ? "bg-[#12AA5B] text-white"
                          : "border border-[#D1D5DB] bg-white text-[#D1D5DB]"
                      }`}
                    >
                      {step.completed ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <span className="text-2xl font-normal">{step.id}</span>
                      )}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-[0.5px] w-24.5 ${
                        steps[index + 1].completed ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mx-auto px-6 pb-16">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              {features.map((feature, index) => {
                // const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className={`relative h-82.5 overflow-hidden rounded-2xl bg-[#F9F9F9] p-8 transition-all hover:shadow-sm`}
                  >
                    <div className="mb-4">
                      <div className="h-21.5">
                        <h3 className="mb-2 text-base leading-7 font-medium -tracking-[0.4px] text-[#212121]">
                          {feature.title}
                        </h3>
                        <p className="mb-2 text-[10.3px] leading-3.75 -tracking-[0.28px] text-[#454545]">
                          {feature.description}
                        </p>
                      </div>
                      <button
                        onClick={feature.onclick}
                        className="cursor-pointer rounded-lg bg-[#12AA5B]/8 px-4 py-2 text-[13px] font-semibold text-[#12AA5B] transition-colors hover:bg-[#12AA5B]/20"
                      >
                        {feature.button}
                      </button>
                    </div>
                    <img
                      src={feature?.image}
                      alt={feature.title}
                      className="absolute bottom-0 left-0 h-45 w-full object-cover object-top"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button onClick={() => setIsSetupCompleted("true")}>Complete</Button>
        </div>
      </div>
    </>
  );
};

export default GetStartedPage;
