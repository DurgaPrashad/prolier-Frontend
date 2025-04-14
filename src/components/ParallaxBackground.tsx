
import React, { useEffect, useRef } from "react";

const ParallaxBackground = () => {
  const parallaxRef1 = useRef<HTMLDivElement>(null);
  const parallaxRef2 = useRef<HTMLDivElement>(null);
  const parallaxRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      if (parallaxRef1.current && parallaxRef2.current && parallaxRef3.current) {
        // Layer 1 - Subtle movement
        parallaxRef1.current.style.transform = `translate(${x / windowWidth * 10}px, ${y / windowHeight * 10}px)`;
        
        // Layer 2 - Medium movement
        parallaxRef2.current.style.transform = `translate(${x / windowWidth * 20}px, ${y / windowHeight * 20}px)`;
        
        // Layer 3 - More movement
        parallaxRef3.current.style.transform = `translate(${x / windowWidth * 30}px, ${y / windowHeight * 30}px)`;
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[-3] bg-gradient-to-br from-lumina-light to-white dark:from-lumina-midnight dark:to-black transition-colors duration-500" />
      
      {/* Parallax layers */}
      <div ref={parallaxRef1} className="parallax-layer z-[-2]">
        <div className="absolute top-[10%] left-[15%] w-64 h-64 rounded-full bg-lumina-blue/10 dark:bg-lumina-blue/5 blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-lumina-teal/10 dark:bg-lumina-teal/5 blur-3xl" />
      </div>
      
      <div ref={parallaxRef2} className="parallax-layer z-[-1]">
        <div className="absolute top-[30%] right-[20%] w-40 h-40 rounded-full bg-lumina-indigo/10 dark:bg-lumina-indigo/5 blur-2xl" />
        <div className="absolute bottom-[40%] left-[25%] w-56 h-56 rounded-full bg-lumina-cyan/10 dark:bg-lumina-cyan/5 blur-2xl" />
      </div>
      
      <div ref={parallaxRef3} className="parallax-layer z-0">
        <div className="absolute top-[45%] left-[40%] w-24 h-24 rounded-full bg-lumina-cyan/15 dark:bg-lumina-cyan/10 blur-xl animate-float" />
        <div className="absolute top-[20%] right-[35%] w-20 h-20 rounded-full bg-lumina-indigo/15 dark:bg-lumina-indigo/10 blur-xl animate-float" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-[15%] left-[20%] w-16 h-16 rounded-full bg-lumina-blue/15 dark:bg-lumina-blue/10 blur-xl animate-float" style={{ animationDelay: "-4s" }} />
      </div>
    </>
  );
};

export default ParallaxBackground;
