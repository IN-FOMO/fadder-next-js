import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";

const footerColumns: {
  title: string;
  items: { label: string; href: string }[];
}[] = [
  {
    title: "Vehicle Type",
    items: [
      { label: "Cars", href: "/search?type=cars" },
      { label: "Trucks", href: "/search?type=trucks" },
      { label: "RVs", href: "/search?type=rvs" },
      { label: "Motorcycles", href: "/search?type=motorcycles" },
      { label: "Buses", href: "/search?type=buses" },
      { label: "Trailers", href: "/search?type=trailers" },
      { label: "Boats", href: "/search?type=boats" },
      { label: "Jet Skis", href: "/search?type=jet-skis" },
      { label: "Snowmobiles", href: "/search?type=snowmobiles" },
      {
        label: "Industrial Machinery",
        href: "/search?type=industrial-machinery",
      },
    ],
  },
  {
    title: "Brand",
    items: [
      { label: "Acura", href: "/search?make=acura" },
      { label: "Audi", href: "/search?make=audi" },
      { label: "BMW", href: "/search?make=bmw" },
      { label: "Chevrolet", href: "/search?make=chevrolet" },
      { label: "Cadillac", href: "/search?make=cadillac" },
      { label: "Honda", href: "/search?make=honda" },
      { label: "Kia", href: "/search?make=kia" },
      { label: "Jeep", href: "/search?make=jeep" },
      { label: "Lexus", href: "/search?make=lexus" },
      { label: "Subaru", href: "/search?make=subaru" },
    ],
  },
  {
    title: "Country",
    items: [
      { label: "United States", href: "/search?country=united-states" },
      { label: "Canada", href: "/search?country=canada" },
      { label: "United Kingdom", href: "/search?country=united-kingdom" },
      { label: "Germany", href: "/search?country=germany" },
      { label: "France", href: "/search?country=france" },
      { label: "Ukraine", href: "/search?country=ukraine" },
      { label: "Georgia", href: "/search?country=georgia" },
      { label: "Saudi Arabia", href: "/search?country=saudi-arabia" },
      { label: "Japan", href: "/search?country=japan" },
      { label: "Australia", href: "/search?country=australia" },
    ],
  },
  {
    title: "Auction",
    items: [
      { label: "Today's Auctions", href: "/marketplace" },
      { label: "Auctions Calendar", href: "/marketplace?view=calendar" },
      { label: "Join Auction", href: "/marketplace" },
      { label: "Night Cap Sales", href: "/search?auction=night-cap" },
      { label: "Bank-Repo Vehicles", href: "/search?auction=bank-repo" },
      { label: "Rental Auctions", href: "/search?auction=rental" },
      { label: "Wholesale Auctions", href: "/search?auction=wholesale" },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="flex flex-col items-center gap-2.5 bg-footer px-20 pt-12 pb-4 max-wide:px-[60px] max-tablet:px-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-[1920px]">
        <div className="flex gap-[60px] w-full">
          <div className="flex flex-col gap-8 w-[318px] shrink-0 text-white">
            <LanguageSwitcher
              size="md"
              buttonClassName="gap-3 text-dark"
              className="text-dark"
            />
            <div className="flex flex-col gap-3 text-base font-normal leading-5 text-white">
              <a
                href="mailto:info@fadder.com"
                className="text-white no-underline hover:underline active:underline"
              >
                Email: info@fadder.com
              </a>
              <span>Address: 123 Auto Avenue, Miami, FL, USA</span>
            </div>
            <Image
              src="/figma/images/footer-socials.svg"
              alt=""
              width={176}
              height={32}
              className="h-8 w-[176px]"
            />
          </div>
          <div className="flex justify-between gap-8 w-full">
            {footerColumns.map((column) => (
              <div
                key={column.title}
                className="flex flex-col gap-4 w-[170px] text-white"
              >
                <h4 className="text-xl font-bold leading-6 m-0">
                  {column.title}
                </h4>
                <div className="flex flex-col gap-3 text-base font-normal leading-5">
                  {column.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-white no-underline hover:underline active:underline focus:outline focus:underline"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full border-0 grayscale"
            title="Silicon Valley map"
            src="https://www.google.com/maps?q=Silicon%20Valley%2C%20CA&z=10&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <nav
          className="flex flex-wrap gap-3 text-white text-base font-normal leading-5"
          aria-label="Footer links"
        >
          <Link
            href="/blog"
            className="text-inherit no-underline hover:underline active:underline"
          >
            Blog
          </Link>
          <Link
            href="/terms"
            className="text-inherit no-underline hover:underline active:underline"
          >
            Terms
          </Link>
          <Link
            href="/privacy-policy"
            className="text-inherit no-underline hover:underline active:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            className="text-inherit no-underline hover:underline active:underline"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="text-inherit no-underline hover:underline active:underline"
          >
            About
          </Link>
          <Link
            href="/help"
            className="text-inherit no-underline hover:underline active:underline"
          >
            Help
          </Link>
          <Link
            href="/delivery"
            className="text-inherit no-underline hover:underline active:underline"
          >
            Delivery
          </Link>
          <Link
            href="/marketplace"
            className="text-inherit no-underline hover:underline active:underline"
          >
            Marketplace
          </Link>
        </nav>
      </div>
    </footer>
  );
}
