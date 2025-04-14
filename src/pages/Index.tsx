
import React from "react";
import ChatLayout from "@/components/ChatLayout";
import ParallaxBackground from "@/components/ParallaxBackground";

const Index = () => {
  return (
    <div className="h-screen w-full overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full">
        <ParallaxBackground />
      </div>
      <div className="relative z-10 h-full w-full">
        <ChatLayout />
      </div>
    </div>
  );
};

export default Index;
