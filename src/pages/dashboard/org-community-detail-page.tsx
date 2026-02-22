// import React from 'react'

import { useBreadcrumb } from "@/components/breadcrumb-navigation";
// import ActivitySummaryWidget from "@/components/community/activity-summary-widget";
// import CommunityAiInsightWidget from "@/components/community/community-ai-insight-widget";
// import CommunityInsightsWidget from "@/components/community/community-insights-widget";
import CommunityStats, { StatCardSkeleton } from "@/components/community/community-stats";
import GrowthTrendsWidget from "@/components/community/growth-trends-widget";
import { useCommunityDetailsStats } from "@/services/generics/hooks";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import InviteMembersModal from "./invite-member";
import { useState } from "react";

const OrgCommunityDetailPage = () => {
  const { id } = useParams();
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);

  useBreadcrumb({
    items: [
      { label: "Home", href: "/dashboard" },
      { label: "Community", href: "/dashboard" },
      { label: "Community detail", href: "/dashboard", isCurrentPage: true },
    ],
  });

  const { data: communityStats, isPending: isFetchingStats } = useCommunityDetailsStats(id);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 space-y-6 rounded-[8px] border border-[#E1D4FF] bg-[#FBFAFF] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2E6FF]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 5H20V3H4V5ZM20 9H4V7H20V9ZM3 11H10V13H14V11H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V11ZM16 13V15H8V13H5V19H19V13H16Z"
                  fill="#5C12A7"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg leading-[140%] font-medium tracking-[0%] text-[#09090B]">
                Create a Campaign
              </p>
              <p className="text-base leading-3.75 font-normal tracking-[-0.28px] text-[#52525B]">
                Launch a focused cause, track engagement, and see how support grows across your
                community in real time.
              </p>
            </div>
          </div>

          <Link
            className="flex h-12 w-50 items-center justify-center rounded-[10px] border border-[#E2E2E2] px-4 text-center"
            to={"/campaigns"}
          >
            <div className="flex items-center gap-1.5">
              <p>Launch Awareness</p>
              <div>
                <ArrowUpRightIcon color="#0A0A0A" size={20} />
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-start gap-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2E6FF]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3L22 7V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7.00353L4 3H20ZM20 9H4V19H20V9ZM12 10L16 14H13V18H11V14H8L12 10ZM18.764 5H5.236L4.237 7H19.764L18.764 5Z"
                  fill="#5C12A7"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg leading-[140%] font-medium tracking-[0%] text-[#09090B]">
                Invite Members to Your Community
              </p>
              <p className="text-base leading-3.75 font-normal tracking-[-0.28px] text-[#52525B]">
                Bring people in & grow participation across your community
              </p>
            </div>
          </div>

          <div
            className="flex h-12 w-50 cursor-pointer items-center justify-center rounded-[10px] border border-[#E2E2E2] px-4 text-center"
            onClick={() => setInviteOpen(true)}
          >
            <div className="flex items-center gap-1.5">
              <p>Invite Members</p>
              <div>
                <ArrowUpRightIcon color="#0A0A0A" size={20} />
              </div>
            </div>
          </div>
          <InviteMembersModal open={inviteOpen} onOpenChange={setInviteOpen} />
        </div>
      </div>

      {isFetchingStats ? (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <CommunityStats data={communityStats?.data} />
      )}

      {/* Main Content Grid */}
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* Row 1: Trends + AI */}
        <div className="col-span-12 h-[350px] lg:col-span-12">
          <GrowthTrendsWidget />
        </div>
        {/* <div className="col-span-12 h-[350px] lg:col-span-4">
          <CommunityAiInsightWidget />
        </div> */}

        {/* Row 2: Activity + Insights */}
        {/* <div className="col-span-12 h-full min-h-[300px] lg:col-span-5">
          <ActivitySummaryWidget />
        </div>
        <div className="col-span-12 h-full min-h-[300px] lg:col-span-7">
          <CommunityInsightsWidget />
        </div> */}
      </div>
    </div>
  );
};

export default OrgCommunityDetailPage;
