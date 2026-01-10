import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SparkleIcon } from "@phosphor-icons/react";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isMe: boolean;
  senderAvatar?: string;
  senderName?: string;
  showAvatar?: boolean;
  isAi?: boolean; // For that special styling in the screenshot
}

export function MessageBubble({
  content,
  timestamp,
  isMe,
  senderAvatar,
  senderName,
  showAvatar = true,
  isAi = false,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex w-fit gap-1 rounded-[12px] p-4",

        isMe
          ? "bg-primary text-primary-foreground ml-auto items-end" // Adjust based on your theme, purely hypothetical 'me' bubble
          : "bg-[#F0FDF4] text-[#1D2939]", // Greenish tint from screenshot
        isAi && "bg-[#EFF0F3] text-[#1D2939]"
      )}
    >
      {!isMe && !isAi && showAvatar && (
        <Avatar className="mt-1 h-8 w-8">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback>{senderName?.[0]}</AvatarFallback>
        </Avatar>
      )}

      <div
      // className={cn("flex w-fit flex-col", isMe && "items-end")}
      >
        <div
          className={cn(
            "relative rounded-xl p-4 text-sm"
            // Blueish tint for the second bubble type in screenshot? Or just maybe generic grey?
            // Actually looking at screenshot:
            // Top one: light green bg.
            // Bottom one: light gray/blue bg.
          )}
          style={{
            backgroundColor: isMe ? undefined : isAi ? "" : "#ECFDF5", // Hand-picking colors closer to image
          }}
        >
          {/* Render newlines properly */}
          <div className="leading-relaxed whitespace-pre-wrap">{content}</div>
          {/* The icon in top right of bubble */}
          {!isMe && (
            <div className="absolute top-4 right-4 text-emerald-500">
              {isAi ? <SparkleIcon weight="fill" size={24} className="text-emerald-600" /> : null}
              {/* The screenshot has a sparkle icon on the second bubble */}
            </div>
          )}
        </div>
        <span className="mt-1 text-xs text-gray-400">{timestamp}</span>
      </div>
    </div>
  );
}
