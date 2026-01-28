import Link from "next/link";
import styles from "../page.module.css";
import { VehicleCard, type VehicleCardData } from "./VehicleCard";

type VehicleSliderProps = {
  title: string;
  viewAllHref: string;
  cards: VehicleCardData[];
};

export function VehicleSlider({ title, viewAllHref, cards }: VehicleSliderProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeaderTight}>
        <h2>{title}</h2>
        <Link className={styles.viewAllButton} href={viewAllHref}>
          View all
        </Link>
      </div>
      <div className={styles.cardScroller}>
        {cards.map((card, index) => (
          <VehicleCard key={`${card.title}-${index}`} card={card} />
        ))}
      </div>
    </section>
  );
}
