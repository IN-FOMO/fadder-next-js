import Image from "next/image";
import Link from "next/link";

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
    <section className="flex flex-col gap-4 w-full max-w-[1760px] mx-auto px-20 max-wide:px-[60px] max-tablet:px-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold leading-7 m-0 text-black">
          Popular makes
        </h2>
        <div className="flex items-center bg-white rounded-[16px]">
          <div className="bg-white border-2 border-primary rounded-[16px] px-4 py-3 text-base font-bold leading-5 text-black">
            Automobile
          </div>
          <div className="bg-white rounded-[16px] px-4 py-3 text-base font-bold leading-5 text-black">
            Motorcycle
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {makes.map((make) => (
          <Link
            key={make.name}
            href={`/search?make=${makeSlug(make.name)}`}
            className="bg-white rounded-[16px] w-[120px] h-[120px] p-3 flex flex-col items-center gap-2 text-center hover:bg-surface hover:shadow-hover transition-shadow no-underline text-inherit"
          >
            <Image
              src={make.icon}
              alt=""
              width={44}
              height={44}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="text-sm font-normal text-dark">{make.name}</span>
            <span className="text-sm text-muted">{make.count}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
