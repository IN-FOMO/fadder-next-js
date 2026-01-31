"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchLots, type SearchParams } from "@/hooks/useSearchLots";
import { useFacets } from "@/hooks/useFacets";
import type { components } from "@/types/api";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { Button } from "../_components/Button";
import { Pagination } from "../_components/Pagination";
import { VehicleCard, type VehicleCardData } from "../_components/VehicleCard";

// VIN is exactly 17 alphanumeric characters (no I, O, Q)
function isValidVin(value: string): boolean {
  const cleaned = value.trim().toUpperCase();
  if (cleaned.length !== 17) return false;
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(cleaned);
}

type LotSummaryDto = components["schemas"]["LotSummaryDto"];

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

function formatOdometer(odometer?: number, unit?: string): string {
  if (!odometer) return "N/A";
  const miles = unit === "km" ? Math.round(odometer * 0.621371) : odometer;
  const km = unit === "km" ? odometer : Math.round(odometer * 1.60934);
  return `${miles.toLocaleString()} mi (${km.toLocaleString()} km)`;
}

function lotToVehicleCard(lot: LotSummaryDto): VehicleCardData & { images?: string[] } {
  return {
    title: lot.title || `${lot.year} ${lot.make} ${lot.model}`,
    image: lot.cdnImageUrl || lot.primaryImageUrl || "/figma/images/placeholder.png",
    images: lot.imageUrls,
    odometer: formatOdometer(lot.odometer, lot.odometerUnit),
    engine: lot.engineType || "N/A",
    transmission: lot.transmission || "N/A",
    fuel: lot.fuelType || "N/A",
    drive: lot.driveType || "N/A",
    timer: formatTimer(lot.saleDate),
    auction: lot.provider === "COPART" ? "Copart" : "IAAI",
    bid: lot.currentBid ? `$${lot.currentBid.toLocaleString()}` : "No bids",
    provider: lot.provider,
    externalLotId: lot.externalLotId,
  };
}

const quickFilters = [
  { label: "Vehicles Only" },
  { label: "Newly added vehicles" },
  { label: "Exclude upcoming auction vehicles" },
  { label: "Show watchlist lots only" },
];

const collapsedFilters = [
  "Vehicle type",
  "Make",
  "Model",
  "Engine type",
  "Transmission",
  "Fuel type",
  "Drive train",
  "Cylinder",
  "Location",
  "Body style",
  "Search near ZIP code",
  "Sale date",
];

const expandableFilters = [
  { title: "Vehicle type", items: [] as { label: string; checked: boolean }[] },
  { title: "Make", searchPlaceholder: "Search", items: [] as { label: string; checked: boolean }[] },
  { title: "Model", searchPlaceholder: "Search", items: [] as { label: string; checked: boolean }[] },
  { title: "Engine type", items: [] as { label: string; checked: boolean }[] },
  { title: "Transmission", items: [] as { label: string; checked: boolean }[] },
  { title: "Fuel type", items: [] as { label: string; checked: boolean }[] },
  { title: "Drive train", items: [] as { label: string; checked: boolean }[] },
  { title: "Cylinder", items: [] as { label: string; checked: boolean }[] },
  { title: "Location", searchPlaceholder: "Search", items: [] as { label: string; checked: boolean }[] },
  { title: "Body style", items: [] as { label: string; checked: boolean }[] },
  { title: "Search near ZIP code", inputPlaceholder: "Zip code" },
  { title: "Sale date", inputPlaceholder: "mm/dd/yyyy" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") ?? "";
  const makeParam = searchParams.get("make") ?? "";

  const [filtersCollapsed, setFiltersCollapsed] = useState(true);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [quickState, setQuickState] = useState<Record<string, boolean>>({});
  const [auctionState, setAuctionState] = useState({ All: true, Copart: false, IAAI: false });
  const [conditionState, setConditionState] = useState<Record<string, boolean>>({});
  const [lotStatusState, setLotStatusState] = useState({ Active: false, Sold: false, Upcoming: false });
  const [collapsedState, setCollapsedState] = useState<Record<string, boolean>>({});
  const [expandedState, setExpandedState] = useState<Record<string, { search: string; items: { label: string; checked: boolean }[]; input: string }>>({});
  const [damageSearchValue, setDamageSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [yearRange, setYearRange] = useState({ min: 1900, max: 2025 });

  const filtersChangedRef = useRef(false);
  const autoFetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // API integration
  const { data: searchData, isLoading, error, search } = useSearchLots();
  const { facets } = useFacets();

  // Build filter items from facets
  const facetMakeItems = useMemo(() => {
    if (!facets?.makes) return [];
    return facets.makes.map((make) => ({
      label: make,
      checked: make.toLowerCase() === makeParam.toLowerCase()
    }));
  }, [facets?.makes, makeParam]);

  const facetDamageTypes = useMemo(() => {
    if (!facets?.damageTypes) return [];
    return facets.damageTypes.map((type) => ({ label: type, checked: false }));
  }, [facets?.damageTypes]);

  const facetFuelTypes = useMemo(() => {
    if (!facets?.fuelTypes) return [];
    return facets.fuelTypes.map((type) => ({ label: type, checked: false }));
  }, [facets?.fuelTypes]);

  const facetTransmissionTypes = useMemo(() => {
    if (!facets?.transmissionTypes) return [];
    return facets.transmissionTypes.map((type) => ({ label: type, checked: false }));
  }, [facets?.transmissionTypes]);

  const facetDriveTypes = useMemo(() => {
    if (!facets?.driveTypes) return [];
    return facets.driveTypes.map((type) => ({ label: type, checked: false }));
  }, [facets?.driveTypes]);

  const facetBodyTypes = useMemo(() => {
    if (!facets?.bodyTypes) return [];
    return facets.bodyTypes.map((type) => ({ label: type, checked: false }));
  }, [facets?.bodyTypes]);

  // Build search params from filter state
  const buildSearchParams = useCallback((): SearchParams => {
    const providers: ("COPART" | "IAAI")[] = [];
    if (!auctionState.All) {
      if (auctionState.Copart) providers.push("COPART");
      if (auctionState.IAAI) providers.push("IAAI");
    }

    const selectedDamageTypes = Object.entries(conditionState)
      .filter(([_, checked]) => checked)
      .map(([label]) => label);

    const makeSection = expandedState["Make"];
    const selectedMakes = (makeSection?.items ?? [])
      .filter((item) => item.checked)
      .map((item) => item.label);

    const modelSection = expandedState["Model"];
    const selectedModels = (modelSection?.items ?? [])
      .filter((item) => item.checked)
      .map((item) => item.label);

    const fuelSection = expandedState["Fuel type"];
    const selectedFuelTypes = (fuelSection?.items ?? [])
      .filter((item) => item.checked)
      .map((item) => item.label);

    const transSection = expandedState["Transmission"];
    const selectedTransmissions = (transSection?.items ?? [])
      .filter((item) => item.checked)
      .map((item) => item.label);

    const driveSection = expandedState["Drive train"];
    const selectedDriveTypes = (driveSection?.items ?? [])
      .filter((item) => item.checked)
      .map((item) => item.label);

    const bodySection = expandedState["Body style"];
    const selectedBodyStyles = (bodySection?.items ?? [])
      .filter((item) => item.checked)
      .map((item) => item.label);

    // Check if search query is a VIN
    const isVinSearch = isValidVin(searchQuery);

    return {
      keyword: isVinSearch ? undefined : (searchQuery || undefined),
      vin: isVinSearch ? searchQuery.trim().toUpperCase() : undefined,
      providers: providers.length > 0 ? providers : undefined,
      make: selectedMakes.length > 0 ? selectedMakes[0] : undefined,
      model: selectedModels.length > 0 ? selectedModels[0] : undefined,
      yearMin: yearRange.min > 1900 ? yearRange.min : undefined,
      yearMax: yearRange.max < 2025 ? yearRange.max : undefined,
      buyNowPriceMin: priceRange.min > 0 ? priceRange.min : undefined,
      buyNowPriceMax: priceRange.max < 100000 ? priceRange.max : undefined,
      damageType: selectedDamageTypes.length > 0 ? selectedDamageTypes : undefined,
      fuelType: selectedFuelTypes.length > 0 ? selectedFuelTypes : undefined,
      transmission: selectedTransmissions.length > 0 ? selectedTransmissions : undefined,
      driveType: selectedDriveTypes.length > 0 ? selectedDriveTypes : undefined,
      bodyStyle: selectedBodyStyles.length > 0 ? selectedBodyStyles : undefined,
      page: currentPage,
      pageSize,
    };
  }, [auctionState, conditionState, expandedState, priceRange, yearRange, searchQuery, currentPage, pageSize]);

  // Check for VIN and redirect directly
  useEffect(() => {
    if (isValidVin(queryParam)) {
      // Search by VIN via API to get the lot
      search({ vin: queryParam.trim().toUpperCase(), page: 1, pageSize: 1 });
    }
  }, [queryParam, search]);

  // Redirect when VIN search returns result
  useEffect(() => {
    if (!searchData?.lots || searchData.lots.length === 0) return;
    if (!isValidVin(queryParam)) return;

    const lot = searchData.lots[0];
    if (lot.provider && lot.externalLotId) {
      router.replace(`/lot/${lot.provider.toLowerCase()}/${lot.externalLotId}`);
    }
  }, [searchData, queryParam, router]);

  // Initial search on mount (if not VIN)
  useEffect(() => {
    if (!isValidVin(queryParam)) {
      const params = buildSearchParams();
      // Include make from URL if present
      if (makeParam) {
        params.make = makeParam;
      }
      search(params);
    }
  }, []);

  // Update filter options when facets load
  useEffect(() => {
    if (!facets) return;

    setExpandedState((prev) => ({
      ...prev,
      Make: { ...prev["Make"], search: prev["Make"]?.search ?? "", input: "", items: facetMakeItems },
      "Engine type": { ...prev["Engine type"], search: "", input: "", items: facetFuelTypes },
      Transmission: { ...prev["Transmission"], search: "", input: "", items: facetTransmissionTypes },
      "Fuel type": { ...prev["Fuel type"], search: "", input: "", items: facetFuelTypes },
      "Drive train": { ...prev["Drive train"], search: "", input: "", items: facetDriveTypes },
      "Body style": { ...prev["Body style"], search: "", input: "", items: facetBodyTypes },
    }));

    if (facetDamageTypes.length > 0) {
      setConditionState(Object.fromEntries(facetDamageTypes.map((item) => [item.label, false])));
    }
  }, [facets, facetMakeItems, facetFuelTypes, facetTransmissionTypes, facetDriveTypes, facetBodyTypes, facetDamageTypes]);

  // Handle URL params
  useEffect(() => {
    if (makeParam && facets?.makes) {
      setExpandedState((prev) => ({
        ...prev,
        Make: {
          ...prev["Make"],
          search: "",
          input: "",
          items: facetMakeItems,
        },
      }));
      // Open Make filter section
      setCollapsedState((prev) => ({ ...prev, Make: true }));
      // Trigger search with make
      filtersChangedRef.current = true;
    }
  }, [makeParam, facets?.makes, facetMakeItems]);

  // Auto-fetch after filter changes (debounced)
  useEffect(() => {
    if (!filtersChangedRef.current) return;

    if (autoFetchTimeoutRef.current) {
      clearTimeout(autoFetchTimeoutRef.current);
    }

    autoFetchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1);
      search({ ...buildSearchParams(), page: 1 });
      filtersChangedRef.current = false;
    }, 800);

    return () => {
      if (autoFetchTimeoutRef.current) {
        clearTimeout(autoFetchTimeoutRef.current);
      }
    };
  }, [auctionState, conditionState, expandedState, lotStatusState, priceRange, yearRange, buildSearchParams, search]);

  // Handle apply filters button
  const handleApplyFilters = useCallback(() => {
    setCurrentPage(1);
    search({ ...buildSearchParams(), page: 1 });
  }, [search, buildSearchParams]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    search({ ...buildSearchParams(), page });
  }, [search, buildSearchParams]);

  // Convert API data to VehicleCardData
  const vehicleCards: VehicleCardData[] = useMemo(() => {
    if (!searchData?.lots) return [];
    return searchData.lots.map(lotToVehicleCard);
  }, [searchData]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setFiltersCollapsed(false);
    }
  }, []);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const activeTags = useMemo(() => {
    const tags: Array<{ id: string; label: string; type: string; value?: string; section?: string }> = [];

    quickFilters.forEach((item) => {
      if (quickState[item.label]) {
        tags.push({ id: `quick:${item.label}`, label: item.label, type: "quick", value: item.label });
      }
    });

    if (!auctionState.All) {
      if (auctionState.Copart) tags.push({ id: "auction:Copart", label: "Copart", type: "auction", value: "Copart" });
      if (auctionState.IAAI) tags.push({ id: "auction:IAAI", label: "IAAI", type: "auction", value: "IAAI" });
    }

    (["Active", "Sold", "Upcoming"] as const).forEach((key) => {
      if (lotStatusState[key]) {
        tags.push({ id: `status:${key}`, label: key, type: "lotStatus", value: key });
      }
    });

    Object.entries(conditionState).forEach(([label, checked]) => {
      if (checked) {
        tags.push({ id: `condition:${label}`, label, type: "condition", value: label });
      }
    });

    Object.entries(expandedState).forEach(([section, state]) => {
      (state.items ?? []).forEach((item) => {
        if (item.checked) {
          tags.push({ id: `expanded:${section}:${item.label}`, label: `${section}: ${item.label}`, type: "expanded", value: item.label, section });
        }
      });
    });

    if (priceRange.min > 0 || priceRange.max < 100000) {
      tags.push({ id: "price", label: `Price: $${priceRange.min} - $${priceRange.max}`, type: "price" });
    }

    if (yearRange.min > 1900 || yearRange.max < 2025) {
      tags.push({ id: "year", label: `Year: ${yearRange.min} - ${yearRange.max}`, type: "year" });
    }

    return tags;
  }, [auctionState, conditionState, expandedState, lotStatusState, priceRange, quickState, yearRange]);

  const handleRemoveTag = (tag: { type: string; value?: string; section?: string }) => {
    filtersChangedRef.current = true;
    switch (tag.type) {
      case "quick":
        if (tag.value) setQuickState((prev) => ({ ...prev, [tag.value!]: false }));
        break;
      case "auction":
        if (tag.value) {
          setAuctionState((prev) => {
            const next = { ...prev, [tag.value as "Copart" | "IAAI"]: false };
            return { ...next, All: !next.Copart && !next.IAAI };
          });
        }
        break;
      case "lotStatus":
        if (tag.value) setLotStatusState((prev) => ({ ...prev, [tag.value as "Active" | "Sold" | "Upcoming"]: false }));
        break;
      case "condition":
        if (tag.value) setConditionState((prev) => ({ ...prev, [tag.value!]: false }));
        break;
      case "expanded":
        if (tag.section && tag.value) {
          setExpandedState((prev) => ({
            ...prev,
            [tag.section!]: {
              ...prev[tag.section!],
              items: prev[tag.section!].items.map((item) =>
                item.label === tag.value ? { ...item, checked: false } : item
              ),
            },
          }));
        }
        break;
      case "price":
        setPriceRange({ min: 0, max: 100000 });
        break;
      case "year":
        setYearRange({ min: 1900, max: 2025 });
        break;
    }
  };

  const resetAll = () => {
    filtersChangedRef.current = true;
    setQuickState({});
    setAuctionState({ All: true, Copart: false, IAAI: false });
    setConditionState(Object.fromEntries(facetDamageTypes.map((item) => [item.label, false])));
    setLotStatusState({ Active: false, Sold: false, Upcoming: false });
    setCollapsedState({});
    setExpandedState((prev) => {
      const newState: typeof prev = {};
      Object.entries(prev).forEach(([key, value]) => {
        newState[key] = { ...value, items: value.items.map((item) => ({ ...item, checked: false })) };
      });
      return newState;
    });
    setDamageSearchValue("");
    setPriceRange({ min: 0, max: 100000 });
    setYearRange({ min: 1900, max: 2025 });
  };

  const priceMinPct = (priceRange.min / 100000) * 100;
  const priceMaxPct = (priceRange.max / 100000) * 100;
  const yearMinPct = ((yearRange.min - 1900) / (2025 - 1900)) * 100;
  const yearMaxPct = ((yearRange.max - 1900) / (2025 - 1900)) * 100;

  // If VIN search, show loading while redirecting
  if (isValidVin(queryParam)) {
    return (
      <main className="page-wrap py-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted">Looking up VIN {queryParam.toUpperCase()}...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrap py-[clamp(16px,2vw,24px)] pb-[clamp(48px,6vw,120px)] flex flex-col gap-4 text-foreground">
      <Breadcrumbs
        items={[
          { label: "Home page", href: "/" },
          { label: "Vehicle Finder", href: "/search" },
          { label: "Search Results" },
        ]}
      />
      <h1 className="text-[32px] font-bold leading-9 m-0 text-foreground">
        Repairable, Salvage and Wrecked Car Auctions
      </h1>
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <aside className="w-full lg:w-[clamp(260px,30vw,424px)] flex flex-col gap-2">
          <div className={`bg-white rounded-2xl p-4 flex flex-col gap-[29px] relative ${filtersCollapsed ? "min-h-[clamp(44px,6vw,52px)] gap-0 overflow-hidden" : ""}`}>
            <div className={`flex items-center justify-between w-full ${filtersCollapsed ? "gap-[clamp(16px,10vw,182px)]" : "gap-8"}`}>
              <h2 className="text-xl font-bold m-0">Search filters</h2>
              <button type="button" className="border-0 bg-transparent text-sm font-semibold text-foreground cursor-pointer text-nowrap p-0" onClick={resetAll}>
                Reset All
              </button>
            </div>
            <button
              type="button"
              className="absolute right-0 top-0 w-[clamp(32px,4vw,38px)] h-[clamp(44px,6vw,52px)] p-0 border-0 bg-transparent inline-flex items-center justify-center cursor-pointer"
              aria-label={filtersCollapsed ? "Expand filters" : "Collapse filters"}
              onClick={() => setFiltersCollapsed((prev) => !prev)}
            >
              <Image src="/figma/icons/filters-arrow-container.svg" alt="" width={38} height={52} />
            </button>
            {!filtersCollapsed && (
              <div className="flex flex-col gap-[18px] w-full">
                {quickFilters.map((item) => {
                  const isChecked = quickState[item.label] ?? false;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className="flex items-center justify-between gap-3 border-0 bg-transparent p-0 cursor-pointer text-left w-full"
                      onClick={() => {
                        filtersChangedRef.current = true;
                        setQuickState((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
                      }}
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        {item.label === "Vehicles Only" && (
                          <Image src="/figma/images/filter-vehicles-only-235a92.png" alt="" width={74} height={20} className="w-[clamp(52px,8vw,74px)] h-[clamp(16px,3vw,20px)] object-cover" />
                        )}
                        <span>{item.label}</span>
                      </span>
                      <Image src={isChecked ? "/figma/icons/icon-checkbox-checked.svg" : "/figma/icons/icon-checkbox.svg"} alt="" width={24} height={24} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {!filtersCollapsed && (
            <>
              <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2 text-base font-semibold leading-5">
                  <span>Auction type</span>
                  <Image src="/figma/icons/icon-minus.svg" alt="" width={24} height={24} />
                </div>
                <div className="flex flex-col gap-[11px]">
                  {(["All", "Copart", "IAAI"] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      className="flex items-center gap-2 border-0 bg-transparent p-0 cursor-pointer"
                      onClick={() => {
                        filtersChangedRef.current = true;
                        if (key === "All") {
                          setAuctionState({ All: true, Copart: false, IAAI: false });
                        } else {
                          setAuctionState((prev) => {
                            const next = { ...prev, [key]: !prev[key], All: false };
                            if (!next.Copart && !next.IAAI) next.All = true;
                            return next;
                          });
                        }
                      }}
                    >
                      <Image src={auctionState[key] ? "/figma/icons/icon-checkbox-checked.svg" : "/figma/icons/icon-checkbox.svg"} alt="" width={24} height={24} />
                      {key === "All" ? <span>All</span> : (
                        <span className={`py-1 px-2 rounded-lg text-xs font-normal text-white ${key === "Copart" ? "bg-copart" : "bg-iaai"}`}>{key}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2 text-base font-semibold leading-5">
                  <span>Lot status</span>
                  <Image src="/figma/icons/icon-minus.svg" alt="" width={24} height={24} />
                </div>
                <div className="flex flex-col gap-[11px]">
                  {(["Active", "Sold", "Upcoming"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      className="flex items-center gap-2 text-sm font-normal border-0 bg-transparent p-0 cursor-pointer"
                      onClick={() => {
                        filtersChangedRef.current = true;
                        setLotStatusState((prev) => ({ ...prev, [status]: !prev[status] }));
                      }}
                    >
                      <Image src={lotStatusState[status] ? "/figma/icons/icon-checkbox-checked.svg" : "/figma/icons/icon-checkbox.svg"} alt="" width={24} height={24} />
                      <span>{status}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2 text-base font-semibold leading-5">
                  <span>Estimated price USD</span>
                  <Image src="/figma/icons/icon-minus.svg" alt="" width={24} height={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted">min</span>
                  <input
                    type="number"
                    className="bg-white rounded-[14px] py-2 px-3 shadow-card-soft border-0 w-full max-w-[clamp(80px,12vw,120px)] outline-none text-center text-xl font-bold text-muted"
                    value={priceRange.min}
                    min={0}
                    max={priceRange.max}
                    onChange={(e) => {
                      filtersChangedRef.current = true;
                      setPriceRange((prev) => ({ ...prev, min: Math.min(Number(e.target.value), prev.max) }));
                    }}
                  />
                  <div className="w-6 h-0.5 bg-muted" />
                  <span className="text-sm text-muted">max</span>
                  <input
                    type="number"
                    className="bg-white rounded-[14px] py-2 px-3 shadow-card-soft border-0 w-full max-w-[clamp(80px,12vw,120px)] outline-none text-center text-xl font-bold text-muted"
                    value={priceRange.max}
                    min={priceRange.min}
                    max={100000}
                    onChange={(e) => {
                      filtersChangedRef.current = true;
                      setPriceRange((prev) => ({ ...prev, max: Math.max(Number(e.target.value), prev.min) }));
                    }}
                  />
                </div>
                <div className="h-1.5 rounded-full bg-border relative flex items-center" style={{ background: `linear-gradient(to right, var(--color-border) ${priceMinPct}%, var(--color-primary) ${priceMinPct}%, var(--color-primary) ${priceMaxPct}%, var(--color-border) ${priceMaxPct}%)` }}>
                  <input type="range" min={0} max={100000} value={priceRange.min} onChange={(e) => { filtersChangedRef.current = true; setPriceRange((prev) => ({ ...prev, min: Math.min(Number(e.target.value), prev.max) })); }} className="range-input-thumb absolute left-0 top-[-7px] w-full h-5 bg-transparent pointer-events-none appearance-none" />
                  <input type="range" min={0} max={100000} value={priceRange.max} onChange={(e) => { filtersChangedRef.current = true; setPriceRange((prev) => ({ ...prev, max: Math.max(Number(e.target.value), prev.min) })); }} className="range-input-thumb absolute left-0 top-[-7px] w-full h-5 bg-transparent pointer-events-none appearance-none" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>${priceRange.min.toLocaleString()}</span>
                  <span className="text-muted">${priceRange.max.toLocaleString()}</span>
                </div>
                <Button variant="primary" size="md" onClick={handleApplyFilters}>Apply</Button>
              </div>

              <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2 text-base font-semibold leading-5">
                  <span>Year of manufacture</span>
                  <Image src="/figma/icons/icon-minus.svg" alt="" width={24} height={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted">from</span>
                  <input
                    type="number"
                    className="bg-white rounded-[14px] py-2 px-3 shadow-card-soft border-0 w-full max-w-[clamp(80px,12vw,120px)] outline-none text-center text-xl font-bold text-muted"
                    value={yearRange.min}
                    min={1900}
                    max={yearRange.max}
                    onChange={(e) => {
                      filtersChangedRef.current = true;
                      setYearRange((prev) => ({ ...prev, min: Math.min(Number(e.target.value), prev.max) }));
                    }}
                  />
                  <div className="w-6 h-0.5 bg-muted" />
                  <span className="text-sm text-muted">to</span>
                  <input
                    type="number"
                    className="bg-white rounded-[14px] py-2 px-3 shadow-card-soft border-0 w-full max-w-[clamp(80px,12vw,120px)] outline-none text-center text-xl font-bold text-muted"
                    value={yearRange.max}
                    min={yearRange.min}
                    max={2025}
                    onChange={(e) => {
                      filtersChangedRef.current = true;
                      setYearRange((prev) => ({ ...prev, max: Math.max(Number(e.target.value), prev.min) }));
                    }}
                  />
                </div>
                <div className="h-1.5 rounded-full bg-border relative flex items-center" style={{ background: `linear-gradient(to right, var(--color-border) ${yearMinPct}%, var(--color-primary) ${yearMinPct}%, var(--color-primary) ${yearMaxPct}%, var(--color-border) ${yearMaxPct}%)` }}>
                  <input type="range" min={1900} max={2025} value={yearRange.min} onChange={(e) => { filtersChangedRef.current = true; setYearRange((prev) => ({ ...prev, min: Math.min(Number(e.target.value), prev.max) })); }} className="range-input-thumb absolute left-0 top-[-7px] w-full h-5 bg-transparent pointer-events-none appearance-none" />
                  <input type="range" min={1900} max={2025} value={yearRange.max} onChange={(e) => { filtersChangedRef.current = true; setYearRange((prev) => ({ ...prev, max: Math.max(Number(e.target.value), prev.min) })); }} className="range-input-thumb absolute left-0 top-[-7px] w-full h-5 bg-transparent pointer-events-none appearance-none" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>{yearRange.min}</span>
                  <span className="text-muted">{yearRange.max}</span>
                </div>
                <Button variant="primary" size="md" onClick={handleApplyFilters}>Apply</Button>
              </div>

              {facetDamageTypes.length > 0 && (
                <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2 text-base font-semibold leading-5">
                    <span>Damage type</span>
                    <Image src="/figma/icons/icon-minus.svg" alt="" width={24} height={24} />
                  </div>
                  <label className="flex items-center gap-2.5 bg-surface rounded-[14px] p-3 text-base text-muted min-h-[clamp(40px,5vw,44px)]">
                    <input placeholder="Search" value={damageSearchValue} onChange={(e) => setDamageSearchValue(e.target.value)} className="border-0 bg-transparent outline-none w-full text-base leading-5 text-muted placeholder:text-muted" />
                    <Image src="/figma/icons/icon-search-rounded.svg" alt="" width={24} height={24} />
                  </label>
                  <div className="flex flex-col gap-[11px] max-h-[200px] overflow-y-auto">
                    {facetDamageTypes
                      .filter((item) => item.label.toLowerCase().includes(damageSearchValue.toLowerCase()))
                      .map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          className="flex items-center gap-2 text-sm font-normal border-0 bg-transparent p-0 cursor-pointer text-left w-full"
                          onClick={() => {
                            filtersChangedRef.current = true;
                            setConditionState((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
                          }}
                        >
                          <Image src={conditionState[item.label] ? "/figma/icons/icon-checkbox-checked.svg" : "/figma/icons/icon-checkbox.svg"} alt="" width={24} height={24} />
                          <span>{item.label}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {collapsedFilters.map((title) => {
                const isOpen = collapsedState[title] ?? false;
                const section = expandableFilters.find((item) => item.title === title);
                const sectionState = expandedState[title];
                const isScrollable = title === "Vehicle type" || title === "Make";
                const hasItems = sectionState?.items && sectionState.items.length > 0;

                return (
                  <div key={title} className={`flex flex-col gap-3 ${isOpen ? "bg-white rounded-2xl p-4 gap-4 w-full" : ""} ${isOpen && isScrollable ? "max-h-[clamp(280px,40vw,476px)] overflow-hidden" : ""}`}>
                    <button
                      type="button"
                      className={`flex items-center justify-between p-4 rounded-2xl bg-white text-base font-semibold leading-5 border-0 cursor-pointer w-full ${isOpen ? "p-0 bg-transparent rounded-none" : ""}`}
                      onClick={() => setCollapsedState((prev) => ({ ...prev, [title]: !prev[title] }))}
                    >
                      <span>{title}</span>
                      <Image src={isOpen ? "/figma/icons/icon-minus.svg" : "/figma/icons/icon-plus.svg"} alt="" width={24} height={24} />
                    </button>
                    {isOpen && section && (
                      <div className={`flex flex-col gap-[11px] ${isScrollable ? "flex-1 min-h-0" : ""}`}>
                        {title === "Search near ZIP code" && (
                          <>
                            <div className="flex items-center gap-1">
                              <label className="flex items-center gap-2.5 bg-surface rounded-[14px] p-3 min-h-[clamp(40px,5vw,44px)] flex-1">
                                <input
                                  placeholder="Zip code"
                                  value={sectionState?.input ?? ""}
                                  onChange={(e) => setExpandedState((prev) => ({ ...prev, [title]: { ...prev[title], input: e.target.value } }))}
                                  className="border-0 bg-transparent outline-none w-full text-base leading-5 text-dark placeholder:text-muted"
                                />
                              </label>
                              <div className="bg-surface rounded-[14px] py-2.5 px-3 inline-flex items-center gap-1 text-base leading-5 text-muted whitespace-nowrap">
                                <span>50 mi</span>
                                <Image src="/figma/icons/icon-arrow-down.svg" alt="" width={24} height={24} />
                              </div>
                            </div>
                            <Button variant="primary" size="md" onClick={handleApplyFilters}>Search</Button>
                          </>
                        )}
                        {section.searchPlaceholder && title !== "Search near ZIP code" && (
                          <label className="flex items-center gap-2.5 bg-surface rounded-[14px] p-3 min-h-[clamp(40px,5vw,44px)]">
                            <input
                              placeholder={section.searchPlaceholder}
                              value={sectionState?.search ?? ""}
                              onChange={(e) => setExpandedState((prev) => ({ ...prev, [title]: { ...prev[title], search: e.target.value } }))}
                              className="border-0 bg-transparent outline-none w-full text-base leading-5 text-dark placeholder:text-muted"
                            />
                            <Image src="/figma/icons/icon-search-rounded.svg" alt="" width={24} height={24} />
                          </label>
                        )}
                        {section.inputPlaceholder && title !== "Search near ZIP code" && (
                          <label className="flex items-center gap-2.5 bg-surface rounded-[14px] p-3 min-h-[clamp(40px,5vw,44px)]">
                            <input
                              placeholder={section.inputPlaceholder}
                              value={sectionState?.input ?? ""}
                              onChange={(e) => setExpandedState((prev) => ({ ...prev, [title]: { ...prev[title], input: e.target.value } }))}
                              className="border-0 bg-transparent outline-none w-full text-base leading-5 text-dark placeholder:text-muted"
                            />
                          </label>
                        )}
                        {hasItems && (
                          <div className={`flex flex-col gap-[11px] w-full ${isScrollable ? "flex-1 min-h-0 overflow-y-auto" : ""}`}>
                            {(sectionState?.items ?? [])
                              .filter((item) => !section.searchPlaceholder || item.label.toLowerCase().includes((sectionState?.search ?? "").toLowerCase()))
                              .map((item) => (
                                <button
                                  key={item.label}
                                  type="button"
                                  className="flex items-center gap-2 border-0 bg-transparent p-0 cursor-pointer text-left w-full text-sm font-normal"
                                  onClick={() => {
                                    filtersChangedRef.current = true;
                                    setExpandedState((prev) => ({
                                      ...prev,
                                      [title]: {
                                        ...prev[title],
                                        items: prev[title].items.map((current) =>
                                          current.label === item.label ? { ...current, checked: !current.checked } : current
                                        ),
                                      },
                                    }));
                                  }}
                                >
                                  <Image src={item.checked ? "/figma/icons/icon-checkbox-checked.svg" : "/figma/icons/icon-checkbox.svg"} alt="" width={24} height={24} />
                                  <span>{item.label}</span>
                                </button>
                              ))}
                          </div>
                        )}
                        {!hasItems && section.items !== undefined && title !== "Search near ZIP code" && title !== "Sale date" && (
                          <p className="text-sm text-muted">Loading options...</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </aside>

        <section className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="bg-white rounded-r-2xl py-4 pl-[30px] pr-3.5 text-base font-bold leading-5">
              Results {searchData?.total ?? 0}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="flex items-center justify-between gap-3 py-3.5 px-4 bg-white rounded-2xl border-0 min-w-[clamp(90px,12vw,130px)] text-base font-bold cursor-pointer leading-5 text-nowrap">
                <span>20 cards</span>
                <Image src="/figma/icons/icon-arrow-down.svg" alt="" width={24} height={24} />
              </button>
              <button type="button" className="flex items-center justify-between gap-3 py-3.5 px-4 bg-white rounded-2xl border-0 min-w-[clamp(90px,12vw,130px)] text-base font-bold cursor-pointer leading-5 text-nowrap">
                <span>Sort by</span>
                <Image src="/figma/icons/icon-arrow-down.svg" alt="" width={24} height={24} />
              </button>
            </div>
          </div>

          {activeTags.length > 0 && (
            <div className="flex flex-wrap gap-2 py-2.5">
              {activeTags.map((item) => (
                <button key={item.id} type="button" className="inline-flex items-center gap-2 py-1 px-3 bg-white rounded-2xl text-sm font-bold border-0 cursor-pointer" onClick={() => handleRemoveTag(item)}>
                  <span>{item.label}</span>
                  <Image src="/figma/icons/icon-cross-small.svg" alt="" width={24} height={24} />
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: pageSize }).map((_, index) => (
                <div key={`skeleton-${index}`} className="bg-white rounded-[16px] overflow-hidden w-full min-h-[400px] animate-pulse">
                  <div className="h-[200px] bg-surface" />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="h-5 bg-surface rounded w-3/4" />
                    <div className="h-4 bg-surface rounded w-full" />
                    <div className="h-4 bg-surface rounded w-full" />
                    <div className="h-4 bg-surface rounded w-2/3" />
                    <div className="h-10 bg-surface rounded w-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-muted mb-4">Failed to load search results</p>
              <Button onClick={handleApplyFilters}>Try Again</Button>
            </div>
          ) : vehicleCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-muted">No vehicles found matching your criteria</p>
              <p className="text-sm text-muted mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {vehicleCards.map((card, index) => (
                <VehicleCard key={`${card.provider}-${card.externalLotId}-${index}`} card={card} className="w-full" />
              ))}
            </div>
          )}

          {searchData && searchData.totalPages > 1 && (
            <div className="mt-2">
              <Pagination
                pages={Array.from({ length: Math.min(searchData.totalPages, 7) }, (_, i) => i + 1)}
                current={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="page-wrap py-6 text-muted">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
