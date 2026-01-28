import { BlogSection, type BlogCard } from "./_components/BlogSection";
import { ContactSection } from "./_components/ContactSection";
import { HeroSection } from "./_components/HeroSection";
import { HowItWorksSection, type HowStep } from "./_components/HowItWorksSection";
import { PopularMakesSection, type MakeItem } from "./_components/PopularMakesSection";
import { VehicleSlider } from "./_components/VehicleSlider";
import type { VehicleCardData } from "./_components/VehicleCard";
import styles from "./page.module.css";

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
    auction: "Copart",
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
];

const blogCards: BlogCard[] = [
  {
    title: "Top 10 Bidding Strategies for Car Auctions",
    date: "January 15, 2024",
    description:
      "Learn the insider secrets that professional bidders use to win their dream cars at auction",
    image: "/figma/images/blog-1.png",
  },
  {
    title: "Complete Car Inspection Checklist",
    date: "January 15, 2024",
    description:
      "Everything you need to know before bidding on a vehicle at our auctions",
    image: "/figma/images/blog-2.png",
  },
  {
    title: "2024 Electric Vehicle Market Trends",
    date: "January 15, 2024",
    description:
      "Discover which electric vehicles are gaining value and why they're auction favorites",
    image: "/figma/images/blog-3.png",
  },
];

const makes: MakeItem[] = [
  { name: "Acura", count: "1,268", icon: "/figma/brands/brand-acura.svg" },
  { name: "Alfa Romeo", count: "1,268", icon: "/figma/brands/brand-alfa-romeo.svg" },
  { name: "Aston Martin", count: "1,268", icon: "/figma/brands/brand-aston-martin.svg" },
  { name: "Audi", count: "1,268", icon: "/figma/brands/brand-audi.svg" },
  { name: "Bentley", count: "1,268", icon: "/figma/brands/brand-bentley.svg" },
  { name: "BMW", count: "1,268", icon: "/figma/brands/brand-bmw.svg" },
  { name: "Cadillac", count: "1,268", icon: "/figma/brands/brand-cadillac.svg" },
  { name: "Chevrolet", count: "1,268", icon: "/figma/brands/brand-chevrolet.svg" },
  { name: "Chrysler", count: "1,268", icon: "/figma/brands/brand-chrysler.svg" },
  { name: "Ferrari", count: "1,268", icon: "/figma/brands/brand-ferrari.svg" },
  { name: "Fiat", count: "1,268", icon: "/figma/brands/brand-fiat.svg" },
  { name: "Ford", count: "1,268", icon: "/figma/brands/brand-ford.svg" },
  { name: "Honda", count: "1,268", icon: "/figma/brands/brand-honda.svg" },
  { name: "Hyundai", count: "1,268", icon: "/figma/brands/brand-hyundai.svg" },
  { name: "Infiniti", count: "1,268", icon: "/figma/brands/brand-infiniti.svg" },
  { name: "Jaguar", count: "1,268", icon: "/figma/brands/brand-jaguar.svg" },
  { name: "Jeep", count: "1,268", icon: "/figma/brands/brand-jeep.svg" },
  { name: "KIA", count: "1,268", icon: "/figma/brands/brand-kia.svg" },
  { name: "Lamborghini", count: "1,268", icon: "/figma/brands/brand-lamborghini.svg" },
  { name: "Land Rover", count: "1,268", icon: "/figma/brands/brand-land-rover.svg" },
  { name: "Lexus", count: "1,268", icon: "/figma/brands/brand-lexus.svg" },
  { name: "Maybach", count: "1,268", icon: "/figma/brands/brand-maybach.svg" },
  { name: "Mazda", count: "1,268", icon: "/figma/brands/brand-mazda.svg" },
  { name: "Mclaren", count: "1,268", icon: "/figma/brands/brand-mclaren.svg" },
  { name: "Mercedes-Benz", count: "1,268", icon: "/figma/brands/brand-mercedes-benz.svg" },
  { name: "Mini", count: "1,268", icon: "/figma/brands/brand-mini.svg" },
  { name: "Mitsubishi", count: "1,268", icon: "/figma/brands/brand-mitsubishi.svg" },
  { name: "Nissan", count: "1,268", icon: "/figma/brands/brand-nissan.svg" },
  { name: "Porsche", count: "1,268", icon: "/figma/brands/brand-porsche.svg" },
  { name: "Renault", count: "1,268", icon: "/figma/brands/brand-renault.svg" },
  { name: "Rolls-Royce", count: "1,268", icon: "/figma/brands/brand-rolls-royce.svg" },
  { name: "Smart", count: "1,268", icon: "/figma/brands/brand-smart.svg" },
  { name: "Subaru", count: "1,268", icon: "/figma/brands/brand-subaru.svg" },
  { name: "Suzuki", count: "1,268", icon: "/figma/brands/brand-suzuki.svg" },
  { name: "Tesla", count: "1,268", icon: "/figma/brands/brand-tesla.svg" },
  { name: "Toyota", count: "1,268", icon: "/figma/brands/brand-toyota.svg" },
  { name: "Volkswagen", count: "1,268", icon: "/figma/brands/brand-volkswagen.svg" },
  { name: "Volvo", count: "1,268", icon: "/figma/brands/brand-volvo.svg" },
];

const howSteps: HowStep[] = [
  {
    number: "01.",
    title: "Vehicle Pickup",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    button: "Details & Drop-off",
    image: "/figma/images/how-large-1.png",
  },
  {
    number: "02.",
    title: "Packaging & Loading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    button: "Process & Handling",
    image: "/figma/images/how-large-2.png",
  },
  {
    number: "03.",
    title: "Shipping & Delivery",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    button: "Track & Receive",
    image: "/figma/images/how-large-3.png",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <HeroSection />
      <VehicleSlider
        title="New Arrivals"
        viewAllHref="/vehicles"
        cards={vehicleCards}
      />
      <PopularMakesSection makes={makes} />
      <ContactSection />
      <BlogSection cards={blogCards} />
      <VehicleSlider
        title="Popular now"
        viewAllHref="/popular"
        cards={vehicleCards}
      />
      <VehicleSlider
        title="Under $10,000"
        viewAllHref="/vehicles"
        cards={vehicleCards}
      />
      <HowItWorksSection steps={howSteps} />
    </main>
  );
}
