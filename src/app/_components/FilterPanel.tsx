"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";

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

export function FilterPanel({ className }: FilterPanelProps) {
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

  const close = () => setOpenId(null);

  return (
    <div className={`${styles.filterCard} ${className ?? ""}`}>
      <div className={`${styles.filterRow} ${styles.filterRowFixed}`}>
        <div className={styles.dropdown}>
          <button
            type="button"
            className={styles.dropdownButton}
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
            <ul className={styles.dropdownList}>
              {selectTypeOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={styles.dropdownOption}
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
        <div className={styles.dropdown}>
          <button
            type="button"
            className={styles.dropdownButton}
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
            <ul className={styles.dropdownList}>
              {selectMakeOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={styles.dropdownOption}
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
        <div className={styles.dropdown}>
          <button
            type="button"
            className={styles.dropdownButton}
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
            <ul className={styles.dropdownList}>
              {selectModelOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={styles.dropdownOption}
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
      <div className={`${styles.filterRow} ${styles.filterRowStretch}`}>
        <div className={`${styles.filterGroup} ${styles.filterGroupYear}`}>
          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.dropdownButton}
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
              <ul className={styles.dropdownList}>
                {yearOptions.map((option) => (
                  <li key={option.value || option.label}>
                    <button
                      type="button"
                      className={styles.dropdownOption}
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
          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.dropdownButton}
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
              <ul className={styles.dropdownList}>
                {yearOptions.map((option) => (
                  <li key={option.value || option.label}>
                    <button
                      type="button"
                      className={styles.dropdownOption}
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
        <div className={`${styles.filterGroup} ${styles.filterGroupPrice}`}>
          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.dropdownButton}
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
              <ul className={styles.dropdownList}>
                {priceOptions.map((option) => (
                  <li key={option.value || option.label}>
                    <button
                      type="button"
                      className={styles.dropdownOption}
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
          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.dropdownButton}
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
              <ul className={styles.dropdownList}>
                {maxPriceOptions.map((option) => (
                  <li key={option.value || option.label}>
                    <button
                      type="button"
                      className={styles.dropdownOption}
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
      <div className={`${styles.filterRow} ${styles.searchRow}`}>
        <input
          className={styles.vinInput}
          placeholder="Enter VIN or Lot Number"
          value={vin}
          onChange={(event) => setVin(event.target.value)}
        />
      </div>
      <div className={styles.filterFooter}>
        <div className={styles.auctionChecks}>
          <button
            type="button"
            className={styles.checkboxRow}
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
            <span className={`${styles.auctionTag} ${styles.auctionTagCopart}`}>
              Copart
            </span>
          </button>
          <button
            type="button"
            className={styles.checkboxRow}
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
            <span className={`${styles.auctionTag} ${styles.auctionTagIaai}`}>
              IAAI
            </span>
          </button>
        </div>
        <button type="button" className={styles.primaryButton}>
          Search Vehicles (1,999,999 results)
        </button>
      </div>
    </div>
  );
}
