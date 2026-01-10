import { useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { MessageBubble } from "./message-bubble";
import type { Conversation } from "./data";
import { CaretDoubleUpIcon, SparkleIcon } from "@phosphor-icons/react";

interface ChatViewProps {
  conversation: Conversation;
}

export function ChatView({ conversation }: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [conversation.messages]);

  return (
    <div className="relative flex h-full flex-col rounded-xl bg-white">
      {/* Messages Area */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="flex flex-col gap-6 pb-4">
          {conversation.messages.length === 0 ? (
            <div className="flex h-[400px] items-center justify-center text-gray-400">
              No messages yet
            </div>
          ) : (
            conversation.messages.map((message) => (
              <MessageBubble
                key={message.id}
                content={message.content}
                timestamp={message.timestamp}
                isMe={message.isMe}
                senderAvatar={conversation.user.avatar}
                senderName={conversation.user.name}
                isAi={message.id === "m2"} // Hardcoded hack for the demo screenshot look, usually would depend on message type
              />
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="rounded-b-xl border-t border-gray-100">
        <div className="relative flex items-center rounded-full bg-[#EFF0F3] px-4 py-2">
          <SparkleIcon weight="fill" className="mr-2 text-gray-400" size={24} />
          <Input
            className="h-auto border-none bg-transparent py-2 text-sm leading-[20px] shadow-none placeholder:text-[#8B8D98] focus-visible:ring-0"
            placeholder="Ask anything to sense AI..."
          />
          <Button
            size="icon"
            className="ml-2 h-8 w-8 shrink-0 rounded-full bg-[#10B981] hover:bg-[#059669]" // Emerald color from design
          >
            <CaretDoubleUpIcon size={24} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
