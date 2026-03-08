import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PencilSimple, UserIcon, CircleNotch } from "@phosphor-icons/react";
import InnerNav from "@/end-user-app/navigations/inner-nav";
import { useNavigate } from "react-router-dom";
import {
  useGetEndUserProfile,
  useUpdateEndUserProfile,
} from "@/services/generics/user-generics/user-hooks";
import { useFileUpload } from "@/services/file-upload-hook";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

const EditProfile = () => {
  const navigate = useNavigate();

  const { data } = useGetEndUserProfile();
  const user = data?.data;

  const { mutateAsync: uploadFile } = useFileUpload();
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateEndUserProfile();

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    profileImageUrl: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        middleName: user.middleName || prev.middleName,
        profileImageUrl: user.profileImageUrl || prev.profileImageUrl,
        address: user.address?.line1 || prev.address,
      }));
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const payload = new FormData();
      payload.append("file", file);

      const res = await uploadFile(payload);
      const uploadedUrl = res?.url || res?.data?.url;
      if (uploadedUrl) {
        handleChange("profileImageUrl", uploadedUrl);
        await updateProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          middleName: formData.middleName,
          profileImageUrl: uploadedUrl,
          address: formData.address ? { line1: formData.address } : null,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSaveChanges = () => {
    updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      profileImageUrl: formData.profileImageUrl,
      address: formData.address ? { line1: formData.address } : null,
    });
  };

  return (
    <>
      <InnerNav text={"Back to settings"} onClick={() => navigate("/user/account-settings")} />
      <div className="mx-auto w-full space-y-8 pb-10">
        {/* Change Avatar */}
        <div className="h-[307px] w-[357px] space-y-4 rounded-[10px] border border-[#ECEFF3] bg-white p-5">
          <h3 className="text-xl leading-[155%] font-normal tracking-[-2%] text-[#000000]">
            Change Avatar
          </h3>
          <div className="relative mx-auto h-42 w-42">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-pink-100">
              {isUploading ? (
                <CircleNotch className="h-10 w-10 animate-spin text-gray-400" />
              ) : formData.profileImageUrl ? (
                <img
                  src={formData.profileImageUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserIcon size={64} color="#FFFFFF" />
              )}
            </div>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute right-0 bottom-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
            >
              <PencilSimple size={20} />
            </button>
          </div>
        </div>

        {/* Profile Visibility */}
        {/* <div className="max-w-[140px] space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-base leading-6 font-normal tracking-[0%] text-[#1C222A]">
              Profile Visibility
            </h3>
            <p className="text-xs leading-4.5 font-normal tracking-[0%] text-[#6C7787]">
              Choose whether your name and activity are visible to others or kept private.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 items-center gap-2 rounded-[8px] bg-[#EDF3FE] p-1">
              <span
                className={cn(
                  "text-[#9199A5 px-2 text-sm font-normal",
                  isChecked ? "text-[#9199A5 font-normal" : "font-normal text-[#9199A5]"
                )}
              >
                Off
              </span>
              <Switch checked={isChecked} onCheckedChange={(value) => setIsChecked(value)} />
              <span
                className={cn(
                  "px-2 text-sm",
                  isChecked ? "font-medium text-[#0077B5]" : "font-normal text-[#9199A5]"
                )}
              >
                On
              </span>
            </div>
          </div>
        </div> */}

        {/* Detailed Information */}
        <div className="space-y-6 rounded-[10px] border border-[#ECEFF3] bg-white px-5 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl leading-[155%] font-normal tracking-[-2%] text-[#000000]">
              Detailed Information
            </h3>
            <Button
              onClick={handleSaveChanges}
              disabled={isUpdating}
              className="bg-[#079455] hover:bg-[#0E8A4A]"
            >
              {isUpdating ? (
                <>
                  <CircleNotch className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
                First Name<span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Enter your name"
                className="h-12 rounded-[10px] border-[#DFE1E7] bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Last Name<span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Enter your name"
                className="h-12 rounded-[10px] border-[#DFE1E7] bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Email<span className="text-red-500">*</span>
              </label>
              <Input
                disabled
                value={user?.email || ""}
                placeholder="Enter your email"
                className="h-12 rounded-[10px] border-[#DFE1E7] bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm leading-[155%] font-normal tracking-[0%] text-[#000000]">
                Address (For tax receipts etc)
              </label>
              <Input
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Enter your address"
                className="h-12 rounded-[10px] border-[#DFE1E7] bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
