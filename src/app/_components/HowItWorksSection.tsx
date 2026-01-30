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
    <section className="flex flex-col gap-6 w-full max-w-[1760px] mx-auto px-20 max-wide:px-[60px] max-narrow:px-4">
      {steps.map((step, index) => {
        const isAlt = index === 1;
        return (
          <article
            key={step.title}
            className={
              "relative w-full h-[400px] flex max-narrow:flex-col max-narrow:items-stretch max-narrow:h-auto " +
              (isAlt ? "flex-row-reverse items-start" : "items-center")
            }
          >
            <div
              className={
                "relative w-[600px] h-[400px] shrink-0 rounded-[16px] overflow-hidden max-narrow:w-full max-narrow:h-[240px]"
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
                "flex flex-col justify-between gap-3 p-4 bg-white rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] h-[280px] w-[1220px] shrink-0 z-[1] max-narrow:w-full max-narrow:h-auto max-narrow:ml-0 max-narrow:mt-[-40px] " +
                (isAlt ? "mr-[-60px] mt-[60px]" : "ml-[-60px]")
              }
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
