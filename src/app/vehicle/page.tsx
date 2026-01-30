"use client";

import Image from "next/image";
import { useState } from "react";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { Button } from "../_components/Button";
import { VehicleCard, type VehicleCardData } from "../_components/VehicleCard";

const primarySpecs = [
  { label: "Lot Number", value: "62812505" },
  { label: "VIN", value: "123ABC456DEF789GHI" },
  { label: "Title Code", value: "NH CERT OF TITLE-SALVAGE" },
  { label: "Loss", value: "Collision" },
  { label: "Primary damage", value: "Right front" },
  { label: "Secondary Damage", value: "Rear End" },
  { label: "Odometer", value: "25 145 mi (40 467 km)" },
  { label: "Start code", value: "Starts" },
  { label: "Key", value: "Present" },
  { label: "Est. Repair Cost", value: "$10,525 USD" },
  { label: "Est. Retail Value", value: "$13,974 USD" },
];

const secondarySpecs = [
  { label: "Body Style", value: "Coupe" },
  { label: "Exterior color", value: "Black" },
  { label: "Engine", value: "5.7L, V8" },
  { label: "Transmission", value: "Automatic" },
  { label: "Fuel Type", value: "Gasoline" },
  { label: "Drive Type", value: "Rear wheel drive" },
];

const thumbKeys = Array.from({ length: 15 }, (_, i) => `thumb-${i + 1}`);

const calculatorRows = [
  { label: "Lot Price", value: "$6,000" },
  { label: "Auction Fees", value: "$955" },
  { label: "Trucking to port", value: "$400" },
  { label: "Shipping to", value: "$1,595" },
  { label: "Fadder Fee (+ VAT/Tax)", value: "$450" },
];

const faqItems = [
  {
    question: "Are the vehicles new or used?",
    answer:
      "Most vehicles on the platform are new or nearly new from official dealers and verified partners. Some listings may be used—mileage and condition are always clearly stated.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We support modern international payment options, including bank transfers and crypto payments, so you can choose the most convenient and secure method.",
  },
  {
    question: "Can I pay in USD or EUR?",
    answer:
      "Yes. We accept payments in USD and EUR. The final currency depends on the seller, contract terms, and deal structure.",
  },
  {
    question: "Can I pay on behalf of a company?",
    answer:
      "Yes. Vehicles can be purchased by individuals or legal entities. All necessary invoices and commercial documents are issued accordingly.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location, destination country, and transport method. Estimated timelines are provided before payment.",
  },
  {
    question: "Which delivery options are available?",
    answer:
      "Vehicles ship from major logistics hubs and ports in China. Depending on your region, delivery can be organized by sea, rail, or road transport.",
  },
  {
    question: "Can I track the vehicle during delivery?",
    answer:
      "Yes. You will receive regular status updates and tracking information to follow the delivery step by step.",
  },
  {
    question: "Do you deliver to my country?",
    answer:
      "We deliver to most European countries, CIS regions, and selected global markets. Contact our team to confirm delivery to your country.",
  },
  {
    question: "Who is responsible for the vehicle during delivery?",
    answer:
      "Your vehicle is insured during transport. Liability, coverage, and delivery terms are confirmed before shipment, and our team provides full support.",
  },
  {
    question: "How safe is the platform?",
    answer:
      "Fadder works only with vetted sellers and reliable partners. Every deal runs through secure processes to ensure transparency and buyer protection.",
    open: true,
  },
];

const similarCards: VehicleCardData[] = [
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
];

export default function VehiclePage() {
  const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    faqItems.forEach((item) => {
      initial[item.question] = item.open ?? false;
    });
    return initial;
  });

  return (
    <main className="max-w-[1920px] mx-auto py-[16px] px-20 pb-[120px] flex flex-col gap-12 text-foreground">
      <Breadcrumbs
        items={[
          { label: "Home page", href: "/" },
          { label: "Сatalog", href: "/search" },
          { label: "Chevrolet" },
          { label: "1982 Chevrolet Corvette" },
        ]}
      />

      <div className="flex items-end gap-4 flex-nowrap">
        <h1 className="m-0 text-[32px] leading-9 font-bold text-foreground w-[354px] whitespace-nowrap">
          1982 Chevrolet Corvette
        </h1>
        <span className="self-end bg-copart text-white rounded-lg py-1 px-2 text-xs leading-[14px] font-normal">
          Copart
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex gap-4 items-start">
          <div className="w-[700px] flex-[0_0_700px] flex flex-col gap-4">
            <div className="relative w-full h-[460px] rounded-lg overflow-visible">
              <Image
                src="/figma/images/vehicle-detail-main-22d215.png"
                alt=""
                width={700}
                height={460}
                className="w-full h-[460px] object-fill rounded-lg"
              />
              <button
                type="button"
                className="absolute top-[204px] left-[-224px] w-[52px] h-[52px] rounded-lg border-0 bg-white/60 inline-flex items-center justify-center p-3.5 cursor-pointer"
              >
                <Image
                  src="/figma/icons/icon-arrow-left.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              <button
                type="button"
                className="absolute top-[204px] right-[-4px] w-[52px] h-[52px] rounded-lg border-0 bg-white/60 inline-flex items-center justify-center p-3.5 cursor-pointer"
              >
                <Image
                  src="/figma/icons/icon-arrow-right.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {thumbKeys.map((key, index) => (
                <Image
                  key={key}
                  src="/figma/images/vehicle-detail-thumb-22d215.png"
                  alt=""
                  width={140}
                  height={72}
                  className={`w-full h-[72px] object-fill rounded-lg border-2 ${
                    index === 0 ? "border-foreground" : "border-transparent"
                  }`}
                />
              ))}
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-4">
                <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                  Full Car History
                </h3>
                <Image
                  src="/figma/icons/icon-exclamation-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <p className="m-0 text-base leading-5 font-normal text-foreground">
                Get a comprehensive report (similar to Carfax) including
                accident history, service records, and more.
              </p>
              <Button variant="primary" size="lg" fullWidth>
                Request Full History (Carfax)
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-4">
                <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                  Get Alerts for Similar Vehicles
                </h3>
                <Image
                  src="/figma/icons/icon-exclamation-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col gap-4">
                <input
                  className="h-[52px] border-0 rounded-[14px] bg-surface py-4 px-6 text-base leading-5 text-muted placeholder:text-muted"
                  placeholder="Email"
                />
                <div className="flex items-center gap-6">
                  <span className="text-base leading-5 font-normal text-foreground">
                    Select Frequency
                  </span>
                  <div className="flex items-center gap-8 w-[212px]">
                    <label className="inline-flex items-center gap-2 text-base leading-5 text-foreground cursor-pointer">
                      <input
                        type="radio"
                        name="frequency"
                        value="daily"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <span className="w-5 h-5 rounded-[10px] border border-border inline-flex items-center justify-center peer-checked:border-2 peer-checked:border-radio-checked after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-transparent peer-checked:after:bg-radio-checked" />
                      <span>Daily</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-base leading-5 text-foreground cursor-pointer">
                      <input
                        type="radio"
                        name="frequency"
                        value="weekly"
                        className="sr-only peer"
                      />
                      <span className="w-5 h-5 rounded-[10px] border border-border inline-flex items-center justify-center peer-checked:border-2 peer-checked:border-radio-checked after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-transparent peer-checked:after:bg-radio-checked" />
                      <span>Weekly</span>
                    </label>
                  </div>
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                className="gap-2.5"
              >
                <Image
                  src="/figma/icons/icon-notification-bell.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span>Set Alert</span>
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 w-full">
              <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                Legal Import Restrictions
              </h3>
              <p className="m-0 text-base leading-5 font-normal text-danger whitespace-pre-line">
                Potential Restrictions:
                {"\n"}Vehicles older than 10 years may incur higher import
                duties in Poland.
                {"\n"}Salvage title vehicles require a mandatory technical
                inspection and re-registration process in Poland.
                {"\n"}Emissions standards apply to imported vehicles. This 2022
                Camry meets Euro 6.
              </p>
              <p className="m-0 text-base leading-5 font-normal text-foreground">
                Please consult with a local expert for definitive information.
              </p>
            </div>
          </div>

          <div className="flex-[0_0_600px] w-[600px] flex flex-col gap-4">
            <div className="bg-white rounded-lg py-4 w-full">
              <div className="flex flex-col">
                {primarySpecs.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface last:border-b-0"
                  >
                    <span className="text-base leading-5 font-normal text-muted">
                      {item.label}
                    </span>
                    <span className="text-base leading-5 font-bold text-foreground inline-flex items-center gap-1">
                      {item.value}
                      {item.label === "Lot Number" || item.label === "VIN" ? (
                        <Image
                          src="/figma/icons/icon-copy.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg py-4 w-full">
              <div className="flex flex-col">
                {secondarySpecs.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface last:border-b-0"
                  >
                    <span className="text-base leading-5 font-normal text-muted">
                      {item.label}
                    </span>
                    <span className="text-base leading-5 font-bold text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg py-4 flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-2 px-4 w-full">
                <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                  Final Price Calculator
                </h3>
                <Image
                  src="/figma/icons/icon-exclamation-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col w-full">
                {calculatorRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between border-b border-surface py-3 px-4"
                  >
                    <span className="text-base leading-5 font-normal text-muted">
                      {row.label}
                    </span>
                    <span className="text-base leading-5 font-bold text-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 px-4 text-base leading-5 font-bold text-foreground">
                  <span>Subtotal</span>
                  <span>$8,950</span>
                </div>
                <p className="m-0 px-4 text-xs leading-[14px] font-normal text-foreground">
                  The calculator check location of the vehicle and shipment from
                  one of the six ports in the USA depending on the branch
                  location. Penalties and additional auction fees
                </p>
              </div>
            </div>
          </div>

          <div className="flex-[0_0_428px] w-[428px] flex flex-col gap-4">
            <div className="flex items-center gap-4 w-full">
              <button
                type="button"
                className="w-[52px] h-[52px] rounded-lg bg-white border-0 inline-flex items-center justify-center p-3.5 cursor-pointer"
              >
                <Image
                  src="/figma/icons/icon-share.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              <button
                type="button"
                className="w-[52px] h-[52px] rounded-lg bg-white border-0 inline-flex items-center justify-center p-3.5 cursor-pointer"
              >
                <Image
                  src="/figma/icons/icon-heart.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              <button
                type="button"
                className="flex-1 bg-white border-0 rounded-lg py-4 px-12 text-sm leading-4 font-bold text-foreground cursor-pointer"
              >
                Ask Manager
              </button>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 items-center w-full">
              <div className="w-full flex justify-between items-center gap-2.5">
                <span className="text-xl leading-6 font-bold text-foreground">
                  Time left
                </span>
                <span className="text-base leading-5 font-bold text-error">
                  1 d 21 h 23 min 00 sec
                </span>
              </div>
              <Button
                variant="secondary"
                size="md"
                className="w-[278px] gap-2.5"
              >
                <Image
                  src="/figma/icons/icon-reminder.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span>Add to calendar</span>
              </Button>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 items-center w-full">
              <div className="w-full flex items-center justify-between">
                <span className="text-xl leading-6 font-bold text-foreground">
                  Your bid
                </span>
                <Image
                  src="/figma/icons/icon-question.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3 py-3.5 px-4 rounded-[14px] bg-white shadow-input">
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 cursor-pointer"
                  >
                    <Image
                      src="/figma/icons/icon-minus.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                  <span className="text-xl leading-6 font-bold text-foreground">
                    $525
                  </span>
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 cursor-pointer"
                  >
                    <Image
                      src="/figma/icons/icon-plus.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
                <p className="m-0 text-xs leading-[14px] font-normal text-muted">
                  Enter Maximum Bid ($25 Bid Increments)
                </p>
              </div>
              <button
                type="button"
                className="w-full bg-primary hover:bg-primary-hover active:bg-primary-pressed border-0 rounded-[14px] py-4 px-8 text-sm leading-4 font-bold text-foreground cursor-pointer"
              >
                Bid Now
              </button>
            </div>

            <div className="bg-white rounded-lg py-4 flex flex-col items-center w-full">
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface w-full last:border-b-0">
                <span className="text-base leading-5 font-normal text-muted">
                  Auction
                </span>
                <span className="bg-copart text-white rounded-lg py-1 px-2 text-xs leading-[14px] font-normal">
                  Copart
                </span>
              </div>
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface w-full">
                <span className="text-base leading-5 font-normal text-muted">
                  Current Bid
                </span>
                <span className="text-xl leading-6 font-bold text-success">
                  $525 USD
                </span>
              </div>
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface w-full">
                <span className="text-base leading-5 font-normal text-muted">
                  Bid Status
                </span>
                <span className="text-base leading-5 font-normal text-muted">
                  You Haven't Bid
                </span>
              </div>
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface w-full">
                <span className="text-base leading-5 font-normal text-muted">
                  Sale Status
                </span>
                <span className="text-base leading-5 font-bold text-foreground">
                  On Minimum Bid
                </span>
              </div>
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 w-full">
                <span className="text-base leading-5 font-normal text-muted">
                  Sellers Reserve
                </span>
                <span className="text-base leading-5 font-bold text-foreground">
                  Not yet met
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 items-center w-full">
              <div className="w-full flex items-center justify-between">
                <span className="text-xl leading-6 font-bold text-foreground">
                  Fast Buy Price
                </span>
                <Image
                  src="/figma/icons/icon-question.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-xl leading-6 font-bold text-info">
                $6,000 USD
              </span>
              <Button variant="secondary" size="lg" fullWidth>
                Buy Now
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col">
          <div className="bg-white rounded-lg py-4 w-full flex flex-col gap-4">
            <div className="px-4 flex items-center justify-between">
              <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                FAQ
              </h3>
            </div>
            <div className="flex flex-col">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="p-4 flex flex-col gap-3 border-b border-surface last:border-b-0"
                >
                  <button
                    type="button"
                    className="bg-transparent border-0 p-0 flex items-center justify-between gap-4 w-full text-left cursor-pointer"
                    aria-expanded={openState[item.question]}
                    onClick={() =>
                      setOpenState((prev) => ({
                        ...prev,
                        [item.question]: !prev[item.question],
                      }))
                    }
                  >
                    <span className="text-base leading-5 font-bold text-foreground">
                      {item.question}
                    </span>
                    <Image
                      src={
                        openState[item.question]
                          ? "/figma/icons/icon-minus.svg"
                          : "/figma/icons/icon-plus.svg"
                      }
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-[220ms] ease-[ease] ${
                      openState[item.question]
                        ? "max-h-[320px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="m-0 text-base leading-5 font-normal text-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-[74px]">
          <div className="flex items-end justify-between gap-6">
            <h2 className="m-0 text-2xl leading-7 font-bold text-foreground">
              Similar Auctions
            </h2>
            <Button variant="white" size="md">
              View all
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1 scroll-snap-type-x-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {similarCards.map((card, index) => (
              <VehicleCard
                key={`${card.title}-${index}`}
                card={card}
                className="w-[288px] shrink-0 scroll-snap-align-start"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
