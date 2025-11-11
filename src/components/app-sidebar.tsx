"use client";
import { Home, Users, MessageSquare, CreditCard, Settings, UserCog, FolderOpen, ClipboardList, LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    { title: "Overview", url: "/", icon: Home },
    { title: "User Management", url: "/user-management", icon: Users },
    { title: "Messenger", url: "/messenger", icon: MessageSquare },
    { title: "Transaction", url: "/transaction", icon: CreditCard },
    { title: "Settings", url: "/settings", icon: Settings },
    { title: "Staff", url: "/staff", icon: UserCog },
    { title: "Service Category", url: "/service-category", icon: FolderOpen },
    { title: "Audit logs", url: "/audit-logs", icon: ClipboardList },
    { title: "Terms and conditions", url: "/terms-and-conditions", icon: ClipboardList },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="border-r border-[#E2E8F0] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] h-screen bg-[#FFFFFF]">
            <SidebarContent className="flex flex-col h-full bg-[#FFFFFF]">
                {/* Header */}
                <div className="shrink-0 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-3 p-5">
                        <Image src="/logo.svg" alt="Logo" height={40} width={40} />
                        <p className="font-semibold text-[#1E293B] text-lg">Txme</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-hidden">
                    <SidebarGroup className="h-full">
                        <SidebarGroupContent className="h-full overflow-y-auto">
                            <SidebarMenu className="gap-2">
                                {items.map((item) => {
                                    const isActive = pathname === item.url;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild className="w-full">
                                                <Link href={item.url} className={`custom-sidebar-link flex items-center gap-3 px-5 py-2 w-full text-left h-auto transition-all duration-200 text-[#334155] ${isActive ? "bg-[#e53e3e] text-white" : ""}`}>
                                                    <item.icon className={`h-5 w-5 transition-colors duration-200 ${isActive ? "text-white" : "text-[#64748B]"}`} />
                                                    <span className="font-medium">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>

                {/* Logout at the bottom */}
                <div className="shrink-0 mt-auto">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className="w-full hover:text-[#e53e3e] hover:bg-white active:text-[#e53e3e] active:bg-white">
                                        <Link href="/auth/login" className="flex items-center justify-center gap-3 px-5 py-2 w-full text-[#e53e3e]">
                                            <LogOut className="h-5 w-5 text-[#e53e3e]" />
                                            <span className="font-medium">Logout</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
