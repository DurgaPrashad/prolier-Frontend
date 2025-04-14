
import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import ChatCard from "./ChatCard";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import AiSuggestion from "./AiSuggestion";
import { Phone, Video, Menu, Plus, X, Brain, MessageCircle, Bell, Users, Settings } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import BottomNavbar from "./BottomNavbar";
import { ScrollArea } from "./ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import AiAssistant from "./AiAssistant";

// Import tab components
import UpdatesTab from "./tabs/UpdatesTab";
import CallsTab from "./tabs/CallsTab";
import CommunitiesTab from "./tabs/CommunitiesTab";
import SettingsTab from "./tabs/SettingsTab";

// Define message type to fix TypeScript errors
type Message = {
  id: string;
  content: string;
  time: string;
  sent: boolean;
  delivered?: boolean;
  read?: boolean;
  media?: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
  }[];
};

// Mock data
const CONTACTS = [
  {
    id: "1",
    name: "Emma Watson",
    avatar: "https://i.pravatar.cc/150?img=1",
    online: true,
    lastMessage: "How's your project coming along?",
    time: "10:32 AM",
    unread: 2,
  },
  {
    id: "2",
    name: "David Chen",
    avatar: "https://i.pravatar.cc/150?img=8",
    online: true,
    lastMessage: "I'll send you the presentation",
    time: "9:14 AM",
    unread: 0,
  },
  {
    id: "3",
    name: "Sophia Martinez",
    avatar: "https://i.pravatar.cc/150?img=5",
    online: false,
    lastMessage: "Thanks for the help yesterday!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "4",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    online: false,
    lastMessage: "Let me know when you're free",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "5",
    name: "Lumina AI",
    avatar: undefined,
    online: true,
    lastMessage: "I'm here to assist you anytime",
    time: "2 days ago",
    unread: 0,
  },
];

// Mock conversation for the first chat
const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    content: "Hey! How's your project coming along?",
    time: "10:30 AM",
    sent: false,
  },
  {
    id: "m2",
    content: "It's going well! I just finished the design phase.",
    time: "10:31 AM",
    sent: true,
    delivered: true,
    read: true,
  },
  {
    id: "m3",
    content: "That's great to hear! Would you be able to share some of your progress?",
    time: "10:32 AM",
    sent: false,
  },
  {
    id: "m4",
    content: "Sure! Here are some screenshots of the design I've been working on. Let me know what you think about the color scheme and overall layout. I'm considering a few different options for the navigation.",
    time: "10:35 AM",
    sent: true,
    delivered: true,
    read: true,
    media: [
      {
        type: "image",
        url: "https://i.pravatar.cc/500?img=40",
      },
      {
        type: "image",
        url: "https://i.pravatar.cc/500?img=41",
      }
    ]
  },
  {
    id: "m5",
    content: "These look fantastic! I love the color palette you've chosen. The layout is clean and intuitive. Have you tested the responsiveness on different devices?",
    time: "10:40 AM",
    sent: false,
  },
  {
    id: "m6",
    content: "Thanks! Yes, I've tested it on mobile, tablet, and desktop. Here's a video showing how it adapts to different screen sizes.",
    time: "10:42 AM",
    sent: true,
    delivered: true,
    read: true,
    media: [
      {
        type: "video",
        url: "https://i.pravatar.cc/500?img=42",
        thumbnail: "https://i.pravatar.cc/500?img=42"
      }
    ]
  },
];

// AI suggestions based on context
const AI_SUGGESTIONS = [
  "Sure, I'll send you some screenshots soon.",
  "I'd love to get your feedback on the design.",
  "Can we schedule a call to discuss it?",
];

const ChatLayout = () => {
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [showTyping, setShowTyping] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [isHomeScreen, setIsHomeScreen] = useState(true);
  const [activeTab, setActiveTab] = useState("chats");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      content,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sent: true,
      delivered: false,
      read: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setShowAiSuggestions(false);

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, delivered: true } : msg
        )
      );
    }, 1000);

    // Simulate typing indicator
    setTimeout(() => {
      setShowTyping(true);
    }, 1500);

    // Simulate response
    setTimeout(() => {
      setShowTyping(false);
      const responseMessage: Message = {
        id: `m${messages.length + 2}`,
        content: "Thanks for the update! Looking forward to seeing your progress.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sent: false,
      };
      setMessages((prev) => [...prev, responseMessage]);

      // Simulate read receipt
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.sent ? { ...msg, read: true } : msg))
        );
      }, 1000);
    }, 4000);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
    setShowAiSuggestions(false);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleSelectChat = (contact: any) => {
    setSelectedContact(contact);
    setIsHomeScreen(false);
    if (mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  const handleBackToHome = () => {
    setIsHomeScreen(true);
  };

  const handleAiSingleClick = () => {
    setShowAiSuggestions(!showAiSuggestions);
  };

  const handleAiDoubleClick = () => {
    // Analyze conversation logic would go here
    setShowAiSuggestions(true);
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  // Render the active tab content
  const renderActiveTabContent = () => {
    if (!isHomeScreen) return null;
    
    switch(activeTab) {
      case "updates":
        return <UpdatesTab />;
      case "calls":
        return <CallsTab />;
      case "communities":
        return <CommunitiesTab />;
      case "chats":
        return (
          <ScrollArea className="flex-1 h-[calc(100vh-120px)] md:h-[calc(100vh-160px)]">
            <div className="pt-4 pb-20 px-2 space-y-0.5">
              {CONTACTS.map((contact) => (
                <ChatCard
                  key={contact.id}
                  contact={contact}
                  selected={selectedContact.id === contact.id}
                  onClick={() => handleSelectChat(contact)}
                />
              ))}
            </div>
          </ScrollArea>
        );
      case "settings":
        return <SettingsTab />;
      default:
        return null;
    }
  };

  // Desktop sidebar navigation
  const DesktopSidebarNav = () => (
    <div className="hidden md:flex flex-col items-center px-2 pt-6 pb-4 border-r border-white/10 dark:border-white/5 bg-white/5 dark:bg-black/5 backdrop-blur-lg space-y-8">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-lumina-indigo to-lumina-blue bg-clip-text text-transparent">
          Prolier
        </h1>
      </div>
      <div className="flex flex-col items-center space-y-6">
        <NavIconButton 
          icon={<Bell size={22} />} 
          label="Updates" 
          isActive={activeTab === "updates"}
          onClick={() => handleTabChange("updates")}
        />
        <NavIconButton 
          icon={<Phone size={22} />} 
          label="Calls" 
          isActive={activeTab === "calls"}
          onClick={() => handleTabChange("calls")}
        />
        <NavIconButton 
          icon={<Users size={22} />} 
          label="Communities" 
          isActive={activeTab === "communities"}
          onClick={() => handleTabChange("communities")}
        />
        <NavIconButton 
          icon={<MessageCircle size={22} />} 
          label="Chats" 
          isActive={activeTab === "chats"}
          onClick={() => handleTabChange("chats")}
        />
        <NavIconButton 
          icon={<Settings size={22} />} 
          label="Settings" 
          isActive={activeTab === "settings"}
          onClick={() => handleTabChange("settings")}
        />
      </div>
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Vertical desktop navigation sidebar */}
      <DesktopSidebarNav />
      
      {/* Sidebar - Chat list - Only visible on desktop or when toggled on mobile */}
      <div
        className={`md:w-1/3 lg:w-1/4 h-full bg-white/5 dark:bg-black/5 backdrop-blur-lg border-r border-white/10 dark:border-white/5 flex flex-col z-30 transition-transform duration-300 ${
          mobileSidebarOpen
            ? "absolute inset-0 w-full transform translate-x-0"
            : "absolute inset-0 -translate-x-full md:static md:translate-x-0"
        }`}
      >
        {/* Sidebar header with user profile - only shown on mobile */}
        <div className="p-4 border-b border-white/10 dark:border-white/5 md:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar 
                src="https://i.pravatar.cc/150?img=12" 
                name="Your Profile" 
                online={true}
                size="sm"
              />
              <h1 className="text-xl font-bold ml-3 bg-gradient-to-r from-lumina-indigo to-lumina-blue bg-clip-text text-transparent">
                Prolier
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="btn-ghost p-2 h-10 w-10 flex items-center justify-center rounded-full md:hidden" onClick={toggleMobileSidebar}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat list */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="py-1">
            {CONTACTS.map((contact) => (
              <ChatCard
                key={contact.id}
                contact={contact}
                selected={selectedContact.id === contact.id}
                onClick={() => handleSelectChat(contact)}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="p-4">
          <button className="btn-gradient w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-lumina-indigo to-lumina-blue text-white rounded-full shadow-md hover:shadow-lg transition-shadow">
            <Plus className="h-5 w-5" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
        {/* Chat header */}
        <div className="p-4 flex items-center justify-between z-10 bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/10 dark:border-white/5 shadow-sm">
          <div className="flex items-center">
            <button
              className="mr-3 md:hidden btn-ghost p-2 h-10 w-10 flex items-center justify-center rounded-full"
              onClick={isHomeScreen ? toggleMobileSidebar : handleBackToHome}
            >
              {isHomeScreen ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </button>
            {!isHomeScreen && (
              <div className="flex items-center space-x-3">
                <Avatar
                  src={selectedContact.avatar}
                  name={selectedContact.name}
                  online={selectedContact.online}
                  size="md"
                />
                <div>
                  <h2 className="font-medium">{selectedContact.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedContact.online ? "Online" : "Last seen today"}
                  </p>
                </div>
              </div>
            )}
            {isHomeScreen && (
              <div>
                <h2 className="text-lg font-medium">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              </div>
            )}
          </div>

          {!isHomeScreen && (
            <div className="flex items-center space-x-2">
              <button className="btn-ghost p-2 h-9 w-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10">
                <Phone className="h-4 w-4" />
              </button>
              <button className="btn-ghost p-2 h-9 w-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10">
                <Video className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Chat messages or tab content */}
        {isHomeScreen ? (
          renderActiveTabContent()
        ) : (
          <ScrollArea className="flex-1 py-4 px-4 space-y-4 z-0 relative pb-28">
            {messages.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-muted-foreground/30 space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-lumina-indigo to-lumina-blue flex items-center justify-center animate-pulse">
                    <span className="text-2xl">✨</span>
                  </div>
                  <p className="text-sm">Start your conversation with {selectedContact.name}</p>
                </div>
              </div>
            )}
            
            <div className="relative z-10">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  content={message.content}
                  time={message.time}
                  sent={message.sent}
                  delivered={message.delivered}
                  read={message.read}
                  media={message.media}
                />
              ))}
              {showTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}

        {/* Chat input area with AI assistant - only shown in chat view */}
        {!isHomeScreen && (
          <div className="relative bottom-0 left-0 right-0 px-2 py-2 bg-white/5 dark:bg-black/5 backdrop-blur-md border-t border-white/10 dark:border-white/5 z-20">
            {/* AI Assistant button - mobile only */}
            {isMobile && (
              <AiAssistant
                onSingleClick={handleAiSingleClick}
                onDoubleClick={handleAiDoubleClick}
              />
            )}
            
            {/* AI Suggestions */}
            {showAiSuggestions && (
              <AiSuggestion
                suggestions={AI_SUGGESTIONS}
                onSelectSuggestion={handleSelectSuggestion}
                isVisible={true}
              />
            )}
            
            {/* Chat input */}
            <div className="px-2">
              <ChatInput 
                onSendMessage={handleSendMessage}
                messages={messages} 
                onAiSingleClick={handleAiSingleClick}
                onAiDoubleClick={handleAiDoubleClick}
              />
            </div>
          </div>
        )}
        
        {/* Bottom Navigation - Only visible on home screen */}
        <BottomNavbar 
          isHomeScreen={isHomeScreen} 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};

// NavIconButton component for desktop sidebar
interface NavIconButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavIconButton = ({ icon, label, isActive, onClick }: NavIconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 w-12 h-12 relative ${
        isActive
          ? "text-lumina-indigo bg-white/10 dark:bg-black/20"
          : "text-foreground/70 hover:bg-white/5 dark:hover:bg-white/5"
      }`}
      title={label}
    >
      <div>{icon}</div>
      {isActive && (
        <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-lumina-indigo to-lumina-blue rounded-l-full"></div>
      )}
    </button>
  );
};

export default ChatLayout;
