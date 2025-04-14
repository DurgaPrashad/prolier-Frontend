
import React from "react";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string;
  name: string;
  online?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const Avatar = ({ src, name, online = false, size = "md", className }: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "rounded-full flex items-center justify-center bg-gradient-to-br from-lumina-blue to-lumina-teal text-white font-medium overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "";
            }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 rounded-full bg-green-500 border-2 border-background dark:border-card w-2.5 h-2.5"></div>
      )}
    </div>
  );
};

export default Avatar;
