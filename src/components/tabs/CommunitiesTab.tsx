
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Plus, Search } from "lucide-react";

const communitiesData = [
  {
    id: "1",
    name: "Design Enthusiasts",
    members: 450,
    image: "https://i.pravatar.cc/150?img=10",
    description: "A community for UI/UX designers and enthusiasts",
  },
  {
    id: "2",
    name: "Tech Talk",
    members: 1253,
    image: "https://i.pravatar.cc/150?img=20",
    description: "Discussion about the latest tech trends and news",
  },
  {
    id: "3",
    name: "Photo Sharing",
    members: 876,
    image: "https://i.pravatar.cc/150?img=30",
    description: "Share your photography and get feedback",
  },
  {
    id: "4",
    name: "Productivity Hackers",
    members: 325,
    image: "https://i.pravatar.cc/150?img=40",
    description: "Tips and tricks to boost your productivity",
  }
];

const CommunitiesTab = () => {
  return (
    <div className="w-full h-full">
      <div className="py-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Communities</h2>
          <button className="bg-gradient-to-r from-lumina-blue to-lumina-teal text-white rounded-full p-2">
            <Plus size={20} />
          </button>
        </div>
        
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search communities..."
            className="w-full py-2.5 pl-10 pr-4 focus:outline-none rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/10 dark:border-white/5"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <ScrollArea className="max-h-[calc(100vh-220px)]">
          <div className="space-y-4">
            {communitiesData.map((community) => (
              <div 
                key={community.id} 
                className="bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lumina-blue to-lumina-teal flex items-center justify-center text-white overflow-hidden">
                    {community.image ? (
                      <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{community.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{community.description}</p>
                    <div className="flex items-center mt-1">
                      <Users size={12} className="mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{community.members} members</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full mt-4 py-3 flex items-center justify-center space-x-2 bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-dashed border-white/20 dark:border-white/10 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 transition-all">
              <Plus size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Create New Community</span>
            </button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CommunitiesTab;
