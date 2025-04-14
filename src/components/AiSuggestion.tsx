
import React from "react";
import { Bot, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type AiSuggestionProps = {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  isVisible?: boolean;
};

const AiSuggestion = ({ suggestions, onSelectSuggestion, isVisible = true }: AiSuggestionProps) => {
  const isMobile = useIsMobile();
  
  if (suggestions.length === 0 || !isVisible) return null;

  return (
    <div className={`mb-2 md:mb-4 ${isMobile ? 'animate-fade-in' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <Bot className="h-4 w-4 text-lumina-indigo" />
        <span className="text-xs font-medium text-foreground/70">AI Suggestions</span>
        <Sparkles className="h-3 w-3 text-lumina-cyan" />
      </div>
      <div className="flex gap-1.5 md:gap-2 flex-wrap">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelectSuggestion(suggestion)}
            className="bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-full hover:bg-white/20 dark:hover:bg-white/5 transition-all duration-200 hover:translate-y-[-2px] animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AiSuggestion;
