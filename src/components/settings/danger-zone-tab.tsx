import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import DeleteAccountModal from "./delete-account-modal";

// interface DangerZoneTabProps {
//   formData: {
//     deactivateAccount: boolean;
//   };
//   setFormData: (data: any) => void;
// }

const DangerZoneTab = () =>
  // { formData, setFormData }: DangerZoneTabProps
  {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // const handleToggle = (field: string, value: boolean) => {
    //   setFormData((prev: any) => ({ ...prev, [field]: value }));
    // };

    return (
      <div className="font-inter">
        <div className="flex justify-between p-6">
          <div className="w-[300px]">
            {" "}
            <h3 className="mb-1 text-lg leading-[135%] font-semibold tracking-[0%] text-[#0D0D12]">
              Danger Zone
            </h3>
            <p className="mb-6 text-sm leading-[150%] tracking-[2%] text-[#666D80]">
              These actions affect campaign availability and data.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant={"outline"}
              className="border-[#F3654A] text-[#F3654A]"
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Deactivate
            </Button>
          </div>
        </div>
        <Separator />
        <DeleteAccountModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          isDonor={false}
        />
      </div>
    );
  };

export default DangerZoneTab;
