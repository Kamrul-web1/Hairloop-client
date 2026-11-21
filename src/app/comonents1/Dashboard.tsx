
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Plus } from "lucide-react";
const menuItemsByRole = {
  seeker :[

  ],
  recruiter:[

  ],
  admin:[
    
  ]
}

export function Dashbordsidbar() {
  return (
    <Sidebar>
      <SidebarHeader />

      <SidebarContent>
       <SidebarMenu>
  {projects.map((project) => (
    <SidebarMenuItem key={project.name}>
      <SidebarMenuButton render={<a href={project.url} />}>
        <project.icon />
        <span>{project.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
