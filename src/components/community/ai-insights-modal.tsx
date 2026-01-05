import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Sparkles,
  Paperclip,
  Send,
  ThumbsUp,
  ThumbsDown,
  RotateCw,
  Copy,
  Pencil,
  Trash2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: React.ReactNode; // Using ReactNode to allow formatted HTML/JSX
  timestamp: string;
}

const SUGGESTIONS = [
  "Why did engagement spike recently?",
  "What should I do today?",
  "Summarize a campaign",
  "Is our community healthy right now?",
  "What changed this week?",
  "Compare campaign performance for me",
];

const MOCK_RESPONSE_1 = (
  <div className="space-y-4">
    <p>Engagement increased over the past 48 hours due to a combination of two factors:</p>
    <ul className="list-disc space-y-2 pl-4">
      <li>
        The <strong>Housing Campaign</strong> reached 75% of its participation goal, which typically
        drives higher sharing.
      </li>
      <li>
        Two high-influence community members shared the campaign, leading to{" "}
        <strong>~45 new participants</strong> within 6 hours.
      </li>
    </ul>
    <p>Similar spikes occurred earlier this month when updates were sent mid-week.</p>
  </div>
);

const MOCK_RESPONSE_2 = (
  <div className="space-y-4">
    <p>Based on current activity, here are the most effective actions to take today:</p>
    <ul className="list-disc space-y-2 pl-4">
      <li>Send a short video update to the Housing Campaign while engagement is still high.</li>
      <li>Invite 2-3 suggested influencers to help extend reach beyond your core supporters.</li>
      <li>Review Campaign B, which has seen declining participation over the past 7 days.</li>
    </ul>
  </div>
);

interface AiInsightsModalProps {
  children?: React.ReactNode;
}

const AiInsightsModal = ({ children }: AiInsightsModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      let responseContent = (
        <p>I can help you analyze that. Could you provide more specific details?</p>
      );

      if (text.includes("spike")) {
        responseContent = MOCK_RESPONSE_1;
      } else if (text.includes("do today")) {
        responseContent = MOCK_RESPONSE_2;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const WelcomeView = () => (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#12AA5B]">
        <Sparkles className="h-8 w-8 fill-white text-white" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-[#1E1F24]">Welcome, Akbar! 👋</h2>
      <p className="mb-8 max-w-[400px] text-sm text-[#8B8D98]">
        I'm here to help you with answers, ideas, or anything you need. Just start typing below!
      </p>

      <div className="w-full max-w-[400px] space-y-6">
        <p className="text-sm font-medium text-[#8B8D98]">Suggestion...</p>
        <div className="flex flex-col gap-3">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSendMessage(suggestion)}
              className="w-full rounded-full bg-[#F6F8FA] px-4 py-3 text-sm text-[#414143] transition-colors hover:bg-gray-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const ChatView = () => (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col gap-2">
          {msg.role === "user" ? (
            <div className="space-y-1">
              <h4 className="font-semibold text-[#1E1F24]">{msg.content}</h4>
              <div className="flex items-center justify-end gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8B8D98] uppercase">{msg.timestamp}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-4 w-4 text-[#8B8D98]">
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-4 w-4 text-[#8B8D98]">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-4 w-4 text-[#8B8D98]">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7F6EC]">
                <Sparkles className="h-3.5 w-3.5 fill-[#12AA5B] text-[#12AA5B]" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="rounded-lg bg-[#F6F8FA] p-4 text-sm leading-relaxed text-[#414143]">
                  {msg.content}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8B8D98] uppercase">{msg.timestamp}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-[#8B8D98]">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-[#8B8D98]">
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-4 w-4 text-[#8B8D98]">
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-[#8B8D98]">
                      <RotateCw className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="fixed top-6 right-6 bottom-6 left-auto w-full max-w-[440px] translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden border-none bg-white p-0 shadow-2xl sm:rounded-[24px]">
        <DialogHeader className="border-b border-gray-100 p-4">
          <DialogTitle className="text-lg font-semibold text-[#0A0A0C]">
            Coterie Ai Insights
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto" ref={scrollRef}>
          {messages.length === 0 ? <WelcomeView /> : <ChatView />}
        </div>

        <div className="border-t border-gray-100 p-4">
          <div className="relative flex items-center gap-2 rounded-full border border-gray-200 bg-[#F9FAFB] px-4 py-2">
            <Paperclip className="h-5 w-5 rotate-45 text-gray-400" />
            <input
              className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
              placeholder="Ask anything (e.g., summarize our impact)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
            />
            <Button
              size="icon"
              className="h-8 w-8 rounded-full bg-[#12AA5B] hover:bg-[#0E904B]"
              onClick={() => handleSendMessage(inputText)}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiInsightsModal;
