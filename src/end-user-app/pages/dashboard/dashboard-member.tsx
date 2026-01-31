import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  MagnifyingGlassIcon,

  // FilePdf,
  // FileText,
  // Books,
  ArrowsDownUpIcon,
  Funnel,
} from "@phosphor-icons/react";
import UserUpcomingEventCard from "@/components/end-users/events/user-upcoming-event-card";

const members = Array(6).fill({
  id: "1",
  name: "Tunde Ajayi",
  date: "August 19, 2026",
  status: "Active",
  avatar: "https://placehold.co/40x40/png",
});

const DashboardMember = () => {
  return (
    <div className="flex w-full gap-12">
      {/* Main List Area */}
      <div className="flex-1 rounded-[16px] border border-[#DFE1E7]">
        {/* Controls */}
        <div className="mb-3.25 flex items-center gap-4 px-[18.5px] py-3.25">
          <div className="relative max-w-[256px] flex-1">
            <MagnifyingGlassIcon
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input placeholder="Search" className="border border-[#DFE1E7] pl-10" />
          </div>
          <Button variant="outline" className="gap-2 text-sm font-medium text-[#666D80]">
            <Funnel size={18} /> Filter
          </Button>
          <Button variant="outline" className="text- gap-2 font-medium text-[#666D80]">
            <ArrowsDownUpIcon size={14} />
            Sort by
          </Button>
        </div>

        {/* Table */}
        <div className="">
          <Table>
            <TableHeader className="border-t bg-[#F6F8FA]">
              <TableRow>
                <TableHead className="w-12.5">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-12.5 text-sm leading-[150%] font-normal tracking-[2%] text-[#666D80]">
                  No
                </TableHead>
                <TableHead className="text-sm leading-[150%] font-normal tracking-[2%] text-[#666D80]">
                  Avatar
                </TableHead>
                <TableHead className="text-sm leading-[150%] font-normal tracking-[2%] text-[#666D80]">
                  Donor Name
                </TableHead>
                <TableHead className="text-sm leading-[150%] font-normal tracking-[2%] text-[#666D80]">
                  Date Joined
                </TableHead>
                <TableHead className="text-sm leading-[150%] font-normal tracking-[2%] text-[#666D80]">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="py-[21.5px] text-sm leading-[150%] font-normal tracking-[2%] text-[#0D0D12]">
                    {i + 1}
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                      {/* <img src={member.avatar} alt="Avatar" className="h-full w-full object-cover" /> */}
                      <div className="flex h-full w-full items-center justify-center bg-[#D0D5DD]">
                        👤
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-[21.5px] text-sm leading-[150%] font-normal tracking-[2%] text-[#0D0D12]">
                    {member.name}
                  </TableCell>
                  <TableCell className="py-[21.5px] text-sm leading-[150%] font-normal tracking-[2%] text-[#0D0D12]">
                    {member.date}
                  </TableCell>
                  <TableCell>
                    <Badge className="flex h-5 items-center gap-1.5 rounded-full border-[#D2FFF6] bg-[#E7FFFA] text-[10px] leading-4.5 font-normal tracking-[1%] text-[#0E8A72] hover:bg-[#E7FFFA]">
                      • {member.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t px-5 py-[21.5px] text-sm text-gray-500">
          <p className="text-sm leading-[150%] font-normal tracking-[2%] text-[#0D0D12]">
            Showing 1 to 10 of, 500 results
          </p>
          {/* Pagination mock */}
        </div>
      </div>

      {/* Right Sidebar (Specific to Member Tab) */}
      <UserUpcomingEventCard />
    </div>
  );
};

export default DashboardMember;
