import type { VehicleCardData } from "../VehicleCard";
import { VehicleSlider } from "../VehicleSlider";

type HomeNewArrivalsSectionProps = {
  cards: VehicleCardData[];
};

export function HomeNewArrivalsSection({ cards }: HomeNewArrivalsSectionProps) {
  return (
    <VehicleSlider title="New Arrivals" viewAllHref="/search" cards={cards} />
  );
}
