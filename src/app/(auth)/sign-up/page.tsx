"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  SearchIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { UserRole } from "@/lib/user-role";

const fieldClassName =
  "h-11 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 pl-10 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-primary/60 focus:ring-2 focus:ring-primary/30";

const roleOptions: { value: UserRole; label: string; icon: React.ElementType }[] = [
  { value: "seeker", label: "Seeker", icon: SearchIcon },
  { value: "recruiter", label: "Recruiter", icon: BriefcaseIcon },
  { value: "admin", label: "Admin", icon: ShieldIcon },
];

export default function SignUpPage() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [role, setRole] = React.useState<UserRole>("seeker");


const hendelSingup = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const selectedRole = formData.get("role");

  if (
    selectedRole !== "seeker" &&
    selectedRole !== "recruiter" &&
    selectedRole !== "admin"
  ) {
    alert("Please select an account type.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password does not match!");
    return;
  }

  const { data: signUpResponse, error } =
    await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
      role: selectedRole,
    });

  if (error) {
    console.log("Signup error:", error);
    alert(error.message);
    return;
  }

  console.log("Signup successful:", signUpResponse);
};


  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-14 sm:py-20">
      {/* Violet glow behind the card */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(60% 100% at 50% 0%, rgba(92,83,254,0.22) 0%, rgba(8,8,10,0) 72%)",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[#101014]/95 p-6 shadow-[0_30px_80px_-40px_rgba(92,83,254,0.75)] backdrop-blur-xl sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-white/55">
            Join HireLoop and start landing your dream role.
          </p>

          <form onSubmit={hendelSingup} className="mt-7 flex flex-col gap-4">
            {/* Account type (role) */}
            <div
              className="flex flex-col gap-1.5"
              role="radiogroup"
              aria-label="Account type"
            >
              <span className="text-sm font-medium text-white/80">
                I am signing up as
              </span>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/50 ${
                      role === value
                        ? "border-primary/60 bg-primary/15 text-white ring-2 ring-primary/30"
                        : "border-white/10 bg-black/40 text-white/55 hover:border-white/25 hover:text-white/80"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={() => setRole(value)}
                      className="sr-only"
                    />
                    <Icon
                      className={`size-4 ${role === value ? "text-primary" : ""}`}
                      aria-hidden
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-white/80"
              >
                Full name
              </label>
              <div className="relative">
                <UserIcon
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                  aria-hidden
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Jane Doe"
                  className={fieldClassName}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/80"
              >
                Email address
              </label>
              <div className="relative">
                <MailIcon
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                  aria-hidden
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className={fieldClassName}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white/80"
              >
                Password
              </label>
              <div className="relative">
                <LockIcon
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                  aria-hidden
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  className={`${fieldClassName} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-3 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-white/40 transition-colors hover:text-white/80"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" aria-hidden />
                  ) : (
                    <EyeIcon className="size-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-white/80"
              >
                Confirm password
              </label>
              <div className="relative">
                <LockIcon
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                  aria-hidden
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="Repeat your password"
                  className={fieldClassName}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Create Account
              <ArrowRightIcon className="size-4" aria-hidden />
            </button>
          </form>

        

          <p className="mt-6 text-center text-sm text-white/55">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-white/40">
          <Link href="/" className="transition-colors hover:text-white/70">
            ← Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}
