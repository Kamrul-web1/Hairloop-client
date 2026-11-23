 "use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "@/lib/auth-client";

import type { LucideIcon } from "lucide-react";
import {
  BookmarkIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  PlusCircle,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";

type DashboardRole = "seeker" | "recruiter" | "admin";

type SidebarMenuItemData = {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
};

const menuItemsByRole: Record<DashboardRole, SidebarMenuItemData[]> = {
  seeker: [
    { id: "seeker-dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutGridIcon },
    { id: "seeker-jobs", name: "Jobs", url: "/dashboard/seeker/jobs", icon: BriefcaseBusinessIcon },
    { id: "seeker-saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: BookmarkIcon },
    { id: "seeker-applications", name: "Applications", url: "/dashboard/seeker/applications", icon: FileTextIcon },
    { id: "seeker-billing", name: "Billing", url: "/dashboard/seeker/billing", icon: WalletIcon },
    { id: "seeker-add-jobs", name: "Add jobs", url: "/dashboard/recruiter/jobs/new", icon: WalletIcon },
    { id: "seeker-settings", name: "Settings", url: "/dashboard/seeker/settings", icon: SettingsIcon },
  ],
recruiter: [
  { id: "recruiter-dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutGridIcon },

  { id: "recruiter-manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseBusinessIcon },

  { id: "add-jobs", name: "Add Jobs", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },

  { id: "recruiter-applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileTextIcon },

  { id: "recruiter-settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: SettingsIcon },
],
  admin: [
    { id: "admin-dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutGridIcon },
    { id: "admin-users", name: "Users", url: "/dashboard/admin/users", icon: UsersIcon },
    { id: "admin-companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2Icon },
    { id: "admin-jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusinessIcon },
    { id: "admin-payments", name: "Payments", url: "/dashboard/admin/payments", icon: WalletIcon },
    { id: "admin-settings", name: "Settings", url: "/dashboard/admin/settings", icon: SettingsIcon },
  ],
};

/** Figma identity-card fallbacks (used when the session has no display name). */
const identityByRole: Record<DashboardRole, { name: string; role: string }> = {
  seeker: { name: "Seeker Portal", role: "Professional Tier" },
  recruiter: { name: "Alex Sterling", role: "Recruiter" },
  admin: { name: "Alex Sterling", role: "Admin" },
};

/** Footer CTA per role (Figma "CTA" frame). */
const ctaByRole: Record<DashboardRole, { label: string; url: string }> = {
  seeker: { label: "Post Resume", url: "/dashboard/seeker/settings" },
  recruiter: { label: "Post a Job", url: "/dashboard/recruiter/jobs/new" },
  admin: { label: "Create Job", url: "/dashboard/admin/jobs" },
};

export function Dashbordsidbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const rawRole = session?.user?.role as string | undefined;
  const role: DashboardRole =
    rawRole === "recruiter" || rawRole === "admin" ? rawRole : "seeker";

  const identity = identityByRole[role];
  const displayName = session?.user?.name || identity.name;
  const cta = ctaByRole[role];

  /** Exact match, or a child route of the item (but never a child of the role root). */
  const isActive = (url: string) =>
    pathname === url ||
    (url !== `/dashboard/${role}` && pathname.startsWith(`${url}/`));

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Sidebar>
      {/* ── Brand + Identity ─────────────────────────────── */}
      <SidebarHeader className="gap-5 px-3 pb-0 pt-5">
        <div className="px-2.5">
          <Image
            src="/hireloop-logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            loading="eager"
            className="h-8 w-auto"
          />
        </div>

        <div className="flex items-center gap-3 rounded-[10px] border border-white/[0.06] bg-[#141416] p-2.5">
          <Image
            src="/sidebar-avatar.png"
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0 rounded-full border border-white/[0.09] object-cover"
          />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm font-medium leading-5 text-[#f4f4f5]">
              {displayName}
            </span>
            <span className="truncate text-xs leading-4 text-[#a1a4aa]">
              {identity.role}
            </span>
            <span className="inline-flex w-fit items-center rounded-full border border-[#5c53fe]/[32%] bg-[#5c53fe]/[14%] px-2 py-0.5 text-xs font-medium leading-4 text-[#8f88ff]">
              Premium account
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* ── Navigation ───────────────────────────────────── */}
      <SidebarContent className="px-3 pt-5">
        <SidebarMenu className="gap-0.5">
          {menuItemsByRole[role].map((item) => {
            const active = isActive(item.url);
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={active}
                  render={<Link href={item.url} />}
                  className={
                    active ? "bg-[#232327]! text-[#f4f4f5]! font-medium!" : undefined
                  }
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
                {active && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-[1px] bg-[#5c53fe]"
                  />
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* ── Footer: CTA + user card + logout ─────────────── */}
      <SidebarFooter className="gap-3 px-3 pb-4 pt-5">
        <Link
          href={cta.url}
          className="flex h-10 items-center justify-center rounded-[10px] bg-[#fafafa] px-2.5 text-sm font-medium text-[#0b0b0c] transition-colors hover:bg-white"
        >
          {cta.label}
        </Link>

        <div className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.06] bg-[#141416] p-2.5">
          <Image
            src="/sidebar-avatar.png"
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0 rounded-full border border-white/[0.09] object-cover"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium leading-[18px] text-[#f4f4f5]">
              {displayName}
            </span>
            <span className="truncate text-xs leading-4 text-[#7c7f87]">
              Premium Account
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex h-[34px] w-full items-center gap-2.5 rounded-md px-2.5 text-left text-sm text-[#a1a4aa] transition-colors hover:bg-[#1b1b1e]"
        >
          <LogOutIcon className="size-[18px] shrink-0" />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
