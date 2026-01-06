"use client";
import { Home, Users, MessageSquare, CreditCard, Settings, UserCog, FolderOpen, Handshake } from "lucide-react";

export interface MenuItem {
    title: string;
    url: string;
    icon: React.ComponentType<any>;
}

export const menuItems: Record<string, MenuItem[]> = {
    SUPER_ADMIN: [
        { title: "Overview", url: "/", icon: Home },
        { title: "User Management", url: "/user-management", icon: Users },
        { title: "Messenger", url: "/messenger", icon: MessageSquare },
        { title: "Transaction", url: "/transaction", icon: CreditCard },
        { title: "Settings", url: "/settings", icon: Settings },
        { title: "Staff", url: "/staff", icon: UserCog },
        { title: "Service Category", url: "/service-category", icon: FolderOpen },
        // { title: "Audit logs", url: "/audit-logs", icon: ClipboardList },
        { title: "Terms and conditions", url: "/terms-and-conditions", icon: Handshake },
    ],
    ADMIN: [
        { title: "User Management", url: "/user-management", icon: Users },
        { title: "Messenger", url: "/messenger", icon: MessageSquare },
    ],
};
