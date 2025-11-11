"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { sidebarItems } from "./menuItems";

function getPageTitle(pathname: string): string {
    const item = sidebarItems.find((item) => item.url === pathname);
    return item ? item.title : "Overview";
}

export function DynamicHeader() {
    const pathname = usePathname();
    const pageTitle = getPageTitle(pathname);

    return (
        <div className="shrink-0 flex items-center gap-2 p-[22px] bg-[#ffffff] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] border-b">
            <SidebarTrigger className="block md:hidden" />
            <h1 className="text-[24px] text-[#374151]">{pageTitle}</h1>
        </div>
    );
}
