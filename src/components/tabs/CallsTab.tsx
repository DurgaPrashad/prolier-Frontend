
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Avatar from "@/components/Avatar";
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Video } from "lucide-react";

const callsData = [
  {
    id: "1",
    name: "Emma Watson",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "10:32 AM",
    type: "incoming",
    isVideo: false,
    missed: false,
  },
  {
    id: "2",
    name: "David Chen",
    avatar: "https://i.pravatar.cc/150?img=8",
    time: "Yesterday, 9:14 AM",
    type: "outgoing",
    isVideo: true,
    missed: false,
  },
  {
    id: "3",
    name: "Sophia Martinez",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "Yesterday, 7:30 PM",
    type: "incoming",
    isVideo: false,
    missed: true,
  },
  {
    id: "4",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "Monday",
    type: "outgoing",
    isVideo: false,
    missed: false,
  },
  {
    id: "5",
    name: "Lumina AI",
    avatar: undefined,
    time: "Monday",
    type: "incoming",
    isVideo: true,
    missed: false,
  },
];

const CallsTab = () => {
  return (
    <div className="w-full h-full">
      <div className="py-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Calls</h2>
          <button className="bg-gradient-to-r from-lumina-blue to-lumina-teal text-white rounded-full p-2">
            <Phone size={20} />
          </button>
        </div>
        
        <ScrollArea className="max-h-[calc(100vh-180px)]">
          <div className="space-y-2">
            {callsData.map((call) => {
              let Icon = PhoneIncoming;
              let statusColor = "text-green-500";
              
              if (call.type === "outgoing") {
                Icon = PhoneOutgoing;
                statusColor = "text-blue-500";
              }
              
              if (call.missed) {
                Icon = PhoneMissed;
                statusColor = "text-red-500";
              }
              
              return (
                <div 
                  key={call.id}
                  className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar src={call.avatar} name={call.name} online={false} />
                      <div>
                        <h3 className="font-medium">{call.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Icon size={12} className={statusColor} />
                          <span className="text-xs text-muted-foreground">{call.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 p-2 rounded-full">
                      {call.isVideo ? <Video size={18} /> : <Phone size={18} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CallsTab;
