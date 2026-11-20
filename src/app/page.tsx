import { BackgroundArt } from "@/components/home/background-art";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Categories } from "@/components/home/categories";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      {/* Striped space stage: hero card, planet and stats */}
      <div className="relative overflow-hidden">
        <BackgroundArt />
        <Hero />
        <Stats />
        {/* Blend the stage into the page background at the bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-44 bg-gradient-to-b from-transparent to-background"
          aria-hidden
        />
      </div>
      <Categories />
    </div>
  );
}
