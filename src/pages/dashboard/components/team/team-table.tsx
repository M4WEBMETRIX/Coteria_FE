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

import ManagePagination from "../../../../components/Manage-pagination";
import { useState } from "react";

const teamData = [
  {
    id: 1,
    name: "Ethan Caldwell",
    email: "ethan.caldwell@gmail.com",
    role: "Admin",
    createdAt: "2025-04-18 10:30:00",
    lastLogin: "Today",
  },
  {
    id: 2,
    name: "Liam Harrington",
    email: "liam.harrington@gmail.com",
    role: "Admin",
    createdAt: "2025-06-18 10:30:00",
    lastLogin: "Today",
  },
  {
    id: 3,
    name: "Ava Montgomery",
    email: "ava.montgomery@gmail.com",
    role: "Admin",
    createdAt: "2025-04-18 10:30:00",
    lastLogin: "Today",
  },
  {
    id: 4,
    name: "Oliver Bennett",
    email: "oliver.bennett@gmail.com",
    role: "Fundraiser",
    createdAt: "2025-04-18 10:30:00",
    lastLogin: "Yesterday",
  },
  {
    id: 5,
    name: "Charlotte Hayes",
    email: "charlotte.hayes@gmail.com",
    role: "Fundraiser",
    createdAt: "2025-04-18 10:30:00",
    lastLogin: "Today",
  },
  {
    id: 6,
    name: "Jameson Reed",
    email: "jameson.reed@gmail.com",
    role: "Donator",
    createdAt: "2025-04-18 10:30:00",
    lastLogin: "Today",
  },
  {
    id: 7,
    name: "Sophia Lancaster",
    email: "sophia.lancaster@gmail.com",
    role: "Fundraiser",
    createdAt: "2025-04-18 10:30:00",
    lastLogin: "Yesterday",
  },
  {
    id: 8,
    name: "Isabella Thornton",
    email: "isabella.thornton@gmail.com",
    role: "Donator",
    createdAt: "2025-04-18 10:30:00",
    lastLogin: "Today",
  },
  {
    id: 9,
    name: "Mia Prescott",
    email: "mia.prescott@gmail.com",
    role: "Donator",
    createdAt: "2025-04-18 10:30:00",
    lastLogin: "Yesterday",
  },
  {
    id: 10,
    name: "Noah Sinclair",
    email: "noah.sinclair@gmail.com",
    role: "Fundraiser",
    createdAt: "2025-04-18 10:30:00",
    lastLogin: "Last Month",
  },
];

export function TeamTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [
    totalPages,
    // , setTotalPages
  ] = useState(30);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleAll = () => {
    if (selectedRows.length === teamData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(teamData.map((d) => d.id));
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
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm leading-[150%] font-medium tracking-[2%] text-[#0A0A0C]">
          Teams Table
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
                  checked={selectedRows.length === teamData.length && teamData.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              {[
                { label: "No", className: "w-[50px]" },
                { label: "Name" },
                { label: "Email" },
                { label: "Role" },
                { label: "Created At" },
                { label: "Last Login" },
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
            {teamData.map((user) => (
              <TableRow key={user.id} className="hover:bg-[#F6F8FA]">
                <TableCell className="pl-4">
                  <Checkbox
                    checked={selectedRows.includes(user.id)}
                    onCheckedChange={() => toggleRow(user.id)}
                  />
                </TableCell>
                <TableCell className="text-sm text-[#0D0D12]">{user.id}</TableCell>
                <TableCell className="text-sm font-normal text-[#0D0D12]">{user.name}</TableCell>
                <TableCell className="text-sm text-[#0D0D12]">{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`border border-[#339D88] font-normal text-[#339D88]`}
                  >
                    <div className="h-1 w-1 rounded-full bg-[#339D88]" color="#339D88" />
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-[#0D0D12]">{user.createdAt}</TableCell>
                <TableCell className="text-[#0D0D12]">{user.lastLogin}</TableCell>
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
