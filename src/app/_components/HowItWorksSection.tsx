import Image from "next/image";
import { Button } from "./Button";

export type HowStep = {
  number: string;
  title: string;
  description: string;
  button: string;
  image: string;
};

type HowItWorksSectionProps = {
  steps: HowStep[];
};

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section className="page-wrap flex flex-col gap-[clamp(20px,3vw,32px)]">
      {steps.map((step, index) => {
        const isAlt = index === 1;
        return (
          <article
            key={step.title}
            className={`relative w-full flex flex-col lg:flex-row items-stretch gap-[clamp(16px,3vw,40px)] ${
              isAlt ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div
              className="relative w-full lg:w-[clamp(360px,32vw,600px)] h-[clamp(220px,28vw,400px)] shrink-0 rounded-[16px] overflow-hidden"
            >
              <Image
                src={step.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div
              className="flex flex-col justify-between items-start p-4 bg-white rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] min-h-[clamp(220px,22vw,280px)] w-full lg:flex-1"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold leading-7 m-0 text-dark">
                  {step.number} {step.title}
                </h3>
                <p className="text-base leading-5 m-0 text-dark">
                  {step.description}
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                className="rounded-[14px] h-10 px-6 py-3 text-sm leading-4 font-semibold"
              >
                {step.button}
              </Button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
