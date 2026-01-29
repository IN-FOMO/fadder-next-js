import Image from "next/image";
import { DashboardSidebar } from "../../_components/DashboardSidebar";
import { Pagination } from "../../_components/Pagination";

type FavoriteSpecRow = {
  label: string;
  value: string;
};

type FavoriteCar = {
  title: string;
  auction: "Copart" | "IAAI";
  image: string;
  specsLeft: FavoriteSpecRow[];
  specsRight: FavoriteSpecRow[];
  timeRemaining: string;
  currentBid: string;
};

const favorites: FavoriteCar[] = [
  {
    title: "1981 Chevrolet Corvette",
    auction: "Copart",
    image: "/figma/images/favorites-vehicle-1.png",
    specsLeft: [
      { label: "Odometer", value: "25 145 mi (40 467 km)" },
      { label: "Engine", value: "5.7L, V8" },
      { label: "Transmission", value: "Automatic" },
    ],
    specsRight: [
      { label: "Fuel Type", value: "Gasoline" },
      { label: "Drive Type", value: "Rear wheel drive" },
    ],
    timeRemaining: "1 d 21 h 23 min 00 sec",
    currentBid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    auction: "Copart",
    image: "/figma/images/favorites-vehicle-1.png",
    specsLeft: [
      { label: "Odometer", value: "25 145 mi (40 467 km)" },
      { label: "Engine", value: "5.7L, V8" },
      { label: "Transmission", value: "Automatic" },
    ],
    specsRight: [
      { label: "Fuel Type", value: "Gasoline" },
      { label: "Drive Type", value: "Rear wheel drive" },
    ],
    timeRemaining: "1 d 21 h 23 min 00 sec",
    currentBid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    auction: "Copart",
    image: "/figma/images/favorites-vehicle-1.png",
    specsLeft: [
      { label: "Odometer", value: "25 145 mi (40 467 km)" },
      { label: "Engine", value: "5.7L, V8" },
      { label: "Transmission", value: "Automatic" },
    ],
    specsRight: [
      { label: "Fuel Type", value: "Gasoline" },
      { label: "Drive Type", value: "Rear wheel drive" },
    ],
    timeRemaining: "1 d 21 h 23 min 00 sec",
    currentBid: "$725",
  },
];

function SpecRow({ label, value, withDivider }: FavoriteSpecRow & { withDivider: boolean }) {
  return (
    <div
      className={
        "flex items-center justify-between px-[16px] py-[8px]" + (withDivider ? " border-b border-[#F5F6F8]" : "")
      }
    >
      <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">{label}</span>
      <span className="text-[14px] leading-[16px] font-bold text-[#0F0F0F]">{value}</span>
    </div>
  );
}

function FavoriteCard({ car }: { car: FavoriteCar }) {
  return (
    <div className="flex w-[1144px] h-[236px]">
      <div className="relative w-[340px] h-[236px] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
        <Image src={car.image} alt="" fill sizes="340px" className="object-cover" />
      </div>
      <div className="flex-1 bg-white rounded-r-[16px] p-4 flex flex-col items-end gap-[13px]">
        {/* Title + auction */}
        <div className="flex items-center justify-between self-stretch">
          <span className="text-[20px] leading-[24px] font-bold text-[#0F0F0F]">{car.title}</span>
          <span className="inline-flex items-center justify-center rounded-[8px] px-[8px] py-[4px] bg-[#0E5DB8] text-white text-[12px] leading-[14px] font-normal">
            {car.auction}
          </span>
        </div>

        {/* Specs */}
        <div className="flex items-stretch gap-4 self-stretch">
          <div className="flex-1 flex flex-col gap-[3px]">
            {car.specsLeft.map((row, idx) => (
              <SpecRow key={row.label} label={row.label} value={row.value} withDivider={idx !== car.specsLeft.length - 1} />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-[3px]">
            {car.specsRight.map((row, idx) => (
              <SpecRow key={row.label} label={row.label} value={row.value} withDivider={idx !== car.specsRight.length - 1} />
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between self-stretch">
          <span className="text-[16px] leading-[20px] font-normal text-[#00B333]">{car.timeRemaining}</span>
          <div className="flex items-center gap-[8px]">
            <div className="w-[52px] h-[52px] rounded-[14px] bg-[#F5F6F8] flex items-center justify-center">
              <Image src="/figma/icons/icon-search.svg" alt="" width={20} height={20} />
            </div>
            <div className="h-[52px] rounded-[14px] bg-[#F5F6F8] px-[32px] flex items-center justify-center gap-[10px]">
              <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">Current Bid</span>
              <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">{car.currentBid}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardFavoritesPage() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="max-w-[1440px] mx-auto px-[60px] pt-4 pb-10 max-tablet:px-8 max-narrow:px-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <DashboardSidebar />
          {/* Car List Container (Figma: layout_P60PP2) */}
          <section className="w-[1144px] flex flex-col gap-4">
            {favorites.map((car, idx) => (
              <FavoriteCard key={`${car.title}-${idx}`} car={car} />
            ))}
            <div className="pt-4">
              <Pagination pages={[1, 2, 3, 4, 5, "...", 24]} current={1} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

