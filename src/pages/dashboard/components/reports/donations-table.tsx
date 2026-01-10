import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Funnel, ArrowsDownUp, DotsThree } from "@phosphor-icons/react";

const donations = [
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

export function DonationsTable() {
  return (
    <div className="w-full flex-1 overflow-hidden rounded-xl border border-[#DFE1E7] bg-white lg:col-span-8">
      <div className="flex items-center justify-between border-b border-[#DFE1E7] p-4">
        <h3 className="leading-[150%] font-medium tracking-[2%] text-[#0D0D12]">
          Recent Donations Table
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-9.5 w-9.5">
            <Funnel size={20} color="#818898" weight="bold" />
          </Button>
          <Button variant="outline" size="icon" className="h-9.5 w-9.5">
            <ArrowsDownUp size={20} color="#818898" weight="bold" />
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-[#F6F8FA]">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            {[
              { label: "No", className: "w-[50px]" },
              { label: "Donor Name" },
              { label: "Campaign Title" },
              { label: "Amount" },
              { label: "Date" },
              { label: "Message" },
              { label: "", className: "w-[50px]" },
            ].map((header, index) => (
              <TableHead
                key={index}
                className={`leading-[150%] font-medium tracking-[2%] text-[#666D80] ${header.className || ""}`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((d) => (
            <TableRow key={d.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-regular text-sm text-[#0D0D12]">{d.id}</TableCell>
              <TableCell className="font-regular text-sm text-[#0D0D12]">{d.donor}</TableCell>
              <TableCell className="font-regular text-sm text-[#0D0D12]">{d.campaign}</TableCell>
              <TableCell className="font-regular text-sm text-[#0D0D12]">{d.amount}</TableCell>
              <TableCell className="font-regular text-sm text-[#0D0D12]">{d.date}</TableCell>
              <TableCell className="font-regular text-sm text-[#0D0D12]">{d.message}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <DotsThree size={20} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
