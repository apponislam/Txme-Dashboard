"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Paperclip, Send, Trash2 } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useDeleteAdminChatMutation, useGetAdminChatsQuery } from "@/redux/features/adminchats/adminChatsApi";
import { useGetMessagesQuery, useSendMessageMutation } from "@/redux/features/message/messageApi";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import Swal from "sweetalert2";
import io, { Socket } from "socket.io-client";

const MessengerPage = () => {
    // State
    const currentUser = useAppSelector(selectCurrentUser);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // Refs
    const socketRef = useRef<Socket | null>(null);
    const initializedRef = useRef(false);

    // Base URL for images
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "";

    // Allowed file types
    const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    // RTK Query Hooks
    const {
        data: chatsData,
        isLoading: chatsLoading,
        isError: chatsError,
        refetch: refetchChats,
    } = useGetAdminChatsQuery({
        searchTerm,
        page: 1,
        limit: 10,
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
        { skip: !selectedChat?._id },
    );

    const [sendMessageApi, { isLoading: isSending }] = useSendMessageMutation();
    const [deleteChat] = useDeleteAdminChatMutation();

    // Auto-select first chat
    useEffect(() => {
        if (chatsData?.data && chatsData.data.length > 0 && !initializedRef.current) {
            const timer = setTimeout(() => {
                setSelectedChat(chatsData.data[0]);
                initializedRef.current = true;
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [chatsData]);

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
    const getLastMessageText = useCallback((chat: any) => {
        if (!chat.lastMessage) return "No messages yet";
        return chat.lastMessage.text || "Attachment";
    }, []);

    // Get user from chat
    const getUserFromChat = useCallback((chat: any) => {
        if (!chat.participants || chat.participants.length === 0) return null;
        return chat.participants[0];
    }, []);

    // Check if message is sent by current user
    const isMessageFromCurrentUser = useCallback(
        (message: any) => {
            if (!message.sender) {
                return currentUser?.role === "SUPER_ADMIN";
            }
            return message.sender._id === currentUser?.id;
        },
        [currentUser],
    );

    // Get complete image URL
    const getImageUrl = useCallback(
        (url: string) => {
            if (!url) return "";
            if (url.startsWith("http")) return url;
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            return `${baseUrl}/${url}`;
        },
        [baseUrl],
    );

    // Socket.io connection
    useEffect(() => {
        const socket = io(baseUrl, {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current = socket;

        // Connection events
        socket.on("connect", () => {
            console.log("Socket.io connected:", socket.id);
            // Your server might not need auth token
        });

        socket.on("adminChatListUpdate", () => {
            console.log("Admin chat list update received");
            refetchChats();
        });

        socket.onAny((eventName, data) => {
            console.log(`🔔 Socket event received: ${eventName}`, data);

            // Check if event starts with getMessage::
            if (eventName && eventName.startsWith("getMessage::")) {
                console.log("📨 This is a message event in getMessage:: format");

                // Extract chat ID from event name
                const chatId = eventName.split("::")[1];
                console.log(`📱 Message is for chat ID: ${chatId}`);

                // If this message is for the currently selected chat
                if (chatId === selectedChat?._id) {
                    console.log("✅ Message is for current chat, refreshing messages...");
                    refetchMessages();
                } else {
                    console.log("ℹ️ Message is for different chat");
                }

                // Always update chat list when any message arrives
                console.log("🔄 Refreshing chat list...");
                refetchChats();
            }
        });

        // Handle disconnection
        socket.on("disconnect", (reason) => {
            console.log("Socket.io disconnected:", reason);
        });

        // Handle connection errors
        socket.on("connect_error", (error) => {
            console.error("Socket.io connection error:", error);
        });

        // Cleanup on unmount
        return () => {
            if (socket.connected) {
                socket.disconnect();
            }
        };
    }, [baseUrl, refetchChats, refetchMessages, selectedChat?._id]);

    // Handle file selection with validation
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            const validFiles = filesArray.filter((file) => ALLOWED_FILE_TYPES.includes(file.type));
            const invalidFiles = filesArray.filter((file) => !ALLOWED_FILE_TYPES.includes(file.type));

            if (invalidFiles.length > 0) {
                toast.error("Some files are not allowed. Only images, PDF, and Word documents.");
            }

            if (validFiles.length > 0) {
                setSelectedFiles((prev) => [...prev, ...validFiles]);
            }
        }
    };

    // Validate files before sending
    const validateFiles = (files: File[]): { isValid: boolean; error?: string } => {
        for (const file of files) {
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                return {
                    isValid: false,
                    error: `File "${file.name}" has an invalid type. Allowed types: Images, PDF, Word documents.`,
                };
            }
        }
        return { isValid: true };
    };

    // Handle send message
    const handleSendMessage = async () => {
        if ((!newMessage.trim() && selectedFiles.length === 0) || !selectedChat) return;

        // Validate files
        if (selectedFiles.length > 0) {
            const validation = validateFiles(selectedFiles);
            if (!validation.isValid) {
                toast.error(validation.error);
                return;
            }
        }

        try {
            let messageType = "TEXT";
            if (selectedFiles.length > 0 && newMessage.trim()) {
                messageType = "BOTH";
            } else if (selectedFiles.length > 0) {
                messageType = selectedFiles.some((file) => file.type.startsWith("image/")) ? "IMAGE" : "FILE";
            }

            // Send the message via API
            await sendMessageApi({
                chatId: selectedChat._id,
                text: newMessage.trim(),
                type: messageType,
                messageFiles: selectedFiles.length > 0 ? selectedFiles : undefined,
            }).unwrap();

            // Clear input
            setNewMessage("");
            setSelectedFiles([]);
            if (fileInputRef.current) fileInputRef.current.value = "";

            refetchMessages();
            setTimeout(() => refetchChats(), 100);
        } catch (error: any) {
            console.error("Failed to send message:", error);
            if (error?.data?.errorMessages?.[0]?.message) {
                toast.error(error.data.errorMessages[0].message);
            }
        }
    };

    // Handle delete chat
    const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const result = await Swal.fire({
            title: "Delete Chat?",
            text: "Are you sure you want to delete this chat?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF5A36",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                await deleteChat(chatId).unwrap();
                if (selectedChat?._id === chatId) {
                    setSelectedChat(null);
                }
                refetchChats();
                Swal.fire("Deleted!", "Chat has been deleted.", "success");
            } catch (error) {
                console.error("Failed to delete chat:", error);
                Swal.fire("Error!", "Failed to delete chat.", "error");
            }
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
            <div className="w-1/5 bg-transparent flex flex-col pr-4">
                <div className="relative p-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* Chats List */}
                <div className="flex-1 overflow-y-auto">
                    {chats.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">No chats found</div>
                    ) : (
                        chats.map((chat: any) => {
                            const user = getUserFromChat(chat);
                            if (!user) return null;

                            return (
                                <div key={chat._id} className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedChat?._id === chat._id ? "bg-blue-50" : ""}`} onClick={() => setSelectedChat(chat)}>
                                    <div className="relative">
                                        {user.profilePicture ? (
                                            <Image
                                                src={getImageUrl(user.profilePicture)}
                                                alt={user.fullName || user.email}
                                                height={48}
                                                width={48}
                                                className="w-12 h-12 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : null}
                                        <div className={`w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center ${user.profilePicture ? "hidden" : ""}`}>
                                            <span className="text-blue-600 font-semibold">{(user.fullName || user.email).charAt(0).toUpperCase()}</span>
                                        </div>
                                        {chat.unreadCount > 0 && <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{chat.unreadCount}</div>}
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
                                        <span className={`text-xs ${user.role === "PROVIDER" ? "text-green-600" : "text-blue-600"}`}>{user.role}</span>
                                    </div>
                                    <button onClick={(e) => handleDeleteChat(chat._id, e)} className="text-red-500 hover:text-red-700 p-2 ml-2" title="Delete chat">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
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
                                            <Image
                                                src={getImageUrl(getUserFromChat(selectedChat)?.profilePicture)}
                                                alt={getUserFromChat(selectedChat)?.fullName}
                                                height={40}
                                                width={40}
                                                className="w-10 h-10 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : null}
                                        <div className={`w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center ${getUserFromChat(selectedChat)?.profilePicture ? "hidden" : ""}`}>
                                            <span className="text-blue-600 font-semibold">{(getUserFromChat(selectedChat)?.fullName || getUserFromChat(selectedChat)?.email)?.charAt(0).toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <h2 className="text-lg font-semibold text-gray-900">{getUserFromChat(selectedChat)?.fullName || getUserFromChat(selectedChat)?.email}</h2>
                                        <p className="text-sm text-gray-500">{getUserFromChat(selectedChat)?.role}</p>
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
                                        const isMe = isMessageFromCurrentUser(message);
                                        const otherUser = getUserFromChat(selectedChat);

                                        return (
                                            <div key={message._id} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                                                {/* Receiver Avatar (Left side) */}
                                                {!isMe && otherUser && (
                                                    <div className="shrink-0">
                                                        {otherUser.profilePicture ? (
                                                            <Image src={getImageUrl(otherUser.profilePicture)} alt={otherUser.fullName} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <span className="text-blue-600 text-xs font-semibold">{otherUser.fullName?.charAt(0).toUpperCase() || otherUser.email?.charAt(0).toUpperCase()}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Message Bubble */}
                                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isMe ? "bg-[#FF5A36] text-white rounded-br-none" : "bg-[#F3F4F6] text-gray-900 rounded-bl-none"}`}>
                                                    <p className="text-sm">{message.text}</p>
                                                    {message.files && message.files.length > 0 && (
                                                        <div className="mt-2">
                                                            {message.files.map((file: string, index: number) => {
                                                                const fileUrl = getImageUrl(file);
                                                                const isImage = fileUrl.match(/\.(jpg|jpeg|png|gif)$/i);
                                                                return (
                                                                    <div key={index} className="text-xs break-all">
                                                                        {isImage ? (
                                                                            <Image src={fileUrl} alt="File" width={200} height={150} className="rounded-lg" />
                                                                        ) : (
                                                                            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                                                📎 Attachment
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
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
                                            <span className="text-sm truncate max-w-37.5">{file.name}</span>
                                            <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Message Input */}
                        <div className="bg-transparent pt-4">
                            <div className="flex items-center space-x-2">
                                <div className="flex-1 relative">
                                    <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." className="w-full bg-white rounded-lg px-3 py-5 pr-12 focus:outline-none focus:ring-0 focus:border-transparent resize-none placeholder:text-[#ADAEBC] text-[#ADAEBC] border border-gray-300" rows={1} disabled={isSending} />
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple className="hidden" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" />
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
