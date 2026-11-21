"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const fieldClassName =
  "h-11 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 pl-10 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-primary/60 focus:ring-2 focus:ring-primary/30";

export default function SignInPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setErrorMessage(null);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message || "Unable to sign in. Please try again.");
      return;
    }

    router.push("/");
  }

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
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-white/55">
            Sign in to pick up your job search where you left off.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-white/80"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="inline-flex items-center gap-1.5 text-xs text-white/45 transition-colors hover:text-white/80"
                >
                  {showPassword ? "Hide" : "Show"}
                  {showPassword ? (
                    <EyeOffIcon className="size-3.5" aria-hidden />
                  ) : (
                    <EyeIcon className="size-3.5" aria-hidden />
                  )}
                </button>
              </div>
              <div className="relative">
                <LockIcon
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                  aria-hidden
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className={fieldClassName}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Sign In
              <ArrowRightIcon className="size-4" aria-hidden />
            </button>
          </form>

          {errorMessage ? (
            <p
              role="status"
              className="mt-4 text-center text-xs text-white/45"
            >
              {errorMessage}
            </p>
          ) : null}

          <p className="mt-6 text-center text-sm text-white/55">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Create one
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
