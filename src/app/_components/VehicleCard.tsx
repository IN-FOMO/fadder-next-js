import Image from "next/image";
import Link from "next/link";

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

const specRow =
  "flex items-center justify-between gap-0 py-2 border-b border-surface text-sm leading-4 self-stretch w-full";
const specLabel = "text-muted font-normal shrink-0";
const specValue = "font-bold leading-4 text-dark ml-auto text-right";

export function VehicleCard({ card, className }: VehicleCardProps) {
  const badgeClass = card.auction === "IAAI" ? "bg-iaai" : "bg-copart";
  return (
    <Link href="/vehicle" className="block no-underline text-inherit cursor-pointer">
      <article
        className={
          "bg-white rounded-lg overflow-hidden w-[288px] min-w-[288px] max-w-[318px] flex flex-col items-stretch snap-start " +
          (className ?? "")
        }
      >
        <div className="relative h-[236px] w-full bg-surface">
          <Image src={card.image} alt="" fill sizes="288px" className="object-cover" />
        </div>
        <div className="flex flex-col items-stretch gap-2 p-4 bg-white rounded-b-lg w-full">
          <h3 className="text-base font-bold leading-5 m-0 text-dark">{card.title}</h3>
          <div className="flex flex-col self-stretch w-full">
            <div className={specRow}>
              <span className={specLabel}>Odometer</span>
              <strong className={specValue}>{card.odometer}</strong>
            </div>
            <div className={specRow}>
              <span className={specLabel}>Engine</span>
              <strong className={specValue}>{card.engine}</strong>
            </div>
            <div className={specRow}>
              <span className={specLabel}>Transmission</span>
              <strong className={specValue}>{card.transmission}</strong>
            </div>
            <div className={specRow}>
              <span className={specLabel}>Fuel Type</span>
              <strong className={specValue}>{card.fuel}</strong>
            </div>
            <div className={specRow}>
              <span className={specLabel}>Drive Type</span>
              <strong className={specValue}>{card.drive}</strong>
            </div>
          </div>
          <div className="flex flex-col gap-2 self-stretch w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="text-success text-sm">{card.timer}</span>
              <span className={"text-white rounded-lg py-1 px-2 text-xs " + badgeClass}>
                {card.auction}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5 py-4 px-8 bg-surface rounded-md text-sm font-bold w-full min-h-12 box-border">
              <span>Current Bid</span>
              <strong>{card.bid}</strong>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
