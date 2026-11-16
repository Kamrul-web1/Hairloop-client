import { BriefcaseBusinessIcon, StarIcon, TrophyIcon, UsersIcon } from "lucide-react";

const stats = [
  { icon: BriefcaseBusinessIcon, value: "50K", label: "Active Jobs" },
  { icon: TrophyIcon, value: "12K", label: "Companies" },
  { icon: UsersIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
] as const;

export function Stats() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6">
      <div className="flex flex-col items-center gap-12">
        <h2 className="max-w-xl text-center text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
          Assisting over 15,000 job seekers find their dream positions.
        </h2>

        <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex min-h-44 flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-gradient-to-b from-[#333338] to-[#0c0c0e] p-6"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                <stat.icon className="size-5 text-white" />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-semibold tracking-tight text-white lg:text-[44px]">
                  {stat.value}
                </p>
                <p className="text-base text-white/70">{stat.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
