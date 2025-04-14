
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, ChevronDown, Image as ImageIcon, Play } from "lucide-react";

type MessageMedia = {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
};

type MessageBubbleProps = {
  content: string;
  time: string;
  sent: boolean;
  read?: boolean;
  delivered?: boolean;
  className?: string;
  media?: MessageMedia[];
  maxLength?: number;
};

const MessageBubble = ({
  content,
  time,
  sent,
  read = false,
  delivered = false,
  className,
  media,
  maxLength = 150,
}: MessageBubbleProps) => {
  const [expanded, setExpanded] = useState(false);
  const isLongMessage = content.length > maxLength;
  const displayContent = expanded || !isLongMessage ? content : `${content.substring(0, maxLength)}...`;

  return (
    <div
      className={cn(
        "max-w-[80%] mb-3 animate-message-bounce",
        sent ? "ml-auto" : "mr-auto",
        className
      )}
    >
      <div
        className={cn(
          "p-3 rounded-2xl backdrop-blur-sm shadow-sm",
          sent
            ? "bg-lumina-indigo/90 text-white rounded-br-sm"
            : "bg-white/10 dark:bg-black/20 border border-white/10 dark:border-white/5 text-foreground rounded-bl-sm"
        )}
      >
        {media && media.length > 0 && (
          <div className={cn(
            "mb-2 grid gap-1.5",
            media.length === 1 ? "grid-cols-1" : "grid-cols-2"
          )}>
            {media.map((item, index) => (
              <div 
                key={index} 
                className="relative rounded-lg overflow-hidden bg-black/20 cursor-pointer"
                style={{ aspectRatio: '16/9' }}
              >
                {item.type === "image" ? (
                  <img 
                    src={item.url} 
                    alt="Media content" 
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src={item.thumbnail || item.url} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center hover:bg-black/30 transition-colors">
                      <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                        <Play size={24} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <p className="text-sm break-words">{displayContent}</p>
        
        {isLongMessage && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "mt-1.5 text-xs flex items-center",
              sent ? "text-white/80" : "text-muted-foreground"
            )}
          >
            {expanded ? "Show less" : "Read more"} <ChevronDown size={12} className={`ml-0.5 ${expanded ? "rotate-180" : ""} transition-transform`} />
          </button>
        )}
      </div>
      
      <div
        className={cn(
          "flex items-center mt-1 text-xs",
          sent ? "justify-end text-muted-foreground" : "justify-start text-muted-foreground"
        )}
      >
        <span>{time}</span>
        {sent && (
          <span className="ml-1">
            {read ? (
              <CheckCheck className="h-3 w-3 text-lumina-teal" />
            ) : delivered ? (
              <CheckCheck className="h-3 w-3" />
            ) : (
              <Check className="h-3 w-3" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
