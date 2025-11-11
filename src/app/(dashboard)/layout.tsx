import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DynamicHeader } from "@/utils/dynamic-header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex w-full h-screen">
                <AppSidebar />
                <div className="flex-1 flex flex-col min-h-0">
                    {/* <div className="shrink-0 flex items-center gap-2 p-[22px] bg-[#ffffff] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] border-b">
                        <SidebarTrigger className="block md:hidden" />
                        <h1 className="text-[24px] text-[#374151]">Overview</h1>
                    </div> */}
                    <DynamicHeader />
                    <div className="flex-1 bg-[#F9FAFB] p-4 overflow-auto">{children}</div>
                </div>
            </div>
        </SidebarProvider>
    );
}
