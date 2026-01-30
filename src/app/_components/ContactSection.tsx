import Image from "next/image";
import { Button } from "./Button";

export function ContactSection() {
  return (
    <section className="w-full max-w-[1760px] mx-auto px-20 max-wide:px-[60px] max-tablet:px-4">
      <div className="flex items-center gap-[30px] p-6 rounded-[16px] bg-white backdrop-blur-[380px] max-tablet:flex-col">
        <div className="flex flex-col justify-between gap-[41px] p-10 self-stretch w-[700px] shrink-0 max-tablet:w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold leading-7 m-0 text-dark w-[426px] max-tablet:w-full">
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
            <div className="flex gap-4 w-full">
              <input
                className="flex-1 h-10 px-6 py-4 bg-surface rounded-[14px] border-none text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent"
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
              <input
                className="flex-1 h-10 px-6 py-4 bg-surface rounded-[14px] border-none text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent"
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
            <div className="flex gap-4 w-full">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full"
              >
                Send Message
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="w-full"
              >
                Ask to chat
              </Button>
            </div>
          </form>
        </div>
        <div className="relative self-stretch h-[536px] flex-1 rounded-[14px] overflow-hidden max-tablet:w-full max-tablet:h-[320px]">
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
