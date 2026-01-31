import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CaretRightIcon,
  Trophy,
  Sparkle,
  CheckCircle,
  BookmarkSimple,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const communities = [
  {
    id: 1,
    name: "Larkden Community",
    role: "Champion",
    joined: "March 10",
    members: "1,240",
    campaigns: 4,
    roleColor: "bg-[#E0F8FF] text-[#009BC2]",
    roleIcon: <Trophy size={20} weight="fill" className="mr-1 text-[#009BC2]" />,
  },
  {
    id: 2,
    name: "Social Club Community",
    role: "Amplifier",
    joined: "March 10",
    members: "1,240",
    campaigns: 60,
    roleColor: "bg-[#F4E6FF] text-[#A838D6]",
    roleIcon: <Sparkle size={20} weight="fill" className="mr-1 text-[#A838D6]" />,
  },
  {
    id: 3,
    name: "Church Community",
    role: "Completed",
    joined: "March 10",
    members: "1,240",
    campaigns: 60,
    roleColor: "bg-[#DFFFF2] text-[#00C48C]",
    roleIcon: <CheckCircle size={20} weight="fill" className="mr-1 text-[#00C48C]" />,
  },
  {
    id: 4,
    name: "WOFBEC Community",
    role: "Joined",
    joined: "March 10",
    members: "1,240",
    campaigns: 60,
    roleColor: "bg-[#FFF4D6] text-[#D9A300]",
    roleIcon: <BookmarkSimple size={20} weight="fill" className="mr-1 text-[#D9A300]" />,
  },
  {
    id: 5,
    name: "Women of Dignity Community",
    role: "Amplifier",
    joined: "March 10",
    members: "1,240",
    campaigns: 60,
    roleColor: "bg-[#F4E6FF] text-[#A838D6]",
    roleIcon: <Sparkle size={20} weight="fill" className="mr-1 text-[#A838D6]" />,
  },
  {
    id: 6,
    name: "Men of Valor Community",
    role: "Joined",
    joined: "March 10",
    members: "1,240",
    campaigns: 60,
    roleColor: "bg-[#FFF4D6] text-[#D9A300]",
    roleIcon: <BookmarkSimple size={20} weight="fill" className="mr-1 text-[#D9A300]" />,
  },
];

const DashboardCommunity = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="">
        <Table>
          <TableHeader className="rounded-t-[10px]! border border-[#EBEBEB] bg-[#FCFCFC]">
            <TableRow className="">
              <TableHead className="w-[50px] px-[29px]! py-6! text-lg leading-[155%] font-normal text-[#000000]">
                No
              </TableHead>
              <TableHead className="text-lg leading-[155%] font-normal text-[#000000]">
                Community
              </TableHead>
              <TableHead className="text-lg leading-[155%] font-normal text-[#000000]">
                Role
              </TableHead>
              <TableHead className="text-lg leading-[155%] font-normal text-[#000000]">
                Joined
              </TableHead>
              <TableHead className="text-lg leading-[155%] font-normal text-[#000000]">
                Members
              </TableHead>
              <TableHead className="text-lg leading-[155%] font-normal text-[#000000]">
                Campaigns
              </TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communities.map((community, index) => (
              <TableRow key={community.id}>
                <TableCell className="py-6 text-base leading-[155%] font-normal text-[#000000]">
                  {index + 1}
                </TableCell>
                <TableCell className="py-6 text-base leading-[155%] font-normal text-[#000000]">
                  {community.name}
                </TableCell>
                <TableCell className="py-6">
                  <Badge
                    className={`hover:bg-opacity-80 rounded-full border-0 px-3.5 py-1.5 text-base leading-[155%] font-normal ${community.roleColor}`}
                  >
                    {community.roleIcon}
                    {community.role}
                  </Badge>
                </TableCell>
                <TableCell className="py-6 text-sm leading-[155%] font-normal">
                  {community.joined}
                </TableCell>
                <TableCell className="py-6 text-sm leading-[155%] font-normal">
                  {community.members}
                </TableCell>
                <TableCell className="py-6 text-sm leading-[155%] font-normal">
                  {community.campaigns}
                </TableCell>
                <TableCell className="py-6 text-right text-sm leading-[155%] font-normal">
                  <Button
                    onClick={() => navigate(`/user/dashboard/community/${community.id}`)}
                    className="h-10 rounded-full bg-[#12AA5B] px-4 text-white hover:bg-[#00b05b]"
                  >
                    <div className="flex items-center">
                      Enter <CaretRightIcon size={14} weight="bold" className="text-white" />
                    </div>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardCommunity;
