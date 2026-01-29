import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState } from "react";

interface UploadResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: { title: string; description: string; file: File | null }) => void;
}

export function UploadResourceModal({ isOpen, onClose, onUpload }: UploadResourceModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    onUpload({ title, description, file });
    setTitle("");
    setDescription("");
    setFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="p-0 sm:max-w-[600px]">
        <DialogHeader className="border-b border-[#DFE1E7] p-6">
          <DialogTitle className="text-xl font-bold text-[#0A0A0C]">Upload a Document</DialogTitle>
        </DialogHeader>

        <div className="no-scrollbar max-h-[60vh] space-y-6 overflow-y-auto px-6 py-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-[#666D80]">
              Document Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-[#666D80]">
              Description <span className="text-red-500">*</span>
            </Label>

            <div className="relative">
              <Textarea
                id="description"
                placeholder="Lorem Ipsum is simply dummy text..."
                className="min-h-[120px] resize-none pb-8"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="absolute right-2 bottom-2 text-xs text-gray-400">
                {description.length}/200
              </div>
            </div>
          </div>

          <div
            className="flex h-[264px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-[#E8EAED] p-8 text-center transition-colors hover:bg-gray-50"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
              <Upload className="h-6 w-6 text-gray-600" />
            </div>
            <h4 className="mb-1 text-sm font-medium text-gray-900">
              {file ? file.name : "Upload campaign assets, documents etc"}
            </h4>
            <p className="text-xs text-gray-500">Max 10MB, JPG/PNG/PDF/Doc</p>
          </div>
        </div>

        <DialogFooter className="gap-3 border-t border-t-[#DFE1E7] px-6 py-5">
          <Button variant="outline" onClick={onClose} className="h-11 px-8">
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            className="h-11 bg-green-600 px-8 text-white hover:bg-green-700"
          >
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
