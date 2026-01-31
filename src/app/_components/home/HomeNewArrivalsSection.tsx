"use client";

import { useFeed, type LotSummaryDto } from "@/hooks/useRecommendations";
import type { VehicleCardData } from "../VehicleCard";
import { VehicleSlider } from "../VehicleSlider";

function mapLotToCard(lot: LotSummaryDto): VehicleCardData {
  return {
    title: lot.title || `${lot.year} ${lot.make} ${lot.model}`,
    image: lot.cdnImageUrl || lot.primaryImageUrl || "/figma/images/vehicle-1.png",
    odometer: lot.odometer
      ? `${lot.odometer.toLocaleString()} ${lot.odometerUnit === "km" ? "km" : "mi"}`
      : "N/A",
    engine: lot.engineType || "N/A",
    transmission: lot.transmission || "N/A",
    fuel: lot.fuelType || "N/A",
    drive: lot.driveType || "N/A",
    timer: lot.saleDate
      ? new Date(lot.saleDate).toLocaleDateString()
      : "No date",
    auction: lot.provider === "COPART" ? "Copart" : "IAAI",
    bid: lot.currentBid ? `$${lot.currentBid.toLocaleString()}` : "No bids",
    provider: lot.provider,
    externalLotId: lot.externalLotId,
  };
}

export function HomeNewArrivalsSection() {
  const { lots, isLoading } = useFeed("ending_soon", 12);

  const cards = lots.map(mapLotToCard);

  if (isLoading) {
    return (
      <section className="page-wrap">
        <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-[280px] h-[400px] bg-surface rounded-lg animate-pulse shrink-0"
            />
          ))}
        </div>
      </section>
    );
  }

  if (cards.length === 0) {
    return null;
  }

  return <VehicleSlider title="New Arrivals" viewAllHref="/search" cards={cards} />;
}
