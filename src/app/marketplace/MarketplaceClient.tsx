"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "../_components/Button";
import { Pagination } from "../_components/Pagination";

type VehicleSpec = {
  label: string;
  value: string;
  hint?: string;
};

export type MarketplaceVehicle = {
  title: string;
  image: string;
  market: string;
  lotId: string;
  price: string;
  country: string;
  availability: "In stock" | "On request";
  specs: VehicleSpec[];
};

type FeaturedLot = {
  title: string;
  subtitle: string;
  image: string;
  price: string;
  market: string;
  specs: VehicleSpec[];
};

type MarketplaceClientProps = {
  markets: string[];
  featuredLot: FeaturedLot;
  vehicles: MarketplaceVehicle[];
};

const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];
const availabilityOptions: Array<MarketplaceVehicle["availability"] | "All"> = [
  "All",
  "In stock",
  "On request",
];

const parsePrice = (value: string) => Number(value.replace(/[^0-9.]/g, ""));

export function MarketplaceClient({
  markets,
  featuredLot,
  vehicles,
}: MarketplaceClientProps) {
  const [activeMarket, setActiveMarket] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(sortOptions[0]);
  const [availabilityValue, setAvailabilityValue] = useState<
    (typeof availabilityOptions)[number]
  >(availabilityOptions[0]);

  const filteredVehicles = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase();
    const filtered = vehicles.filter((vehicle) => {
      const matchesMarket =
        activeMarket === "All" || vehicle.market === activeMarket;
      if (!matchesMarket) return false;
      const matchesAvailability =
        availabilityValue === "All" ||
        vehicle.availability === availabilityValue;
      if (!matchesAvailability) return false;
      if (!normalized) return true;
      return (
        vehicle.title.toLowerCase().includes(normalized) ||
        vehicle.lotId.toLowerCase().includes(normalized)
      );
    });

    const sortable = filtered.map((vehicle, index) => ({ vehicle, index }));
    sortable.sort((a, b) => {
      if (sortValue === "Price: Low to High") {
        return (
          parsePrice(a.vehicle.price) - parsePrice(b.vehicle.price) ||
          a.index - b.index
        );
      }
      if (sortValue === "Price: High to Low") {
        return (
          parsePrice(b.vehicle.price) - parsePrice(a.vehicle.price) ||
          a.index - b.index
        );
      }
      return a.index - b.index;
    });

    return sortable.map((item) => item.vehicle);
  }, [activeMarket, availabilityValue, searchValue, sortValue, vehicles]);

  const marketTabs = useMemo(() => ["All", ...markets], [markets]);
  const hasFilters =
    activeMarket !== "All" ||
    availabilityValue !== "All" ||
    searchValue.trim().length > 0;

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4 flex-wrap max-tablet:items-start">
        <div
          className="flex items-center gap-3"
          role="tablist"
          aria-label="Market selection"
        >
          {marketTabs.map((market) => (
            <Button
              key={market}
              type="button"
              role="tab"
              aria-selected={activeMarket === market}
              variant={activeMarket === market ? "outline" : "outlineInactive"}
              size="sm"
              className="text-base"
              onClick={() => setActiveMarket(market)}
            >
              {market}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            className="w-80 flex-1 min-w-[240px] h-10 border-0 rounded-[14px] py-3 px-4 bg-surface text-xs leading-[14px] text-foreground placeholder:text-muted max-tablet:w-full"
            placeholder="Search make, model, or stock ID"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            type="search"
          />
          <select
            className="h-10 border-0 rounded-[14px] px-[14px] bg-surface text-xs text-foreground min-w-[160px] flex-[0_1_160px]"
            value={availabilityValue}
            onChange={(event) =>
              setAvailabilityValue(
                event.target.value as (typeof availabilityOptions)[number],
              )
            }
            aria-label="Availability"
          >
            {availabilityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            className="h-10 border-0 rounded-[14px] px-[14px] bg-surface text-xs text-foreground min-w-[180px] flex-[0_1_200px]"
            value={sortValue}
            onChange={(event) => setSortValue(event.target.value)}
            aria-label="Sort vehicles"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="h-10 border-0 rounded-[14px] px-5 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-foreground text-sm font-semibold cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 max-tablet:flex-col max-tablet:items-start">
        <span className="text-sm text-muted">
          Found: {filteredVehicles.length}
        </span>
        {hasFilters ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveMarket("All");
              setSearchValue("");
              setAvailabilityValue("All");
            }}
          >
            Reset filters
          </Button>
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-4 max-wide:grid-cols-2 max-tablet:grid-cols-1">
        {[
          {
            title: "Verified suppliers",
            text: "Document and history verification.",
          },
          {
            title: "Battery diagnostics",
            text: "SoH checks and warranty details.",
          },
          {
            title: "Door-to-door delivery",
            text: "From warehouse to customs clearance.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-lg p-4 flex flex-col gap-1.5"
          >
            <strong className="text-sm text-foreground">{item.title}</strong>
            <span className="text-[13px] text-muted">{item.text}</span>
          </div>
        ))}
      </div>

      <article className="bg-white rounded-lg p-4 grid grid-cols-[1.2fr_1fr] gap-6 shadow-card-soft max-tablet:grid-cols-1">
        <div className="relative h-80 rounded-[14px] overflow-hidden bg-surface max-tablet:h-[260px] max-narrow:h-[220px]">
          <Image
            src={featuredLot.image}
            alt=""
            fill
            sizes="(max-width: 1279px) 100vw, 840px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center justify-center py-1 px-2.5 rounded-full bg-surface text-xs font-semibold text-foreground w-fit">
              Featured vehicle
            </span>
            <h2 className="m-0 text-xl leading-6 font-bold text-foreground">
              {featuredLot.title}
            </h2>
            <p className="m-0 text-sm leading-[18px] text-muted">
              {featuredLot.subtitle}
            </p>
          </div>
          <div className="grid gap-2">
            {featuredLot.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-3 pb-2 border-b border-surface text-sm leading-4"
              >
                <span className="inline-flex items-center gap-1.5 text-muted font-normal">
                  {spec.label}
                  {spec.hint ? (
                    <button
                      type="button"
                      className="w-4 h-4 rounded-full border border-border text-muted inline-flex items-center justify-center text-[11px] leading-none cursor-help bg-transparent p-0"
                      title={spec.hint}
                      aria-label={spec.hint}
                    >
                      i
                    </button>
                  ) : null}
                </span>
                <strong className="text-foreground font-bold">
                  {spec.value}
                </strong>
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-surface text-sm leading-4">
              <span className="text-muted">Country of origin</span>
              <strong className="text-foreground font-bold">
                {featuredLot.market}
              </strong>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="text-xl font-bold text-foreground">
              {featuredLot.price}
            </div>
            <Link
              href="/vehicle"
              className="h-11 border-0 rounded-[14px] px-6 bg-primary text-foreground text-sm font-semibold cursor-pointer inline-flex items-center justify-center no-underline"
            >
              View details
            </Link>
          </div>
        </div>
      </article>

      {filteredVehicles.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center text-muted">
          <h3 className="m-0 mb-2 text-lg text-foreground">
            No vehicles found
          </h3>
          <p className="m-0 text-sm">
            Try a different market or clear your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 items-stretch max-wide:grid-cols-3 max-tablet:grid-cols-2 max-narrow:grid-cols-1">
          {filteredVehicles.map((card) => (
            <Link
              key={`${card.title}-${card.lotId}`}
              href="/vehicle"
              className="block w-full min-w-0 no-underline text-inherit cursor-pointer"
            >
              <article className="bg-white rounded-lg overflow-hidden flex flex-col items-stretch w-full min-w-0 max-w-none h-full">
                <div className="relative h-[236px] w-full bg-surface">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 1279px) 100vw, 288px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col items-stretch gap-2 p-4 bg-white rounded-b-lg w-full">
                  <h3 className="text-base font-bold leading-5 m-0">
                    {card.title}
                  </h3>
                  <div className="flex flex-col self-stretch w-full">
                    {card.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center justify-between gap-2 py-2 border-b border-surface text-sm leading-4"
                      >
                        <span className="inline-flex items-center gap-1.5 text-muted font-normal">
                          {spec.label}
                          {spec.hint ? (
                            <button
                              type="button"
                              className="w-4 h-4 rounded-full border border-border text-muted inline-flex items-center justify-center text-[11px] leading-none cursor-help bg-transparent p-0"
                              title={spec.hint}
                              aria-label={spec.hint}
                            >
                              i
                            </button>
                          ) : null}
                        </span>
                        <strong className="font-bold text-foreground">
                          {spec.value}
                        </strong>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 self-stretch w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-sm font-semibold ${
                          card.availability === "On request"
                            ? "text-primary"
                            : "text-success"
                        }`}
                      >
                        {card.availability}
                      </span>
                      <span className="bg-primary text-black rounded-lg py-1 px-2 text-xs">
                        {card.country}
                      </span>
                    </div>
                    <div className="text-base font-bold text-foreground">
                      {card.price}
                    </div>
                    <span className="inline-flex items-center justify-center w-full min-h-11 rounded-sm bg-primary hover:bg-primary-hover active:bg-primary-pressed text-foreground text-sm font-bold">
                      Details
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Pagination pages={[1, 2, 3, 4, 5, "...", 24]} current={1} />
      </div>
    </section>
  );
}
