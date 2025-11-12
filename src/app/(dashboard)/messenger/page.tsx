"use client";
import React, { useState } from "react";
import { Search, Paperclip, Send } from "lucide-react";
import Image from "next/image";

// Mock data for users
const users = [
    {
        id: 1,
        name: "John Doe",
        role: "Customer",
        online: true,
        unread: 3,
        priority: false,
        lastMessage: "Hey, when will my order be delivered?",
        lastMessageTime: "2 min ago",
        avatar: "/dashboard/user-management/user1.png",
    },
    {
        id: 2,
        name: "Sarah Wilson",
        role: "Provider",
        online: true,
        unread: 0,
        priority: true,
        lastMessage: "I've completed the service request",
        lastMessageTime: "1 hour ago",
        avatar: "/dashboard/user-management/user1.png",
    },
    {
        id: 3,
        name: "Mike Johnson",
        role: "Customer",
        online: false,
        unread: 1,
        priority: false,
        lastMessage: "Thanks for your help!",
        lastMessageTime: "3 hours ago",
        avatar: "/dashboard/user-management/user1.png",
    },
    {
        id: 4,
        name: "Emily Brown",
        role: "Provider",
        online: true,
        unread: 0,
        priority: false,
        lastMessage: "Can you send the documents?",
        lastMessageTime: "5 hours ago",
        avatar: "/dashboard/user-management/user1.png",
    },
    {
        id: 5,
        name: "Alex Chen",
        role: "Customer",
        online: false,
        unread: 0,
        priority: true,
        lastMessage: "I need urgent assistance",
        lastMessageTime: "1 day ago",
        avatar: "/dashboard/user-management/user1.png",
    },
];

// Mock messages
const initialMessages = [
    { id: 1, text: "Hello! How can I help you today?", sender: "them", time: "10:00 AM" },
    { id: 2, text: "I have an issue with my recent order", sender: "me", time: "10:01 AM" },
    { id: 3, text: "Can you please share your order ID?", sender: "them", time: "10:02 AM" },
    { id: 4, text: "It's #ORD-12345", sender: "me", time: "10:03 AM" },
    { id: 5, text: "Thank you! Let me check that for you...", sender: "them", time: "10:04 AM" },
];

const MessengerPage = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === "all" || (activeTab === "unread" && user.unread > 0) || (activeTab === "priority" && user.priority);

        return matchesSearch && matchesTab;
    });

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        const newMsg = {
            id: messages.length + 1,
            text: newMessage,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex h-[calc(100vh-118px)]  bg-gray-50">
            <div className="w-1/5  bg-transparent flex flex-col pr-4">
                <div className="relative p-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    {["all", "unread", "priority"].map((tab) => (
                        <button key={tab} className={`flex-1 py-3 text-sm font-medium capitalize ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab(tab)}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedUser.id === user.id ? "bg-blue-50" : ""}`} onClick={() => setSelectedUser(user)}>
                            <div className="relative">
                                <Image src={user.avatar} alt={user.name} height={48} width={48} className="w-12 h-12 rounded-full object-cover"></Image>
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.online ? "bg-green-500" : "bg-red-500"}`} />
                            </div>

                            <div className="ml-3 flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-gray-900 truncate">{user.name}</h3>
                                    <span className="text-xs text-gray-500">{user.lastMessageTime}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                                    {/* {user.unread > 0 && <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{user.unread}</span>} */}
                                </div>
                                <span className={`text-xs ${user.role === "Provider" ? "text-green-600" : "text-blue-600"}`}>{user.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="bg-[#F3F4F6]  p-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="relative">
                                <Image src={selectedUser.avatar} alt={selectedUser.name} height={40} width={40} className="w-10 h-10 rounded-full object-cover"></Image>
                                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${selectedUser.online ? "bg-green-500" : "bg-red-500"}`} />
                            </div>
                            <div className="ml-3">
                                <h2 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h2>
                                <p className="text-sm text-gray-500">
                                    {selectedUser.role} • {selectedUser.online ? "Online" : "Offline"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-white p-4">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.sender === "me" ? "bg-[#FF5A36] text-white rounded-br-none" : "bg-[#F3F4F6] text-gray-900 rounded-bl-none border border-gray-200"}`}>
                                    <p className="text-sm">{message.text}</p>
                                    <p className={`text-xs mt-1 ${message.sender === "me" ? "text-white" : "text-gray-500"}`}>{message.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Input */}
                <div className="bg-transparent border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" rows={1} />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                <button className="text-[#6B7280] hover:text-gray-600">
                                    <Paperclip className="h-5 w-5" />
                                </button>
                                <button onClick={handleSendMessage} disabled={!newMessage.trim()} className="text-white p-1 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: "#FF5A36" }}>
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessengerPage;
