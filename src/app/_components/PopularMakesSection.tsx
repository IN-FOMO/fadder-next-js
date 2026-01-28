import Image from "next/image";
import styles from "../page.module.css";

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
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Popular makes</h2>
        <div className={styles.toggleTabs}>
          <button className={styles.tabActive}>Automobile</button>
          <button className={styles.tab}>Motorcycle</button>
        </div>
      </div>
      <div className={styles.makesGrid}>
        {makes.map((make) => (
          <div key={make.name} className={styles.makeCard}>
            <Image src={make.icon} alt="" width={44} height={44} />
            <span>{make.name}</span>
            <span className={styles.makeCount}>{make.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
