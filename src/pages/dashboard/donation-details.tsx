import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowsDownUpIcon, DotsThree, Funnel, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Mock data for the campaign history table
const campaignHistory = [
  {
    id: 1,
    donor: "John Doe",
    campaign: "Help Mia Walk Again",
    amount: "$2,500",
    date: "2025-05-26",
    message: '"Hope this helps!"',
  },
  {
    id: 2,
    donor: "John Doe",
    campaign: "Help Mia Walk Again",
    amount: "$2,500",
    date: "2025-05-26",
    message: '"Hope this helps!"',
  },
  {
    id: 3,
    donor: "John Doe",
    campaign: "Help Mia Walk Again",
    amount: "$2,500",
    date: "2025-05-26",
    message: '"Hope this helps!"',
  },
  {
    id: 4,
    donor: "John Doe",
    campaign: "Help Mia Walk Again",
    amount: "$2,500",
    date: "2025-05-26",
    message: '"Hope this helps!"',
  },
];

const DonationDetailsPage = () => {
  const { id } = useParams();
  useBreadcrumb({
    items: [
      { label: "Home", href: "/dashboard" },
      { label: "Donor", href: "/donors" },
      { label: "Donor details", isCurrentPage: true },
    ],
  });

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleAll = () => {
    if (selectedRows.length === campaignHistory.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(campaignHistory.map((d) => d.id));
    }
  };

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="font-ubuntu mt-12 flex flex-col gap-6">
      {/* Top Section if any, breadcrumbs are handled by hook */}

      <div className="flex items-start justify-start gap-6">
        {/* Left Sidebar */}
        <div className="w-[223px] space-y-5">
          {/* Profile Card */}
          <div className="rounded-xl border border-[#DFE1E7] bg-white p-2">
            <div className="flex items-start gap-4 px-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>TA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-base font-medium text-[#0D0D12]">Tunde Ajayi</h3>
                <Badge
                  variant="outline"
                  className="mt-1 border border-[#D2FFF6] bg-[#E7FFFA] px-2 py-0.5 text-[10px] font-normal text-[#0E8A72] shadow-none"
                >
                  <div className="mr-1 h-1 w-1 rounded-full bg-[#0E8A72]" />
                  Active
                </Badge>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="px-3">
              <p className="text-xs text-[#666D80]">Last active</p>
              <p className="mt-1 text-lg font-medium text-[#0D0D12]">3 days ago</p>
            </div>
          </div>

          {/* Campaigns Joined Card */}
          <div className="rounded-xl border border-[#DFE1E7] bg-white p-5">
            <p className="text-xs text-[#666D80]">Campaigns joined</p>
            <p className="mt-1 text-lg font-medium text-[#0D0D12]">3 days ago</p>
          </div>

          {/* Sharing Activity Card */}
          <div className="rounded-xl border border-[#DFE1E7] bg-white p-5">
            <p className="text-xs text-[#818898]">Sharing activity</p>
            <p className="mt-1 text-lg font-medium text-[#0D0D12]">3 days ago</p>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 rounded-xl border border-[#DFE1E7] bg-white lg:col-span-8">
          <div className="flex items-center justify-between border-b border-[#DFE1E7] p-4">
            <h3 className="text-base leading-[150%] tracking-[2%] text-[#0D0D12]">
              List of Campaign
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 border-[#DFE1E7]">
                <Funnel size={18} color="#818898" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 border-[#DFE1E7]">
                <ArrowsDownUpIcon size={18} color="#818898" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#F6F8FA]">
                <TableRow>
                  <TableHead className="w-[50px] pl-4">
                    <Checkbox
                      checked={
                        selectedRows.length === campaignHistory.length && campaignHistory.length > 0
                      }
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  {["No", "Donor Name", "Campaign Title", "Amount", "Date", "Message", ""].map(
                    (header, index) => (
                      <TableHead key={index} className="text-sm font-normal text-[#666D80]">
                        {header}
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignHistory.map((item) => (
                  <TableRow key={item.id} className="hover:bg-[#F6F8FA]">
                    <TableCell className="pl-4">
                      <Checkbox
                        checked={selectedRows.includes(item.id)}
                        onCheckedChange={() => toggleRow(item.id)}
                      />
                    </TableCell>
                    <TableCell className="text-sm text-[#0D0D12]">{item.id}</TableCell>
                    <TableCell className="text-sm font-medium text-[#0D0D12]">
                      {item.donor}
                    </TableCell>
                    <TableCell className="text-sm text-[#0D0D12]">{item.campaign}</TableCell>
                    <TableCell className="text-sm text-[#0D0D12]">{item.amount}</TableCell>
                    <TableCell className="text-sm text-[#0D0D12]">{item.date}</TableCell>
                    <TableCell className="text-sm text-[#0D0D12]">{item.message}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <DotsThree size={24} color="#666D80" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsPage;
