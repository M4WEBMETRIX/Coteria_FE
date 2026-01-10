import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DotsThree, Funnel, ArrowsDownUpIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link } from "react-router-dom";
import ManagePagination from "@/components/Manage-pagination";
import { useState } from "react";

const donorsData = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: "Tunde Ajayi",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  campaignsJoined: 8,
  lastActive: "August 19, 2026",
  status: "Active",
}));

export function DonorsMainTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(30);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleAll = () => {
    if (selectedRows.length === donorsData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(donorsData.map((d) => d.id));
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
    <div className="font-ubuntu space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm leading-[150%] font-medium tracking-[2%] text-[#0A0A0C]">
          Donors Table
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon
              className="absolute top-1/2 left-3 -translate-y-1/2"
              size={20}
              color="#818898"
            />
            <Input placeholder="Search" className="h-10 w-[250px] border-[#DFE1E7] bg-white pl-9" />
          </div>
          <Button variant="outline" className="h-10 gap-2 border-[#DFE1E7]">
            <Funnel size={20} color="#818898" /> Filter
          </Button>
          <Button variant="outline" className="h-10 gap-2 border-[#DFE1E7]">
            <ArrowsDownUpIcon size={20} color="#818898" /> Sort by
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#DFE1E7] bg-white">
        <Table>
          <TableHeader className="bg-[#F6F8FA]">
            <TableRow>
              <TableHead className="w-[50px] pl-4">
                <Checkbox
                  checked={selectedRows.length === donorsData.length && donorsData.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              {[
                { label: "No", className: "w-[50px]" },
                { label: "Avatar" },
                { label: "Donor Name" },
                { label: "Campaigns joined" },
                { label: "Last active" },
                { label: "Status" },
                { label: "", className: "w-[50px]" },
              ].map((header, index) => (
                <TableHead
                  key={index}
                  className={`text-sm leading-[150%] font-normal tracking-[2%] text-[#666D80] ${header.className || ""}`}
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {donorsData.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-[#F6F8FA]"
                // onClick={() => navigate(`/donors/${user.id}`)}
              >
                <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedRows.includes(user.id)}
                    onCheckedChange={() => toggleRow(user.id)}
                  />
                </TableCell>
                <TableCell className="text-sm text-[#0D0D12]">{user.id}</TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="text-sm font-medium text-[#0D0D12]">
                  <Link
                    to={`/donors/${user.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="hover:underline"
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell className="pl-8 text-sm text-[#0D0D12]">
                  {user.campaignsJoined}
                </TableCell>
                <TableCell className="text-sm text-[#0D0D12]">{user.lastActive}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`rounded-full border border-[#D2FFF6] bg-[#E7FFFA] px-2 py-0.5 font-normal text-[#10B981] shadow-none`}
                  >
                    <div className="mr-2 h-1 w-1 rounded-full bg-[#0E8A72]" />
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                    <DotsThree size={24} color="#666D80" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Paginationish Footer */}
        <ManagePagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
}
