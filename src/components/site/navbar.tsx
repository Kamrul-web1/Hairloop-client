"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
} from "lucide-react";

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/pricing", label: "Pricing" },
] as const;

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={className}
    >
      <Image
        src="/hireloop-logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        priority
        className="h-9 w-auto sm:h-11"
      />
    </Link>
  );
}

function NavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active}
      className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground data-[active=true]:text-foreground"
    >
      {label}
    </Link>
  );
}

function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  const name = user?.name ?? "User";
  const email = user?.email ?? "";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const role = (user as { role?: string } | undefined)?.role;
  const dashboardHref = role ? `/dashboard/${role}` : "/dashboard";

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Open user menu"
      >
        <Avatar>
          {user?.image ? (
            <AvatarImage src={user.image} alt={name} />
          ) : null}
          <AvatarFallback>{initials || "HL"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="px-1.5 py-1">
          <span className="block truncate text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="block truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href={dashboardHref} />}>
          <LayoutDashboardIcon />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href={`${dashboardHref}/settings`} />}>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthActions({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href="/sign-in" />}
        className="h-9 rounded-full px-4 text-foreground/80 hover:bg-white/5 hover:text-foreground"
      >
        Sign In
      </Button>
      <Button
        nativeButton={false}
        render={<Link href="/sign-up" />}
        className="h-9 rounded-full px-5"
      >
        Get Started
      </Button>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10  backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-17 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="h-6 w-px " />
          {session?.user ? (
            <UserMenu />
          ) : (
            <AuthActions className="flex items-center gap-1" />
          )}
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-white/5"
              aria-label="Open menu"
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 gap-0 border-white/10 bg-card p-0"
            >
              <SheetHeader className="border-b border-white/10 p-4">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Logo className="flex" />
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 p-3"
              >
                {navLinks.map((link) => {
                  const active =
                    pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <SheetClose
                      key={link.href}
                      nativeButton={false}
                      render={
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                        />
                      }
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground data-[active=true]: data-[active=true]:text-foreground"
                    >
                      {link.label}
                    </SheetClose>
                  );
                })}
              </nav>
              <SheetFooter className="flex-col items-stretch gap-2 border-t border-white/10 p-4">
                {session?.user ? (
                  <div className="flex items-center gap-3">
                    <UserMenu />
                    <p className="min-w-0 flex-1 truncate text-sm">
                      <span className="block truncate font-medium">
                        {session.user.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {session.user.email}
                      </span>
                    </p>
                  </div>
                ) : (
                  <>
                    <SheetClose
                      nativeButton={false}
                      render={<Link href="/sign-in" />}
                      className="inline-flex h-10 w-full items-center justify-center rounded-full border border-border bg-transparent text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Sign In
                    </SheetClose>
                    <SheetClose
                      nativeButton={false}
                      render={<Link href="/sign-up" />}
                      className="inline-flex h-10 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                    >
                      Get Started
                    </SheetClose>
                  </>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
