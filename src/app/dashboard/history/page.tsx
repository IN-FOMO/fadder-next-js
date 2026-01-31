"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useBids } from "@/hooks/useBids";
import { usePurchases } from "@/hooks/usePurchases";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "../../_components/Button";
import { DashboardSidebar } from "../../_components/DashboardSidebar";
import type { components } from "@/types/api";

type BidResponseDto = components["schemas"]["BidResponseDto"];
type PurchaseResponseDto = components["schemas"]["PurchaseResponseDto"];

const historyTabs = [
  { label: "Active Bids", value: "active" },
  { label: "Won", value: "won" },
  { label: "Lost", value: "lost" },
  { label: "Buy Now", value: "buy-now" },
] as const;

function formatTimeRemaining(saleDate?: string): string {
  if (!saleDate) return "No date";
  const sale = new Date(saleDate);
  const now = new Date();
  const diff = sale.getTime() - now.getTime();

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `Ends in ${days}d ${hours}h`;
  if (hours > 0) return `Ends in ${hours}h ${minutes}m`;
  return `Ends in ${minutes}m`;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
}

function formatPrice(amount?: number): string {
  if (amount === undefined || amount === null) return "N/A";
  return `$${amount.toLocaleString()}`;
}

function ActiveBidCard({ bid }: { bid: BidResponseDto }) {
  const lotTitle = (bid.lotTitle as unknown as string) || "Vehicle";
  const thumbnail = (bid.lotThumbnail as unknown as string) || "/figma/images/vehicle-1.png";
  const status = (bid.status as string) || "pending";
  const isLeading = status === "leading" || status === "winning";
  const provider = bid.provider?.toUpperCase() as "COPART" | "IAAI";

  return (
    <div className="flex items-center w-full">
      <div className="relative w-[clamp(120px,16vw,168px)] h-[clamp(90px,12vw,112px)] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
        <Image src={thumbnail} alt="" fill sizes="168px" className="object-cover" />
      </div>
      <div className="flex-1 min-h-[clamp(90px,12vw,112px)] bg-white rounded-r-[16px] p-4 grid items-center gap-x-4 grid-cols-[minmax(0,1.8fr)_repeat(5,minmax(60px,1fr))_auto]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-[20px] leading-[24px] font-bold text-dark">{lotTitle}</span>
            <span className="text-[14px] leading-[16px] text-muted">LOT-{bid.externalLotId}</span>
          </div>
          <span className="text-[14px] leading-[16px] text-dark">
            {formatTimeRemaining((bid as Record<string, unknown>).saleDate as string | undefined)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Status</span>
          <span
            className={`inline-flex items-center justify-center rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white w-[clamp(52px,8vw,65px)] ${
              isLeading ? "bg-success" : "bg-error"
            }`}
          >
            {isLeading ? "Leading" : "Outbid"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Current Bid</span>
          <span className="text-[16px] leading-[20px] font-bold text-dark">
            {formatPrice((bid as Record<string, unknown>).currentBid as number | undefined)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Your Bid</span>
          <span className="text-[16px] leading-[20px] font-bold text-dark">
            {formatPrice(bid.bidAmount)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Max Bid</span>
          <span className="text-[16px] leading-[20px] font-bold text-dark">
            {formatPrice((bid.maxBid as unknown as number) ?? undefined)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Auction</span>
          <span
            className={`inline-flex w-fit rounded-[4px] px-2 py-1 text-white ${
              provider === "IAAI"
                ? "bg-[#D91E1D] text-[12px] leading-[14px] font-normal"
                : "bg-[#0E5DB8] text-[14px] leading-[16px] font-bold"
            }`}
          >
            {provider || "N/A"}
          </span>
        </div>
        <Link href={`/lot/${bid.provider?.toLowerCase()}/${bid.externalLotId}`}>
          <Button
            variant="secondary"
            size="md"
            className="rounded-[14px] w-[clamp(80px,12vw,101px)] px-0 py-[14px] text-[14px] leading-[16px] min-h-0"
          >
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}

function WonBidCard({ bid }: { bid: BidResponseDto }) {
  const lotTitle = (bid.lotTitle as unknown as string) || "Vehicle";
  const thumbnail = (bid.lotThumbnail as unknown as string) || "/figma/images/vehicle-1.png";

  return (
    <div className="flex items-center w-full">
      <div className="relative w-[clamp(120px,16vw,168px)] h-[clamp(90px,12vw,112px)] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
        <Image src={thumbnail} alt="" fill sizes="168px" className="object-cover" />
      </div>
      <div className="flex-1 min-h-[clamp(90px,12vw,112px)] bg-white rounded-r-[16px] p-4 grid items-center gap-x-4 grid-cols-[minmax(0,1.8fr)_repeat(4,minmax(60px,1fr))_auto]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-[20px] leading-[24px] font-bold text-dark">{lotTitle}</span>
            <span className="text-[14px] leading-[16px] text-muted">LOT-{bid.externalLotId}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Final Price</span>
          <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">
            {formatPrice(bid.bidAmount)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Status</span>
          <span className="inline-flex items-center justify-center rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white bg-success w-fit">
            Won
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Date</span>
          <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">
            {formatDate((bid as Record<string, unknown>).updatedAt as string | undefined)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Auction</span>
          <span
            className={`inline-flex w-fit rounded-[4px] px-2 py-1 text-white ${
              bid.provider === "IAAI"
                ? "bg-[#D91E1D] text-[12px] leading-[14px] font-normal"
                : "bg-[#0E5DB8] text-[14px] leading-[16px] font-bold"
            }`}
          >
            {bid.provider || "N/A"}
          </span>
        </div>
        <Link href={`/lot/${bid.provider?.toLowerCase()}/${bid.externalLotId}`}>
          <Button
            variant="secondary"
            size="md"
            className="rounded-[14px] w-[clamp(80px,12vw,101px)] px-0 py-[14px] text-[14px] leading-[16px] min-h-0"
          >
            Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

function LostBidCard({ bid }: { bid: BidResponseDto }) {
  const lotTitle = (bid.lotTitle as unknown as string) || "Vehicle";
  const thumbnail = (bid.lotThumbnail as unknown as string) || "/figma/images/vehicle-1.png";
  const winningBid = (bid as Record<string, unknown>).winningBid as number | undefined;
  const difference = winningBid && bid.bidAmount ? winningBid - bid.bidAmount : undefined;

  return (
    <div className="flex items-center w-full">
      <div className="relative w-[clamp(120px,16vw,168px)] h-[clamp(90px,12vw,112px)] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
        <Image src={thumbnail} alt="" fill sizes="168px" className="object-cover" />
      </div>
      <div className="flex-1 min-h-[clamp(90px,12vw,112px)] bg-white rounded-r-[16px] p-4 grid items-center gap-x-4 grid-cols-[minmax(0,1.8fr)_repeat(5,minmax(60px,1fr))_auto]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-[20px] leading-[24px] font-bold text-dark">{lotTitle}</span>
            <span className="text-[14px] leading-[16px] text-muted">LOT-{bid.externalLotId}</span>
          </div>
          <span className="text-[14px] leading-[16px] text-dark">
            Ended on {formatDate((bid as Record<string, unknown>).updatedAt as string | undefined)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Status</span>
          <span className="inline-flex items-center justify-center rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white w-[clamp(52px,8vw,65px)] bg-error">
            Lost
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Winning Bid</span>
          <span className="text-[16px] leading-[20px] font-bold text-dark">
            {formatPrice(winningBid)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Your Bid</span>
          <span className="text-[16px] leading-[20px] font-bold text-dark">
            {formatPrice(bid.bidAmount)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Difference</span>
          <span className="text-[16px] leading-[20px] font-bold text-error">
            {difference ? `+${formatPrice(difference)}` : "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Auction</span>
          <span
            className={`inline-flex w-fit rounded-[4px] px-2 py-1 text-white ${
              bid.provider === "IAAI"
                ? "bg-[#D91E1D] text-[12px] leading-[14px] font-normal"
                : "bg-[#0E5DB8] text-[14px] leading-[16px] font-bold"
            }`}
          >
            {bid.provider || "N/A"}
          </span>
        </div>
        <Link href={`/search?query=${encodeURIComponent(lotTitle)}`}>
          <Button
            variant="secondary"
            size="md"
            className="rounded-[14px] w-[clamp(80px,12vw,101px)] px-0 py-[14px] text-[14px] leading-[16px] min-h-0"
          >
            Find Similar
          </Button>
        </Link>
      </div>
    </div>
  );
}

function BuyNowCard({ purchase }: { purchase: PurchaseResponseDto }) {
  const lotTitle = (purchase.lotTitle as unknown as string) || "Vehicle";
  const thumbnail = (purchase.lotThumbnail as unknown as string) || "/figma/images/vehicle-1.png";

  return (
    <div className="flex items-center w-full">
      <div className="relative w-[clamp(120px,16vw,168px)] h-[clamp(90px,12vw,112px)] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
        <Image src={thumbnail} alt="" fill sizes="168px" className="object-cover" />
      </div>
      <div className="flex-1 min-h-[clamp(90px,12vw,112px)] bg-white rounded-r-[16px] p-4 grid items-center gap-x-4 grid-cols-[minmax(0,1.8fr)_repeat(4,minmax(60px,1fr))_auto]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-[20px] leading-[24px] font-bold text-dark">{lotTitle}</span>
            <span className="text-[14px] leading-[16px] text-muted">LOT-{purchase.externalLotId}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Source</span>
          <span className="inline-flex w-fit rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white bg-[#0E5DB8]">
            {purchase.provider || "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Purchase Price</span>
          <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">
            {formatPrice(purchase.totalAmount)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Purchase Date</span>
          <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">
            {formatDate(purchase.createdAt)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-[16px] text-muted">Status</span>
          <span className="inline-flex items-center justify-center rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white bg-success w-fit">
            {purchase.paymentStatus || "Completed"}
          </span>
        </div>
        <Link href={`/lot/${purchase.provider?.toLowerCase()}/${purchase.externalLotId}`}>
          <Button
            variant="secondary"
            size="md"
            className="rounded-[14px] w-[clamp(80px,12vw,101px)] px-0 py-[14px] text-[14px] leading-[16px] min-h-0"
          >
            Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center w-full animate-pulse">
          <div className="w-[clamp(120px,16vw,168px)] h-[clamp(90px,12vw,112px)] shrink-0 rounded-l-[16px] bg-surface" />
          <div className="flex-1 min-h-[clamp(90px,12vw,112px)] bg-white rounded-r-[16px] p-4">
            <div className="h-6 bg-surface rounded w-1/3 mb-2" />
            <div className="h-4 bg-surface rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-white rounded-[16px]">
      <p className="text-lg text-muted">{message}</p>
    </div>
  );
}

function HistoryContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "active";

  const { activeBids, wonBids, lostBids, isLoading: bidsLoading } = useBids();
  const { buyNowPurchases, isLoading: purchasesLoading } = usePurchases();

  const isLoading = bidsLoading || purchasesLoading;

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="page-wrap pt-4 pb-10">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />

          <div className="flex-1 min-w-0 flex flex-col gap-12">
            {/* History tabs */}
            <div className="inline-flex w-full max-w-[clamp(320px,70vw,666px)] shrink-0 items-center gap-[4px] bg-[#FFFFFF] rounded-[16px] self-start">
              {historyTabs.map((tab) => {
                const isActive = tab.value === activeTab;
                return (
                  <Link
                    key={tab.value}
                    href={
                      tab.value === "active"
                        ? "/dashboard/history"
                        : `/dashboard/history?tab=${tab.value}`
                    }
                    className={
                      "flex items-center justify-center gap-[14px] w-full min-w-[clamp(70px,10vw,90px)] px-[24px] py-[8px] rounded-[16px] text-[14px] leading-[16px] font-bold text-[#0F0F0F] border-[1.5px] box-border no-underline " +
                      (isActive ? "border-[#FFAF0E]" : "border-transparent")
                    }
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>

            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {activeTab === "active" && (
                  <div className="flex flex-col gap-4 w-full">
                    {activeBids.length === 0 ? (
                      <EmptyState message="No active bids" />
                    ) : (
                      activeBids.map((bid) => (
                        <ActiveBidCard key={bid.id} bid={bid} />
                      ))
                    )}
                  </div>
                )}

                {activeTab === "won" && (
                  <div className="flex flex-col gap-4 w-full">
                    {wonBids.length === 0 ? (
                      <EmptyState message="No won bids yet" />
                    ) : (
                      wonBids.map((bid) => (
                        <WonBidCard key={bid.id} bid={bid} />
                      ))
                    )}
                  </div>
                )}

                {activeTab === "lost" && (
                  <div className="flex flex-col gap-4 w-full">
                    {lostBids.length === 0 ? (
                      <EmptyState message="No lost bids" />
                    ) : (
                      lostBids.map((bid) => (
                        <LostBidCard key={bid.id} bid={bid} />
                      ))
                    )}
                  </div>
                )}

                {activeTab === "buy-now" && (
                  <div className="flex flex-col gap-4 w-full">
                    {buyNowPurchases.length === 0 ? (
                      <EmptyState message="No Buy Now purchases" />
                    ) : (
                      buyNowPurchases.map((purchase) => (
                        <BuyNowCard key={purchase.id} purchase={purchase} />
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardHistoryPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingSkeleton />}>
        <HistoryContent />
      </Suspense>
    </ProtectedRoute>
  );
}
