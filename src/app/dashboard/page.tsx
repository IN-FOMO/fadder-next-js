"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../_components/Button";
import { DashboardSidebar } from "../_components/DashboardSidebar";
import { VehicleCard, type VehicleCardData } from "../_components/VehicleCard";

type ActiveBidStatus = "Leading" | "Outbid";

const activeBids = [
  {
    title: "2020 Toyota Camry XLE",
    image: "/figma/images/vehicle-1.png",
    lotId: "LOT-2024156",
    timeRemaining: "Ends in 2h 34m",
    status: "Leading" as ActiveBidStatus,
    currentBid: "$18,500",
    yourBid: "$18,600",
    nextMinBid: "$18,700",
  },
  {
    title: "2021 Honda Accord",
    image: "/figma/images/vehicle-2.png",
    lotId: "LOT-2024157",
    timeRemaining: "Ends in 3h 12m",
    status: "Outbid" as ActiveBidStatus,
    currentBid: "$22,000",
    yourBid: "$22,100",
    nextMinBid: "$22,200",
  },
  {
    title: "2021 Honda Accord",
    image: "/figma/images/vehicle-3.png",
    lotId: "LOT-2024157",
    timeRemaining: "Ends in 3h 12m",
    status: "Outbid" as ActiveBidStatus,
    currentBid: "$22,000",
    yourBid: "$22,100",
    nextMinBid: "$22,200",
  },
];

const recentlyViewedCards: VehicleCardData[] = [
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-1.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "IAAI",
    bid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-2.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "Copart",
    bid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-3.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "Copart",
    bid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-4.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "IAAI",
    bid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-3.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "Copart",
    bid: "$725",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="max-w-[1440px] mx-auto px-[60px] pt-4 pb-10 flex flex-col gap-4 max-tablet:px-8 max-narrow:px-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <DashboardSidebar />

          {/* Main content (x=236, width 1144) */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 lg:w-[1144px]">
            {/* Greeting */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold m-0 text-dark">Hi, Jane Cooper!</h1>
            </div>

            {/* Dashboard Summary: Current Deposit + Bid Limits */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 bg-white rounded-lg p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-dark">Current Deposit</span>
                </div>
                <div className="flex items-end gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[32px] leading-[1.125] font-bold text-dark">$10,000.00</span>
                    <span className="text-sm text-muted">Available for bidding</span>
                  </div>
                  <Button
                    href="/account/deposit"
                    variant="primary"
                    size="md"
                    className="rounded-md px-6"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
              <div className="w-full lg:w-[384px] bg-white rounded-lg p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-dark">Bid Limits</span>
                </div>
                <p className="text-sm text-dark whitespace-pre-line m-0">
                  With your current deposit, you can have up to 15 active bids simultaneously.
{`\n`}
                  Currently active: 12 bids
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-muted">
                    <span>Used</span>
                    <span className="text-dark">12 / 15</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#ECECF0] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#030213]"
                      style={{ width: "80%" }}
                      role="progressbar"
                      aria-valuenow={12}
                      aria-valuemin={0}
                      aria-valuemax={15}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Bids Section */}
            <section className="bg-white rounded-lg p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold m-0 text-dark">Active Bids</h2>
              </div>
              <div className="flex flex-col gap-2">
                {activeBids.map((bid, i) => (
                  <div key={`${bid.lotId}-${i}`} className="flex items-center w-full">
                    <div className="relative w-[168px] h-[112px] shrink-0 rounded-l-[14px] overflow-hidden bg-surface">
                      <Image src={bid.image} alt="" fill sizes="168px" className="object-cover" />
                    </div>
                    <div className="flex-1 h-[112px] bg-surface rounded-r-[14px] p-4 flex items-center justify-between gap-6">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-base font-bold text-dark">{bid.title}</span>
                          <span className="text-sm text-muted">{bid.lotId}</span>
                        </div>
                        <span className="text-sm text-dark">{bid.timeRemaining}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted">Status</span>
                        <span
                          className={
                            "inline-flex w-fit rounded-[4px] px-2 py-1 text-xs font-bold text-white " +
                            (bid.status === "Leading" ? "bg-success" : "bg-error")
                          }
                        >
                          {bid.status}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted">Current Bid</span>
                        <span className="text-base font-bold text-dark">{bid.currentBid}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted">Your Bid</span>
                        <span className="text-base font-bold text-dark">{bid.yourBid}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted">Next Min Bid</span>
                        <span className="text-base font-bold text-dark">{bid.nextMinBid}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-muted">Auction</span>
                        <span className="inline-flex w-fit rounded-[4px] px-2 py-1 text-xs font-bold text-white bg-copart">
                          Copart
                        </span>
                      </div>
                      <Button
                        href="/vehicle"
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
            </section>
          </div>
        </div>

        {/* Recently Viewed (full width) */}
        <section className="w-full max-w-[1320px] mx-auto flex flex-col gap-4">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl font-bold m-0 text-dark">Recently Viewed</h2>
            <Link
              href="/search"
              className="bg-white rounded-lg px-4 py-2 text-sm font-bold text-dark no-underline"
            >
              View all
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory">
            {recentlyViewedCards.map((card, i) => (
              <div key={i} className="snap-start shrink-0">
                <VehicleCard card={card} imageBadge="Active" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
