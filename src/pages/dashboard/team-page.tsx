import { useBreadcrumb } from "@/components/breadcrumb-navigation";
import { Button } from "@/components/ui/button";
import { TeamTable } from "./components/team/team-table";
import { AddUserModal } from "./components/team/add-user-modal";
import { useState } from "react";

const TeamPage = () => {
  useBreadcrumb({
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Team", href: "/team", isCurrentPage: true },
    ],
  });

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div className="font-ubuntu flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl leading-[135%] font-medium tracking-[0%] text-[#0D0D12]">
          Teams Management
        </h1>
        <Button
          className="bg-primary cursor-pointer text-white hover:bg-[#059669]"
          onClick={() => setIsAddUserOpen(true)}
        >
          Add User
        </Button>
      </div>

      <TeamTable />

      <AddUserModal open={isAddUserOpen} onOpenChange={setIsAddUserOpen} />
    </div>
  );
};

export default TeamPage;
