import Link from "next/link";
import {
  BanknoteIcon,
  BoxesIcon,
  CodeIcon,
  DatabaseIcon,
  HeadphonesIcon,
  MegaphoneIcon,
  PaletteIcon,
  UsersIcon,
} from "lucide-react";

const categories = [
  { icon: CodeIcon, label: "Engineering", openings: "12,400+", query: "Engineering" },
  { icon: PaletteIcon, label: "Design", openings: "3,800+", query: "Design" },
  { icon: MegaphoneIcon, label: "Marketing", openings: "5,200+", query: "Marketing" },
  { icon: DatabaseIcon, label: "Data Science", openings: "4,100+", query: "Data Science" },
  { icon: BoxesIcon, label: "Product", openings: "2,900+", query: "Product" },
  { icon: HeadphonesIcon, label: "Customer Support", openings: "6,700+", query: "Customer Support" },
  { icon: BanknoteIcon, label: "Finance", openings: "3,300+", query: "Finance" },
  { icon: UsersIcon, label: "Human Resources", openings: "2,600+", query: "Human Resources" },
] as const;

export function Categories() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.25em] text-primary uppercase">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          Browse jobs by category
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
        </p>
        <h2 className="max-w-2xl text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
          The roles you&apos;d never find by searching
        </h2>
      </div>

      <ul className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.label}>
            <Link
              href={`/jobs?q=${encodeURIComponent(category.query)}`}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-[#151517] to-[#0b0b0d] p-6 transition-colors hover:border-primary/40 hover:bg-[#17171b]"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 transition-colors group-hover:border-primary/40">
                <category.icon className="size-5 text-primary" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-white">
                  {category.label}
                </span>
                <span className="text-sm text-white/60">
                  {category.openings} open roles
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
