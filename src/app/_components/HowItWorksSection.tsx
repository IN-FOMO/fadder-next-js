import Image from "next/image";
import styles from "../page.module.css";

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
    <section className={styles.section}>
      <div className={styles.stepsLarge}>
        {steps.map((step, index) => (
          <article
            key={step.title}
            className={`${styles.stepRow} ${index === 1 ? styles.stepRowAlt : ""}`}
          >
            <div className={styles.stepImage}>
              <Image
                src={step.image}
                alt=""
                fill
                sizes="600px"
                className={styles.coverImage}
              />
            </div>
            <div
              className={`${styles.stepContent} ${
                index === 1 ? styles.stepContentAlt : ""
              }`}
            >
              <div className={styles.stepText}>
                <h3 className={styles.stepTitle}>
                  {step.number} {step.title}
                </h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              <button className={styles.stepButton}>{step.button}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
