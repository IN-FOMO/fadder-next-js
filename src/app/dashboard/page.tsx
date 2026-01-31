"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useDashboard } from "@/hooks/useDashboard";
import { useBids } from "@/hooks/useBids";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "../_components/Button";
import { DashboardSidebar } from "../_components/DashboardSidebar";
import { VehicleCard } from "../_components/VehicleCard";

type ActiveBidStatus = "Leading" | "Outbid";

function DashboardContent() {
  const { user } = useAuth();
  const { summary, isLoading: summaryLoading } = useDashboard();
  const { activeBids: apiBids, isLoading: bidsLoading } = useBids();
  const { items: recentlyViewedItems, isLoading: recentlyViewedLoading } = useRecentlyViewed();

  // Map API bids to display format
  const displayBids = apiBids.map((bid) => ({
    title: (bid.lotTitle as unknown as string) || "Vehicle",
    image: (bid.lotThumbnail as unknown as string) || "/figma/images/placeholder.png",
    lotId: bid.externalLotId || "Unknown",
    timeRemaining: bid.auctionEndAt
      ? `Ends ${new Date(bid.auctionEndAt as unknown as string).toLocaleString()}`
      : "No date",
    status: (bid.status === "active" ? "Leading" : "Outbid") as ActiveBidStatus,
    currentBid: `$${((bid.currentHighBid as unknown as number) || 0).toLocaleString()}`,
    yourBid: `$${(bid.bidAmount || 0).toLocaleString()}`,
    nextMinBid: `$${(((bid.currentHighBid as unknown as number) || 0) + 100).toLocaleString()}`,
    provider: bid.provider,
    externalLotId: bid.externalLotId,
  }));

  const availableBalance = summary?.availableBalance ?? 0;
  const maxBids = summary?.maxBidsAllowed ?? 0;
  const activeBidsCount = summary?.activeBidsCount ?? 0;
  const bidsUsedPercent = maxBids > 0 ? Math.round((activeBidsCount / maxBids) * 100) : 0;

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="page-wrap pt-4 pb-10 flex flex-col gap-4">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />

          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold m-0 text-dark">
                Hi, {user?.firstName || "there"}!
              </h1>
            </div>

            <div className="flex flex-col tablet:flex-row gap-4">
              <div className="flex-1 bg-white rounded-lg p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-dark">Current Deposit</span>
                </div>
                <div className="flex items-end gap-4">
                  <div className="flex flex-col gap-2">
                    {summaryLoading ? (
                      <div className="h-9 w-40 animate-pulse bg-surface rounded" />
                    ) : (
                      <span className="text-[32px] leading-[1.125] font-bold text-dark">
                        ${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    )}
                    <span className="text-sm text-muted">Available for bidding</span>
                  </div>
                  <Button href="/account/deposit" variant="primary" size="md" className="rounded-md px-6">
                    Continue to Payment
                  </Button>
                </div>
              </div>
              <div className="w-full tablet:w-[clamp(260px,28vw,384px)] bg-white rounded-lg p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-dark">Bid Limits</span>
                </div>
                {summaryLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-surface rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-surface rounded animate-pulse" />
                  </div>
                ) : maxBids > 0 ? (
                  <>
                    <p className="text-sm text-dark whitespace-pre-line m-0">
                      With your current deposit, you can have up to {maxBids} active bids simultaneously.
                      {`\n`}
                      Currently active: {activeBidsCount} bids
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm text-muted">
                        <span>Used</span>
                        <span className="text-dark">{activeBidsCount} / {maxBids}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#ECECF0] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#030213]"
                          style={{ width: `${bidsUsedPercent}%` }}
                          role="progressbar"
                          aria-valuenow={activeBidsCount}
                          aria-valuemin={0}
                          aria-valuemax={maxBids}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted m-0">
                    Make a deposit to start bidding on vehicles.
                  </p>
                )}
              </div>
            </div>

            <section className="bg-white rounded-lg p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold m-0 text-dark">Active Bids</h2>
              </div>
              {bidsLoading ? (
                <div className="flex flex-col gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-28 bg-surface rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : displayBids.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted">No active bids</p>
                  <Link href="/search" className="text-primary font-semibold mt-2 inline-block">
                    Browse vehicles to start bidding
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {displayBids.map((bid, i) => (
                    <div key={`${bid.lotId}-${i}`} className="flex items-center w-full">
                      <div className="relative w-[clamp(120px,16vw,168px)] h-[clamp(90px,12vw,112px)] shrink-0 rounded-l-[14px] overflow-hidden bg-surface">
                        <Image src={bid.image} alt="" fill sizes="168px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-h-[clamp(90px,12vw,112px)] bg-surface rounded-r-[14px] p-4 flex items-center justify-between gap-6 overflow-x-auto">
                        <div className="flex flex-col gap-3 min-w-[120px]">
                          <div className="flex flex-col gap-2">
                            <span className="text-base font-bold text-dark">{bid.title}</span>
                            <span className="text-sm text-muted">{bid.lotId}</span>
                          </div>
                          <span className="text-sm text-dark">{bid.timeRemaining}</span>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[70px]">
                          <span className="text-sm text-muted">Status</span>
                          <span className={"inline-flex w-fit rounded-[4px] px-2 py-1 text-xs font-bold text-white " + (bid.status === "Leading" ? "bg-success" : "bg-error")}>
                            {bid.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[80px]">
                          <span className="text-sm text-muted">Current Bid</span>
                          <span className="text-base font-bold text-dark">{bid.currentBid}</span>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[80px]">
                          <span className="text-sm text-muted">Your Bid</span>
                          <span className="text-base font-bold text-dark">{bid.yourBid}</span>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[80px]">
                          <span className="text-sm text-muted">Next Min Bid</span>
                          <span className="text-base font-bold text-dark">{bid.nextMinBid}</span>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[60px]">
                          <span className="text-sm text-muted">Auction</span>
                          <span className={`inline-flex w-fit rounded-[4px] px-2 py-1 text-xs font-bold text-white ${bid.provider === "COPART" ? "bg-copart" : "bg-iaai"}`}>
                            {bid.provider === "COPART" ? "Copart" : "IAAI"}
                          </span>
                        </div>
                        <Button
                          href={bid.provider && bid.externalLotId ? `/lot/${bid.provider.toLowerCase()}/${bid.externalLotId}` : "/search"}
                          variant="secondary"
                          size="sm"
                          className="rounded-md px-5"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        <section className="w-full max-w-[clamp(320px,85vw,1320px)] mx-auto flex flex-col gap-4">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl font-bold m-0 text-dark">Recently Viewed</h2>
            <Link href="/search" className="bg-white rounded-lg px-4 py-2 text-sm font-bold text-dark no-underline">
              View all
            </Link>
          </div>
          {recentlyViewedLoading ? (
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={`skeleton-${i}`} className="snap-start shrink-0 w-[280px] h-[360px] bg-surface rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : recentlyViewedItems.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-muted">No recently viewed vehicles</p>
              <Link href="/search" className="text-primary font-semibold mt-2 inline-block">
                Browse vehicles
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory">
              {recentlyViewedItems.map((item, index) => (
                <div key={`${item.provider}-${item.externalLotId}-${index}`} className="snap-start shrink-0">
                  <VehicleCard card={item} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
