"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLotDetail } from "@/hooks/useLotDetail";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useAuth } from "@/hooks/useAuth";
import { Breadcrumbs } from "@/app/_components/Breadcrumbs";
import { Button } from "@/app/_components/Button";

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-surface rounded-lg flex items-center justify-center">
        <span className="text-muted">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[4/3] bg-surface rounded-lg overflow-hidden">
        <Image
          src={images[activeIndex]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 ${
                idx === activeIndex ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${title} - ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string | undefined | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between py-2 border-b border-surface">
      <span className="text-muted">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function formatOdometer(odometer?: number, unit?: string): string {
  if (!odometer) return "N/A";
  const formatted = odometer.toLocaleString();
  const miles = unit === "km" ? Math.round(odometer * 0.621371) : odometer;
  const km = unit === "km" ? odometer : Math.round(odometer * 1.60934);
  return `${miles.toLocaleString()} mi (${km.toLocaleString()} km)`;
}

function formatTimer(saleDate?: string): string {
  if (!saleDate) return "No date";
  const sale = new Date(saleDate);
  const now = new Date();
  const diff = sale.getTime() - now.getTime();

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days} d ${hours} h ${minutes} min ${seconds.toString().padStart(2, "0")} sec`;
}

export default function LotDetailPage() {
  const params = useParams();
  const provider = (params.provider as string)?.toUpperCase() as "COPART" | "IAAI";
  const externalLotId = params.id as string;

  const { lot, isLoading, error } = useLotDetail(provider, externalLotId);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { addItem: addToRecentlyViewed } = useRecentlyViewed();
  const { isAuthenticated } = useAuth();

  const inWatchlist = lot ? isInWatchlist(provider, externalLotId) : false;

  // Add to recently viewed when lot is loaded
  useEffect(() => {
    if (!lot) return;

    const primaryImage = lot.link_img_hd?.[0] || lot.link_img_small?.[0] || lot.image_thumbnail || "/figma/images/vehicle-1.png";

    addToRecentlyViewed({
      title: lot.title || `${lot.year} ${lot.make} ${lot.model}`,
      image: primaryImage,
      odometer: formatOdometer(lot.odometer, lot.odometerUnit),
      engine: lot.engineType || lot.engineSize || "N/A",
      transmission: lot.transmission || "N/A",
      fuel: lot.fuelType || "N/A",
      drive: lot.driveType || "N/A",
      timer: formatTimer(lot.saleDate),
      auction: lot.provider === "COPART" ? "Copart" : "IAAI",
      bid: lot.currentBid ? `$${lot.currentBid.toLocaleString()}` : "No bids",
      provider: lot.provider,
      externalLotId: lot.externalLotId,
    });
  }, [lot, addToRecentlyViewed]);

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to watchlist");
      return;
    }

    try {
      if (inWatchlist) {
        await removeFromWatchlist(provider, externalLotId);
        toast.success("Removed from watchlist");
      } else {
        await addToWatchlist(provider, externalLotId, {
          lotTitle: lot?.title,
          lotThumbnail: lot?.image_thumbnail,
          saleDate: lot?.saleDate,
          currentBid: lot?.currentBid,
        });
        toast.success("Added to watchlist");
      }
    } catch {
      toast.error("Failed to update watchlist");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface">
        <div className="page-wrap py-6">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-white rounded mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-[4/3] bg-white rounded-lg" />
              <div className="space-y-4">
                <div className="h-10 bg-white rounded" />
                <div className="h-6 w-32 bg-white rounded" />
                <div className="h-40 bg-white rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !lot) {
    return (
      <main className="min-h-screen bg-surface">
        <div className="page-wrap py-6">
          <div className="bg-white rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Lot Not Found</h1>
            <p className="text-muted mb-6">
              The lot you're looking for doesn't exist or has been removed.
            </p>
            <Button href="/search" variant="primary" size="md">
              Back to Search
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const images = lot.link_img_hd?.length > 0
    ? lot.link_img_hd
    : lot.link_img_small?.length > 0
      ? lot.link_img_small
      : lot.image_thumbnail
        ? [lot.image_thumbnail]
        : [];

  return (
    <main className="min-h-screen bg-surface">
      <div className="page-wrap py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Search", href: "/search" },
            { label: lot.title || `${lot.year} ${lot.make} ${lot.model}` },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Images */}
          <ImageGallery images={images} title={lot.title || ""} />

          {/* Right - Details */}
          <div className="flex flex-col gap-6">
            {/* Title & Price */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    {lot.title || `${lot.year} ${lot.make} ${lot.model}`}
                  </h1>
                  <p className="text-muted mt-1">
                    Lot #{lot.externalLotId} • {lot.provider}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-white text-sm font-bold ${
                    lot.provider === "COPART" ? "bg-copart" : "bg-iaai"
                  }`}
                >
                  {lot.provider}
                </span>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-muted text-sm">Current Bid</p>
                  <p className="text-3xl font-bold">
                    {lot.currentBid
                      ? `$${lot.currentBid.toLocaleString()}`
                      : "No bids"}
                  </p>
                </div>
                {lot.buyNowPrice && (
                  <div className="text-right">
                    <p className="text-muted text-sm">Buy Now</p>
                    <p className="text-xl font-bold text-success">
                      ${lot.buyNowPrice.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="primary" size="md" className="flex-1">
                  Place Bid
                </Button>
                <Button
                  variant={inWatchlist ? "primary" : "secondary"}
                  size="md"
                  onClick={handleWatchlistToggle}
                >
                  <Image
                    src="/figma/icons/icon-heart.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  {inWatchlist ? "Saved" : "Save"}
                </Button>
              </div>

              {lot.saleDate && (
                <div className="mt-4 p-3 bg-surface rounded-lg text-center">
                  <p className="text-sm text-muted">Auction Date</p>
                  <p className="font-bold">
                    {new Date(lot.saleDate).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Vehicle Information</h2>
              <div className="space-y-0">
                <SpecRow label="VIN" value={lot.vin} />
                <SpecRow label="Year" value={lot.year?.toString()} />
                <SpecRow label="Make" value={lot.make} />
                <SpecRow label="Model" value={lot.model} />
                <SpecRow
                  label="Odometer"
                  value={
                    lot.odometer
                      ? `${lot.odometer.toLocaleString()} ${lot.odometerUnit || "mi"}`
                      : undefined
                  }
                />
                <SpecRow label="Engine" value={lot.engineType || lot.engineSize} />
                <SpecRow label="Transmission" value={lot.transmission} />
                <SpecRow label="Fuel Type" value={lot.fuelType} />
                <SpecRow label="Drive Type" value={lot.driveType} />
                <SpecRow label="Body Style" value={lot.bodyStyle} />
                <SpecRow label="Color" value={lot.color} />
                <SpecRow label="Cylinders" value={lot.cylinders?.toString()} />
                <SpecRow label="Keys" value={lot.hasKeys ? "Yes" : "No"} />
                <SpecRow label="Runs & Drives" value={lot.runsDrives ? "Yes" : "Unknown"} />
              </div>
            </div>

            {/* Damage Info */}
            {(lot.damageType || lot.secondaryDamage) && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Damage Information</h2>
                <div className="space-y-0">
                  <SpecRow label="Primary Damage" value={lot.damageType} />
                  <SpecRow label="Secondary Damage" value={lot.secondaryDamage} />
                </div>
              </div>
            )}

            {/* Title & Sale Info */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Sale Information</h2>
              <div className="space-y-0">
                {/* Title status not available in lot detail response */}
                <SpecRow label="Sale Status" value={lot.saleStatus} />
                <SpecRow
                  label="Location"
                  value={
                    lot.location
                      ? `${lot.location.city}, ${lot.location.state}`
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
