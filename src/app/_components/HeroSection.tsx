import Image from "next/image";
import { FilterPanel } from "./FilterPanel";

export function HeroSection() {
  return (
    <section className="relative mt-4">
      <div className="page-wrap relative pb-[clamp(24px,6vw,120px)] max-tablet:pb-0">
        <div className="relative h-[clamp(180px,16vw,268px)] rounded-[16px] overflow-hidden">
          <Image
            src="/figma/images/home-hero.png"
            alt=""
            fill
            sizes="(max-width: 1440px) 100vw, 1760px"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--hero-overlay)" }}
          />
          <h1 className="absolute top-[clamp(20px,2.5vw,40px)] left-1/2 -translate-x-1/2 w-[clamp(240px,40vw,560px)] min-h-[clamp(48px,6vw,72px)] flex items-center justify-center text-[32px] font-extrabold leading-[1.125] text-white text-center m-0 px-2">
            Buying & Shipping American Automobiles
          </h1>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[clamp(84px,9vw,132px)] w-[clamp(280px,45vw,564px)] max-tablet:static max-tablet:translate-x-0 max-tablet:mt-4 max-tablet:w-full">
          <FilterPanel />
        </div>
      </div>
    </section>
  );
}
