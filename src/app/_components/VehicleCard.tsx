"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
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

export function VehicleCard({ card, className, imageBadge: _imageBadge }: VehicleCardProps) {
  const badgeClass = card.auction === "IAAI" ? "bg-iaai" : "bg-copart";
  const router = useRouter();
  const images = useMemo(() => {
    if (Array.isArray((card as VehicleCardData & { images?: string[] }).images)) {
      const list = (card as VehicleCardData & { images?: string[] }).images ?? [];
      return list.length > 0 ? list : [card.image];
    }
    return [card.image];
  }, [card]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const activeImage = images[imageIndex] ?? card.image;
  const handlePrev = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setImageIndex((current) => (current - 1 + images.length) % images.length);
  };
  const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setImageIndex((current) => (current + 1) % images.length);
  };
  const handleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const hasAuth =
      typeof window !== "undefined" &&
      (window.localStorage.getItem("fadder-auth") === "1" ||
        document.cookie.includes("fadder-auth="));
    if (!hasAuth) {
      router.push("/login");
      return;
    }
    setIsFavorite((prev) => !prev);
  };
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
            src={activeImage}
            alt=""
            fill
            sizes="288px"
            className="object-cover"
          />
          <Button
            type="button"
            aria-label="Previous image"
            onClick={handlePrev}
            variant="ghost"
            size="icon"
            className="absolute left-0 top-[196px] h-10 w-10 bg-white/60 hover:bg-white/80 active:bg-white/60 rounded-tr-[14px] rounded-bl-none rounded-tl-none rounded-br-none z-10"
          >
            <Image
              src="/figma/icons/icon-arrow-left.svg"
              alt=""
              width={24}
              height={24}
            />
          </Button>
          <Button
            type="button"
            aria-label="Next image"
            onClick={handleNext}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-[196px] h-10 w-10 bg-white/60 hover:bg-white/80 active:bg-white/60 rounded-tl-[16px] rounded-tr-none rounded-bl-none rounded-br-none z-10"
          >
            <Image
              src="/figma/icons/icon-arrow-right.svg"
              alt=""
              width={24}
              height={24}
            />
          </Button>
          <Button
            type="button"
            aria-label="Add to favorites"
            aria-pressed={isFavorite}
            onClick={handleFavorite}
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 h-10 w-10 bg-white/60 hover:bg-white/80 active:bg-white/60 rounded-tr-[16px] rounded-bl-[14px] rounded-tl-none rounded-br-none z-10"
          >
            <Image
              src="/figma/icons/icon-favorite.svg"
              alt=""
              width={24}
              height={24}
            />
          </Button>
          
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
