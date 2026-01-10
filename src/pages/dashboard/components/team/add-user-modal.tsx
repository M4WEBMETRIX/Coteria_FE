import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
  const [role, setRole] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-0 sm:max-w-[700px]">
        <DialogHeader className="mb-4 px-6">
          <DialogTitle className="text-lg leading-[135%] tracking-[2%]">
            Invite teams member
          </DialogTitle>
        </DialogHeader>

        <Separator className="p-0" />

        <div className="space-y-6 px-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs leading-[150%] font-medium tracking-[2%] text-[#4A4C54]"
            >
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="Enter email address"
              className="h-11 border-[#DFE1E7] bg-[#F9FAFB]"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="role"
              className="text-xs leading-[150%] font-medium tracking-[2%] text-[#4A4C54]"
            >
              Role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger
                id="role"
                className="h-11! w-full border-[#DFE1E7] bg-[#F9FAFB] text-[#4A4C54]"
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="fundraiser">Fundraiser</SelectItem>
                <SelectItem value="donator">Donator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="p-0" />

        <DialogFooter className="mt-4 flex gap-3 px-6 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 border-[#DFE1E7] px-8 text-gray-700"
          >
            Cancel
          </Button>
          <Button className="bg-primary h-11 px-8 text-white hover:bg-[#059669]">
            Invite User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
