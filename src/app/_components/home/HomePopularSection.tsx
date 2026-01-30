import type { VehicleCardData } from "../VehicleCard";
import { VehicleSlider } from "../VehicleSlider";

type HomePopularSectionProps = {
  cards: VehicleCardData[];
};

export function HomePopularSection({ cards }: HomePopularSectionProps) {
  return (
    <VehicleSlider
      title="Popular Section"
      viewAllHref="/search"
      cards={cards}
    />
  );
}
