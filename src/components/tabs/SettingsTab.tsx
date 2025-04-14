
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Avatar from "@/components/Avatar";
import ThemeToggle from "@/components/ThemeToggle";
import { 
  User, 
  Bell, 
  Lock, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  MessageSquare,
  UserPlus,
  Shield,
  Image
} from "lucide-react";

const SettingsTab = () => {
  return (
    <div className="w-full h-full">
      <div className="py-4 px-4">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        
        <ScrollArea className="max-h-[calc(100vh-180px)]">
          {/* Profile Section */}
          <div className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-4">
              <Avatar src="https://i.pravatar.cc/150?img=33" name="Jamie Wilson" online={true} size="lg" />
              <div className="flex-1">
                <h3 className="font-medium text-lg">Jamie Wilson</h3>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
              <button className="bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-white/5 p-2 rounded-full">
                <User size={18} />
              </button>
            </div>
          </div>
          
          {/* Settings Categories */}
          <div className="space-y-4">
            {/* Appearance */}
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Theme</h3>
                <ThemeToggle />
              </div>
            </div>
            
            {/* Chat Settings */}
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4">
              <h3 className="font-medium mb-3">Chat Settings</h3>
              
              <div className="space-y-3">
                <SettingsItem icon={<MessageSquare size={18} />} label="Chat Backup" />
                <SettingsItem icon={<Image size={18} />} label="Media Auto-Download" />
                <SettingsItem icon={<Shield size={18} />} label="Privacy" />
              </div>
            </div>
            
            {/* Account & Privacy */}
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4">
              <h3 className="font-medium mb-3">Account</h3>
              
              <div className="space-y-3">
                <SettingsItem icon={<Bell size={18} />} label="Notifications" />
                <SettingsItem icon={<Lock size={18} />} label="Security" />
                <SettingsItem icon={<UserPlus size={18} />} label="Invite Friends" />
              </div>
            </div>
            
            {/* Help & About */}
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4">
              <div className="space-y-3">
                <SettingsItem icon={<HelpCircle size={18} />} label="Help & Support" />
                <SettingsItem icon={<LogOut size={18} />} label="Logout" danger />
              </div>
            </div>
            
            <div className="py-2 text-center">
              <p className="text-xs text-muted-foreground">Prolier v1.0.1</p>
              <p className="text-xs text-muted-foreground mt-1">© 2025 Prolier Inc.</p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}

const SettingsItem = ({ icon, label, danger = false }: SettingsItemProps) => {
  return (
    <button 
      className={`flex items-center justify-between w-full py-2 ${
        danger ? "text-red-500" : "text-foreground"
      }`}
    >
      <div className="flex items-center">
        <div className={`mr-3 ${danger ? "text-red-500" : "text-muted-foreground"}`}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      <ChevronRight size={16} className="text-muted-foreground" />
    </button>
  );
};

export default SettingsTab;
