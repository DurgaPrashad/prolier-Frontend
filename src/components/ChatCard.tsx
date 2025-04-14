
import React from "react";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";

type ChatCardProps = {
  contact: {
    id: string;
    name: string;
    avatar?: string;
    online: boolean;
    lastMessage: string;
    time: string;
    unread: number;
  };
  selected?: boolean;
  onClick: () => void;
};

const ChatCard = ({ contact, selected = false, onClick }: ChatCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 w-full cursor-pointer transition-all duration-300 border-b border-white/5",
        selected 
          ? "bg-white/15 dark:bg-black/30"
          : "hover:bg-white/10 dark:hover:bg-black/20"
      )}
    >
      <div className="flex items-center space-x-3">
        <Avatar src={contact.avatar} name={contact.name} online={contact.online} />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h4 className={cn(
              "text-base font-medium truncate",
              selected ? "text-lumina-indigo" : "text-foreground"
            )}>
              {contact.name}
            </h4>
            <span className="text-xs text-muted-foreground ml-2 shrink-0">{contact.time}</span>
          </div>
          <div className="flex justify-between items-center mt-0.5">
            <p className="text-sm text-muted-foreground truncate pr-2">
              {contact.lastMessage}
            </p>
            {contact.unread > 0 && (
              <div className="min-w-[20px] h-5 rounded-full bg-lumina-indigo flex items-center justify-center text-xs text-white font-medium px-1.5 shrink-0">
                {contact.unread}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
