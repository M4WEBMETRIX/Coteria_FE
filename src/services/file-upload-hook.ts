import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFunction, postFunction } from "./generics/generic-index";
import { toast } from "sonner";

const USE_FILE_UPLOAD_API = "USE_FILE_UPLOAD_API";

export const useFileUpload = () => {
  const queryClient = useQueryClient();

  const URL = "/storage/upload";
  return useMutation({
    mutationFn: (payload: any) => postFunction(payload, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_FILE_UPLOAD_API],
      });
      toast.success("File uploaded successfully");
    },
    onError: (err: any) => toast.error(err?.message || "Error uploading file, please try again.!"),
  });
};

export const useDeleteUpload = (fileUrl: string) => {
  const queryClient = useQueryClient();

  const URL = `/storage?fileUrl=${fileUrl}`;
  return useMutation({
    mutationFn: () => deleteFunction({}, URL),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_FILE_UPLOAD_API],
      });
      toast.success("File deleted successfully");
    },
    onError: (err: any) => toast.error(err?.message || "Error deleting file, please try again.!"),
  });
};
