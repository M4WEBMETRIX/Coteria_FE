import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFunctionWithProgress } from "./generics/generic-index";
import { deleteFunction } from "./generics/generic-index";
import { toast } from "sonner";

const USE_FILE_UPLOAD_API = "USE_FILE_UPLOAD_API";

export const useFileUpload = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const URL = "/storage/upload";
  const mutation = useMutation({
    mutationFn: (payload: any) =>
      postFunctionWithProgress(payload, URL, (progress) => {
        setUploadProgress(progress);
      }),
    onMutate: () => {
      setUploadProgress(0);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USE_FILE_UPLOAD_API],
      });
      toast.success("File uploaded successfully");
      setUploadProgress(0);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Error uploading file, please try again.!");
      setUploadProgress(0);
    },
  });

  return { ...mutation, uploadProgress };
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
