"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

type Option = {
  label: string;
  value: string;
};

type FilterPanelProps = {
  className?: string;
};

const selectTypeOptions: Option[] = [
  { label: "Select Type", value: "" },
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Truck", value: "truck" },
];

const selectMakeOptions: Option[] = [
  { label: "Select Make", value: "" },
  { label: "Audi", value: "audi" },
  { label: "BMW", value: "bmw" },
  { label: "Chevrolet", value: "chevrolet" },
];

const selectModelOptions: Option[] = [
  { label: "Select Model", value: "" },
  { label: "Model A", value: "model-a" },
  { label: "Model B", value: "model-b" },
  { label: "Model C", value: "model-c" },
];

const yearOptions: Option[] = [
  { label: "From", value: "" },
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
];

const priceOptions: Option[] = [
  { label: "Min Price", value: "" },
  { label: "$1,000", value: "1000" },
  { label: "$5,000", value: "5000" },
  { label: "$10,000", value: "10000" },
];

const maxPriceOptions: Option[] = [
  { label: "Max Price", value: "" },
  { label: "$20,000", value: "20000" },
  { label: "$50,000", value: "50000" },
  { label: "$100,000", value: "100000" },
];

function useDropdown(initial: string) {
  const [value, setValue] = useState(initial);
  return { value, setValue };
}

function getValueFromLabel(options: Option[], label: string) {
  return options.find((option) => option.label === label)?.value ?? "";
}

const dropdownButton =
  "w-full border-none bg-surface rounded-sm py-2 px-3.5 flex items-center justify-between text-xs text-muted cursor-pointer";
const dropdownList =
  "absolute top-full left-0 right-0 bg-white rounded-sm shadow-dropdown p-2 list-none mt-2 z-10";
const dropdownOption =
  "w-full text-left border-none bg-transparent py-2 px-2.5 rounded-sm cursor-pointer text-xs text-dark hover:bg-border/20 active:bg-border/30";

export function FilterPanel({ className }: FilterPanelProps) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const selectType = useDropdown(selectTypeOptions[0].label);
  const selectMake = useDropdown(selectMakeOptions[0].label);
  const selectModel = useDropdown(selectModelOptions[0].label);
  const yearFrom = useDropdown(yearOptions[0].label);
  const yearTo = useDropdown("To");
  const minPrice = useDropdown(priceOptions[0].label);
  const maxPrice = useDropdown(maxPriceOptions[0].label);
  const [vin, setVin] = useState("");
  const [copart, setCopart] = useState(false);
  const [iaai, setIaai] = useState(false);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    const typeValue = getValueFromLabel(selectTypeOptions, selectType.value);
    const makeValue = getValueFromLabel(selectMakeOptions, selectMake.value);
    const modelValue = getValueFromLabel(selectModelOptions, selectModel.value);
    const yearFromValue = getValueFromLabel(yearOptions, yearFrom.value);
    const yearToValue = getValueFromLabel(yearOptions, yearTo.value);
    const minPriceValue = getValueFromLabel(priceOptions, minPrice.value);
    const maxPriceValue = getValueFromLabel(maxPriceOptions, maxPrice.value);
    const vinValue = vin.trim();

    if (typeValue) params.set("type", typeValue);
    if (makeValue) params.set("make", makeValue);
    if (modelValue) params.set("model", modelValue);
    if (yearFromValue) params.set("yearFrom", yearFromValue);
    if (yearToValue) params.set("yearTo", yearToValue);
    if (minPriceValue) params.set("minPrice", minPriceValue);
    if (maxPriceValue) params.set("maxPrice", maxPriceValue);
    if (vinValue) params.set("vin", vinValue);
    if (copart) params.set("auction", "copart");
    if (iaai) params.set("auction", copart ? "copart,iaai" : "iaai");

    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  useEffect(() => {
    if (openId === null) return;
    const onMouseDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openId]);

  return (
    <div
      ref={panelRef}
      className={
        "bg-white rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] p-6 flex flex-col gap-4 w-full " +
        (className ?? "")
      }
    >
      <div className="flex flex-wrap gap-4 items-center w-full">
        <div className="relative flex-1">
          <button
            type="button"
            className={dropdownButton}
            onClick={() => toggle("type")}
            aria-expanded={openId === "type"}
          >
            <span>{selectType.value}</span>
            <Image
              src="/figma/icons/icon-arrow-down.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
          {openId === "type" && (
            <ul className={dropdownList}>
              {selectTypeOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={dropdownOption}
                    onClick={() => {
                      selectType.setValue(option.label);
                      close();
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative flex-1 min-w-[clamp(120px,16vw,160px)]">
          <button
            type="button"
            className={dropdownButton}
            onClick={() => toggle("make")}
            aria-expanded={openId === "make"}
          >
            <span>{selectMake.value}</span>
            <Image
              src="/figma/icons/icon-arrow-down.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
          {openId === "make" && (
            <ul className={dropdownList}>
              {selectMakeOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={dropdownOption}
                    onClick={() => {
                      selectMake.setValue(option.label);
                      close();
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative flex-1 min-w-[clamp(120px,16vw,160px)]">
          <button
            type="button"
            className={dropdownButton}
            onClick={() => toggle("model")}
            aria-expanded={openId === "model"}
          >
            <span>{selectModel.value}</span>
            <Image
              src="/figma/icons/icon-arrow-down.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
          {openId === "model" && (
            <ul className={dropdownList}>
              {selectModelOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={dropdownOption}
                    onClick={() => {
                      selectModel.setValue(option.label);
                      close();
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center w-full">
        <div className="flex gap-1 flex-1 min-w-[clamp(200px,30vw,280px)]">
          <div className="relative flex-1 min-w-[clamp(100px,14vw,140px)]">
            <button
              type="button"
              className={dropdownButton}
              onClick={() => toggle("yearFrom")}
              aria-expanded={openId === "yearFrom"}
            >
              <span>{yearFrom.value}</span>
              <Image
                src="/figma/icons/icon-arrow-down.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
            {openId === "yearFrom" && (
              <ul className={dropdownList}>
                {yearOptions.map((option) => (
                  <li key={option.value || option.label}>
                    <button
                      type="button"
                      className={dropdownOption}
                      onClick={() => {
                        yearFrom.setValue(option.label);
                        close();
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative flex-1 min-w-[clamp(100px,14vw,140px)]">
            <button
              type="button"
              className={dropdownButton}
              onClick={() => toggle("yearTo")}
              aria-expanded={openId === "yearTo"}
            >
              <span>{yearTo.value}</span>
              <Image
                src="/figma/icons/icon-arrow-down.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
            {openId === "yearTo" && (
              <ul className={dropdownList}>
                {yearOptions.map((option) => (
                  <li key={option.value || option.label}>
                    <button
                      type="button"
                      className={dropdownOption}
                      onClick={() => {
                        yearTo.setValue(option.label);
                        close();
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex gap-1 flex-1 min-w-[clamp(200px,30vw,280px)]">
          <div className="relative flex-1 min-w-[clamp(100px,14vw,140px)]">
            <button
              type="button"
              className={dropdownButton}
              onClick={() => toggle("minPrice")}
              aria-expanded={openId === "minPrice"}
            >
              <span>{minPrice.value}</span>
              <Image
                src="/figma/icons/icon-arrow-down.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
            {openId === "minPrice" && (
              <ul className={dropdownList}>
                {priceOptions.map((option) => (
                  <li key={option.value || option.label}>
                    <button
                      type="button"
                      className={dropdownOption}
                      onClick={() => {
                        minPrice.setValue(option.label);
                        close();
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative flex-1 min-w-[clamp(100px,14vw,140px)]">
            <button
              type="button"
              className={dropdownButton}
              onClick={() => toggle("maxPrice")}
              aria-expanded={openId === "maxPrice"}
            >
              <span>{maxPrice.value}</span>
              <Image
                src="/figma/icons/icon-arrow-down.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
            {openId === "maxPrice" && (
              <ul className={dropdownList}>
                {maxPriceOptions.map((option) => (
                  <li key={option.value || option.label}>
                    <button
                      type="button"
                      className={dropdownOption}
                      onClick={() => {
                        maxPrice.setValue(option.label);
                        close();
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <input
          className="w-full border-none rounded-sm py-4 px-6 text-xs bg-surface text-dark h-10"
          placeholder="Enter VIN or Lot Number"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 border-none bg-transparent p-0 cursor-pointer hover:opacity-90"
            aria-pressed={copart}
            onClick={() => setCopart((prev) => !prev)}
          >
            <Image
              src={
                copart
                  ? "/figma/icons/icon-checkbox-checked.svg"
                  : "/figma/icons/icon-checkbox.svg"
              }
              alt=""
              width={24}
              height={24}
            />
            <span className="text-white rounded-sm py-1 px-2 text-xs bg-copart">
              Copart
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 border-none bg-transparent p-0 cursor-pointer hover:opacity-90"
            aria-pressed={iaai}
            onClick={() => setIaai((prev) => !prev)}
          >
            <Image
              src={
                iaai
                  ? "/figma/icons/icon-checkbox-checked.svg"
                  : "/figma/icons/icon-checkbox.svg"
              }
              alt=""
              width={24}
              height={24}
            />
            <span className="text-white rounded-sm py-1 px-2 text-xs bg-iaai">
              IAAI
            </span>
          </button>
        </div>
        <Button variant="primary" size="md" onClick={handleSearch}>
          Search Vehicles (1,999,999 results)
        </Button>
      </div>
    </div>
  );
}
