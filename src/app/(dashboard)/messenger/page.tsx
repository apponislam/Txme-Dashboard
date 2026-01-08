// "use client";
// import React, { useState } from "react";
// import { Search, Paperclip, Send } from "lucide-react";
// import Image from "next/image";

// // Mock data for users
// const users = [
//     {
//         id: 1,
//         name: "John Doe",
//         role: "Customer",
//         online: true,
//         unread: 3,
//         priority: false,
//         lastMessage: "Hey, when will my order be delivered?",
//         lastMessageTime: "2 min ago",
//         avatar: "/dashboard/user-management/user1.png",
//     },
//     {
//         id: 2,
//         name: "Sarah Wilson",
//         role: "Provider",
//         online: true,
//         unread: 0,
//         priority: true,
//         lastMessage: "I've completed the service request",
//         lastMessageTime: "1 hour ago",
//         avatar: "/dashboard/user-management/user1.png",
//     },
//     {
//         id: 3,
//         name: "Mike Johnson",
//         role: "Customer",
//         online: false,
//         unread: 1,
//         priority: false,
//         lastMessage: "Thanks for your help!",
//         lastMessageTime: "3 hours ago",
//         avatar: "/dashboard/user-management/user1.png",
//     },
//     {
//         id: 4,
//         name: "Emily Brown",
//         role: "Provider",
//         online: true,
//         unread: 0,
//         priority: false,
//         lastMessage: "Can you send the documents?",
//         lastMessageTime: "5 hours ago",
//         avatar: "/dashboard/user-management/user1.png",
//     },
//     {
//         id: 5,
//         name: "Alex Chen",
//         role: "Customer",
//         online: false,
//         unread: 0,
//         priority: true,
//         lastMessage: "I need urgent assistance",
//         lastMessageTime: "1 day ago",
//         avatar: "/dashboard/user-management/user1.png",
//     },
// ];

// // Mock messages
// const initialMessages = [
//     { id: 1, text: "Hello! How can I help you today?", sender: "them", time: "10:00 AM" },
//     { id: 2, text: "I have an issue with my recent order", sender: "me", time: "10:01 AM" },
//     { id: 3, text: "Can you please share your order ID?", sender: "them", time: "10:02 AM" },
//     { id: 4, text: "It's #ORD-12345", sender: "me", time: "10:03 AM" },
//     { id: 5, text: "Thank you! Let me check that for you...", sender: "them", time: "10:04 AM" },
// ];

// const MessengerPage = () => {
//     const [activeTab, setActiveTab] = useState("all");
//     const [selectedUser, setSelectedUser] = useState(users[0]);
//     const [messages, setMessages] = useState(initialMessages);
//     const [newMessage, setNewMessage] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");

//     const filteredUsers = users.filter((user) => {
//         const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesTab = activeTab === "all" || (activeTab === "unread" && user.unread > 0) || (activeTab === "priority" && user.priority);

//         return matchesSearch && matchesTab;
//     });

//     const handleSendMessage = () => {
//         if (newMessage.trim() === "") return;

//         const newMsg = {
//             id: messages.length + 1,
//             text: newMessage,
//             sender: "me",
//             time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         };

//         setMessages([...messages, newMsg]);
//         setNewMessage("");
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     return (
//         <div className="flex h-[calc(100vh-118px)]  bg-gray-50">
//             <div className="w-1/5  bg-transparent flex flex-col pr-4">
//                 <div className="relative p-1">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                 </div>

//                 {/* Tabs */}
//                 {/* <div className="flex border-b border-gray-200">
//                     {["all", "unread", "priority"].map((tab) => (
//                         <button key={tab} className={`flex-1 py-3 text-sm font-medium capitalize ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab(tab)}>
//                             {tab}
//                         </button>
//                     ))}
//                 </div> */}

//                 {/* Users List */}
//                 <div className="flex-1 overflow-y-auto">
//                     {filteredUsers.map((user) => (
//                         <div key={user.id} className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedUser.id === user.id ? "bg-blue-50" : ""}`} onClick={() => setSelectedUser(user)}>
//                             <div className="relative">
//                                 <Image src={user.avatar} alt={user.name} height={48} width={48} className="w-12 h-12 rounded-full object-cover"></Image>
//                                 <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.online ? "bg-green-500" : "bg-red-500"}`} />
//                             </div>

//                             <div className="ml-3 flex-1 min-w-0">
//                                 <div className="flex items-center justify-between">
//                                     <h3 className="text-sm font-semibold text-gray-900 truncate">{user.name}</h3>
//                                     <span className="text-xs text-gray-500">{user.lastMessageTime}</span>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                     <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
//                                     {/* {user.unread > 0 && <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{user.unread}</span>} */}
//                                 </div>
//                                 <span className={`text-xs ${user.role === "Provider" ? "text-green-600" : "text-blue-600"}`}>{user.role}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex-1 flex flex-col">
//                 <div className="bg-[#F3F4F6]  p-4 rounded-t-2xl">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <div className="relative">
//                                 <Image src={selectedUser.avatar} alt={selectedUser.name} height={40} width={40} className="w-10 h-10 rounded-full object-cover"></Image>
//                                 <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${selectedUser.online ? "bg-green-500" : "bg-red-500"}`} />
//                             </div>
//                             <div className="ml-3">
//                                 <h2 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h2>
//                                 <p className="text-sm text-gray-500">
//                                     {selectedUser.role} • {selectedUser.online ? "Online" : "Offline"}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex-1 overflow-y-auto bg-white p-4">
//                     <div className="space-y-4">
//                         {messages.map((message) => (
//                             <div key={message.id} className={`flex items-end gap-2 ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
//                                 {/* Receiver Avatar (Left side) */}
//                                 {message.sender === "them" && (
//                                     <div className="shrink-0">
//                                         <Image src={selectedUser.avatar} alt={selectedUser.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
//                                     </div>
//                                 )}

//                                 {/* Message Bubble */}
//                                 <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.sender === "me" ? "bg-[#FF5A36] text-white rounded-br-none" : "bg-[#F3F4F6] text-gray-900 rounded-bl-none"}`}>
//                                     <p className="text-sm">{message.text}</p>
//                                     <p className={`text-xs mt-1 ${message.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>{message.time}</p>
//                                 </div>

//                                 {/* Sender Avatar (Right side) */}
//                                 {message.sender === "me" && (
//                                     <div className="shrink-0">
//                                         <Image src="/dashboard/user-management/user1.png" alt="You" width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Message Input */}
//                 <div className="bg-transparent pt-4">
//                     <div className="flex items-center space-x-2">
//                         <div className="flex-1 relative">
//                             <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." className="w-full bg-white rounded-lg px-3 py-5 pr-12 focus:outline-none focus:ring-0 focus:border-transparent resize-none placeholder:text-[#ADAEBC] text-[#ADAEBC]" rows={1} />
//                             <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
//                                 <button className="text-[#6B7280] hover:text-gray-600">
//                                     <Paperclip className="h-5 w-5" />
//                                 </button>
//                                 <button onClick={handleSendMessage} disabled={!newMessage.trim()} className="text-[#FF5A36] p-1 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ">
//                                     <Send className="h-5 w-5" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MessengerPage;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Paperclip, Send, Trash2 } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useDeleteAdminChatMutation, useGetAdminChatsQuery } from "@/redux/features/adminchats/adminChatsApi";
import { useGetMessagesQuery, useSendMessageMutation } from "@/redux/features/message/messageApi";

const MessengerPage = () => {
    // State
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [newMessage, setNewMessage] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // RTK Query Hooks
    const {
        data: chatsData,
        isLoading: chatsLoading,
        isError: chatsError,
        refetch: refetchChats,
    } = useGetAdminChatsQuery({
        searchTerm,
        page,
        limit,
    });

    const {
        data: messagesData,
        isLoading: messagesLoading,
        refetch: refetchMessages,
    } = useGetMessagesQuery(
        {
            chatId: selectedChat?._id || "",
            page: 1,
            limit: 50,
        },
        { skip: !selectedChat?._id }
    );

    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
    const [deleteChat] = useDeleteAdminChatMutation();

    // Auto-select first chat on load
    useEffect(() => {
        if (chatsData?.data && chatsData.data.length > 0 && !selectedChat) {
            setSelectedChat(chatsData.data[0]);
        }
    }, [chatsData, selectedChat]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messagesData?.data?.messages]);

    // Format time function
    const formatTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        } catch {
            return dateString;
        }
    };

    // Get last message text
    const getLastMessageText = (chat: any) => {
        if (!chat.lastMessage) return "No messages yet";
        return chat.lastMessage.text || "Attachment";
    };

    // Get user from chat
    const getUserFromChat = (chat: any) => {
        if (!chat.participants || chat.participants.length === 0) return null;
        return chat.participants[0]; // Assuming first participant is the user
    };

    // Handle send message
    const handleSendMessage = async () => {
        if ((!newMessage.trim() && selectedFiles.length === 0) || !selectedChat) return;

        try {
            let messageType = "TEXT";

            if (selectedFiles.length > 0 && newMessage.trim()) {
                messageType = "BOTH";
            } else if (selectedFiles.length > 0) {
                messageType = selectedFiles.some((file) => file.type.startsWith("image/")) ? "IMAGE" : "BOTH";
            }

            await sendMessage({
                chatId: selectedChat._id,
                text: newMessage.trim(),
                type: messageType,
                messageFiles: selectedFiles.length > 0 ? selectedFiles : undefined,
            }).unwrap();

            // Clear input and files
            setNewMessage("");
            setSelectedFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // Refetch chats to update last message
            refetchChats();
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    // Handle delete chat
    const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this chat?")) {
            try {
                await deleteChat(chatId).unwrap();
                if (selectedChat?._id === chatId) {
                    setSelectedChat(null);
                }
            } catch (error) {
                console.error("Failed to delete chat:", error);
            }
        }
    };

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles((prev) => [...prev, ...filesArray]);
        }
    };

    // Remove selected file
    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle key press for sending message
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Loading state
    if (chatsLoading) {
        return (
            <div className="flex h-[calc(100vh-118px)] bg-gray-50 items-center justify-center">
                <div className="text-gray-500">Loading chats...</div>
            </div>
        );
    }

    if (chatsError) {
        return (
            <div className="flex h-[calc(100vh-118px)] bg-gray-50 items-center justify-center">
                <div className="text-red-500">Error loading chats. Please try again.</div>
            </div>
        );
    }

    const chats = chatsData?.data || [];

    return (
        <div className="flex h-[calc(100vh-118px)] bg-gray-50">
            {/* Left Sidebar - Chat List */}
            <div className="w-1/4 bg-transparent flex flex-col pr-4 border-r border-gray-200">
                {/* Search */}
                <div className="relative p-4">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* Chats List */}
                <div className="flex-1 overflow-y-auto px-2">
                    {chats.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">No chats found</div>
                    ) : (
                        chats.map((chat: any) => {
                            const user = getUserFromChat(chat);
                            if (!user) return null;

                            return (
                                <div key={chat._id} className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 mb-2 ${selectedChat?._id === chat._id ? "bg-blue-50 border border-blue-200" : ""}`} onClick={() => setSelectedChat(chat)}>
                                    <div className="relative shrink-0">
                                        {user.profilePicture ? (
                                            <Image src={user.profilePicture} alt={user.fullName || user.email} height={48} width={48} className="w-12 h-12 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">{(user.fullName || user.email).charAt(0).toUpperCase()}</span>
                                            </div>
                                        )}
                                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${chat.status ? "bg-green-500" : "bg-red-500"}`} />
                                    </div>

                                    <div className="ml-3 flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-semibold text-gray-900 truncate">{user.fullName || user.email}</h3>
                                            <span className="text-xs text-gray-500">{chat.lastMessageAt ? formatTime(chat.lastMessageAt) : ""}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-600 truncate">{getLastMessageText(chat)}</p>
                                            {chat.unreadCount > 0 && <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{chat.unreadCount}</span>}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs ${user.role === "PROVIDER" ? "text-green-600" : "text-blue-600"}`}>{user.role}</span>
                                            <button onClick={(e) => handleDeleteChat(chat._id, e)} className="text-red-500 hover:text-red-700 p-1" title="Delete chat">
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Right Side - Chat Window */}
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-[#F3F4F6] p-4 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="relative">
                                        {getUserFromChat(selectedChat)?.profilePicture ? (
                                            <Image src={getUserFromChat(selectedChat)?.profilePicture} alt={getUserFromChat(selectedChat)?.fullName} height={40} width={40} className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">{(getUserFromChat(selectedChat)?.fullName || getUserFromChat(selectedChat)?.email)?.charAt(0).toUpperCase()}</span>
                                            </div>
                                        )}
                                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${selectedChat.status ? "bg-green-500" : "bg-red-500"}`} />
                                    </div>
                                    <div className="ml-3">
                                        <h2 className="text-lg font-semibold text-gray-900">{getUserFromChat(selectedChat)?.fullName || getUserFromChat(selectedChat)?.email}</h2>
                                        <p className="text-sm text-gray-500">
                                            {getUserFromChat(selectedChat)?.role} • {selectedChat.status ? "Online" : "Offline"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto bg-white p-4">
                            {messagesLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-gray-500">Loading messages...</div>
                                </div>
                            ) : messagesData?.data?.messages?.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-gray-500">No messages yet. Start a conversation!</div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messagesData?.data?.messages?.map((message: any) => {
                                        const isMe = message.sender._id !== getUserFromChat(selectedChat)?._id;
                                        return (
                                            <div key={message._id} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                                                {/* Receiver Avatar (Left side) */}
                                                {!isMe && (
                                                    <div className="shrink-0">
                                                        {getUserFromChat(selectedChat)?.profilePicture ? (
                                                            <Image src={getUserFromChat(selectedChat)?.profilePicture} alt={getUserFromChat(selectedChat)?.fullName} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <span className="text-blue-600 text-xs font-semibold">{getUserFromChat(selectedChat)?.fullName?.charAt(0).toUpperCase()}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Message Bubble */}
                                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isMe ? "bg-[#FF5A36] text-white rounded-br-none" : "bg-[#F3F4F6] text-gray-900 rounded-bl-none"}`}>
                                                    <p className="text-sm">{message.text}</p>
                                                    {message.files && message.files.length > 0 && (
                                                        <div className="mt-2 space-y-2">
                                                            {message.files.map((file: string, index: number) => (
                                                                <div key={index} className="text-xs break-all">
                                                                    {file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg") || file.endsWith(".gif") ? (
                                                                        <Image src={file} alt="Attachment" width={200} height={150} className="rounded-lg" />
                                                                    ) : (
                                                                        <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                                            📎 Attachment
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <p className={`text-xs mt-1 ${isMe ? "text-blue-100" : "text-gray-500"}`}>{formatTime(message.createdAt)}</p>
                                                </div>

                                                {/* Sender Avatar (Right side) */}
                                                {isMe && (
                                                    <div className="shrink-0">
                                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                                            <span className="text-orange-600 text-xs font-semibold">A</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        {/* Selected Files Preview */}
                        {selectedFiles.length > 0 && (
                            <div className="px-4 py-2 bg-gray-50 border-t">
                                <div className="flex flex-wrap gap-2">
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border">
                                            <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                                            <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Message Input */}
                        <div className="bg-transparent pt-4 px-4">
                            <div className="flex items-center space-x-2">
                                <div className="flex-1 relative">
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message..."
                                        className="w-full bg-white rounded-lg px-3 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-[#ADAEBC] text-gray-900 border border-gray-300"
                                        rows={1}
                                        disabled={isSending}
                                    />
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple className="hidden" />
                                        <button onClick={() => fileInputRef.current?.click()} className="text-[#6B7280] hover:text-gray-600" disabled={isSending}>
                                            <Paperclip className="h-5 w-5" />
                                        </button>
                                        <button onClick={handleSendMessage} disabled={(!newMessage.trim() && selectedFiles.length === 0) || isSending} className="text-[#FF5A36] p-1 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
                                            {isSending ? <div className="h-5 w-5 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin"></div> : <Send className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-white">
                        <div className="text-center text-gray-500">
                            <div className="mb-4">💬</div>
                            <p>Select a chat to start messaging</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessengerPage;
