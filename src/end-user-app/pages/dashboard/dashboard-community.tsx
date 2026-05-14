// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUserCommunities } from "@/services/generics/user-generics/user-hooks";
import { CaretRightIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import EmptyCampaigns from "@/assets/icons/empty-campaigns.svg";
import { useState } from "react";
import ManagePagination from "@/components/Manage-pagination";
import { cn } from "@/lib/utils";

const DashboardCommunity = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isPending } = useGetUserCommunities(page, limit);
  // console.log(data);

  const communities = data?.data?.items;
  const totalPages = data?.data?.totalPages || 1;
  const totalItems = data?.data?.totalCount || data?.data?.totalItems || 0;

  return (
    <>
      <div className="space-y-4 lg:hidden">
        {isPending ? (
          // Mobile skeleton
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-[20px] border border-[#ECEFF3] p-6">
                <div className="mb-4 flex items-start gap-4">
                  <div className="h-16 w-16 rounded-[12px] bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </div>
                  <div className="h-8 w-16 rounded bg-gray-200" />
                </div>
                <div className="mb-4 space-y-2">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-2/3 rounded bg-gray-200" />
                </div>
                <div className="h-12 w-full rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        ) : communities?.length <= 0 || !communities ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-[20px] border border-[#ECEFF3] p-8">
            <img src={EmptyCampaigns} alt="empty-communities" className="mb-3 h-[72px] w-[72px]" />
            <p className="trackin-[-2%] pb-2 text-center text-base leading-6 font-semibold text-[#1E1F24]">
              No communities found
            </p>
            <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
              When you join a community, it will show up here.
            </p>
          </div>
        ) : (
          <>
            {communities?.map((community: any) => {
              // Get initials from community name
              const getInitials = (name: string) => {
                const words = name.trim().split(" ");
                if (words.length >= 2) {
                  return (words[0][0] + words[1][0]).toUpperCase();
                }
                return name.slice(0, 2).toUpperCase();
              };

              // Generate a color based on community name
              const getAvatarColor = (name: string) => {
                const colors = [
                  "bg-[#E0F8E0]", // light green
                  "bg-[#F4E6FF]", // light purple
                  "bg-[#FFE6E6]", // light red
                  "bg-[#E6F4FF]", // light blue
                  "bg-[#FFF4E6]", // light orange
                ];
                const index = name.charCodeAt(0) % colors.length;
                return colors[index];
              };

              const getTextColor = (name: string) => {
                const colors = [
                  "text-[#12AA5B]", // green
                  "text-[#A838D6]", // purple
                  "text-[#EF4444]", // red
                  "text-[#009BC2]", // blue
                  "text-[#D9A300]", // orange
                ];
                const index = name.charCodeAt(0) % colors.length;
                return colors[index];
              };

              return (
                <div
                  key={community?.id}
                  className="rounded-[20px] border border-[#ECEFF3] bg-white p-6 shadow-sm"
                >
                  {/* Header */}
                  <div className="mb-4 flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[8px] ${getAvatarColor(community?.name)}`}
                    >
                      <span className={`text-sm font-bold ${getTextColor(community?.name)}`}>
                        {getInitials(community?.name)}
                      </span>
                    </div>

                    {/* Name and visibility */}
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-sm leading-[140%] font-medium tracking-[-2%] text-[#000000]">
                        {community?.name}
                      </h3>
                      <span className="inline-block rounded-md bg-[#E0F8E0] px-2 py-0.5 text-xs font-medium text-[#12AA5B]">
                        {community?.visibility}
                      </span>
                    </div>

                    {/* Campaign count */}
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-[#818898]">
                        {community?.totalCampaigns || 0}
                      </span>
                      <span className="text-sm font-medium text-[#818898]">Campaigns</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-sm leading-[150%] text-[#404040]">
                    {community?.description || "No description available"}
                  </p>

                  {/* View button */}
                  <Button
                    onClick={() => navigate(`/user/dashboard/community/${community?.id}`)}
                    className="flex h-14 w-full items-center justify-center gap-1.5 rounded-full bg-[#12AA5B] text-sm font-medium text-white hover:bg-[#0da055]"
                  >
                    View community
                    <CaretRightIcon size={14} weight="bold" />
                  </Button>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="hidden w-full overflow-x-auto lg:block">
        <div className="min-w-[800px] rounded-[10px] border border-[#ECEFF3] bg-white lg:min-w-full">
          <Table className="w-full table-fixed">
            <TableHeader className="bg-[#FCFCFC]">
              <TableRow className="">
                <TableHead className="w-[60px] rounded-tl-[10px]! px-[29px]! py-[8.24px]! text-sm leading-[155%] font-bold text-[#000000]">
                  No
                </TableHead>
                <TableHead className="w-[220px] text-sm leading-[155%] font-bold text-[#000000]">
                  Community
                </TableHead>
                <TableHead className="text-sm leading-[155%] font-bold text-[#000000]">
                  Description
                </TableHead>
                {/* <TableHead className="text-lg leading-[155%] font-normal text-[#000000]">
                Joined
              </TableHead> */}
                <TableHead className="w-[120px] text-sm leading-[155%] font-bold text-[#000000]">
                  Visibility
                </TableHead>
                <TableHead className="w-[120px] text-center text-sm leading-[155%] font-bold text-[#000000]">
                  Campaigns
                </TableHead>
                <TableHead className="w-[120px] rounded-tr-[12px]! text-right"></TableHead>
              </TableRow>
            </TableHeader>

            {isPending ? (
              <TableSkeleton />
            ) : (
              <>
                {communities?.length <= 0 || !communities ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-[45vh] text-center">
                      <div className="mt-6 flex flex-col items-center justify-center">
                        <img
                          src={EmptyCampaigns}
                          alt="empty-campaigns"
                          className="mb-3 h-[72px] w-[72px]"
                        />
                        <p className="trackin-[-2%] pb-2 text-center text-base leading-6 font-semibold text-[#1E1F24]">
                          No communities found
                        </p>

                        <p className="max-w-[552px] pb-6 text-center text-sm leading-5 font-medium tracking-[-1%] text-[#8B8D98]">
                          When you join a community, it will show up here.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableBody>
                    {communities?.map((community: any, index: number) => (
                      <TableRow key={community?.id}>
                        <TableCell className="py-[8.24px]! text-center text-sm leading-[155%] font-normal text-[#000000]">
                          {index + 1}
                        </TableCell>
                        <TableCell className="py-[8.24px]! text-sm leading-[155%] font-medium text-[#000000]">
                          <p className="line-clamp-1">{community?.name}</p>
                        </TableCell>
                        <TableCell className="py-[8.24px]! text-left text-sm leading-[155%] font-normal whitespace-normal text-[#666D80]">
                          <p className="line-clamp-2">{community?.description}</p>
                        </TableCell>

                        <TableCell className="py-[8.24px]! text-left text-sm leading-[155%] font-normal">
                          <span
                            className={cn(
                              "inline-block rounded-[20px] px-2.5 py-1.5 text-sm",
                              community?.visibility?.toLowerCase() === "public"
                                ? "bg-[#EFFFF8] text-[#12AA5B]"
                                : "bg-[#F6F6F6] text-[#000000]"
                            )}
                          >
                            {community?.visibility}
                          </span>
                        </TableCell>
                        <TableCell className="py-[8.24px]! text-center text-sm leading-[155%] font-normal text-[#000000]">
                          {community?.totalCampaigns ? community?.totalCampaigns : 0}
                        </TableCell>
                        <TableCell className="py-[8.24px]! text-right text-sm leading-[155%] font-normal">
                          <Button
                            onClick={() => navigate(`/user/dashboard/community/${community?.id}`)}
                            className="h-10 rounded-full bg-[#12AA5B] px-4 text-white hover:bg-[#00b05b]"
                          >
                            <div className="flex items-center gap-2 text-sm">
                              View <CaretRightIcon size={14} weight="bold" className="text-white" />
                            </div>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </>
            )}
          </Table>
        </div>

        {!isPending && communities?.length > 0 && totalPages > 1 && (
          <ManagePagination
            totalItems={totalItems}
            totalPages={totalPages}
            currentPage={page}
            setCurrentPage={setPage}
            itemsPerPage={limit}
            setItemsPerPage={(newLimit) => {
              setLimit(newLimit);
              setPage(1); // Reset to first page when changing limit
            }}
          />
        )}
      </div>
    </>
  );
};

const TableSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="py-6">
            <div className="h-5 w-6 animate-pulse rounded bg-gray-200" />
          </TableCell>

          <TableCell className="py-6">
            <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
          </TableCell>

          <TableCell className="py-6">
            <div className="space-y-2">
              <div className="h-4 w-56 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
            </div>
          </TableCell>

          <TableCell className="py-6">
            <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
          </TableCell>

          <TableCell className="py-6">
            <div className="h-5 w-12 animate-pulse rounded bg-gray-200" />
          </TableCell>

          <TableCell className="py-6 text-right">
            <div className="ml-auto h-10 w-24 animate-pulse rounded-full bg-gray-200" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default DashboardCommunity;
