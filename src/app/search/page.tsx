"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { Button } from "../_components/Button";
import { Pagination } from "../_components/Pagination";
import { VehicleCard, type VehicleCardData } from "../_components/VehicleCard";

const vehicleCards: VehicleCardData[] = [
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
];

const damageTypeItems = [
  { label: "Normal Wear", count: "(5,533)", checked: false },
  { label: "Low Damage", count: "(18,883)", checked: false },
  { label: "Hail", count: "(8,287)", checked: false },
  { label: "Minor Dent/Scratches", count: "(10,596)", checked: true },
  { label: "Medium - Heavy Damage", count: "(238,374)", checked: false },
  { label: "All Over", count: "(1,753)", checked: false },
  { label: "Biohazard/Chemical", count: "(169)", checked: true },
  { label: "Burn", count: "(115)", checked: true },
  { label: "Burn - Engine", count: "(34)", checked: false },
  { label: "Burn - Interior", count: "(44)", checked: false },
  { label: "Damage History", count: "(106)", checked: false },
  { label: "Frame Damage", count: "(625)", checked: false },
  { label: "Front End", count: "(128,755)", checked: false },
  { label: "Water/Flood Damage", count: "(3,116)", checked: false },
];


const quickFilters = [
  { label: "Vehicles Only", checked: true },
  { label: "Newly added vehicles", checked: false },
  { label: "Exclude upcoming auction vehicles", checked: false },
  { label: "Show watchlist lots only", checked: false },
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
  {
    title: "Vehicle type",
    items: [
      { label: "ATVS", count: "(11)", checked: true },
      { label: "Agriculture and Farm equipment", count: "(1)", checked: false },
      { label: "Boats", count: "(5)", checked: false },
      { label: "Bus", count: "(5)", checked: false },
      { label: "Construction equipment", count: "(1)", checked: false },
      { label: "Heavy Duty Trucks", count: "(4)", checked: false },
      { label: "Industrial Equipment", count: "(1)", checked: false },
      { label: "Jet Skis", count: "(4)", checked: false },
      { label: "Medium Duty Box Trucks", count: "(44)", checked: false },
      { label: "Pickup Trucks", count: "(20)", checked: false },
      { label: "RVs", count: "(27)", checked: false },
      { label: "SUVS", count: "(381)", checked: false },
      { label: "Snowmobile", count: "(1)", checked: false },
      { label: "Trailers", count: "(3)", checked: false },
    ],
  },
  {
    title: "Make",
    searchPlaceholder: "Search",
    items: [
      { label: "Acura", count: "(29)", checked: true },
      { label: "Alfa Romeo", count: "(5)", checked: false },
      { label: "Aspt", count: "(1)", checked: false },
      { label: "Audi", count: "(73)", checked: false },
      { label: "Bentley", count: "(6)", checked: false },
      { label: "Blue Bird", count: "(4)", checked: false },
      { label: "BMW", count: "(111)", checked: false },
      { label: "Buick", count: "(42)", checked: false },
      { label: "Buj", count: "(1)", checked: false },
      { label: "Cadillac", count: "(40)", checked: false },
      { label: "Can Am", count: "(1)", checked: false },
      { label: "Cargopress", count: "(1)", checked: false },
      { label: "Chev", count: "(1)", checked: false },
      { label: "Chevrolet", count: "(265)", checked: false },
    ],
  },
  {
    title: "Model",
    searchPlaceholder: "Search",
    items: [
      { label: "Accord", count: "(420)", checked: false },
      { label: "Camry", count: "(335)", checked: false },
      { label: "Civic", count: "(512)", checked: true },
      { label: "Corolla", count: "(291)", checked: false },
    ],
  },
  {
    title: "Engine type",
    items: [
      { label: "Gas", count: "(10,223)", checked: true },
      { label: "Diesel", count: "(2,104)", checked: false },
      { label: "Hybrid", count: "(1,875)", checked: false },
    ],
  },
  {
    title: "Transmission",
    items: [
      { label: "Automatic", count: "(18,040)", checked: true },
      { label: "Manual", count: "(4,288)", checked: false },
    ],
  },
  {
    title: "Fuel type",
    items: [
      { label: "Gasoline", count: "(19,112)", checked: true },
      { label: "Diesel", count: "(2,204)", checked: false },
      { label: "Electric", count: "(1,012)", checked: false },
    ],
  },
  {
    title: "Drive train",
    items: [
      { label: "FWD", count: "(10,040)", checked: false },
      { label: "RWD", count: "(5,212)", checked: true },
      { label: "AWD", count: "(7,076)", checked: false },
    ],
  },
  {
    title: "Cylinder",
    items: [
      { label: "4 cyl", count: "(8,202)", checked: false },
      { label: "6 cyl", count: "(6,450)", checked: true },
      { label: "8 cyl", count: "(3,120)", checked: false },
    ],
  },
  {
    title: "Location",
    searchPlaceholder: "Search",
    items: [
      { label: "California", count: "(3,204)", checked: true },
      { label: "Florida", count: "(2,108)", checked: false },
      { label: "Texas", count: "(2,907)", checked: false },
    ],
  },
  {
    title: "Body style",
    items: [
      { label: "Coupe", count: "(1,492)", checked: false },
      { label: "Convertible", count: "(821)", checked: false },
      { label: "Wagon", count: "(504)", checked: false },
    ],
  },
  {
    title: "Search near ZIP code",
    inputPlaceholder: "Zip code",
  },
  {
    title: "Sale date",
    inputPlaceholder: "mm/dd/yyyy",
  },
];

const defaultCollapsedState = Object.fromEntries(
  collapsedFilters.map((item) => [
    item,
    item === "Vehicle type" || item === "Make" || item === "Search near ZIP code",
  ]),
) as Record<string, boolean>;

export default function SearchPage() {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [quickState, setQuickState] = useState(
    () =>
      Object.fromEntries(quickFilters.map((item) => [item.label, item.checked])) as Record<
        string,
        boolean
      >,
  );
  const [auctionState, setAuctionState] = useState({
    All: true,
    Copart: false,
    IAAI: false,
  });
  const [conditionState, setConditionState] = useState(
    () =>
      Object.fromEntries(damageTypeItems.map((item) => [item.label, item.checked])) as Record<
        string,
        boolean
      >,
  );
  const [lotStatusState, setLotStatusState] = useState({
    Active: true,
    Sold: false,
    Upcoming: false,
  });
  const [collapsedState, setCollapsedState] = useState(() => defaultCollapsedState);
  const [expandedState, setExpandedState] = useState(
    () =>
      Object.fromEntries(
        expandableFilters.map((section) => [
          section.title,
          {
            search: "",
            items: section.items ?? [],
            input: "",
          },
        ]),
      ) as Record<
        string,
        { search: string; items: { label: string; count: string; checked: boolean }[]; input: string }
      >,
  );
  const [damageSearchValue, setDamageSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [yearRange, setYearRange] = useState({ min: 1900, max: 2025 });

  const activeTags = useMemo(
    () => damageTypeItems.map((item) => item.label).filter((tag) => conditionState[tag]),
    [conditionState],
  );

  const resetAll = () => {
    setQuickState(
      Object.fromEntries(quickFilters.map((item) => [item.label, item.checked])) as Record<
        string,
        boolean
      >,
    );
    setAuctionState({ All: true, Copart: false, IAAI: false });
    setConditionState(
      Object.fromEntries(
        damageTypeItems.map((item) => [item.label, item.checked]),
      ) as Record<string, boolean>,
    );
    setLotStatusState({ Active: true, Sold: false, Upcoming: false });
    setCollapsedState(defaultCollapsedState);
    setExpandedState(
      Object.fromEntries(
        expandableFilters.map((section) => [
          section.title,
          {
            search: "",
            items: section.items ?? [],
            input: "",
          },
        ]),
      ) as Record<
        string,
        { search: string; items: { label: string; count: string; checked: boolean }[]; input: string }
      >,
    );
    setDamageSearchValue("");
    setPriceRange({ min: 0, max: 100000 });
    setYearRange({ min: 1900, max: 2025 });
  };

  const priceMinPct = (priceRange.min / 100000) * 100;
  const priceMaxPct = (priceRange.max / 100000) * 100;
  const yearMinPct = ((yearRange.min - 1900) / (2025 - 1900)) * 100;
  const yearMaxPct = ((yearRange.max - 1900) / (2025 - 1900)) * 100;

  return (
    <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] flex flex-col gap-4 text-foreground">
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
      <div className="flex items-start gap-4">
        <aside className="w-[424px] flex flex-col gap-2">
          <div
            className={`bg-white rounded-2xl p-4 flex flex-col gap-[29px] relative ${
              filtersCollapsed ? "h-[52px] gap-0 overflow-hidden" : ""
            }`}
          >
            <div
              className={`flex items-center justify-between w-[245px] ${
                filtersCollapsed ? "gap-[182px]" : "gap-[130px]"
              }`}
            >
              <h2 className="text-xl font-bold m-0">Search filters</h2>
              <button
                type="button"
                className="border-0 bg-transparent text-sm font-semibold text-foreground cursor-pointer w-14 text-left"
                onClick={resetAll}
              >
                Reset All
              </button>
            </div>
            <button
              type="button"
              className="absolute right-0 top-0 w-[38px] h-[52px] p-0 border-0 bg-transparent inline-flex items-center justify-center cursor-pointer"
              aria-label={filtersCollapsed ? "Expand filters" : "Collapse filters"}
              onClick={() => setFiltersCollapsed((prev) => !prev)}
            >
              <Image
                src="/figma/icons/filters-arrow-container.svg"
                alt=""
                width={38}
                height={52}
              />
            </button>
            {filtersCollapsed ? null : (
              <div className="flex flex-col gap-[18px] w-full">
                {quickFilters.map((item) => {
                  const isChecked = quickState[item.label];
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className={`flex items-center justify-between gap-3 border-0 bg-transparent p-0 cursor-pointer text-left w-full ${
                        item.label === "Vehicles Only" ? "gap-3" : "gap-[38px]"
                      }`}
                      onClick={() =>
                        setQuickState((prev) => ({ ...prev, [item.label]: !prev[item.label] }))
                      }
                    >
                      <span
                        className={`flex items-center gap-2 text-sm font-semibold ${
                          item.label === "Vehicles Only" ? "items-end" : ""
                        }`}
                      >
                        {item.label === "Vehicles Only" ? (
                          <Image
                            src="/figma/images/filter-vehicles-only-235a92.png"
                            alt=""
                            width={74}
                            height={20}
                            className="w-[74px] h-5 object-cover"
                          />
                        ) : null}
                        <span>{item.label}</span>
                      </span>
                      <Image
                        src={
                          isChecked
                            ? "/figma/icons/icon-checkbox-checked.svg"
                            : "/figma/icons/icon-checkbox.svg"
                        }
                        alt=""
                        width={24}
                        height={24}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {filtersCollapsed ? null : (
            <>
              <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2 text-base font-semibold leading-5">
              <span>Auction type</span>
              <Image src="/figma/icons/icon-minus.svg" alt="" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-[11px]">
              <button
                type="button"
                className="flex items-center justify-between gap-2 text-sm font-normal border-0 bg-transparent p-0 cursor-pointer text-left w-full"
                onClick={() =>
                  setAuctionState((prev) => ({ ...prev, All: !prev.All }))
                }
              >
                <span className="flex items-center gap-2">
                  <Image
                    src={
                      auctionState.All
                        ? "/figma/icons/icon-checkbox-checked.svg"
                        : "/figma/icons/icon-checkbox.svg"
                    }
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span>All</span>
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 border-0 bg-transparent p-0 cursor-pointer"
                onClick={() =>
                  setAuctionState((prev) => ({ ...prev, Copart: !prev.Copart }))
                }
              >
                <Image
                  src={
                    auctionState.Copart
                      ? "/figma/icons/icon-checkbox-checked.svg"
                      : "/figma/icons/icon-checkbox.svg"
                  }
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="py-1 px-2 rounded-lg text-xs font-normal text-white bg-copart">
                  Copart
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 border-0 bg-transparent p-0 cursor-pointer"
                onClick={() => setAuctionState((prev) => ({ ...prev, IAAI: !prev.IAAI }))}
              >
                <Image
                  src={
                    auctionState.IAAI
                      ? "/figma/icons/icon-checkbox-checked.svg"
                      : "/figma/icons/icon-checkbox.svg"
                  }
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="py-1 px-2 rounded-lg text-xs font-normal text-white bg-iaai">IAAI</span>
              </button>
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
                  className="flex items-center justify-between gap-2 text-sm font-normal border-0 bg-transparent p-0 cursor-pointer text-left w-full"
                  onClick={() =>
                    setLotStatusState((prev) => ({ ...prev, [status]: !prev[status] }))
                  }
                >
                  <span className="flex items-center gap-2">
                    <Image
                      src={
                        lotStatusState[status]
                          ? "/figma/icons/icon-checkbox-checked.svg"
                          : "/figma/icons/icon-checkbox.svg"
                      }
                      alt=""
                      width={24}
                      height={24}
                    />
                    <span>{status}</span>
                  </span>
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
                className="bg-white rounded-[14px] py-2 px-3 shadow-card-soft border-0 w-full max-w-[120px] outline-none text-center text-xl font-bold text-muted"
                value={priceRange.min}
                min={0}
                max={priceRange.max}
                onChange={(event) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: Math.min(Number(event.target.value), prev.max),
                  }))
                }
              />
              <div className="w-6 h-0.5 bg-muted" />
              <span className="text-sm text-muted">max</span>
              <input
                type="number"
                className="bg-white rounded-[14px] py-2 px-3 shadow-card-soft border-0 w-full max-w-[120px] outline-none text-center text-xl font-bold text-muted"
                value={priceRange.max}
                min={priceRange.min}
                max={100000}
                onChange={(event) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: Math.max(Number(event.target.value), prev.min),
                  }))
                }
              />
            </div>
            <div
              className="h-1.5 rounded-full bg-border relative flex items-center"
              style={{
                background: `linear-gradient(to right, var(--color-border) ${priceMinPct}%, var(--color-primary) ${priceMinPct}%, var(--color-primary) ${priceMaxPct}%, var(--color-border) ${priceMaxPct}%)`,
              }}
            >
              <input
                type="range"
                min={0}
                max={100000}
                value={priceRange.min}
                onChange={(event) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: Math.min(Number(event.target.value), prev.max),
                  }))
                }
                className="range-input-thumb absolute left-0 top-[-7px] w-full h-5 bg-transparent pointer-events-none appearance-none"
              />
              <input
                type="range"
                min={0}
                max={100000}
                value={priceRange.max}
                onChange={(event) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: Math.max(Number(event.target.value), prev.min),
                  }))
                }
                className="range-input-thumb absolute left-0 top-[-7px] w-full h-5 bg-transparent pointer-events-none appearance-none"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>{priceRange.min} $</span>
              <span className="text-muted">{priceRange.max} $</span>
            </div>
            <Button variant="primary" size="md">
              Apply
            </Button>
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
                className="bg-white rounded-[14px] py-2 px-3 shadow-card-soft border-0 w-full max-w-[120px] outline-none text-center text-xl font-bold text-muted"
                value={yearRange.min}
                min={1900}
                max={yearRange.max}
                onChange={(event) =>
                  setYearRange((prev) => ({
                    ...prev,
                    min: Math.min(Number(event.target.value), prev.max),
                  }))
                }
              />
              <div className="w-6 h-0.5 bg-muted" />
              <span className="text-sm text-muted">to</span>
              <input
                type="number"
                className="bg-white rounded-[14px] py-2 px-3 shadow-card-soft border-0 w-full max-w-[120px] outline-none text-center text-xl font-bold text-muted"
                value={yearRange.max}
                min={yearRange.min}
                max={2025}
                onChange={(event) =>
                  setYearRange((prev) => ({
                    ...prev,
                    max: Math.max(Number(event.target.value), prev.min),
                  }))
                }
              />
            </div>
            <div
              className="h-1.5 rounded-full bg-border relative flex items-center"
              style={{
                background: `linear-gradient(to right, var(--color-border) ${yearMinPct}%, var(--color-primary) ${yearMinPct}%, var(--color-primary) ${yearMaxPct}%, var(--color-border) ${yearMaxPct}%)`,
              }}
            >
              <input
                type="range"
                min={1900}
                max={2025}
                value={yearRange.min}
                onChange={(event) =>
                  setYearRange((prev) => ({
                    ...prev,
                    min: Math.min(Number(event.target.value), prev.max),
                  }))
                }
                className="range-input-thumb absolute left-0 top-[-7px] w-full h-5 bg-transparent pointer-events-none appearance-none"
              />
              <input
                type="range"
                min={1900}
                max={2025}
                value={yearRange.max}
                onChange={(event) =>
                  setYearRange((prev) => ({
                    ...prev,
                    max: Math.max(Number(event.target.value), prev.min),
                  }))
                }
                className="range-input-thumb absolute left-0 top-[-7px] w-full h-5 bg-transparent pointer-events-none appearance-none"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>{yearRange.min} Year</span>
              <span className="text-muted">{yearRange.max} Year</span>
            </div>
            <Button variant="primary" size="md">
              Apply
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2 text-base font-semibold leading-5">
              <span>Damage type</span>
              <Image src="/figma/icons/icon-minus.svg" alt="" width={24} height={24} />
            </div>
            <label className="flex items-center gap-2.5 bg-surface rounded-[14px] p-3 text-base text-muted min-h-[44px]">
              <input
                placeholder="Search"
                aria-label="Search damage type"
                value={damageSearchValue}
                onChange={(event) => setDamageSearchValue(event.target.value)}
                className="border-0 bg-transparent outline-none w-full text-base leading-5 text-muted placeholder:text-muted"
              />
              <Image
                src="/figma/icons/icon-search-rounded.svg"
                alt=""
                width={24}
                height={24}
              />
            </label>
            <div className="flex flex-col gap-[11px]">
              {damageTypeItems
                .filter((item) =>
                  item.label.toLowerCase().includes(damageSearchValue.toLowerCase()),
                )
                .map((item) => {
                  const isChecked = conditionState[item.label];
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className="flex items-center justify-between gap-2 text-sm font-normal border-0 bg-transparent p-0 cursor-pointer text-left w-full"
                      onClick={() =>
                        setConditionState((prev) => ({
                          ...prev,
                          [item.label]: !prev[item.label],
                        }))
                      }
                    >
                      <span className="flex items-center gap-2">
                        <Image
                          src={
                            isChecked
                              ? "/figma/icons/icon-checkbox-checked.svg"
                              : "/figma/icons/icon-checkbox.svg"
                          }
                          alt=""
                          width={24}
                          height={24}
                        />
                        <span>{item.label}</span>
                      </span>
                      <span className="text-sm font-normal text-foreground">{item.count}</span>
                    </button>
                  );
                })}
            </div>
          </div>

              {collapsedFilters.map((title) => {
                const isOpen = collapsedState[title];
                const section = expandableFilters.find((item) => item.title === title);
                const sectionState = expandedState[title];
                const isScrollable = title === "Vehicle type" || title === "Make";
                return (
                  <div
                    key={title}
                    className={`flex flex-col gap-3 ${
                      isOpen ? "bg-white rounded-2xl p-4 gap-4 w-full" : ""
                    } ${isOpen && isScrollable ? "h-[476px] overflow-hidden" : ""}`}
                  >
                    <button
                      type="button"
                      className={`flex items-center justify-between p-4 rounded-2xl bg-white text-base font-semibold leading-5 border-0 cursor-pointer w-full gap-[130px] ${
                        isOpen ? "p-0 bg-transparent rounded-none gap-[142px]" : ""
                      }`}
                      onClick={() =>
                        setCollapsedState((prev) => ({ ...prev, [title]: !prev[title] }))
                      }
                    >
                      <span>{title}</span>
                      <Image
                        src={isOpen ? "/figma/icons/icon-minus.svg" : "/figma/icons/icon-plus.svg"}
                        alt=""
                        width={24}
                        height={24}
                      />
                    </button>
                    {isOpen && section ? (
                      <div
                        className={`bg-transparent rounded-none p-0 flex flex-col gap-[11px] ${
                          isScrollable ? "flex-1 min-h-0" : ""
                        }`}
                      >
                        {title === "Search near ZIP code" ? (
                          <div className="flex items-center gap-1">
                            <label className="flex items-center gap-2.5 bg-surface rounded-[14px] p-3 min-h-[44px]">
                              <input
                                placeholder="Zip code"
                                value={sectionState?.input ?? ""}
                                onChange={(event) =>
                                  setExpandedState((prev) => ({
                                    ...prev,
                                    [title]: { ...prev[title], input: event.target.value },
                                  }))
                                }
                                className="border-0 bg-transparent outline-none w-full text-base leading-5 text-muted placeholder:text-muted"
                              />
                            </label>
                            <div className="bg-surface rounded-[14px] py-2.5 px-3 inline-flex items-center gap-1 text-base leading-5 text-muted whitespace-nowrap">
                              <span>50 mi</span>
                              <Image
                                src="/figma/icons/icon-arrow-down.svg"
                                alt=""
                                width={24}
                                height={24}
                              />
                            </div>
                          </div>
                        ) : null}
                        {title === "Search near ZIP code" ? (
                          <Button variant="primary" size="md">
                            Search
                          </Button>
                        ) : null}
                        {section.searchPlaceholder ? (
                          <label className="flex items-center gap-2.5 bg-surface rounded-[14px] p-3 min-h-[44px]">
                            <input
                              placeholder={section.searchPlaceholder}
                              value={sectionState?.search ?? ""}
                              onChange={(event) =>
                                setExpandedState((prev) => ({
                                  ...prev,
                                  [title]: { ...prev[title], search: event.target.value },
                                }))
                              }
                              className="border-0 bg-transparent outline-none w-full text-base leading-5 text-muted placeholder:text-muted"
                            />
                            <Image
                              src="/figma/icons/icon-search-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                          </label>
                        ) : null}
                        {section.inputPlaceholder && title !== "Search near ZIP code" ? (
                          <label className="flex items-center gap-2.5 bg-surface rounded-[14px] p-3 min-h-[44px]">
                            <input
                              placeholder={section.inputPlaceholder}
                              value={sectionState?.input ?? ""}
                              onChange={(event) =>
                                setExpandedState((prev) => ({
                                  ...prev,
                                  [title]: { ...prev[title], input: event.target.value },
                                }))
                              }
                              className="border-0 bg-transparent outline-none w-full text-base leading-5 text-muted placeholder:text-muted"
                            />
                          </label>
                        ) : null}
                        {section.items ? (
                          <div
                            className={`flex flex-col gap-[11px] w-full ${
                              isScrollable ? "flex-1 min-h-0 overflow-y-auto" : ""
                            }`}
                          >
                            {(sectionState?.items ?? [])
                              .filter((item) =>
                                section.searchPlaceholder
                                  ? item.label
                                      .toLowerCase()
                                      .includes((sectionState?.search ?? "").toLowerCase())
                                  : true,
                              )
                              .map((item) => (
                                <button
                                  key={item.label}
                                  type="button"
                                  className="flex items-center justify-between gap-2 border-0 bg-transparent p-0 cursor-pointer text-left w-full text-sm font-normal"
                                  onClick={() =>
                                    setExpandedState((prev) => ({
                                      ...prev,
                                      [title]: {
                                        ...prev[title],
                                        items: prev[title].items.map((current) =>
                                          current.label === item.label
                                            ? { ...current, checked: !current.checked }
                                            : current,
                                        ),
                                      },
                                    }))
                                  }
                                >
                                  <span className="flex items-center gap-2">
                                    <Image
                                      src={
                                        item.checked
                                          ? "/figma/icons/icon-checkbox-checked.svg"
                                          : "/figma/icons/icon-checkbox.svg"
                                      }
                                      alt=""
                                      width={24}
                                      height={24}
                                    />
                                    <span>{item.label}</span>
                                  </span>
                                  <span className="text-sm font-normal text-foreground">{item.count}</span>
                                </button>
                              ))}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </>
          )}
        </aside>

        <section className="w-[1320px] flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="bg-white rounded-r-2xl py-4 pl-[30px] pr-3.5 text-base font-bold leading-5">
              Results 22,328
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-between gap-3 py-3.5 px-4 bg-white rounded-2xl border-0 w-[130px] text-base font-bold cursor-pointer leading-5"
              >
                <span>20 cards</span>
                <Image src="/figma/icons/icon-arrow-down.svg" alt="" width={24} height={24} />
              </button>
              <button
                type="button"
                className="flex items-center justify-between gap-3 py-3.5 px-4 bg-white rounded-2xl border-0 w-[130px] text-base font-bold cursor-pointer leading-5"
              >
                <span>Sort by</span>
                <Image src="/figma/icons/icon-arrow-down.svg" alt="" width={24} height={24} />
              </button>
              <button
                type="button"
                className="flex items-center justify-center p-3.5 bg-white rounded-2xl border-0 cursor-pointer"
              >
                <Image
                  src="/figma/icons/icon-share-small.svg"
                  alt=""
                  width={14}
                  height={14}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 py-2.5">
            {activeTags.map((item) => (
              <button
                key={item}
                type="button"
                className="inline-flex items-center gap-2 py-1 px-3 bg-white rounded-2xl text-sm font-bold border-0 cursor-pointer"
                onClick={() =>
                  setConditionState((prev) => ({ ...prev, [item]: !prev[item] }))
                }
              >
                <span>{item}</span>
                <Image src="/figma/icons/icon-cross-small.svg" alt="" width={24} height={24} />
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 w-[1320px]">
            {vehicleCards.map((card, index) => (
              <VehicleCard
                key={`${card.title}-${index}`}
                card={card}
                className="w-[318px]"
              />
            ))}
          </div>

          <div className="mt-2">
            <Pagination pages={[1, 2, 3, 5, "...", 125, 126, 127]} current={2} />
          </div>

          <p className="text-base text-muted mt-6 w-[986px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </section>
      </div>
    </main>
  );
}
