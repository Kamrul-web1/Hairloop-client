import { Toaster } from "@/components/ui/toast"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Dashbordsidbar } from "../comonents1/Dashboard";
import type { ReactNode } from "react";

const DashborLauout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <Dashbordsidbar />

      {/* min-w-0 keeps wide content (e.g. the jobs table) from stretching the
          page — it scrolls inside its own container instead. */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center p-2.5">
          <SidebarTrigger />
        </div>
        {children}
        
      </main>
              <Toaster />
    </SidebarProvider>
  );
};

export default DashborLauout;
