
import React from "react";
import { Bot, Sparkles } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type AiAssistantProps = {
  onSingleClick: () => void;
  onDoubleClick: () => void;
};

const AiAssistant = ({ onSingleClick, onDoubleClick }: AiAssistantProps) => {
  const handleClick = () => {
    onSingleClick();
  };

  return (
    <div className="absolute -top-12 right-4">
      <Popover>
        <PopoverTrigger asChild>
          <button
            onClick={handleClick}
            onDoubleClick={onDoubleClick}
            className="bg-gradient-to-r from-lumina-blue to-lumina-teal p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="AI Assistant"
          >
            <Bot className="h-5 w-5 text-white mr-1" />
            <Sparkles className="h-3 w-3 text-white" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 bg-white/20 dark:bg-black/30 backdrop-blur-lg border border-white/20 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-lumina-indigo" />
              <span className="font-medium text-foreground">AI Assistant</span>
            </div>
            <p className="text-foreground/80">
              • Single click for quick response suggestions
            </p>
            <p className="text-foreground/80">
              • Double click to analyze conversation
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AiAssistant;
