import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Categories } from "@/components/home/categories";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <Hero />
      <Stats />
      <Categories />
    </div>
  );
}
