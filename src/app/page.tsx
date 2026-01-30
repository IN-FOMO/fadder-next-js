import type { Metadata } from "next";

import { type BlogCard, BlogSection } from "./_components/BlogSection";
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
import type { VehicleCardData } from "./_components/VehicleCard";

export const metadata: Metadata = {
  title: "Fadder",
  description: "Auto auction marketplace for buying and shipping vehicles.",
};

const vehicleCardsBase: VehicleCardData[] = [
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
];

// Слайдер в дизайне подразумевает много карточек — расширяем мок.
const vehicleCards: VehicleCardData[] = [
  ...vehicleCardsBase,
  ...vehicleCardsBase,
  ...vehicleCardsBase,
];

const howSteps: HowStep[] = [
  {
    number: "01.",
    title: "Vehicle Pickup",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    button: "Details & Drop-off",
    image: "/figma/images/home-process-1.png",
  },
  {
    number: "02.",
    title: "Packaging & Loading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    button: "Process & Handling",
    image: "/figma/images/home-process-2.png",
  },
  {
    number: "03.",
    title: "Shipping & Delivery",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    button: "Track & Receive",
    image: "/figma/images/home-process-3.png",
  },
];

const blogCards: BlogCard[] = [
  {
    title: "Top 10 Bidding Strategies for Car Auctions",
    date: "January 15, 2024",
    description:
      "Learn the insider secrets that professional bidders use to win their dream cars at auction.",
    image: "/figma/images/blog-1.png",
  },
  {
    title: "The Ultimate Guide to Shipping Your Auction Vehicle Overseas",
    date: "February 2, 2024",
    description:
      "From port logistics to customs paperwork, this guide covers everything you need to know.",
    image: "/figma/images/blog-2.png",
  },
  {
    title: "How to Spot a Great Deal at Auto Auctions (Even as a Beginner)",
    date: "March 12, 2024",
    description:
      "Learn what to look for in listings, how to check reports, and how to avoid costly mistakes.",
    image: "/figma/images/blog-3.png",
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

export default function HomePage() {
  return (
    <main className="bg-[#F5F6F8]">
      <div className="flex flex-col gap-[74px] pb-20">
        <HeroSection />
        <HomeNewArrivalsSection cards={vehicleCards} />
        <PopularMakesSection makes={popularMakes} />
        <ContactSection />
        <BlogSection cards={blogCards} />
        <HomePopularSection cards={vehicleCards} />
        <HomeUnder10Section cards={vehicleCards} />
        <HowItWorksSection steps={howSteps} />
      </div>
    </main>
  );
}
