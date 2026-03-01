import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontalIcon,
  Search01Icon,
  // FilterHorizontalIcon,
  // ArrowDown01Icon,
  //   ArrowDown01,
  //   ArrowUp01,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import CommunityTableBodySkeleton from "./components/skeletons/community-table-skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EyeIcon } from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ActionPopover({ id }: { id: string | number }) {
  const navigate = useNavigate();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8B8D98]">
          <HugeiconsIcon icon={MoreHorizontalIcon} size={20} color="#666D80" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max">
        <div className="grid gap-4">
          <div
            onClick={() => navigate(`/community/${id}`)}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <EyeIcon size={18} />
            View
          </div>
          {/* <div className="flex items-center gap-2 text-sm text-[red]">
            <TrashIcon size={18} />
            Delete
          </div> */}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// const campaignsData = [
//   {
//     id: "1",
//     title: "Strength in Unity: Cancer Patient Support Program",
//     participants: 126,
//     trend: "up",
//     lastActivity: "2h ago",
//     goalAmount: "$500.00",
//     raised: "-",
//     status: "Draft",
//   },
//   {
//     id: "2",
//     title: "Journey of Hope: Empowering Cancer Survivors",
//     participants: 32,
//     trend: "down",
//     lastActivity: "3 days ago",
//     goalAmount: "$500.00",
//     raised: "$100.00",
//     status: "Active",
//   },
//   {
//     id: "3",
//     title: "Light of Hope: Cancer Awareness and Support",
//     participants: 126,
//     trend: "up",
//     lastActivity: "2h ago",
//     goalAmount: "$500.00",
//     raised: "$500.00",
//     status: "Paused",
//   },
//   {
//     id: "4",
//     title: "Radiant Futures: A Cancer Support Initiative",
//     participants: 0,
//     trend: "down",
//     lastActivity: "50 days ago",
//     goalAmount: "$500.00",
//     raised: "-",
//     status: "Suspended",
//   },
// ];

export const timeAgo = (dateString: string) => {
  return formatDistanceToNowStrict(new Date(dateString), {
    addSuffix: true,
  });
};

const StatusBadge = ({ status }: { status: string }) => {
  let styles = "";
  switch (status) {
    case "Active":
      styles = "bg-[##FFFFFF] text-[#339D88] border-[#339D88]"; // Greenish
      break;
    case "Draft":
      styles = "bg-[##FFFFFF] text-[#D39C3D] border-[#D39C3D]"; // Yellowish/Orange
      break;
    case "Paused":
      styles = "bg-[##FFFFFF] text-[#AF52DE] border-[#AF52DE]"; // Purple
      break;
    case "Suspended":
      styles = "bg-[##FFFFFF] text-[#DF1C41] border-[#DF1C41]"; // Red
      break;
    default:
      styles = "bg-gray-100 text-gray-600 border-gray-200";
  }

  // Dot color mapping
  const dotColor =
    {
      Active: "bg-[#0F974F]",
      Draft: "bg-[#B96004]",
      Paused: "bg-[#9747FF]",
      Suspended: "bg-[#E02D3C]",
    }[status] || "bg-gray-400";

  return (
    <div className={`flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 ${styles}`}>
      <div className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <span className="text-xs font-medium">{status}</span>
    </div>
  );
};

const CommunityTableList = ({
  communityData,
  isPending,
  sort,
  setSort,
  search,
  setSearch,
}: any) => {
  const navigate = useNavigate();
  //   console.log("table dataaa1", communityData);

  return (
    <div className="font-ubuntu mb-6 overflow-hidden rounded-xl border border-[#DFE1E7] bg-white">
      {/* Header Controls */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-[#E0E1E6] p-4 md:flex-row">
        <h3 className="mr-auto text-base leading-[150%] font-bold tracking-[2%] whitespace-nowrap text-[#0D0D12] md:mr-0">
          Community Table
        </h3>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <div className="relative w-full md:w-[320px]">
            <HugeiconsIcon
              icon={Search01Icon}
              size={20}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-[#8B8D98]"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="h-10 w-full rounded-lg border-[#E0E1E6] bg-white pl-10"
            />
          </div>
          {/* <Button
            variant="outline"
            className="h-10 gap-2 rounded-lg border-[#E0E1E6] bg-white text-[#5E606A] hover:bg-gray-50"
          >
            <HugeiconsIcon icon={FilterHorizontalIcon} size={20} />
            Filter
          </Button> */}
          <Select defaultValue="asc" value={sort} onValueChange={(value) => setSort(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border border-[#DFE1E7] bg-[#F6F8FA]">
            <TableRow className="border-b border-[#E0E1E6] text-sm leading-[150%] text-[#666D80] hover:bg-transparent">
              <TableHead className="w-[40px] pl-4">
                <Checkbox className="border-[#CDCED7] data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]" />
              </TableHead>
              <TableHead className="w-[60px] font-medium text-[#666D80]">No</TableHead>
              <TableHead className="min-w-[200px] font-medium text-[#666D80]">
                Community Title
              </TableHead>
              <TableHead className="min-w-[250px] font-medium text-[#666D80]">
                Description
              </TableHead>
              <TableHead className="font-medium text-[#666D80]">Visibility</TableHead>
              <TableHead className="font-medium text-[#666D80]">Last Activity</TableHead>
              {/* <TableHead className="font-medium text-[#666D80]">Raised</TableHead> */}
              <TableHead className="font-medium text-[#666D80]">Status</TableHead>
              <TableHead className="w-[50px] font-medium"> </TableHead>
            </TableRow>
          </TableHeader>
          {isPending ? (
            <CommunityTableBodySkeleton rows={6} />
          ) : (
            <>
              {communityData?.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-[45vh] text-center">
                    No communities found
                  </TableCell>
                </TableRow>
              ) : (
                <TableBody>
                  {communityData?.map((community: any, index: number) => (
                    <TableRow
                      key={community?.id}
                      onClick={() => navigate(`/community/${community?.id}`)}
                      className="group cursor-pointer border-b border-[#E0E1E6] last:border-0 hover:bg-gray-50"
                    >
                      <TableCell className="py-4 pl-4">
                        <Checkbox
                          onClick={(e) => e.stopPropagation()}
                          className="border-[#CDCED7] data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]"
                        />
                      </TableCell>
                      <TableCell className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                        {index + 1}
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                        {community?.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span className="max-w-[320px] truncate text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                            {community?.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                        {community?.visibility}
                      </TableCell>
                      <TableCell className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                        {timeAgo(community?.updatedAt)}
                      </TableCell>
                      {/* <TableCell className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                  {campaign.raised}
                </TableCell> */}
                      <TableCell>
                        <StatusBadge status={community?.isActive ? "Active" : "Draft"} />
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <ActionPopover id={community?.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </>
          )}
        </Table>
      </div>
      {/* Pagination placeholder if needed? Not shown in screenshot, but good to have padding at bottom or standard footer */}
    </div>
  );
};

export default CommunityTableList;
