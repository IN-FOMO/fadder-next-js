import Image from "next/image";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { Button } from "../_components/Button";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";

const deliveryOptions = [
  {
    title: "Ground Transport",
    description: "Delivery by auto carrier within Europe",
    details: ["Duration: 3–7 days", "Coverage: Major cities in Poland and EU"],
    icon: "/figma/icons/icon-delivery-ground.svg",
  },
  {
    title: "Sea Shipping",
    description:
      "Container shipping from the USA and other international locations",
    details: ["Duration: 30–45 days", "Coverage: All EU countries"],
    icon: "/figma/icons/icon-delivery-sea.svg",
  },
  {
    title: "Express Delivery",
    description: "Fast shipping to key European destinations",
    details: ["Duration: 5–10 days", "Coverage: Selected major cities"],
    icon: "/figma/icons/icon-delivery-express.svg",
  },
];

const pricingRows = [
  { route: "Hamburg → Berlin", price: "$ 1,200", time: "2–3 days" },
  { route: "Munich → Frankfurt", price: "$ 950", time: "2–4 days" },
  { route: "Munich → Münster", price: "$ 1,100", time: "3–5 days" },
  { route: "Hamburg → Hannover", price: "$ 850", time: "1–2 days" },
];

const includedItems = [
  "Full cargo insurance for the entire transportation period",
  "Professional loading and unloading of vehicles",
  "Real-time cargo tracking",
  "Complete documentation handling",
];

const requiredDocs = [
  "Vehicle registration certificate",
  "Owner's ID or passport",
  "Purchase agreement (if applicable)",
  "Power of attorney (if sender is not the owner)",
];

export default function DeliveryPage() {
  return (
    <main className="max-w-[1920px] mx-auto py-[16px] px-20 pb-[120px] flex flex-col gap-6 text-foreground max-tablet:px-8 max-narrow:px-4">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: "Delivery" }]}
      />
      <PageHeader
        title="Delivery"
        subtitle="Professional car delivery throughout Poland with full cargo insurance"
      />

      <section className="w-full max-w-[1760px] mx-auto flex flex-col items-center gap-[74px]">
        <div className="w-full h-[587px] rounded-lg overflow-hidden bg-white relative">
          <Image
            src="/figma/images/delivery-hero.png"
            alt=""
            width={1760}
            height={587}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full flex gap-4 items-stretch max-narrow:flex-col">
          {deliveryOptions.map((option) => (
            <article
              key={option.title}
              className="flex-1 bg-white rounded-lg p-4 flex flex-col gap-6 justify-between"
            >
              <Image
                src={option.icon}
                alt=""
                width={48}
                height={48}
                className="inline-flex"
              />
              <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                {option.title}
              </h3>
              <p className="m-0 text-base leading-5 font-normal text-foreground">
                {option.description}
              </p>
              <div className="flex flex-col gap-2">
                {option.details.map((text) => (
                  <p
                    key={text}
                    className="m-0 text-base leading-5 font-normal text-foreground"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1760px] mx-auto flex flex-col gap-4">
        <div className="w-full flex items-stretch">
          <div className="flex-1 flex flex-col">
            <div className="p-4 border border-border text-base leading-5 font-bold text-foreground min-h-[52px] flex items-center justify-center rounded-tl-lg bg-table-header">
              Route
            </div>
            {pricingRows.map((row, index) => (
              <div
                key={row.route}
                className={`p-4 border border-t-0 border-border text-base leading-5 text-foreground min-h-[52px] flex justify-center items-center ${
                  index === pricingRows.length - 1 ? "rounded-bl-lg" : ""
                }`}
              >
                {row.route}
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col items-end">
            <div className="p-4 border border-border text-base leading-5 font-bold text-foreground min-h-[52px] flex items-center bg-table-header w-full justify-center">
              Price
            </div>
            {pricingRows.map((row) => (
              <div
                key={row.route}
                className="p-4 border border-t-0 border-l-0 border-r-0 border-border text-base leading-5 text-foreground min-h-[52px] flex items-center w-full justify-center"
              >
                {row.price}
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="p-4 border border-l border-border text-base leading-5 font-bold text-foreground min-h-[52px] flex items-center rounded-tr-lg justify-center bg-table-header">
              Delivery Time
            </div>
            {pricingRows.map((row, index) => (
              <div
                key={row.route}
                className={`p-4 border border-t-0 border-border text-base leading-5 text-foreground min-h-[52px] flex items-center border-l border-border justify-center ${
                  index === pricingRows.length - 1 ? "rounded-br-lg" : ""
                }`}
              >
                {row.time}
              </div>
            ))}
          </div>
        </div>
        <p className="m-0 text-base leading-5 font-normal text-foreground">
          *Prices are indicative for standard passenger vehicles. Actual cost
          depends on vehicle type, dimensions, weight, pickup location, and
          current route availability
        </p>
      </section>

      <section className="w-full max-w-[1320px] mx-auto flex gap-4 max-narrow:flex-col">
        <article className="flex-1 bg-white rounded-lg p-4 flex flex-col gap-6">
          <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
            What's Included
          </h3>
          <div className="flex flex-col gap-2">
            {includedItems.map((item) => (
              <p
                key={item}
                className="m-0 text-base leading-5 font-normal text-foreground"
              >
                {item}
              </p>
            ))}
          </div>
        </article>
        <article className="flex-1 bg-white rounded-lg p-4 flex flex-col gap-6">
          <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
            Required Documents
          </h3>
          <div className="flex flex-col gap-2">
            {requiredDocs.map((item) => (
              <p
                key={item}
                className="m-0 text-base leading-5 font-normal text-foreground"
              >
                {item}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className="w-full max-w-[700px] mx-auto bg-white rounded-lg p-4 flex flex-col items-center gap-6">
        <div className="w-full flex items-center justify-between gap-6">
          <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
            Full Car History
          </h3>
          <Image
            src="/figma/icons/icon-exclamation-circle.svg"
            alt=""
            width={24}
            height={24}
            className="inline-flex"
          />
        </div>
        <p className="m-0 text-base leading-5 font-normal text-foreground text-center">
          Get a comprehensive report (similar to Carfax) including accident
          history, service records, and more.
        </p>
        <Button variant="primary" size="lg">
          Request Full History (Carfax)
        </Button>
      </section>

      <ContactSection />
    </main>
  );
}
