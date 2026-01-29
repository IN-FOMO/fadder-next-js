import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";

export type MakeItem = {
  name: string;
  count: string;
  icon: string;
};

function makeSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
}

type PopularMakesSectionProps = {
  makes: MakeItem[];
};

export function PopularMakesSection({ makes }: PopularMakesSectionProps) {
  return (
    <section className="flex flex-col gap-4 mx-20 max-wide:mx-[60px] max-tablet:mx-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold m-0 text-dark">Popular makes</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="text-base">
            Automobile
          </Button>
          <Button variant="outlineInactive" size="sm" className="text-base">
            Motorcycle
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {makes.map((make) => (
          <Link
            key={make.name}
            href={`/search?make=${makeSlug(make.name)}`}
            className="bg-white rounded-sm w-[120px] h-[120px] p-3 flex flex-col items-center gap-2 text-center hover:bg-surface hover:shadow-hover transition-shadow no-underline text-inherit"
          >
            <Image src={make.icon} alt="" width={44} height={44} />
            <span className="text-sm font-normal text-dark">{make.name}</span>
            <span className="text-sm text-muted">{make.count}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
