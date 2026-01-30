import type { VehicleCardData } from "../VehicleCard";
import { VehicleSlider } from "../VehicleSlider";

type HomeUnder10SectionProps = {
  cards: VehicleCardData[];
};

export function HomeUnder10Section({ cards }: HomeUnder10SectionProps) {
  return (
    <VehicleSlider title="Under $10 000" viewAllHref="/search" cards={cards} />
  );
}
