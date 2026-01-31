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
          <div className="flex items-center gap-2 bg-white border-2 border-primary rounded-[16px] px-4 py-3 text-base font-bold leading-5 text-black">
            Automobile
          </div>
          <div className="flex items-center gap-2 bg-white rounded-[16px] px-4 py-3 text-base font-bold leading-5 text-black">
            Motorcycle
          </div>
        </div>
      </div>
      <div className="grid place-items-center grid-cols-[repeat(13,minmax(0,1fr))] gap-3 self-stretch max-w-[1704px] mx-auto justify-center place-items-center content-centergrid grid-cols-[repeat(13,minmax(0,1fr))] gap-3 max-w-[1704px] mx-auto justify-items-center items-centergrid grid-cols-[repeat(13,minmax(0,1fr))] gap-3 self-stretch max-w-[1704px] mx-auto justify-items-center items-center">
        {makes.map((make) => (
          <Link
            key={make.name}
            href={`/search?make=${makeSlug(make.name)}`}
            className="bg-white rounded-[16px] w-[120px] h-[120px] p-3 flex flex-col items-center justify-center gap-1 text-center hover:bg-surface hover:shadow-hover transition-shadow no-underline text-inherit"
          >
            <Image
              src={make.icon}
              alt=""
              width={44}
              height={44}
              className="w-[44px] h-[44px] object-contain"
            />
            <span className="text-[14px] leading-[16px] font-normal text-dark">
              {make.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
