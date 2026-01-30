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
  /** Optional badge overlay on image (e.g. "Active") */
  imageBadge?: string;
};

const specRow =
  "flex items-center justify-between gap-0 py-2 border-b border-surface text-sm leading-4 self-stretch w-full";
const specLabel = "text-muted font-normal shrink-0";
const specValue = "font-bold leading-4 text-dark ml-auto text-right";

export function VehicleCard({ card, className, imageBadge }: VehicleCardProps) {
  const badgeClass = card.auction === "IAAI" ? "bg-iaai" : "bg-copart";
  return (
    <Link
      href="/vehicle"
      className="block no-underline text-inherit cursor-pointer"
    >
      <article
        className={
          "bg-white rounded-[16px] overflow-hidden w-[288px] min-w-[288px] max-w-[318px] flex flex-col items-stretch snap-start " +
          (className ?? "")
        }
      >
        <div className="relative h-[236px] w-full bg-surface rounded-t-[16px] overflow-visible">
          <Image
            src={card.image}
            alt=""
            fill
            sizes="288px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 top-[196px] p-2 bg-white/60 rounded-tr-[14px]"
          >
            <Image
              src="/figma/icons/icon-arrow-left.svg"
              alt=""
              width={24}
              height={24}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute right-0 top-[196px] p-2 bg-white/60 rounded-tl-[16px]"
          >
            <Image
              src="/figma/icons/icon-arrow-right.svg"
              alt=""
              width={24}
              height={24}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 p-2 bg-white/60 rounded-tr-[16px] rounded-bl-[14px]"
          >
            <Image
              src="/figma/icons/icon-share-small.svg"
              alt=""
              width={24}
              height={24}
            />
          </div>
          <span className="absolute left-4 top-4 rounded-[8px] bg-success px-2 py-1 text-xs leading-[14px] font-normal text-white">
            {imageBadge ?? "Active"}
          </span>
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 top-[220px] flex items-center gap-[2px]"
          >
            <div className="w-[4px] h-[10px] rounded-full bg-white/60" />
            <div className="w-[6px] h-[6px] rounded-full bg-white/60" />
            <div className="w-[8px] h-[8px] rounded-full bg-white/60" />
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-2 p-4 bg-white rounded-b-[16px] w-full">
          <h3 className="text-base font-bold leading-5 m-0 text-dark">
            {card.title}
          </h3>
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
              <span className="text-success text-sm leading-4">
                {card.timer}
              </span>
              <span
                className={`text-white rounded-[8px] py-1 px-2 text-xs leading-[14px] ${badgeClass}`}
              >
                {card.auction}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5 px-8 h-[52px] bg-surface rounded-[14px] text-sm leading-4 font-bold w-full box-border">
              <span>Current Bid</span>
              <strong>{card.bid}</strong>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
