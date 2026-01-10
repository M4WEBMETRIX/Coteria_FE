import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Conversation } from "./data";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  return (
    <div className="flex flex-col overflow-hidden p-2">
      {conversations.map((conversation, index) => (
        <div key={conversation.id}>
          <button
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "flex w-full cursor-pointer items-center gap-3 p-4 text-left transition-colors",
              selectedId === conversation.id ? "bg-gray-50" : ""
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
              <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm leading-[150%] font-medium tracking-[2%] text-[#0D0D12]">
                {conversation.user.name}
              </span>
              <span className="truncate text-xs leading-[150%] font-normal tracking-[2%] text-[#666D80]">
                {conversation.lastMessage}
              </span>
            </div>
          </button>
          {index < conversations.length - 1 && <div className="border-[#DFE1E7 mx-4 border-b" />}
        </div>
      ))}
    </div>
  );
}
