import Link from "next/link";
import { VehicleCard, type VehicleCardData } from "./VehicleCard";

type VehicleSliderProps = {
  title: string;
  viewAllHref: string;
  cards: VehicleCardData[];
};

export function VehicleSlider({
  title,
  viewAllHref,
  cards,
}: VehicleSliderProps) {
  return (
    <section className="flex flex-col gap-4 w-full max-w-[1760px] mx-auto px-20 max-wide:px-[60px] max-tablet:px-4">
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-2xl font-bold leading-7 m-0 text-black">{title}</h2>
        <Link
          className="text-base font-bold text-foreground no-underline bg-white py-2.5 px-4 rounded-[16px] inline-flex items-center justify-center hover:bg-surface transition-colors"
          href={viewAllHref}
        >
          View all
        </Link>
      </div>
      <div className="flex items-center gap-4 overflow-x-auto pb-1 scroll-snap-type-x-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card, index) => (
          <VehicleCard key={`${card.title}-${index}`} card={card} />
        ))}
      </div>
    </section>
  );
}
