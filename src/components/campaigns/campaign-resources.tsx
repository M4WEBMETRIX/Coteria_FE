import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ResourceCard } from "./resources/resource-card";
import { ResourceDetails } from "./resources/resource-details";
import { UploadResourceModal } from "./resources/upload-resource-modal";
import type { Resource } from "./resources/types";
import { InfoIcon } from "@phosphor-icons/react";

// Mock Data
const MOCK_RESOURCES: Resource[] = [
  {
    id: "1",
    name: "Company Profile.pdf",
    type: "pdf",
    size: "2.4 MB",
    description: "Summary of 2035 Fiscal Year Achievements and Financial Performance.",
    tags: ["company", "profile", "2035"],
    createdAt: "Sep 10, 2035",
    modifiedAt: "Sep 12, 2035",
    owner: { name: "Charles Grindwell" },
    sharedWith: [{ name: "John Doe" }, { name: "Jane Smith" }],
    extension: ".pdf",
  },
  {
    id: "2",
    name: "Launch Event Recap.zip",
    type: "archive",
    size: "156 MB",
    description: "Photos and videos from the launch event.",
    tags: ["event", "launch", "media"],
    createdAt: "Sep 15, 2035",
    modifiedAt: "Sep 15, 2035",
    owner: { name: "Sarah Connor" },
    sharedWith: [],
    extension: ".zip",
  },
  {
    id: "3",
    name: "Social Media Report 2035.pdf",
    type: "pdf",
    size: "1.2 MB",
    description: "Analysis of social media performance for Q1-Q3.",
    tags: ["social", "report", "marketing"],
    createdAt: "Oct 1, 2035",
    modifiedAt: "Oct 2, 2035",
    owner: { name: "Mike Ross" },
    sharedWith: [{ name: "Harvey Specter" }],
    extension: ".pdf",
  },
  {
    id: "4",
    name: "Project Proposal.pdf",
    type: "pdf",
    size: "845 KB",
    description: "Proposal for the new community outreach program.",
    tags: ["proposal", "community"],
    createdAt: "Aug 20, 2035",
    modifiedAt: "Aug 25, 2035",
    owner: { name: "Rachel Zane" },
    sharedWith: [],
    extension: ".pdf",
  },
  {
    id: "5",
    name: "Final Pitch Deck.pptx",
    type: "presentation",
    size: "1.1 MB",
    description:
      "Polished presentation deck prepared for the Q3 investor pitch. Contains company overview, product highlights, market analysis, and financial projections.",
    tags: ["pitch", "presentation", "investors", "Q3", "2035"],
    createdAt: "Sep 10, 2035",
    modifiedAt: "Sep 18, 2035",
    owner: { name: "Charles Grindwell" },
    sharedWith: [{ name: "Louis Litt" }, { name: "Donna Paulsen" }, { name: "Jessica Pearson" }],
    previewUrl: "https://placehold.co/600x400/png?text=PITCH+DECK", // Placeholder
    extension: ".pptx",
  },
  {
    id: "6",
    name: "Team Photo Session.jpg",
    type: "image",
    size: "4.2 MB",
    description: "Group photo from the annual retreat.",
    tags: ["team", "photo"],
    createdAt: "Jul 15, 2035",
    modifiedAt: "Jul 15, 2035",
    owner: { name: "Peter Parker" },
    sharedWith: [],
    previewUrl: "https://placehold.co/600x400/png?text=Team+Photo",
    extension: ".jpg",
  },
  {
    id: "7",
    name: "Voice Over Final.mp3",
    type: "audio",
    size: "3.5 MB",
    description: "Final voice over track for the promo video.",
    tags: ["audio", "promo"],
    createdAt: "Sep 5, 2035",
    modifiedAt: "Sep 5, 2035",
    owner: { name: "Wade Wilson" },
    sharedWith: [],
    extension: ".mp3",
  },
  {
    id: "8",
    name: "Quarterly Sales 2035.xlsx",
    type: "spreadsheet",
    size: "45 KB",
    description: "Detailed sales figures for Q1 and Q2.",
    tags: ["sales", "finance", "excel"],
    createdAt: "Jul 20, 2035",
    modifiedAt: "Jul 22, 2035",
    owner: { name: "Tony Stark" },
    sharedWith: [{ name: "Pepper Potts" }],
    extension: ".xlsx",
  },
  {
    id: "9",
    name: "Logo Variations White.zip",
    type: "archive",
    size: "12 MB",
    description: "White versions of the company logo in various formats.",
    tags: ["logo", "brand", "design"],
    createdAt: "Jan 10, 2035",
    modifiedAt: "Jan 10, 2035",
    owner: { name: "Steve Rogers" },
    sharedWith: [],
    extension: ".zip",
  },
  {
    id: "10",
    name: "Brand Style Guide.pdf",
    type: "pdf",
    size: "5.6 MB",
    description: "Official brand guidelines.",
    tags: ["brand", "guide", "design"],
    createdAt: "Jan 15, 2035",
    modifiedAt: "Jan 20, 2035",
    owner: { name: "Natasha Romanoff" },
    sharedWith: [],
    extension: ".pdf",
  },
  {
    id: "11",
    name: "Dreamy Cosmetic Intro.mp4",
    type: "video",
    size: "45 MB",
    description: "Intro video for the new cosmetic line.",
    tags: ["video", "intro", "cosmetic"],
    createdAt: "Aug 30, 2035",
    modifiedAt: "Aug 30, 2035",
    owner: { name: "Bruce Banner" },
    sharedWith: [],
    extension: ".mp4",
  },
  {
    id: "12",
    name: "Mockup Collection 2025.ai",
    type: "image",
    size: "156 MB",
    description: "Adobe Illustrator file with product mockups.",
    tags: ["design", "mockup", "ai"],
    createdAt: "Feb 5, 2035",
    modifiedAt: "Feb 10, 2035",
    owner: { name: "Clint Barton" },
    sharedWith: [],
    extension: ".ai",
  },
];

const CampaignResources = () => {
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const selectedResource = resources.find((r) => r.id === selectedResourceId) || null;

  const handleUpload = (data: { title: string; description: string; file: File | null }) => {
    // Mock upload
    const newResource: Resource = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.file?.name || data.title,
      type: "other", // Simplified for mock
      size: data.file ? `${(data.file.size / 1024 / 1024).toFixed(1)} MB` : "0 MB",
      description: data.description,
      tags: ["new"],
      createdAt: new Date().toLocaleDateString(),
      modifiedAt: new Date().toLocaleDateString(),
      owner: { name: "You" },
      sharedWith: [],
      extension: data.file?.name.split(".").pop() ? `.${data.file.name.split(".").pop()}` : "",
    };
    setResources([newResource, ...resources]);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col bg-white">
      {/* Warning Banner */}
      <div className="flex h-[35px] items-center gap-2 rounded-[12px] border border-[#FFBE4C] bg-[#FFF6E0] px-3.5">
        <InfoIcon weight="fill" size={24} className="h-5 w-5 text-[#FFBE4C]" />
        <p className="mt-0.5 text-[11px] text-[#0D0D12]">
          <span className="font-bold">Campaign Resource Library:</span> This is a shared resource
          library for documents, references, and assets that help your community understand, trust,
          and support the campaign.
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-6 w-6 text-orange-400 hover:bg-orange-100 hover:text-orange-600"
        >
          <X color="#666D80" className="h-6 w-6" />
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center gap-6">
          <h1 className="text-base leading-[120%] font-semibold tracking-[-4%] text-[#003D29]">
            All Files
          </h1>
          <Button
            className="rounded-[5px] border border-[#DFE1E7] text-sm leading-[100%] font-normal text-[#666D80]"
            variant="outline"
            onClick={() => setIsUploadModalOpen(true)}
          >
            Upload a Document
          </Button>
        </div>
        <div className="relative w-[300px]">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#003D29]" />
          <Input
            placeholder="Search file or folder..."
            className="h-9 rounded-[30px] bg-[#E4EEF9] pl-10 text-sm leading-[120%] font-medium text-[#66707C] placeholder:text-[#66707C]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Grid */}
          <div className="flex-1 overflow-y-auto pb-8">
            <div className="mr-5 grid grid-cols-2 gap-6 p-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {paginatedResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isSelected={selectedResourceId === resource.id}
                  onClick={() => setSelectedResourceId(resource.id)}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Show</span>
              <select
                className="rounded border border-gray-200 bg-gray-50 px-2 py-1"
                value={itemsPerPage}
                disabled
              >
                <option>12</option>
              </select>
              <span>of {filteredResources.length} results</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  className={currentPage === page ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        {selectedResourceId && (
          <ResourceDetails
            resource={selectedResource}
            onClose={() => setSelectedResourceId(null)}
          />
        )}
      </div>

      <UploadResourceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default CampaignResources;
