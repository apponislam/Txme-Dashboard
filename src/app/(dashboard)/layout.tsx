import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DynamicHeader } from "@/utils/dynamic-header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex w-full h-screen">
                <AppSidebar />
                <div className="flex-1 flex flex-col min-h-0">
                    <DynamicHeader />
                    <div className="flex-1 bg-[#F9FAFB] p-4 overflow-auto">{children}</div>
                </div>
            </div>
        </SidebarProvider>
    );
}
