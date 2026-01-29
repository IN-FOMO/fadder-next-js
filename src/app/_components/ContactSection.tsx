import Image from "next/image";
import { Button } from "./Button";

export function ContactSection() {
  return (
    <section className="mx-20 max-wide:mx-[60px] max-tablet:mx-4">
      <div className="flex items-center gap-[30px] p-6 rounded-lg bg-white backdrop-blur-[380px]">
        <div className="flex flex-col gap-[41px] p-10 flex-1 max-w-[40%] max-tablet:max-w-full">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold leading-7 m-0 text-dark max-w-[426px]">
              Have Questions? We're Here to Help!
            </h2>
            <p className="text-base leading-5 m-0 text-foreground opacity-80 max-w-[426px]">
              Our expert team is ready to assist you with any questions about our auctions, bidding
              process, or vehicle inspections.
              <br />
              <br />
              Get in touch today!
            </p>
          </div>
          <form className="flex flex-col gap-4" aria-label="Contact form">
            <div className="flex gap-4">
              <input
                className="w-full border-none rounded-md py-4 px-6 bg-surface text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent h-10"
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
              <input
                className="w-full border-none rounded-md py-4 px-6 bg-surface text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent h-10"
                type="text"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <input
              className="w-full border-none rounded-md py-4 px-6 bg-surface text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent h-10"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="w-full border-none rounded-md py-4 px-6 bg-surface text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent h-10"
              type="tel"
              name="phone"
              placeholder="Phone Number"
            />
            <textarea
              className="w-full border-none rounded-md py-4 px-6 bg-surface text-xs leading-[14px] text-muted box-border outline-none border-2 border-transparent min-h-[120px] resize-y"
              name="message"
              placeholder="Message"
              rows={4}
            />
            <div className="flex gap-4">
              <Button type="submit" variant="primary" size="md">
                Send Message
              </Button>
            </div>
          </form>
        </div>
        <div className="relative flex-[2.5] rounded-md overflow-hidden h-[536px] min-w-[60%] max-tablet:min-w-0 max-tablet:h-[320px]">
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
