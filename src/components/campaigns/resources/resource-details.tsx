import type { Resource } from "./types";
import { Button } from "@/components/ui/button";
import {
  X,
  FileText,
  Image,
  Music,
  Video,
  FileArchive,
  FileSpreadsheet,
  MonitorPlay,
  File,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ResourceDetailsProps {
  resource: Resource | null;
  onClose: () => void;
}

export function ResourceDetails({ resource, onClose }: ResourceDetailsProps) {
  if (!resource) return null;

  const getIcon = () => {
    switch (resource.type) {
      case "pdf":
        return <FileText className="h-24 w-24 text-red-500" />;
      case "image":
        return <Image className="h-24 w-24 text-blue-500" />;
      case "audio":
        return <Music className="h-24 w-24 text-purple-500" />;
      case "video":
        return <Video className="h-24 w-24 text-pink-500" />;
      case "archive":
        return <FileArchive className="h-24 w-24 text-yellow-500" />;
      case "spreadsheet":
        return <FileSpreadsheet className="h-24 w-24 text-green-500" />;
      case "presentation":
        return <MonitorPlay className="h-24 w-24 text-orange-500" />;
      default:
        return <File className="h-24 w-24 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-full w-[400px] flex-col bg-white">
      <div className="flex items-center justify-between p-6">
        <h3 className="text-lg font-semibold text-[#1E1E1E]">Details</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto p-6">
        {/* Preview */}
        <div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-gray-50 p-8">
          {resource.type === "image" && resource.previewUrl ? (
            <img
              src={resource.previewUrl}
              alt={resource.name}
              className="h-full w-full object-contain"
            />
          ) : resource.type === "presentation" && resource.previewUrl ? (
            <img
              src={resource.previewUrl}
              alt={resource.name}
              className="h-full w-full object-contain"
            />
          ) : (
            getIcon()
          )}
        </div>

        {/* Title & Type */}
        <div>
          <h2 className="mb-1 text-xl font-semibold text-[#1E1E1E]">{resource.name}</h2>
          <p className="text-sm text-gray-500 capitalize">
            {resource.type} • {resource.size}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm leading-relaxed text-gray-600">{resource.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-3 gap-y-4 text-sm">
          <div className="text-gray-500">Created</div>
          <div className="col-span-2 text-gray-900">{resource.createdAt}</div>

          <div className="text-gray-500">Modified</div>
          <div className="col-span-2 text-gray-900">{resource.modifiedAt}</div>

          <div className="text-gray-500">Owner</div>
          <div className="col-span-2 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={resource.owner.avatar} />
              <AvatarFallback>{resource.owner.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-gray-900">{resource.owner.name}</span>
          </div>

          <div className="text-gray-500">Shared With</div>
          <div className="col-span-2 flex items-center gap-1">
            {resource.sharedWith.map((user, i) => (
              <Avatar key={i} className="-ml-2 h-6 w-6 border-2 border-white first:ml-0">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
