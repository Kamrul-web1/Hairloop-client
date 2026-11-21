
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Dashbordsidbar } from "../comonents1/Dashboard";
import type { ReactNode } from "react";

const DashborLauout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <Dashbordsidbar />

      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashborLauout;
