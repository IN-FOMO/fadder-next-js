"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Pagination } from "../_components/Pagination";
import pageStyles from "../page.module.css";
import styles from "./marketplace.module.css";

type VehicleSpec = {
  label: string;
  value: string;
  hint?: string;
};

type MarketplaceVehicle = {
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

export function MarketplaceClient({ markets, featuredLot, vehicles }: MarketplaceClientProps) {
  const [activeMarket, setActiveMarket] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(sortOptions[0]);
  const [availabilityValue, setAvailabilityValue] = useState<(typeof availabilityOptions)[number]>(
    availabilityOptions[0]
  );

  const filteredVehicles = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase();
    const filtered = vehicles.filter((vehicle) => {
      const matchesMarket = activeMarket === "All" || vehicle.market === activeMarket;
      if (!matchesMarket) return false;
    const matchesAvailability =
      availabilityValue === "All" || vehicle.availability === availabilityValue;
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
        return parsePrice(a.vehicle.price) - parsePrice(b.vehicle.price) || a.index - b.index;
      }
      if (sortValue === "Price: High to Low") {
        return parsePrice(b.vehicle.price) - parsePrice(a.vehicle.price) || a.index - b.index;
      }
      return a.index - b.index;
    });

    return sortable.map((item) => item.vehicle);
  }, [activeMarket, availabilityValue, searchValue, sortValue, vehicles]);

  const marketTabs = useMemo(() => ["All", ...markets], [markets]);
  const hasFilters =
    activeMarket !== "All" || availabilityValue !== "All" || searchValue.trim().length > 0;

  return (
    <section className={styles.section}>
      <div className={styles.controlsRow}>
        <div className={pageStyles.toggleTabs} role="tablist" aria-label="Market selection">
          {marketTabs.map((market) => (
            <button
              key={market}
              type="button"
              role="tab"
              aria-selected={activeMarket === market}
              className={activeMarket === market ? pageStyles.tabActive : pageStyles.tab}
              onClick={() => setActiveMarket(market)}
            >
              {market}
            </button>
          ))}
        </div>
        <div className={styles.searchRow}>
          <input
            className={styles.searchInput}
            placeholder="Search make, model, or stock ID"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            type="search"
          />
          <select
            className={styles.filterSelect}
            value={availabilityValue}
            onChange={(event) =>
              setAvailabilityValue(event.target.value as typeof availabilityOptions[number])
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
            className={styles.sortSelect}
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
          <button type="button" className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>

      <div className={styles.resultsRow}>
        <span className={styles.resultCount}>Found: {filteredVehicles.length}</span>
        {hasFilters ? (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              setActiveMarket("All");
              setSearchValue("");
              setAvailabilityValue("All");
            }}
          >
            Reset filters
          </button>
        ) : null}
      </div>

      <div className={styles.infoCards}>
        {[
          { title: "Verified suppliers", text: "Document and history verification." },
          { title: "Battery diagnostics", text: "SoH checks and warranty details." },
          { title: "Door-to-door delivery", text: "From warehouse to customs clearance." },
        ].map((item) => (
          <div key={item.title} className={styles.infoCard}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <article className={styles.featuredCard}>
        <div className={styles.featuredImage}>
          <Image
            src={featuredLot.image}
            alt=""
            fill
            sizes="(max-width: 1279px) 100vw, 840px"
            className={pageStyles.coverImage}
          />
        </div>
        <div className={styles.featuredContent}>
          <div className={styles.featuredHeader}>
            <span className={styles.lotBadge}>Featured vehicle</span>
            <h2 className={styles.featuredTitle}>{featuredLot.title}</h2>
            <p className={styles.featuredSubtitle}>{featuredLot.subtitle}</p>
          </div>
          <div className={styles.featuredSpecs}>
            {featuredLot.specs.map((spec) => (
              <div key={spec.label} className={styles.specRow}>
                <span className={styles.specLabel}>
                  {spec.label}
                  {spec.hint ? (
                    <span className={styles.infoIcon} title={spec.hint} aria-label={spec.hint}>
                      i
                    </span>
                  ) : null}
                </span>
                <strong>{spec.value}</strong>
              </div>
            ))}
            <div className={styles.specRow}>
              <span>Country of origin</span>
              <strong>{featuredLot.market}</strong>
            </div>
          </div>
          <div className={styles.featuredFooter}>
            <div className={styles.featuredPrice}>{featuredLot.price}</div>
            <Link href="/vehicle" className={styles.ctaButton}>
              View details
            </Link>
          </div>
        </div>
      </article>

      {filteredVehicles.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No vehicles found</h3>
          <p>Try a different market or clear your search.</p>
        </div>
      ) : (
        <div className={styles.cardsGrid}>
          {filteredVehicles.map((card) => (
            <Link
              key={`${card.title}-${card.lotId}`}
              href="/vehicle"
              className={`${pageStyles.vehicleCardLink} ${styles.marketplaceCardLink}`}
            >
              <article className={`${pageStyles.vehicleCard} ${styles.marketplaceCard}`}>
                <div className={pageStyles.vehicleImage}>
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 1279px) 100vw, 288px"
                    className={pageStyles.coverImage}
                  />
                </div>
                <div className={pageStyles.vehicleBody}>
                  <h3>{card.title}</h3>
                  <div className={pageStyles.vehicleSpecList}>
                    {card.specs.map((spec) => (
                      <div key={spec.label} className={styles.marketplaceSpecRow}>
                        <span className={styles.specLabel}>
                          {spec.label}
                          {spec.hint ? (
                            <span className={styles.infoIcon} title={spec.hint} aria-label={spec.hint}>
                              i
                            </span>
                          ) : null}
                        </span>
                        <strong>{spec.value}</strong>
                      </div>
                    ))}
                  </div>
                  <div className={pageStyles.vehicleFooterStack}>
                    <div className={pageStyles.vehicleMetaRow}>
                      <span
                        className={`${styles.availability} ${
                          card.availability === "On request" ? styles.availabilityPending : ""
                        }`}
                      >
                        {card.availability}
                      </span>
                      <span className={styles.countryBadge}>{card.country}</span>
                    </div>
                    <div className={styles.cardPrice}>{card.price}</div>
                    <span className={styles.detailsButton}>Details</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.paginationRow}>
        <Pagination pages={[1, 2, 3, 4, 5, "...", 24]} current={1} />
      </div>
    </section>
  );
}
