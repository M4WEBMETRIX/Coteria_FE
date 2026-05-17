import { HugeiconsIcon } from "@hugeicons/react";
import {
  // ArrowRight01Icon,
  // Cancel01Icon,
  Checkmark,
} from "@hugeicons/core-free-icons";

import PulseStatsWidget from "@/components/campaigns/details/pulse-stats-widget";
import TodaysObjectivesWidget from "@/components/campaigns/details/todays-objectives-widget";
import ShareCampaign from "./share-campaign";
import DriverAnalysisWidget from "@/components/campaigns/details/driver-analysis-widget";
// import CampaignMomentumTimeline from "@/components/campaigns/details/campaign-momentum-timeline";
import {
  WhatsHappeningWidget,
  // RequestParticipantsWidget,
} from "@/components/campaigns/details/sidebar-widgets";
import ActivityFeedWidget from "@/components/campaigns/details/activity-feed-widget";
import AiInsightWidget from "@/components/campaigns/details/ai-insight-widget";

const CommandCenter = ({ data }: { data: any }) => {
  // console.log(data);
  return (
    <div>
      {" "}
      {/* for mvp - flex gap-6 */}
      {/* Content Grid */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main Column (Left - 8 cols) */}
        <div className="flex-1 flex-col">
          {/* Live Campaign Pulse Header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm leading-[100%] font-semibold text-[#696A70]">
              {data?.categoryLabel}
            </h3>
            {/* <div className="flex cursor-pointer items-center gap-1 text-[10px] leading-[100%] text-[#C1C2C9]">
              Last 14 days
               <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </div> */}
          </div>

          {/* Campaign Title & Share */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex flex-col gap-[6px]">
              <h1 className="text-2xl font-bold text-[#1E1F24]">{data?.name}</h1>
              <div className="mt-1 flex items-center gap-2">
                <div className="hidden h-5 w-5 items-center justify-center rounded-full bg-[#D5FEF3CC] lg:flex">
                  <HugeiconsIcon icon={Checkmark} color="#31AB93" size={14} />
                </div>
                <span className="text-xs text-[#8B8D98]">{data?.description}</span>
              </div>
            </div>
            {data?.status?.toLowerCase() === "active" && (
              <ShareCampaign
                communitySlug={data?.community?.slug}
                campaignSlug={data?.slug}
                communityId={data?.communityId}
                campaign={data}
              />
            )}
          </div>

          {/* Pulse Stats Widgets */}
          <PulseStatsWidget id={data?.id} />

          {/* Alert Banner */}
          {/* <div className="mt-8 flex items-center justify-between rounded-[12px] border border-[#FFBE4C] bg-[#FFF6E0] px-4 py-[5.5px] text-xs leading-[150%] font-normal tracking-[2%] text-[#0D0D12]">
            <div className="flex items-center gap-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FDB022] text-[10px] text-white">
                !
              </div>
              <span>
                Momentum increased because two community influencer shared the campaign overnight,
                driving 85 new participants.
              </span>
            </div>
            <HugeiconsIcon icon={Cancel01Icon} size={16} className="cursor-pointer" />
          </div> */}

          {/* Objectives & Driver Analysis Row */}
          <div className="mt-10 grid grid-cols-12 gap-6">
            {/* Objectives (Larger) */}
            {/* lg:col-span-9 - removed for mvp */}
            <div className="col-span-12 flex-1 space-y-5 lg:col-span-9">
              <TodaysObjectivesWidget />

              {/* COMMENTED OUT FOR MVC  */}
              {/* Momentum Timeline */}
              {/* <CampaignMomentumTimeline /> */}
            </div>
            {/* Driver Analysis (Smaller) */}
            <div className="col-span-12 h-full lg:col-span-3">
              <DriverAnalysisWidget />
            </div>
          </div>
        </div>
        {/* Sidebar Column (Right - 4 cols) */}
        {/* COMMENTED OUT FOR MVC  */}
        {/* mvp - w-[256px] */}
        <aside className="flex flex-col gap-4 lg:max-w-[300px]">
          <div className="h-[120px] rounded-xl border border-[#DFE1E7] p-4">
            <p className="mb-1 text-sm font-medium text-[#0F0F0F]">Active QR code</p>
            <p className="mb-2.5 text-xs font-normal text-[#4A4C54]">
              Number of Donors That Have Scanned the QR Code
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold text-[#12AA5B]">0</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.59473 19.135V16.8648H7.13527V21.4053H2.59473V19.135ZM6.48662 19.135V17.5134H3.24338V20.7566H6.48662V19.135ZM3.89202 19.135V18.162H5.83797V20.108H3.89202V19.135ZM8.43256 21.081V20.7566H7.78392V19.4593H8.43256V17.5134H9.08121V16.8648H7.78392V16.2161H5.18932V15.5675H5.83797V14.9188H4.54067V16.2161H3.89202V15.5675H2.59473V14.9188H3.89202V13.6215H3.24338V14.2702H2.59473V12.9729H3.89202V13.6215H4.54067V14.2702H5.18932V13.6215H5.83797V14.2702H7.13527V13.6215H6.48662V12.9729H4.54067V12.3242H6.48662V11.6756H4.54067V11.0269H3.89202V11.6756H2.59473V9.72962H3.24338V10.3783H7.13527V9.72962H6.48662V9.08097H5.18932V9.72962H4.54067V9.08097H3.24338V7.78367H4.54067V9.08097H5.18932V8.43232H6.48662V7.78367H7.13527V8.43232H6.48662V9.08097H7.13527V9.72962H7.78392V8.43232H8.43256V7.78367H7.78392V5.83773H9.08121V6.48637H9.72986V7.13502H9.08121V7.78367H9.72986V11.6756H8.43256V11.0269H7.78392V11.6756H7.13527V12.3242H6.48662V12.9729H7.13527V13.6215H7.78392V14.2702H9.08121V13.6215H8.43256V12.9729H7.78392V12.3242H9.08121V13.6215H9.72986V12.3242H10.3785V13.6215H11.0272V11.6756H11.6758V11.0269H12.3245V11.6756H11.6758V12.3242H12.3245V12.9729H14.2704V12.3242H13.6218V11.6756H12.9731V10.3783H12.3245V9.72962H12.9731V9.08097H13.6218V8.43232H12.9731V7.78367H12.3245V9.08097H11.6758V8.43232H11.0272V9.08097H10.3785V8.43232H11.0272V7.78367H10.3785V5.83773H9.72986V5.18908H10.3785V5.83773H11.0272V3.24313H11.6758V4.54043H12.9731V3.89178H12.3245V2.59448H13.6218V3.24313H12.9731V3.89178H14.2704V3.24313H14.9191V2.59448H16.2163V4.54043H14.9191V3.89178H14.2704V5.18908H14.9191V7.13502H15.5677V6.48637H16.2163V9.72962H17.5136V9.08097H16.865V7.78367H18.1623V9.72962H19.4596V9.08097H18.8109V7.78367H19.4596V9.08097H20.1082V8.43232H21.4055V9.72962H20.7569V9.08097H20.1082V9.72962H19.4596V11.6756H20.1082V12.3242H19.4596V12.9729H18.1623V13.6215H17.5136V14.2702H16.2163V13.6215H15.5677V12.9729H14.9191V14.2702H15.5677V14.9188H17.5136V15.5675H18.8109V14.9188H18.1623V14.2702H18.8109V13.6215H19.4596V14.2702H20.1082V14.9188H20.7569V13.6215H20.1082V12.9729H21.4055V14.9188H20.7569V16.2161H21.4055V17.5134H20.7569V19.4593H21.4055V20.108H19.4596V21.4053H17.5136V20.7566H18.8109V20.108H17.5136V18.8107H16.865V20.108H16.2163V20.7566H16.865V21.4053H15.5677V19.4593H14.9191V20.7566H14.2704V20.108H13.6218V17.5134H14.2704V19.4593H14.9191V17.5134H15.5677V16.2161H14.9191V15.5675H14.2704V14.9188H14.9191V14.2702H14.2704V13.6215H13.6218V16.2161H14.2704V16.8648H12.9731V18.162H12.3245V19.4593H12.9731V20.108H12.3245V20.7566H13.6218V21.4053H12.3245V20.7566H11.6758V20.108H11.0272V21.4053H8.43256V21.081ZM10.3785 20.108V19.4593H11.0272V17.5134H9.72986V18.162H10.3785V18.8107H9.08121V19.4593H8.43256V20.108H9.08121V20.7566H10.3785V20.108ZM19.4596 19.4593V18.8107H20.1082V17.5134H20.7569V16.8648H20.1082V14.9188H19.4596V16.8648H20.1082V17.5134H19.4596V18.162H18.8109V20.108H19.4596V19.4593ZM16.2163 19.135V18.8107H15.5677V19.4593H16.2163V19.135ZM12.3245 17.8377V17.5134H11.6758V18.162H12.3245V17.8377ZM18.1623 17.1891V16.2161H16.2163V18.162H18.1623V17.1891ZM16.865 17.1891V16.8648H17.5136V17.5134H16.865V17.1891ZM11.6758 16.5404V16.2161H12.9731V15.5675H11.6758V14.9188H11.0272V15.5675H11.6758V16.2161H10.3785V15.5675H9.72986V16.2161H9.08121V15.5675H8.43256V14.9188H7.78392V14.2702H7.13527V14.9188H6.48662V15.5675H7.13527V14.9188H7.78392V15.5675H8.43256V16.2161H9.08121V16.8648H11.6758V16.5404ZM9.72986 14.5945V14.2702H9.08121V14.9188H9.72986V14.5945ZM12.9731 14.2702V13.6215H11.6758V14.2702H12.3245V14.9188H12.9731V14.2702ZM16.865 13.2972V12.9729H16.2163V13.6215H16.865V13.2972ZM18.1623 12.6485V12.3242H18.8109V10.3783H18.1623V11.0269H17.5136V11.6756H16.865V11.0269H15.5677V10.3783H14.9191V9.72962H15.5677V7.78367H14.9191V7.13502H14.2704V6.48637H13.6218V7.13502H12.9731V5.18908H13.6218V5.83773H14.2704V5.18908H13.6218V4.54043H12.9731V5.18908H12.3245V7.13502H12.9731V7.78367H13.6218V7.13502H14.2704V9.08097H13.6218V9.72962H12.9731V10.3783H13.6218V11.6756H14.2704V11.0269H15.5677V11.6756H16.2163V12.3242H17.5136V12.9729H18.1623V12.6485ZM17.5136 11.9999V11.6756H18.1623V12.3242H17.5136V11.9999ZM7.13527 11.3512V11.0269H7.78392V10.3783H7.13527V11.0269H6.48662V11.6756H7.13527V11.3512ZM9.08121 10.0539V9.72962H8.43256V10.3783H9.08121V10.0539ZM9.08121 6.8107V6.48637H8.43256V7.13502H9.08121V6.8107ZM11.6758 6.48637V5.83773H11.0272V7.13502H11.6758V6.48637ZM15.5677 3.56746V3.24313H14.9191V3.89178H15.5677V3.56746ZM20.7569 21.081V20.7566H21.4055V21.4053H20.7569V21.081ZM20.7569 11.6756V11.0269H20.1082V10.3783H20.7569V11.0269H21.4055V12.3242H20.7569V11.6756ZM2.59473 4.86475V2.59448H7.13527V7.13502H2.59473V4.86475ZM6.48662 4.86475V3.24313H3.24338V6.48637H6.48662V4.86475ZM3.89202 4.86475V3.89178H5.83797V5.83773H3.89202V4.86475ZM16.865 4.86475V2.59448H21.4055V7.13502H16.865V4.86475ZM20.7569 4.86475V3.24313H17.5136V6.48637H20.7569V4.86475ZM18.1623 4.86475V3.89178H20.1082V5.83773H18.1623V4.86475ZM7.78392 4.86475V4.54043H8.43256V5.18908H7.78392V4.86475ZM9.08121 4.2161V3.89178H8.43256V2.59448H9.08121V3.24313H9.72986V2.59448H10.3785V3.24313H9.72986V4.54043H9.08121V4.2161Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <WhatsHappeningWidget />
          {/* <RequestParticipantsWidget /> */}
          <ActivityFeedWidget />
          <AiInsightWidget />
        </aside>
      </div>
    </div>
  );
};

export default CommandCenter;
