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

/** Fades the lower half of the planet into the page background. */
const planetFadeStyle: React.CSSProperties = {
  background:
    "linear-gradient(to bottom, rgba(8,8,10,0) 46%, rgba(8,8,10,0.5) 58%, rgba(8,8,10,0.9) 74%, #08080a 92%)",
};

const cardGlowStyle: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(124,116,255,0.45) 0%, rgba(92,83,254,0.16) 45%, rgba(255,255,255,0.06) 100%)",
};

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
    <section className="relative z-0">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Glowing hero card */}
        <div className="relative z-10 mx-auto w-full max-w-4xl pt-20 sm:pt-24 lg:pt-28">
          <div
            className="rounded-[2rem] p-px shadow-[0_40px_120px_-45px_rgba(92,83,254,0.95)]"
            style={cardGlowStyle}
          >
            <div className="rounded-[2rem]  px-5 py-9  sm:px-10 sm:py-11">
              {/* Announcement pill */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pr-4 pl-1.5">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.55)]">
                    <SparklesIcon className="size-3.5 text-[#1a0f06]" />
                  </span>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase">
                    50,000+ new jobs this month
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="mt-7 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[58px] lg:leading-[1.1]">
                Find Your Dream Job Today
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
                HireLoop connects top talent with world-class companies. Browse
                thousands of curated opportunities and land your next role —
                faster.
              </p>

              {/* Search bar */}
              <form
                onSubmit={handleSearch}
                className="mt-8 flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-black/70 p-2 shadow-2xl shadow-black/60 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-3 sm:pr-2 sm:pl-4"
              >
                <label className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 sm:px-0 sm:py-0">
                  <SearchIcon className="size-5 shrink-0 text-white/45" />
                  <span className="sr-only">Job title, skill or company</span>
                  <input
                    type="text"
                    name="keyword"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="Job title, skill or company"
                    className="h-8 w-full min-w-0 bg-transparent text-white placeholder:text-white/45 focus:outline-none"
                  />
                </label>

                <div
                  className="hidden h-6 w-px shrink-0 bg-white/15 sm:block"
                  aria-hidden
                />

                <label className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 sm:px-0 sm:py-0">
                  <MapPinIcon className="size-5 shrink-0 text-white/45" />
                  <span className="sr-only">Location or remote</span>
                  <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Location or remote"
                    className="h-8 w-full min-w-0 bg-transparent text-white placeholder:text-white/45 focus:outline-none"
                  />
                </label>

                <button
                  type="submit"
                  aria-label="Search jobs"
                  className="inline-flex size-11 shrink-0 items-center justify-center self-end rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/85 sm:self-auto"
                >
                  <SearchIcon className="size-5" />
                </button>
              </form>

              {/* Trending roles */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                <p className="mr-1 text-xs text-white/55 sm:text-sm">
                  Trending:
                </p>
                {trendingRoles.map((role) => (
                  <Link
                    key={role.label}
                    href={`/jobs?q=${encodeURIComponent(role.query)}`}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-primary/40 hover:bg-white/[0.09] sm:text-sm"
                  >
                    {role.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Planet rising behind the card */}
        <div className="relative z-0 h-[300px] sm:h-[340px] lg:h-[380px]">
          <div className="absolute top-0 left-1/2 aspect-[1440/1882] w-[150%] max-w-[1700px] -translate-x-1/2 -translate-y-[25%] sm:w-[130%] lg:w-[114%]">
            {/* Clip the source art above the planet (empty keyed-out area) */}
            <div className="absolute inset-x-0 top-[34.5%] bottom-0 overflow-hidden">
              <Image
                src="/hero-globe.png"
                alt=""
                fill
                priority
                sizes="150vw"
                className="object-cover object-bottom"
              />
            </div>
            <div
              className="absolute inset-x-0 top-[46%] bottom-0"
              style={planetFadeStyle}
              aria-hidden
            />
          </div>
        </div>

        {/* Statement over the planet */}
        <div className="relative z-10 pb-16 sm:pb-20">
          <p className="mx-auto max-w-[700px] text-center text-2xl leading-snug font-semibold text-white sm:text-3xl lg:text-[42px] lg:leading-[1.25]">
            Assisting over 15,000 job seekers find their dream positions.
          </p>
        </div>
      </div>
    </section>
  );
}
