import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";

const missionVision = [
  {
    title: "Our Mission",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Our Vision",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const stats = [
  { value: "5000+", label: "Delivered Vehicles" },
  { value: "2000+", label: "Happy Clients" },
  { value: "15+", label: "Partner Countries" },
  { value: "24/7", label: "Customer Support" },
];

const timeline = [
  {
    year: "2014",
    title: "Founded in Warsaw, Poland",
    description:
      "Fadder was established as a small local transport company, focusing on car delivery services within Poland and neighboring countries. Our mission was simple — make vehicle transport reliable and transparent.",
  },
  {
    year: "2016",
    title: "Expansion Across Europe",
    description:
      "We launched our first international routes, covering Germany, the Czech Republic, and the Netherlands. The growing demand for cross-border vehicle logistics helped us build partnerships with leading dealerships and private clients.",
  },
  {
    year: "2018",
    title: "Digital Transformation",
    description:
      "Fadder introduced its first online booking and tracking system, allowing customers to schedule shipments and monitor delivery in real time. This innovation made the process faster and more secure.",
  },
  {
    year: "2020",
    title: "B2B and Fleet Services",
    description:
      "We expanded our services for corporate clients, offering full-cycle logistics solutions for dealerships and leasing companies. Despite the global challenges, the company continued to grow and optimize its operations.",
  },
  {
    year: "2022",
    title: "Sustainable Logistics Initiative",
    description:
      "Fadder began implementing eco-friendly solutions, including route optimization and a partial transition to low-emission transport vehicles, contributing to greener logistics in Europe.",
  },
  {
    year: "2024",
    title: "Global Network and Automation",
    description:
      "Today, Fadder operates across the entire EU and UK, integrating AI-based systems for route planning, customer service, and shipment tracking — ensuring efficiency, safety, and transparency at every stage.",
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] flex flex-col gap-6 text-foreground max-tablet:px-8 max-narrow:px-4">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: "About" }]}
      />
      <PageHeader
        title="About Fadder"
        subtitle="Helping individuals and companies purchase quality vehicles from abroad since 2014"
      />

      <section className="w-full max-w-[1760px] mx-auto flex flex-col gap-[74px] max-tablet:w-[calc(100%-0px)]">
        <div className="grid grid-cols-2 gap-4 max-narrow:grid-cols-1">
          {missionVision.map((item) => (
            <article
              key={item.title}
              className="bg-white rounded-lg p-4 flex flex-col gap-6"
            >
              <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                {item.title}
              </h3>
              <p className="m-0 text-base leading-5 font-normal text-foreground">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 max-tablet:grid-cols-2 max-narrow:grid-cols-1">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-lg p-4 flex flex-col gap-2 items-center"
            >
              <div className="text-xl leading-6 font-bold text-primary">
                {item.value}
              </div>
              <div className="text-base leading-5 font-normal text-muted text-center">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {timeline.map((item) => (
            <div key={item.year} className="flex gap-4 items-stretch">
              <div className="w-14 flex flex-col items-center gap-1 self-stretch shrink-0">
                <div className="bg-black text-white rounded-lg py-1 px-2 text-sm leading-4 font-bold inline-flex items-center justify-center">
                  {item.year}
                </div>
                <span
                  className="w-0.5 flex-1 bg-black min-h-[20px]"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 bg-white rounded-lg p-4 flex flex-col gap-6">
                <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="m-0 text-base leading-5 font-normal text-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <ContactSection />
      </section>
    </main>
  );
}
