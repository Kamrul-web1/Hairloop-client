"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPinIcon, SearchIcon, SparklesIcon } from "lucide-react";

const trendingRoles = [
  { label: "Product Designer", query: "Product Designer" },
  { label: "AI Engineering", query: "AI Engineering" },
  { label: "Dev-ops Engineer", query: "Dev-ops Engineer" },
] as const;

export function Hero() {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState("");
  const [location, setLocation] = React.useState("");

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background art: starfield, indigo horizon and globe */}
      <div className="pointer-events-none absolute inset-0 bg-[#010103]" aria-hidden>
        <Image
          src="/hero-globe.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* Blend the section into the page background at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:pt-32">
        {/* Glowing hero card */}
        <div className="w-full max-w-4xl rounded-[2rem] bg-gradient-to-b from-primary/60 via-primary/20 to-primary/5 p-px shadow-[0_0_90px_-24px] shadow-primary/50">
          <div className="flex flex-col items-center rounded-[2rem] bg-[#050506]/95 px-5 py-10 backdrop-blur-sm sm:px-10 sm:py-12">
            {/* Announcement pill */}
            <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] py-2.5 pr-5 pl-3.5">
              <SparklesIcon className="size-4 shrink-0 text-orange-400" />
              <p className="text-sm font-medium text-white/90">
                50,000+ new jobs this month
              </p>
            </div>

            {/* Headline with gradient underline accent */}
            <h1 className="mt-8 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[52px] lg:leading-[64px]">
              Find Your{" "}
              <span className="relative inline-block">
                Dream Job
                <span
                  className="absolute -bottom-2 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-primary via-sky-400 to-primary/10"
                  aria-hidden
                />
              </span>{" "}
              Today
            </h1>

            <p className="mt-7 max-w-2xl text-center text-lg leading-8 text-white/70">
              HireLoop connects top talent with world-class companies. Browse
              thousands of curated opportunities and land your next role —
              faster.
            </p>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="mt-10 flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-white/10 bg-black/60 p-2 shadow-2xl shadow-black/50 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4 sm:py-2 sm:pr-2 sm:pl-5"
            >
              <label className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 sm:px-0 sm:py-0">
                <SearchIcon className="size-5 shrink-0 text-white/50" />
                <span className="sr-only">Job title, skill or company</span>
                <input
                  type="text"
                  name="keyword"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Job title, skill or company"
                  className="h-8 w-full min-w-0 bg-transparent text-white placeholder:text-white/50 focus:outline-none"
                />
              </label>

              <div className="hidden h-6 w-px shrink-0 bg-white/15 sm:block" aria-hidden />

              <label className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 sm:px-0 sm:py-0">
                <MapPinIcon className="size-5 shrink-0 text-white/50" />
                <span className="sr-only">Location or remote</span>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Location or remote"
                  className="h-8 w-full min-w-0 bg-transparent text-white placeholder:text-white/50 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                aria-label="Search jobs"
                className="inline-flex size-12 shrink-0 items-center justify-center self-end rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/80 sm:self-auto"
              >
                <SearchIcon className="size-5" />
              </button>
            </form>

            {/* Trending roles */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
              <p className="text-sm text-white/70">Trending:</p>
              {trendingRoles.map((role) => (
                <Link
                  key={role.label}
                  href={`/jobs?q=${encodeURIComponent(role.query)}`}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white transition-colors hover:border-primary/40 hover:bg-white/[0.08]"
                >
                  {role.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
