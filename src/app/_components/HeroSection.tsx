import Image from "next/image";
import { FilterPanel } from "./FilterPanel";

export function HeroSection() {
  return (
    <section className="relative mt-4 pb-[120px] w-full max-w-[1760px] mx-auto px-20 max-wide:px-[60px] max-tablet:px-4 max-tablet:pb-0">
      <div className="relative h-[268px] rounded-[16px] overflow-hidden">
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
        <h1 className="absolute top-10 left-1/2 -translate-x-1/2 w-[330px] h-[72px] flex items-center justify-center text-[32px] font-extrabold leading-[1.125] text-white text-center m-0">
          Buying & Shipping American Automobiles
        </h1>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-[132px] w-[564px] max-tablet:static max-tablet:translate-x-0 max-tablet:mt-4 max-tablet:w-full">
        <FilterPanel />
      </div>
    </section>
  );
}
