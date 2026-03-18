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
import { ArrowsDownUpIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagePagination from "@/components/Manage-pagination";
import { formatFullDate, getCurrencySymbol } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { EyeIcon } from "@phosphor-icons/react";
import { HugeiconsIcon } from "@hugeicons/react";

// import { useGetOrganisationDonations } from "@/services/generics/hooks";

export function DonationsMainTable({
  donationsData,
  isPending,
  page,
  setPage,
  pageSize,
  setPageSize,
  search,
  setSearch,
  sort,
  setSort,
  totalPages,
}: {
  donationsData: any[];
  isPending?: boolean;
  page: number;
  setPage: (p: number) => void;
  pageSize: number;
  setPageSize: (p: number) => void;
  search: string;
  setSearch: (s: string) => void;
  sort: string;
  setSort: (s: string) => void;
  totalPages: number;
}) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleAll = () => {
    if (selectedRows.length === donationsData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(donationsData.map((d) => d.id));
    }
  };

  const toggleRow = (id: string) => {
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
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="h-10 w-[250px] border-[#DFE1E7] bg-white pl-9"
            />
          </div>

          <Select value={sort || "none"} onValueChange={(v) => setSort(v === "none" ? "" : v)}>
            <SelectTrigger className="h-10 w-[130px] gap-2 border-[#DFE1E7] bg-white text-[#818898]">
              <ArrowsDownUpIcon size={20} color="#818898" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Default</SelectItem>
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#DFE1E7] bg-white">
        <Table>
          <TableHeader className="bg-[#F6F8FA]">
            <TableRow>
              <TableHead className="w-[50px] pl-4">
                <Checkbox
                  checked={
                    selectedRows?.length === donationsData?.length && donationsData?.length > 0
                  }
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
            {isPending ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-[#666D80]">
                  Loading donations...
                </TableCell>
              </TableRow>
            ) : donationsData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-[#666D80]">
                  No donations found
                </TableCell>
              </TableRow>
            ) : (
              donationsData?.map((donation, index) => (
                <TableRow
                  key={donation?.id}
                  className="cursor-pointer hover:bg-[#F6F8FA]"
                  onClick={() => navigate(`/donation/${donation.id}`)}
                >
                  <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedRows.includes(donation?.id)}
                      onCheckedChange={() => toggleRow(donation?.id)}
                    />
                  </TableCell>
                  <TableCell className="text-sm text-[#0D0D12]">{index + 1}</TableCell>
                  <TableCell className="text-sm font-medium text-[#0D0D12]">
                    {donation?.donorDisplayName ? donation?.donorDisplayName : "Anonymous"}
                  </TableCell>
                  <TableCell className="line-clamp-1 text-sm text-[#0D0D12]">
                    {donation?.campaignName}
                  </TableCell>
                  <TableCell className="text-sm text-[#0D0D12]">
                    {formatFullDate(donation?.createdAt)}
                  </TableCell>
                  <TableCell className="text-sm text-[#0D0D12]">
                    {getCurrencySymbol(donation?.currency)}
                    {""}
                    {(donation?.amountCents / 100).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full border border-[#339D88] px-3 py-0.5 font-normal text-[#339D88]`}
                    >
                      {donation?.status}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <ActionPopover id={donation?.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Paginationish Footer */}
        <ManagePagination
          totalPages={totalPages}
          currentPage={page}
          setCurrentPage={setPage}
          itemsPerPage={pageSize}
          setItemsPerPage={setPageSize}
        />
      </div>
    </div>
  );
}

function ActionPopover({ id }: { id: string | number }) {
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
            onClick={() => navigate(`/donation/${id}`)}
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
