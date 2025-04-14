
import React, { useState } from "react";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  messages: any[];
  onAiSingleClick: () => void;
  onAiDoubleClick: () => void;
};

const ChatInput = ({ onSendMessage, messages, onAiSingleClick, onAiDoubleClick }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 p-2 flex items-center space-x-2 w-full rounded-full relative">
      <button
        type="button"
        className="bg-white/10 dark:bg-black/10 p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/5"
      >
        <Paperclip className="h-5 w-5" />
      </button>
      
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="bg-white/10 dark:bg-black/10 w-full py-2.5 px-4 focus:outline-none rounded-full border border-white/10 dark:border-white/5"
        />
      </div>
      
      {message.trim() === "" ? (
        <>
          <button
            type="button"
            className="bg-white/10 dark:bg-black/10 p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/5 hidden sm:flex"
          >
            <Smile className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="bg-white/10 dark:bg-black/10 p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/5"
          >
            <Mic className="h-5 w-5" />
          </button>
        </>
      ) : (
        <button
          type="submit"
          className={cn(
            "bg-gradient-to-r from-lumina-blue to-lumina-teal h-10 w-10 flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"
          )}
        >
          <Send className="h-5 w-5 text-white" />
        </button>
      )}
    </form>
  );
};

export default ChatInput;
