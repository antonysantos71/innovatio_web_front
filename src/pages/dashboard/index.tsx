import { AppSidebar } from "@/components/app-sidebar";
import { ProtectedLayout } from "@/components/protected-layout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <ProtectedLayout>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger className="text-zinc-100" />
          <div>
            <h1 className="text-xl text-slate-100">hellou, antony</h1>
          </div>
        </main>
      </SidebarProvider>
    </ProtectedLayout>
  );
}
