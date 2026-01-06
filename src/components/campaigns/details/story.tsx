import { Button } from "@/components/ui/button";

import { CalendarDays, Image as ImageIcon, Link as LinkIcon, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const UPDATES = [
  {
    id: 1,
    date: "Oct 24, 2025",
    title: "We reached 50% of our goal!",
    content:
      "Thanks to everyone's incredible support, we've hit a major milestone. The momentum is building!",
    author: "Campaign Team",
  },
  {
    id: 2,
    date: "Oct 18, 2025",
    title: "New partnership announced",
    content: "We are thrilled to announce that Local Green Initiative has joined as a key partner.",
    author: "Sarah Jenkins",
  },
];

const Story = () => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Main Content Column */}
      <div className="flex flex-col gap-8 lg:col-span-2">
        {/* Campaign Story Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#1E1F24]">Campaign Story</h2>
          <div className="prose prose-stone max-w-none text-[#4A4C54]">
            <p>
              Our community is facing a critical challenge with the lack of affordable green spaces.
              This campaign aims to transform the derelict lot on 5th Avenue into a vibrant
              community garden and playground.
            </p>
            <p>
              This isn't just about planting trees; it's about creating a safe haven for our
              children to play and a gathering place for neighbors to connect. By reclaiming this
              space, we are taking back our neighborhood and fostering a stronger sense of
              belonging.
            </p>
            <h3 className="text-lg font-semibold text-[#1E1F24]">Why it matters</h3>
            <p>
              Studies show that access to green spaces improves mental health and community
              cohesion. Currently, our neighborhood has the lowest green space per capita in the
              city. We can change that, together.
            </p>
            <h3 className="text-lg font-semibold text-[#1E1F24]">The Plan</h3>
            <ul className="list-disc pl-5">
              <li>Clean up and landscaping (Phase 1)</li>
              <li>Playground installation (Phase 2)</li>
              <li>Community garden plots (Phase 3)</li>
            </ul>
          </div>
        </section>

        <Separator />

        {/* Media Gallery */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#1E1F24]">Media Gallery</h3>
            <Button variant="ghost" className="text-sm text-[#12AA5B] hover:text-[#0E904B]">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                <AspectRatio ratio={4 / 3}>
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <ImageIcon className="h-8 w-8 opacity-50" />
                  </div>
                </AspectRatio>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar Column */}
      <div className="flex flex-col gap-6">
        {/* Updates Timeline */}
        <div className="rounded-xl border border-[#DFE1E7] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#1E1F24]">Latest Updates</h3>
          <div className="relative space-y-8 pl-4 before:absolute before:top-2 before:bottom-0 before:left-[5px] before:h-[calc(100%-16px)] before:w-[2px] before:bg-gray-100">
            {UPDATES.map((update) => (
              <div key={update.id} className="relative">
                {/* Dot */}
                <div className="absolute top-1.5 -left-[17px] h-3 w-3 rounded-full border-2 border-white bg-[#12AA5B] shadow-sm" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-[#8B8D98]">{update.date}</span>
                  <h4 className="text-sm font-semibold text-[#1E1F24]">{update.title}</h4>
                  <p className="line-clamp-3 text-sm text-[#4A4C54]">{update.content}</p>
                  <span className="mt-1 text-xs text-[#8B8D98]">By {update.author}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-6 w-full border-gray-200">
            View all updates
          </Button>
        </div>

        {/* Share / Info Card */}
        <div className="rounded-xl border border-[#DFE1E7] bg-[#F6F8FA] p-6">
          <h3 className="mb-4 text-sm font-semibold text-[#8B8D98] uppercase">Share Campaign</h3>
          <div className="flex flex-col gap-3">
            <Button className="w-full gap-2 bg-[#1E1F24] text-white hover:bg-[#000000]">
              <Share2 size={16} />
              Share on Socials
            </Button>
            <Button variant="outline" className="w-full gap-2 border-gray-200">
              <LinkIcon size={16} />
              Copy Link
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-[#4A4C54]">
            <CalendarDays size={16} className="text-[#8B8D98]" />
            <span>Created Oct 1, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
