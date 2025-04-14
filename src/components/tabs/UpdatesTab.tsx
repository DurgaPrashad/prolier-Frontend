
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Avatar from "@/components/Avatar";
import { MoreVertical, Camera } from "lucide-react";

const statusData = [
  {
    id: "1",
    name: "Emma Watson",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "10m ago",
    viewed: false,
  },
  {
    id: "2",
    name: "David Chen",
    avatar: "https://i.pravatar.cc/150?img=8",
    time: "1h ago",
    viewed: false,
  },
  {
    id: "3",
    name: "Sophia Martinez",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "2h ago",
    viewed: true,
  },
  {
    id: "4",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "5h ago",
    viewed: true,
  },
  {
    id: "5",
    name: "You",
    avatar: undefined,
    time: "Tap to add status",
    isOwn: true,
    viewed: false,
  },
];

const UpdatesTab = () => {
  return (
    <div className="w-full h-full">
      <div className="py-4 px-4">
        <h2 className="text-lg font-semibold mb-4">Status updates</h2>
        
        <ScrollArea className="max-h-[calc(100vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Your Status */}
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar name="You" online={true} />
                    <div className="absolute -bottom-1 -right-1 bg-lumina-teal rounded-full p-1">
                      <Camera size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Your status</h3>
                    <p className="text-xs text-muted-foreground">Tap to add</p>
                  </div>
                </div>
                <button className="p-1 rounded-full hover:bg-white/10">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent updates</h3>
            </div>

            {statusData.filter(status => !status.isOwn && !status.viewed).map((status) => (
              <div key={status.id} className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border-2 border-lumina-teal animate-pulse" style={{ padding: '2px' }}></div>
                    <Avatar src={status.avatar} name={status.name} online={false} />
                  </div>
                  <div>
                    <h3 className="font-medium">{status.name}</h3>
                    <p className="text-xs text-muted-foreground">{status.time}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Viewed Updates */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Viewed updates</h3>
            </div>

            {statusData.filter(status => !status.isOwn && status.viewed).map((status) => (
              <div key={status.id} className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <Avatar src={status.avatar} name={status.name} online={false} />
                  <div>
                    <h3 className="font-medium">{status.name}</h3>
                    <p className="text-xs text-muted-foreground">{status.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UpdatesTab;
