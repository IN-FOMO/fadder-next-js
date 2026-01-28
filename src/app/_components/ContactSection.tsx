import Image from "next/image";
import styles from "../page.module.css";

export function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactCard}>
        <div className={styles.contactFormWrapper}>
          <div className={styles.contactHeading}>
            <h2>Have Questions? We're Here to Help!</h2>
            <p>
              Our expert team is ready to assist you with any questions about our
              auctions, bidding process, or vehicle inspections.
              <br />
              <br />
              Get in touch today!
            </p>
          </div>
          <form className={styles.contactForm} aria-label="Contact form">
            <div className={styles.contactRow}>
              <input
                className={styles.contactInput}
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
              <input
                className={styles.contactInput}
                type="text"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <input
              className={styles.contactInput}
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className={styles.contactInput}
              type="tel"
              name="phone"
              placeholder="Phone Number"
            />
            <textarea
              className={styles.contactTextarea}
              name="message"
              placeholder="Message"
              rows={4}
            />
            <div className={styles.contactActions}>
              <button type="submit" className={styles.contactPrimaryButton}>
                Send Message
              </button>
              {/* <button type="button" className={styles.contactSecondaryButton}>
                Ask to chat
              </button> */}
            </div>
          </form>
        </div>
        <div className={styles.contactImage}>
          <Image
            src="/figma/images/contact.png"
            alt=""
            fill
            sizes="600px"
            className={styles.coverImage}
          />
        </div>
      </div>
    </section>
  );
}
