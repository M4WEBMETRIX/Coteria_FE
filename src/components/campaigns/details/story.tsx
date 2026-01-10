import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Send, X, Image as ImageIcon, ThumbsUp, ThumbsDown, Copy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretDoubleUp, Sparkle, SparkleIcon } from "@phosphor-icons/react";

// Types
interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "Get Started",
  "Summarize a campaign",
  "Generate image for your campaign",
  "Compose campaign/performance/term",
];

const RECENT_UPDATES = [
  { id: 1, type: "Image update", time: "1 hrs ago", desc: "Lorem ipsum is simply dummy text." },
  { id: 2, type: "Image update", time: "1 day ago", desc: "Lorem ipsum is simply dummy text." },
  { id: 3, type: "Image update", time: "1 day ago", desc: "Lorem ipsum is simply dummy text." },
];

const Story = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content:
          "Here is a draft based on your request. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newAiMsg]);
    }, 1000);
  };

  return (
    <div className="font-ubuntu h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg leading-[135%] font-normal tracking-[-2%] text-[#1E1F24]">
          Campaign Story
        </h2>
        <Button
          variant="outline"
          className="text-sm leading-[150%] font-normal tracking-[2%] text-[#666D80]"
          onClick={() => setIsPreviewOpen(true)}
        >
          Story preview
        </Button>
      </div>
      <div className="mt-6 flex h-full items-start justify-start gap-6">
        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-[#DFE1E7] bg-white shadow-sm">
          {/* Chat Content */}
          <div className="relative flex-1">
            {messages.length === 0 ? (
              // Empty State
              <div className="mx-auto flex h-full w-[424px] flex-col items-center justify-center p-8 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#12AA5B]">
                  <SparkleIcon className="text-white" size={36} weight="fill" />
                </div>
                <h3 className="mb-2 text-lg leading-[150%] font-medium tracking-[-2%] text-[#1E1F24]">
                  Welcome, Akbar! 👋
                </h3>
                <p className="mb-8 text-sm leading-[20px] tracking-[-1%] text-[#8B8D98]">
                  I’m here to help you with answers, ideas, or anything you need. Just start typing
                  below!
                </p>

                <div className="flex w-full max-w-lg flex-col gap-3">
                  <div className="flex items-center justify-start gap-2">
                    {" "}
                    <svg
                      width="163"
                      height="2"
                      viewBox="0 0 163 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0.75"
                        y1="0.75"
                        x2="161.75"
                        y2="0.749986"
                        stroke="#1E1F24"
                        stroke-opacity="0.05"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <p className="mb-1 text-xs font-medium tracking-wider text-[#8B8D98] uppercase">
                      Suggestion...
                    </p>
                    <svg
                      width="163"
                      height="2"
                      viewBox="0 0 163 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0.75"
                        y1="0.75"
                        x2="161.75"
                        y2="0.749986"
                        stroke="#1E1F24"
                        stroke-opacity="0.05"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSendMessage(suggestion)}
                      className="w-full cursor-pointer rounded-full bg-[#EFF0F3] px-4 py-2 text-center text-sm leading-[20px] font-normal tracking-[-1%] text-[#0D0D12] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Message List
              <div ref={scrollRef} className="h-full space-y-6 overflow-y-auto p-6">
                <div className="flex justify-center pb-4">
                  <span className="text-xs font-medium text-[#8B8D98]">Today</span>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex w-full gap-3",
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {msg.role === "ai" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#12AA5B] text-white">
                        <SparkleIcon size={16} />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[80%]",
                        msg.role === "user" ? "text-right" : "text-left"
                      )}
                    >
                      {msg.role === "ai" && (
                        <div className="mb-1 text-sm font-semibold text-[#1E1F24]">
                          Coterie AI Insights
                        </div>
                      )}
                      <div
                        className={cn(
                          "rounded-xl p-4 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-[#1E1F24] text-white"
                            : "border border-[#E0E1E6] bg-white text-[#4A4C54]"
                        )}
                      >
                        {msg.content}
                      </div>

                      {msg.role === "ai" && (
                        <div className="mt-2 flex items-center gap-2">
                          <button className="rounded p-1 text-[#8B8D98] hover:bg-gray-100">
                            <Copy size={14} />
                          </button>
                          <button className="rounded p-1 text-[#8B8D98] hover:bg-gray-100">
                            <RefreshCw size={14} />
                          </button>
                          <div className="ml-2 flex items-center gap-1">
                            <button className="rounded p-1 text-[#8B8D98] hover:bg-gray-100">
                              <ThumbsUp size={14} />
                            </button>
                            <button className="rounded p-1 text-[#8B8D98] hover:bg-gray-100">
                              <ThumbsDown size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Input Area */}
          <div className="p-4">
            <div className="relative flex items-center">
              <SparkleIcon className="absolute left-3 h-5 w-5 text-[#8B8D98]" weight="fill" />
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                placeholder="Ask anything to sense AI..."
                className="h-12 w-full rounded-full border-[#E0E1E6] bg-[#EFF0F3] pr-12 pl-10 text-sm focus-visible:ring-1 focus-visible:ring-[#12AA5B]"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#12AA5B] text-white transition-colors hover:bg-[#0E904B]"
              >
                <CaretDoubleUp size={16} />
              </button>
            </div>
          </div>
        </div>
        {/* Right Sidebar - Recent Updates */}
        <div className="hidden w-[280px] shrink-0 flex-col gap-4 lg:flex">
          <div className="rounded-xl border border-[#DFE1E7] bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#1E1F24]">Recent update</h3>
              <Button
                variant="outline"
                className="h-7 border-[#E0E1E6] px-3 text-xs text-[#666D80]"
              >
                See All
              </Button>
            </div>

            <div className="space-y-3">
              {RECENT_UPDATES.map((update) => (
                <div
                  key={update.id}
                  className="space-y-1 rounded-lg border border-[#E0E1E6] bg-white p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm leading-[150%] font-normal text-[#079455]">
                      {update.type}
                    </span>
                    <span className="text-xs leading-[150%] tracking-[2%] text-[#818898]">
                      {update.time}
                    </span>
                  </div>
                  <p className="text-sm leading-[150%] font-normal text-[#666D80]">{update.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md gap-0 overflow-hidden border-none bg-transparent p-0 shadow-none">
          <div className="relative max-h-[90vh] overflow-hidden overflow-y-auto rounded-2xl bg-white shadow-xl">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/20 p-1 text-white backdrop-blur-sm hover:bg-black/40"
            >
              <X size={16} />
            </button>

            <div className="w-full bg-[#E1E4EA]">
              {/* Campaign Image Placeholder */}
              <div className="flex aspect-4/3 w-full items-center justify-center bg-gray-200">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
            </div>

            <div className="space-y-4 p-6">
              <h3 className="text-xl leading-tight font-bold text-[#1E1F24]">
                Strength in Unity: Cancer Patient Support Program
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#12AA5B]">30% target reached</span>
                  <span className="text-[#666D80]">3 days left</span>
                </div>
                <Progress value={30} className="h-2 bg-[#E1E4EA]" />
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-sm leading-relaxed text-[#525866]">
                  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
                <p className="text-sm leading-relaxed text-[#525866]">
                  When an unknown printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>

            <div className="border-t border-[#E1E4EA] bg-[#F9FAFB] p-6">
              <Button className="w-full bg-[#12AA5B] hover:bg-[#0E904B]">Back this campaign</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Story;
