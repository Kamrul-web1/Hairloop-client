import * as React from "react";
import {
  BriefcaseBusinessIcon,
  StarIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";

const stats = [
  { icon: BriefcaseBusinessIcon, value: "50K", label: "Active Jobs" },
  { icon: TrophyIcon, value: "12K", label: "Companies" },
  { icon: UsersIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
] as const;

const cardStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, rgba(33,33,39,0.94) 0%, rgba(14,14,17,0.96) 55%, rgba(9,9,12,0.97) 100%)",
};

export function Stats() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
      <ul className="grid w-full grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {stats.map((stat) => (
          <li
            key={stat.label}
            className="flex min-h-[164px] flex-col justify-between gap-8 rounded-2xl border border-white/10 p-5  sm:min-h-[196px] sm:p-6 lg:min-h-[248px] lg:p-7"
            style={cardStyle}
          >
            <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
              <stat.icon className="size-5 text-white" />
            </span>
            <div className="flex flex-col gap-2">
              <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-none">
                {stat.value}
              </p>
              <p className="text-sm text-white/55 sm:text-base">
                {stat.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
