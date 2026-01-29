import Image from "next/image";
import { Button } from "./Button";

export type MakeItem = {
  name: string;
  count: string;
  icon: string;
};

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
          <div
            key={make.name}
            className="bg-white rounded-lg w-[120px] p-3 flex flex-col items-center gap-2 text-center hover:bg-surface"
          >
            <Image src={make.icon} alt="" width={44} height={44} />
            <span className="text-sm">{make.name}</span>
            <span className="text-sm text-muted">{make.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
