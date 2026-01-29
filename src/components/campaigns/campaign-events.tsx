import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontalIcon, Search01Icon } from "@hugeicons/core-free-icons";
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
import { ArrowDownIcon, ArrowsDownUpIcon, ArrowUpIcon, FunnelIcon } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";

const campaignsData = [
  {
    id: "1",
    title: "Strength in Unity: Cancer Patient Support Program",
    participants: 126,
    rsvp: "up",
    lastActivity: "2h ago",
    date: "24th May 2020",
    eventType: "-",
    status: "Draft",
  },
  {
    id: "2",
    title: "Journey of Hope: Empowering Cancer Survivors",
    participants: 32,
    rsvp: "down",
    lastActivity: "3 days ago",
    date: "24th August 2020",
    eventType: "Virtual",
    status: "Active",
  },
  {
    id: "3",
    title: "Light of Hope: Cancer Awareness and Support",
    participants: 126,
    rsvp: "up",
    lastActivity: "2h ago",
    date: "N/A",
    eventType: "-",
    status: "Paused",
  },
  {
    id: "4",
    title: "Radiant Futures: A Cancer Support Initiative",
    participants: 0,
    rsvp: "down",
    lastActivity: "50 days ago",
    date: "25th December 2025",
    eventType: "Physical",
    status: "Suspended",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  let styles = "";
  switch (status) {
    case "Active":
      styles = "bg-[##FFFFFF] text-[#339D88] bg-[#339D88]/20 border-[#339D88]"; // Greenish
      break;
    case "Draft":
      styles = "bg-[##FFFFFF] text-[#D39C3D] bg-[#D39C3D]/20 border-[#D39C3D]"; // Yellowish/Orange
      break;
    case "Paused":
      styles = "bg-[##FFFFFF] text-[#AF52DE] bg-[#AF52DE]/20 border-[#AF52DE]"; // Purple
      break;
    case "Suspended":
      styles = "bg-[##FFFFFF] text-[#DF1C41] bg-[#DF1C41]/20 border-[#DF1C41]"; // Red
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

const CampaignsEvents = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="font-ubuntu">
      <div className="flex items-center justify-end">
        <Button onClick={() => navigate(`/campaigns/${id}/create-event`)} className="mb-2 h-9 w-50">
          Create Event
        </Button>
      </div>
      {/* Header Controls */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-[#E0E1E6] p-4 md:flex-row">
        <h3 className="mr-auto text-base leading-[150%] font-bold tracking-[2%] whitespace-nowrap text-[#0D0D12] md:mr-0">
          Events
        </h3>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <div className="relative w-full md:w-[320px]">
            <HugeiconsIcon
              icon={Search01Icon}
              size={20}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-[#8B8D98]"
            />
            <Input
              placeholder="Search"
              className="h-10 w-full rounded-lg border-[#E0E1E6] bg-white pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-lg border-[#E0E1E6] bg-white text-[#5E606A] hover:bg-gray-50"
          >
            <FunnelIcon size={20} />
            Filter
          </Button>
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-lg border-[#E0E1E6] bg-white text-[#5E606A] hover:bg-gray-50"
          >
            <ArrowsDownUpIcon size={20} />
            Sort by
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-x border-[#DFE1E7] bg-[#F6F8FA]">
            <TableRow className="text-sm leading-[150%] text-[#666D80] hover:bg-transparent">
              <TableHead className="w-[40px] pl-4">
                <Checkbox className="border-[#CDCED7] data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]" />
              </TableHead>
              <TableHead className="w-[60px] font-medium text-[#666D80]">No</TableHead>
              <TableHead className="min-w-[250px] font-medium text-[#666D80]">
                Event Titles
              </TableHead>
              <TableHead className="font-medium text-[#666D80]">RSVP</TableHead>
              <TableHead className="font-medium text-[#666D80]">Last Activity</TableHead>
              <TableHead className="font-medium text-[#666D80]">Date</TableHead>
              <TableHead className="font-medium text-[#666D80]">Event Type</TableHead>
              <TableHead className="font-medium text-[#666D80]">Status</TableHead>
              <TableHead className="w-[50px] font-medium"> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaignsData.map((campaign) => (
              <TableRow
                key={campaign.id}
                className="group cursor-pointer border-b border-[#E0E1E6] last:border-0 hover:bg-gray-50"
              >
                <TableCell className="py-4 pl-4">
                  <Checkbox
                    onClick={(e) => e.stopPropagation()}
                    className="border-[#CDCED7] data-[state=checked]:border-[#12AA5B] data-[state=checked]:bg-[#12AA5B]"
                  />
                </TableCell>
                <TableCell className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                  {campaign.id}
                </TableCell>
                <TableCell className="max-w-[300px] truncate text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                  {campaign.title}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-10">
                    <span className="w-30 text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                      {campaign.participants} participants
                    </span>
                    <div className="">
                      {campaign.rsvp === "up" ? (
                        <ArrowUpIcon size={10} className="text-[#12AA5B]" />
                      ) : (
                        <ArrowDownIcon size={10} className="text-[#F04438]" />
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                  {campaign.lastActivity}
                </TableCell>
                <TableCell className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                  {campaign.date}
                </TableCell>
                <TableCell className="text-sm leading-[150%] tracking-[2%] text-[#0D0D12]">
                  {campaign.eventType}
                </TableCell>
                <TableCell>
                  <StatusBadge status={campaign.status} />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8B8D98]">
                    <HugeiconsIcon icon={MoreHorizontalIcon} size={20} color="#666D80" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination placeholder if needed? Not shown in screenshot, but good to have padding at bottom or standard footer */}
    </div>
  );
};

export default CampaignsEvents;
