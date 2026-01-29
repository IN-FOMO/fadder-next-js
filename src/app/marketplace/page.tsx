import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";
import { MarketplaceClient, type MarketplaceVehicle } from "./MarketplaceClient";

const markets = ["China", "Japan", "Korea"];

const featuredLot = {
  title: "2023 Zeekr 001",
  subtitle: "Electric liftback with verified export documents",
  image: "/figma/images/vehicle-4.png",
  price: "$32,980",
  market: "China",
  specs: [
    { label: "Vehicle type", value: "Used" },
    { label: "Dimensions", value: "4970×1999×1560 mm" },
    {
      label: "Powertrain options",
      value: "2 options",
      hint: "Single motor RWD, Dual motor AWD",
    },
    { label: "Transmission", value: "Automatic" },
    { label: "Fuel type", value: "Electric" },
    { label: "Drive type", value: "AWD" },
    { label: "Stock ID", value: "CN-50520" },
  ],
};

const vehicleCards: MarketplaceVehicle[] = [
  {
    title: "2022 BYD Han EV",
    image: "/figma/images/vehicle-1.png",
    market: "China",
    lotId: "CN-39401",
    country: "China",
    availability: "In stock",
    price: "$23,400",
    specs: [
      { label: "Vehicle type", value: "Used" },
      { label: "Dimensions", value: "4995×1910×1495 mm" },
      {
        label: "Powertrain options",
        value: "3 options",
        hint: "EV 521 km, EV 610 km, EV AWD 520 km",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Electric" },
      { label: "Drive type", value: "RWD" },
    ],
  },
  {
    title: "2021 Geely Atlas Pro",
    image: "/figma/images/vehicle-2.png",
    market: "China",
    lotId: "CN-41288",
    country: "China",
    availability: "On request",
    price: "$14,750",
    specs: [
      { label: "Vehicle type", value: "Used" },
      { label: "Dimensions", value: "4544×1831×1713 mm" },
      {
        label: "Powertrain options",
        value: "2 options",
        hint: "1.5T FWD, 1.5T AWD",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Hybrid" },
      { label: "Drive type", value: "AWD" },
    ],
  },
  {
    title: "2020 Chery Tiggo 8",
    image: "/figma/images/vehicle-3.png",
    market: "China",
    lotId: "CN-29877",
    country: "China",
    availability: "On request",
    price: "$12,100",
    specs: [
      { label: "Vehicle type", value: "Used" },
      { label: "Dimensions", value: "4700×1860×1746 mm" },
      {
        label: "Powertrain options",
        value: "2 options",
        hint: "1.5T, 1.6T",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Gasoline" },
      { label: "Drive type", value: "FWD" },
    ],
  },
  {
    title: "2023 Zeekr 001",
    image: "/figma/images/vehicle-4.png",
    market: "China",
    lotId: "CN-50520",
    country: "China",
    availability: "In stock",
    price: "$32,980",
    specs: [
      { label: "Vehicle type", value: "Used" },
      { label: "Dimensions", value: "4970×1999×1560 mm" },
      {
        label: "Powertrain options",
        value: "2 options",
        hint: "Single motor RWD, Dual motor AWD",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Electric" },
      { label: "Drive type", value: "AWD" },
    ],
  },
  {
    title: "2021 Haval H6",
    image: "/figma/images/vehicle-1.png",
    market: "China",
    lotId: "CN-32114",
    country: "China",
    availability: "In stock",
    price: "$13,250",
    specs: [
      { label: "Vehicle type", value: "Used" },
      { label: "Dimensions", value: "4653×1886×1730 mm" },
      {
        label: "Powertrain options",
        value: "2 options",
        hint: "1.5T FWD, 2.0T AWD",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Gasoline" },
      { label: "Drive type", value: "FWD" },
    ],
  },
  {
    title: "2022 Changan UNI-K",
    image: "/figma/images/vehicle-2.png",
    market: "China",
    lotId: "CN-48792",
    country: "China",
    availability: "On request",
    price: "$19,400",
    specs: [
      { label: "Vehicle type", value: "New" },
      { label: "Dimensions", value: "4865×1948×1690 mm" },
      {
        label: "Powertrain options",
        value: "1 option",
        hint: "2.0T AWD",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Gasoline" },
      { label: "Drive type", value: "AWD" },
    ],
  },
  {
    title: "2020 Hongqi H9",
    image: "/figma/images/vehicle-3.png",
    market: "China",
    lotId: "CN-39255",
    country: "China",
    availability: "On request",
    price: "$28,600",
    specs: [
      { label: "Vehicle type", value: "Used" },
      { label: "Dimensions", value: "5137×1904×1493 mm" },
      {
        label: "Powertrain options",
        value: "2 options",
        hint: "2.0T, 3.0T",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Gasoline" },
      { label: "Drive type", value: "RWD" },
    ],
  },
  {
    title: "2023 NIO ET5",
    image: "/figma/images/vehicle-4.png",
    market: "China",
    lotId: "CN-51107",
    country: "China",
    availability: "In stock",
    price: "$35,200",
    specs: [
      { label: "Vehicle type", value: "New" },
      { label: "Dimensions", value: "4790×1960×1499 mm" },
      {
        label: "Powertrain options",
        value: "2 options",
        hint: "75 kWh, 100 kWh",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Electric" },
      { label: "Drive type", value: "AWD" },
    ],
  },
  {
    title: "2022 Toyota Crown",
    image: "/figma/images/vehicle-1.png",
    market: "Japan",
    lotId: "JP-17742",
    country: "Japan",
    availability: "On request",
    price: "$27,900",
    specs: [
      { label: "Vehicle type", value: "Used" },
      { label: "Dimensions", value: "4930×1840×1540 mm" },
      {
        label: "Powertrain options",
        value: "2 options",
        hint: "2.5 Hybrid, 2.4 Hybrid Turbo",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Hybrid" },
      { label: "Drive type", value: "AWD" },
    ],
  },
  {
    title: "2021 Hyundai Palisade",
    image: "/figma/images/vehicle-2.png",
    market: "Korea",
    lotId: "KR-90531",
    country: "Korea",
    availability: "In stock",
    price: "$29,300",
    specs: [
      { label: "Vehicle type", value: "Used" },
      { label: "Dimensions", value: "4980×1975×1750 mm" },
      {
        label: "Powertrain options",
        value: "2 options",
        hint: "3.8L V6, 2.2D",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Gasoline" },
      { label: "Drive type", value: "AWD" },
    ],
  },
  {
    title: "2020 Kia Stinger",
    image: "/figma/images/vehicle-3.png",
    market: "Korea",
    lotId: "KR-60218",
    country: "Korea",
    availability: "On request",
    price: "$19,800",
    specs: [
      { label: "Vehicle type", value: "Used" },
      { label: "Dimensions", value: "4830×1870×1400 mm" },
      {
        label: "Powertrain options",
        value: "2 options",
        hint: "2.0T, 3.3T AWD",
      },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel type", value: "Gasoline" },
      { label: "Drive type", value: "RWD" },
    ],
  },
];

export default function MarketplacePage() {
  return (
    <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] flex flex-col gap-6 text-foreground max-wide:max-w-[1440px] max-wide:px-[60px] max-tablet:max-w-[834px] max-tablet:py-[72px] max-tablet:px-4 max-tablet:pb-24 max-narrow:max-w-[320px] max-narrow:py-14 max-narrow:gap-4">
      <Breadcrumbs items={[{ label: "Home page", href: "/" }, { label: "Marketplace" }]} />
      <PageHeader
        title="Electric and Hybrid Vehicles"
        subtitle="Curated listings from China, Japan, and Korea with verified documents"
      />

      <MarketplaceClient markets={markets} featuredLot={featuredLot} vehicles={vehicleCards} />

      <ContactSection />
    </main>
  );
}
