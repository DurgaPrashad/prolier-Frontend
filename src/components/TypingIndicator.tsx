
import React from "react";

const TypingIndicator = () => {
  return (
    <div className="inline-flex items-center p-2 pl-3 pr-4 rounded-full max-w-[80%] animate-message-bounce bg-gradient-to-r from-white/5 to-white/10 dark:from-black/5 dark:to-black/10 backdrop-blur-md border border-white/10 dark:border-white/5">
      <div className="flex space-x-1.5 items-center">
        <div className="text-xs text-muted-foreground mr-2">Typing</div>
        <div className="w-2 h-2 bg-lumina-cyan rounded-full animate-typing-dot"></div>
        <div className="w-2 h-2 bg-lumina-cyan rounded-full animate-typing-dot" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 bg-lumina-cyan rounded-full animate-typing-dot" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
