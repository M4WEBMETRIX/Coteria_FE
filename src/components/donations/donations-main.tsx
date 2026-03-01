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
import { DotsThree, ArrowsDownUpIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagePagination from "@/components/Manage-pagination";
import { useGetOrganisationDonations } from "@/services/generics/hooks";

const donationsData = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  donor: "anonymous",
  campaign: "Green Planet Advocates",
  date: "August 19, 2026",
  amount: "$500.00",
  status: "Completed",
}));

export function DonationsMainTable() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(30);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { data: donationsData1 } = useGetOrganisationDonations();
  console.log(donationsData1);

  const toggleAll = () => {
    if (selectedRows.length === donationsData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(donationsData.map((d) => d.id));
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
          Donation Table
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
                  checked={selectedRows.length === donationsData.length && donationsData.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              {[
                { label: "No", className: "w-[50px]" },
                { label: "Donor" },
                { label: "Campaign" },
                { label: "Date" },
                { label: "Amount" },
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
            {donationsData.map((donation) => (
              <TableRow
                key={donation.id}
                className="cursor-pointer hover:bg-[#F6F8FA]"
                onClick={() => navigate(`/donations/${donation.id}`)}
              >
                <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedRows.includes(donation.id)}
                    onCheckedChange={() => toggleRow(donation.id)}
                  />
                </TableCell>
                <TableCell className="text-sm text-[#0D0D12]">{donation.id}</TableCell>
                <TableCell className="text-sm font-medium text-[#0D0D12]">
                  {donation.donor}
                </TableCell>
                <TableCell className="text-sm text-[#0D0D12]">{donation.campaign}</TableCell>
                <TableCell className="text-sm text-[#0D0D12]">{donation.date}</TableCell>
                <TableCell className="text-sm text-[#0D0D12]">{donation.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`rounded-full border border-[#339D88] px-3 py-0.5 font-normal text-[#339D88]`}
                  >
                    {donation.status}
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
