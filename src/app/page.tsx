import type { Metadata } from "next";

import { BlogSection } from "./_components/BlogSection";
import { ContactSection } from "./_components/ContactSection";
import { HeroSection } from "./_components/HeroSection";
import {
  HowItWorksSection,
  type HowStep,
} from "./_components/HowItWorksSection";
import { HomeNewArrivalsSection } from "./_components/home/HomeNewArrivalsSection";
import { HomePopularSection } from "./_components/home/HomePopularSection";
import { HomeUnder10Section } from "./_components/home/HomeUnder10Section";
import {
  type MakeItem,
  PopularMakesSection,
} from "./_components/PopularMakesSection";

export const metadata: Metadata = {
  title: "Fadder",
  description: "Auto auction marketplace for buying and shipping vehicles.",
};

const DEFAULT_LANG = "en";
const ALLOWED_LANGS = ["en", "ru", "pl"] as const;
type AllowedLang = (typeof ALLOWED_LANGS)[number];

function normalizeLang(input?: string): AllowedLang {
  if (!input) return DEFAULT_LANG;
  const lower = input.toLowerCase();
  return (
    ALLOWED_LANGS.includes(lower as AllowedLang) ? lower : DEFAULT_LANG
  ) as AllowedLang;
}

const howSteps: HowStep[] = [
  {
    number: "01.",
    title: "Vehicle Pickup",
    description:
      "We coordinate with the auction house to pick up your winning vehicle. Our logistics team handles all the paperwork and ensures safe transport from the lot to our processing facility.",
    button: "Details & Drop-off",
    image: "/figma/images/home-process-1.png",
  },
  {
    number: "02.",
    title: "Packaging & Loading",
    description:
      "Your vehicle is carefully prepared for international shipping. We perform a thorough inspection, document the condition with photos, and securely load it for ocean transport to your destination port.",
    button: "Process & Handling",
    image: "/figma/images/home-process-2.png",
  },
  {
    number: "03.",
    title: "Shipping & Delivery",
    description:
      "Track your vehicle in real-time as it ships to your country. We handle customs clearance and final delivery to your doorstep, keeping you informed every step of the way.",
    button: "Track & Receive",
    image: "/figma/images/home-process-3.png",
  },
];

const popularMakes: MakeItem[] = [
  { name: "Acura", count: "1,268", icon: "/figma/brands/brand-acura.svg" },
  {
    name: "Alfa Romeo",
    count: "1,268",
    icon: "/figma/brands/brand-alfa-romeo.svg",
  },
  {
    name: "Aston Martin",
    count: "1,268",
    icon: "/figma/brands/brand-aston-martin.svg",
  },
  { name: "Audi", count: "1,268", icon: "/figma/brands/brand-audi.svg" },
  { name: "Bentley", count: "1,268", icon: "/figma/brands/brand-bentley.svg" },
  { name: "BMW", count: "1,268", icon: "/figma/brands/brand-bmw.svg" },
  {
    name: "Cadillac",
    count: "1,268",
    icon: "/figma/brands/brand-cadillac.svg",
  },
  {
    name: "Chevrolet",
    count: "1,268",
    icon: "/figma/brands/brand-chevrolet.svg",
  },
  {
    name: "Chrysler",
    count: "1,268",
    icon: "/figma/brands/brand-chrysler.svg",
  },
  { name: "Dodge", count: "1,268", icon: "/figma/brands/brand-dodge.svg" },
  { name: "Ferrari", count: "1,268", icon: "/figma/brands/brand-ferrari.svg" },
  { name: "Fiat", count: "1,268", icon: "/figma/brands/brand-fiat.svg" },
  { name: "Ford", count: "1,268", icon: "/figma/brands/brand-ford.svg" },
  { name: "Honda", count: "1,268", icon: "/figma/brands/brand-honda.svg" },
  { name: "Hyundai", count: "1,268", icon: "/figma/brands/brand-hyundai.svg" },
  {
    name: "Infiniti",
    count: "1,268",
    icon: "/figma/brands/brand-infiniti.svg",
  },
  { name: "Jaguar", count: "1,268", icon: "/figma/brands/brand-jaguar.svg" },
  { name: "Jeep", count: "1,268", icon: "/figma/brands/brand-jeep.svg" },
  { name: "Kia", count: "1,268", icon: "/figma/brands/brand-kia.svg" },
  {
    name: "Lamborghini",
    count: "1,268",
    icon: "/figma/brands/brand-lamborghini.svg",
  },
  {
    name: "Land Rover",
    count: "1,268",
    icon: "/figma/brands/brand-land-rover.svg",
  },
  { name: "Lexus", count: "1,268", icon: "/figma/brands/brand-lexus.svg" },
  { name: "Maybach", count: "1,268", icon: "/figma/brands/brand-maybach.svg" },
  { name: "Mazda", count: "1,268", icon: "/figma/brands/brand-mazda.svg" },
  {
    name: "McLaren",
    count: "1,268",
    icon: "/figma/brands/brand-mclaren.svg",
  },
  {
    name: "Mercedes-Benz",
    count: "1,268",
    icon: "/figma/brands/brand-mercedes-benz.svg",
  },
  { name: "Mini", count: "1,268", icon: "/figma/brands/brand-mini.svg" },
  {
    name: "Mitsubishi",
    count: "1,268",
    icon: "/figma/brands/brand-mitsubishi.svg",
  },
  { name: "Nissan", count: "1,268", icon: "/figma/brands/brand-nissan.svg" },
  { name: "Porsche", count: "1,268", icon: "/figma/brands/brand-porsche.svg" },
  { name: "Renault", count: "1,268", icon: "/figma/brands/brand-renault.svg" },
  {
    name: "Rolls-Royce",
    count: "1,268",
    icon: "/figma/brands/brand-rolls-royce.svg",
  },
  { name: "Smart", count: "1,268", icon: "/figma/brands/brand-smart.svg" },
  { name: "Subaru", count: "1,268", icon: "/figma/brands/brand-subaru.svg" },
  { name: "Suzuki", count: "1,268", icon: "/figma/brands/brand-suzuki.svg" },
  { name: "Tesla", count: "1,268", icon: "/figma/brands/brand-tesla.svg" },
  { name: "Toyota", count: "1,268", icon: "/figma/brands/brand-toyota.svg" },
  {
    name: "Volkswagen",
    count: "1,268",
    icon: "/figma/brands/brand-volkswagen.svg",
  },
  { name: "Volvo", count: "1,268", icon: "/figma/brands/brand-volvo.svg" },
];

type HomePageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const lang = normalizeLang(resolvedSearchParams?.lang);
  return (
    <main className="bg-[#F5F6F8] overflow-x-hidden">
      <div className="flex flex-col gap-[clamp(24px,5vw,74px)] pb-[clamp(24px,5vw,80px)]">
        <HeroSection />
        <HomeNewArrivalsSection />
        <PopularMakesSection makes={popularMakes} />
        <ContactSection />
        <BlogSection lang={lang} />
        <HomePopularSection />
        <HomeUnder10Section />
        <HowItWorksSection steps={howSteps} />
      </div>
    </main>
  );
}
