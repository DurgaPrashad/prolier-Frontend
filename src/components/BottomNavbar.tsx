
import React from "react";
import { Phone, MessageSquare, Users, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type BottomNavbarProps = {
  isHomeScreen?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
};

const BottomNavbar = ({ 
  isHomeScreen = true, 
  activeTab = "chats", 
  onTabChange 
}: BottomNavbarProps) => {
  if (!isHomeScreen) return null;

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg border-t border-white/10 dark:border-white/5 md:hidden z-20">
      <div className="flex items-center justify-around py-2 px-1">
        <NavItem 
          icon={<Bell size={20} />} 
          label="Updates" 
          isActive={activeTab === "updates"}
          onClick={() => handleTabClick("updates")}
        />
        <NavItem 
          icon={<Phone size={20} />} 
          label="Calls" 
          isActive={activeTab === "calls"}
          onClick={() => handleTabClick("calls")}
        />
        <NavItem 
          icon={<Users size={20} />} 
          label="Communities" 
          isActive={activeTab === "communities"}
          onClick={() => handleTabClick("communities")}
        />
        <NavItem 
          icon={<MessageSquare size={20} />} 
          label="Chats" 
          isActive={activeTab === "chats"}
          onClick={() => handleTabClick("chats")}
        />
        <NavItem 
          icon={<Settings size={20} />} 
          label="Settings" 
          isActive={activeTab === "settings"}
          onClick={() => handleTabClick("settings")}
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center px-3 py-1 rounded-md transition-all duration-300",
        isActive
          ? "text-lumina-indigo bg-white/10 dark:bg-black/20"
          : "text-foreground/70 hover:text-lumina-blue"
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
};

export default BottomNavbar;
