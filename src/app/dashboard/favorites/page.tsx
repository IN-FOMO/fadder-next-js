"use client";

import Image from "next/image";
import { useWatchlist } from "@/hooks/useWatchlist";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardSidebar } from "../../_components/DashboardSidebar";
import { Pagination } from "../../_components/Pagination";
import { useState } from "react";

type FavoriteSpecRow = {
  label: string;
  value: string;
};

function SpecRow({
  label,
  value,
  withDivider,
}: FavoriteSpecRow & { withDivider: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-[16px] py-[8px]${
        withDivider ? " border-b border-[#F5F6F8]" : ""
      }`}
    >
      <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">
        {label}
      </span>
      <span className="text-[14px] leading-[16px] font-bold text-[#0F0F0F]">
        {value}
      </span>
    </div>
  );
}

function FavoriteCard({
  item,
  onRemove,
}: {
  item: {
    title: string;
    auction: "Copart" | "IAAI";
    image: string;
    specsLeft: FavoriteSpecRow[];
    specsRight: FavoriteSpecRow[];
    timeRemaining: string;
    currentBid: string;
    provider: "COPART" | "IAAI";
    lotId: string;
  };
  onRemove: () => void;
}) {
  return (
    <div className="flex w-full min-h-[clamp(180px,20vw,236px)]">
      <div className="relative w-[clamp(180px,30vw,340px)] h-[clamp(180px,20vw,236px)] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="340px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 bg-white rounded-r-[16px] p-4 flex flex-col items-end gap-[13px]">
        <div className="flex items-center justify-between self-stretch">
          <span className="text-[20px] leading-[24px] font-bold text-[#0F0F0F]">
            {item.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center rounded-[8px] px-[8px] py-[4px] bg-[#0E5DB8] text-white text-[12px] leading-[14px] font-normal">
              {item.auction}
            </span>
            <button
              onClick={onRemove}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
              title="Remove from favorites"
            >
              <Image
                src="/figma/icons/icon-cross-small.svg"
                alt="Remove"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>

        <div className="flex items-stretch gap-4 self-stretch">
          <div className="flex-1 flex flex-col gap-[3px]">
            {item.specsLeft.map((row, idx) => (
              <SpecRow
                key={row.label}
                label={row.label}
                value={row.value}
                withDivider={idx !== item.specsLeft.length - 1}
              />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-[3px]">
            {item.specsRight.map((row, idx) => (
              <SpecRow
                key={row.label}
                label={row.label}
                value={row.value}
                withDivider={idx !== item.specsRight.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between self-stretch">
          <span className="text-[16px] leading-[20px] font-normal text-[#00B333]">
            {item.timeRemaining}
          </span>
          <div className="flex items-center gap-[8px]">
            <div className="w-[clamp(44px,5vw,52px)] h-[clamp(44px,5vw,52px)] rounded-[14px] bg-[#F5F6F8] flex items-center justify-center">
              <Image
                src="/figma/icons/icon-search.svg"
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className="min-h-[clamp(44px,5vw,52px)] rounded-[14px] bg-[#F5F6F8] px-[clamp(16px,3vw,32px)] flex items-center justify-center gap-[10px]">
              <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                Current Bid
              </span>
              <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                {item.currentBid}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FavoritesContent() {
  const { items, isLoading, removeFromWatchlist } = useWatchlist();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mappedItems = items.map((item) => {
    // Cast fields that have incorrect types in the generated API types
    const lotTitle = item.lotTitle as unknown as string | undefined;
    const lotThumbnail = item.lotThumbnail as unknown as string | undefined;
    const saleDate = item.saleDate as unknown as string | undefined;
    const currentBid = item.currentBid as unknown as number | undefined;
    const provider = item.provider.toUpperCase() as "COPART" | "IAAI";

    return {
      title: lotTitle || "Vehicle",
      auction: (provider === "COPART" ? "Copart" : "IAAI") as "Copart" | "IAAI",
      image: lotThumbnail || "/figma/images/favorites-vehicle-1.png",
      specsLeft: [
        { label: "Lot ID", value: item.externalLotId },
        { label: "Provider", value: provider },
      ],
      specsRight: [
        { label: "Added", value: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A" },
      ],
      timeRemaining: saleDate
        ? `Sale: ${new Date(saleDate).toLocaleDateString()}`
        : "No date",
      currentBid: currentBid ? `$${currentBid.toLocaleString()}` : "N/A",
      provider,
      lotId: item.externalLotId,
    };
  });

  const totalPages = Math.ceil(mappedItems.length / itemsPerPage);
  const paginatedItems = mappedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRemove = async (provider: "COPART" | "IAAI", lotId: string) => {
    try {
      await removeFromWatchlist(provider, lotId);
    } catch {
      // Handle error silently
    }
  };

  const pageNumbers: (number | string)[] = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    pageNumbers.push(i);
  }
  if (totalPages > 5) {
    pageNumbers.push("...", totalPages);
  }

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="page-wrap pt-4 pb-10">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />
          <section className="w-full flex-1 flex flex-col gap-4">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[200px] bg-white rounded-[16px] animate-pulse"
                  />
                ))}
              </div>
            ) : paginatedItems.length === 0 ? (
              <div className="bg-white rounded-[16px] p-8 text-center">
                <p className="text-muted">No favorites yet</p>
                <p className="text-sm text-muted mt-2">
                  Add vehicles to your watchlist to see them here
                </p>
              </div>
            ) : (
              <>
                {paginatedItems.map((item, idx) => (
                  <FavoriteCard
                    key={`${item.lotId}-${idx}`}
                    item={item}
                    onRemove={() => handleRemove(item.provider, item.lotId)}
                  />
                ))}
              </>
            )}
            {totalPages > 1 && (
              <div className="pt-4">
                <Pagination
                  pages={pageNumbers}
                  current={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function DashboardFavoritesPage() {
  return (
    <ProtectedRoute>
      <FavoritesContent />
    </ProtectedRoute>
  );
}
