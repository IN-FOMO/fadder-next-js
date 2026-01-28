import Image from "next/image";
import styles from "../page.module.css";

export type VehicleCardData = {
  title: string;
  image: string;
  odometer: string;
  engine: string;
  transmission: string;
  fuel: string;
  drive: string;
  timer: string;
  auction: "IAAI" | "Copart";
  bid: string;
};

type VehicleCardProps = {
  card: VehicleCardData;
  className?: string;
};

export function VehicleCard({ card, className }: VehicleCardProps) {
  return (
    <article className={`${styles.vehicleCard} ${className ?? ""}`}>
      <div className={styles.vehicleImage}>
        <Image
          src={card.image}
          alt=""
          fill
          sizes="288px"
          className={styles.coverImage}
        />
      </div>
      <div className={styles.vehicleBody}>
        <h3>{card.title}</h3>
        <div className={styles.vehicleSpecList}>
          <div className={styles.vehicleSpecRow}>
            <span>Odometer</span>
            <strong>{card.odometer}</strong>
          </div>
          <div className={styles.vehicleSpecRow}>
            <span>Engine</span>
            <strong>{card.engine}</strong>
          </div>
          <div className={styles.vehicleSpecRow}>
            <span>Transmission</span>
            <strong>{card.transmission}</strong>
          </div>
          <div className={styles.vehicleSpecRow}>
            <span>Fuel Type</span>
            <strong>{card.fuel}</strong>
          </div>
          <div className={styles.vehicleSpecRow}>
            <span>Drive Type</span>
            <strong>{card.drive}</strong>
          </div>
        </div>
        <div className={styles.vehicleFooterStack}>
          <div className={styles.vehicleMetaRow}>
            <span className={styles.timer}>{card.timer}</span>
            <span
              className={`${styles.auctionBadge} ${
                card.auction === "IAAI" ? styles.badgeIaai : styles.badgeCopart
              }`}
            >
              {card.auction}
            </span>
          </div>
          <div className={styles.currentBidButton}>
            <span>Current Bid</span>
            <strong>{card.bid}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
