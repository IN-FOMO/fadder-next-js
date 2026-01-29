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
    <section className="flex flex-col gap-4 mx-20 max-wide:mx-[60px] max-tablet:mx-4">
      <div className="flex flex-col gap-6 w-full max-w-[1760px] mx-auto">
        {steps.map((step, index) => {
          const isAlt = index === 1;
          return (
            <article
              key={step.title}
              className={
                "flex items-center relative w-full min-h-[400px] " +
                (isAlt ? "items-start" : "")
              }
            >
              <div
                className={
                  "relative w-[600px] h-[400px] shrink-0 rounded-lg overflow-hidden " +
                  (isAlt ? "absolute right-0 top-0 z-0" : "")
                }
              >
                <Image
                  src={step.image}
                  alt=""
                  fill
                  sizes="600px"
                  className="object-cover"
                />
              </div>
              <div
                className={
                  "flex flex-col justify-between gap-3 p-4 bg-white rounded-lg shadow-card min-h-[280px] w-[1220px] shrink-0 z-[1] " +
                  (isAlt
                    ? "absolute left-0 top-[60px] w-[1220px] h-[280px] ml-0"
                    : "ml-[-60px]")
                }
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold leading-7 m-0 text-dark">
                    {step.number} {step.title}
                  </h3>
                  <p className="text-base leading-5 m-0 text-dark">{step.description}</p>
                </div>
                <Button variant="primary" size="md">
                  {step.button}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
