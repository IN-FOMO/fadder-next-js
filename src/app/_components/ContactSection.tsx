import Image from "next/image";
import { Button } from "./Button";

export function ContactSection() {
  return (
    <section className="page-wrap">
      <div className="flex flex-wrap items-stretch gap-[clamp(16px,3vw,30px)] p-[clamp(16px,2.5vw,24px)] rounded-[16px] bg-white backdrop-blur-[380px]">
        <div className="flex flex-col justify-between gap-[clamp(20px,3vw,41px)] p-[clamp(16px,3vw,40px)] self-stretch w-full lg:w-[clamp(360px,45vw,700px)]">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold leading-7 m-0 text-dark max-w-[clamp(260px,40vw,426px)]">
              Have Questions? We're Here to Help!
            </h2>
            <p className="text-base leading-5 m-0 text-foreground opacity-80">
              Our expert team is ready to assist you with any questions about
              our auctions, bidding process, or vehicle inspections.
              <br />
              <br />
              Get in touch today!
            </p>
          </div>
          <form
            className="flex flex-col gap-4 w-full"
            aria-label="Contact form"
          >
            <div className="flex flex-wrap gap-4 w-full">
              <input
                className="flex-1 min-w-[clamp(160px,20vw,220px)] h-10 px-6 py-4 bg-surface rounded-[14px] border-none text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent"
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
              <input
                className="flex-1 min-w-[clamp(160px,20vw,220px)] h-10 px-6 py-4 bg-surface rounded-[14px] border-none text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent"
                type="text"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <input
              className="w-full h-10 px-6 py-4 bg-surface rounded-[14px] border-none text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="w-full h-10 px-6 py-4 bg-surface rounded-[14px] border-none text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent"
              type="tel"
              name="phone"
              placeholder="Phone Number"
            />
            <input
              className="w-full h-10 px-6 py-4 bg-surface rounded-[14px] border-none text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent"
              type="text"
              name="message"
              placeholder="Message"
            />
            <div className="flex flex-wrap gap-4 w-full">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full min-w-[clamp(160px,20vw,220px)]"
              >
                Send Message
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="w-full min-w-[clamp(160px,20vw,220px)]"
              >
                Ask to chat
              </Button>
            </div>
          </form>
        </div>
        <div className="relative self-stretch h-[clamp(260px,32vw,536px)] flex-1 rounded-[14px] overflow-hidden min-w-[clamp(220px,30vw,320px)]">
          <Image
            src="/figma/images/contact.png"
            alt=""
            fill
            sizes="600px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
