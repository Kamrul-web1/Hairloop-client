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



export function Categories() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.25em] text-primary uppercase">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          Smart job discovery
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
        </p>
        <h2 className="max-w-2xl text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
          The roles you&apos;d never find by searching
        </h2>
      </div>

      <ul className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
     
      </ul>
    </section>
  );
}
