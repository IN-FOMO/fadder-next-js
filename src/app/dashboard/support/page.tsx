"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { DashboardSidebar } from "../../_components/DashboardSidebar";

type FaqItem = {
  question: string;
  answer?: string;
  open: boolean;
};

const faqItems: FaqItem[] = [
  { question: "Where do the cars come from?", open: false },
  {
    question: "Can I check the condition of the car before buying?",
    answer:
      "Yes, you can review detailed inspection reports, photos, and history. For some vehicles, we also provide independent third-party inspections",
    open: true,
  },
  {
    question: "What documents do I receive with the car?",
    answer:
      "Simply register on our website, place a refundable deposit, and you’ll be able to bid on cars immediately. You can also learn more in our documentation or check your profile section.",
    open: true,
  },
  {
    question: "How can I participate in the auction?",
    answer:
      "Simply register on our website, place a refundable deposit, and you’ll be able to bid on cars immediately.",
    open: true,
  },
  { question: "How much time do I have to pay after winning?", open: false },
  { question: "How long does delivery take?", open: false },
  { question: "Are there any additional fees?", open: false },
];

export default function DashboardSupportPage() {
  const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    faqItems.forEach((item) => {
      initial[item.question] = item.open;
    });
    return initial;
  });

  const orderedFaq = useMemo(() => faqItems, []);

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="page-wrap pt-4 pb-10 flex flex-col gap-4">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />

          <div className="w-full flex-1 min-w-0">
            <div className="w-full flex flex-col items-center gap-4">
              {/* FAQ card (h=548, py=16, title px=16) */}
              <section className="w-full tablet:min-h-[clamp(360px,55vw,548px)] bg-white rounded-[16px] py-4 flex flex-col gap-4">
                <div className="px-4 flex items-center justify-between gap-[clamp(24px,12vw,213px)]">
                  <h2 className="m-0 text-[20px] leading-[24px] font-bold text-[#0A0A0A]">
                    Frequently Asked Questions
                  </h2>
                </div>

                {/* Keep card height fixed like Figma, but avoid cutting content when multiple items are expanded */}
                <div className="flex flex-col w-full tablet:flex-1 tablet:overflow-y-auto">
                  {orderedFaq.map((item, idx) => {
                    const isOpen = openState[item.question] ?? false;
                    const isLast = idx === orderedFaq.length - 1;
                    return (
                      <div
                        key={item.question}
                        className={
                          "w-full px-4 py-4 flex flex-col gap-3 " +
                          (!isLast ? "border-b border-[#F5F6F8]" : "")
                        }
                      >
                        <button
                          type="button"
                          className="w-full flex items-center justify-between gap-4 bg-transparent border-0 p-0 text-left cursor-pointer"
                          aria-expanded={isOpen}
                          onClick={() =>
                            setOpenState((p) => ({
                              ...p,
                              [item.question]: !p[item.question],
                            }))
                          }
                        >
                          <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                            {item.question}
                          </span>
                          <Image
                            src={
                              isOpen
                                ? "/figma/icons/icon-minus.svg"
                                : "/figma/icons/icon-plus.svg"
                            }
                            alt=""
                            width={24}
                            height={24}
                          />
                        </button>

                        <div
                          className={
                            "overflow-hidden transition-[max-height,opacity] duration-[220ms] ease-[ease] " +
                            (isOpen
                              ? "max-h-[clamp(160px,25vw,220px)] opacity-100"
                              : "max-h-0 opacity-0")
                          }
                        >
                          {item.answer ? (
                            <p className="m-0 text-[16px] leading-[20px] font-normal text-[#7B7B7B]">
                              {item.answer}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Write to support (564x390) */}
              <section className="w-full max-w-[clamp(320px,60vw,564px)] tablet:min-h-[clamp(260px,40vw,390px)] bg-white rounded-[16px] p-4 flex flex-col gap-6">
                <div className="flex items-center gap-2 min-h-[clamp(14px,2vw,16px)]">
                  <span className="text-[14px] leading-[16px] font-bold text-[#0F0F0F]">
                    Write to support
                  </span>
                </div>

                <form
                  className="flex flex-col gap-4 w-full"
                  aria-label="Write to support form"
                >
                  <div className="flex gap-4 w-full">
                    <input
                      className="w-full min-h-[clamp(36px,4.5vw,40px)] px-6 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B]"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                    <input
                      className="w-full min-h-[clamp(36px,4.5vw,40px)] px-6 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B]"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                  </div>

                  <input
                    className="w-full min-h-[clamp(36px,4.5vw,40px)] px-6 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B]"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <input
                    className="w-full min-h-[clamp(36px,4.5vw,40px)] px-6 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B]"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                  />

                  <textarea
                    className="w-full min-h-[clamp(100px,18vw,120px)] px-6 py-4 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B] resize-none"
                    name="message"
                    placeholder="Message"
                    rows={4}
                  />

                  <div className="flex gap-4 w-full">
                    <button
                      type="submit"
                      className="flex-1 min-h-[clamp(36px,4.5vw,40px)] rounded-[14px] bg-[#FFAF0E] text-[#0F0F0F] text-[14px] leading-[16px] font-semibold"
                    >
                      Send Message
                    </button>
                    <button
                      type="button"
                      className="flex-1 min-h-[clamp(36px,4.5vw,40px)] rounded-[14px] bg-white border-2 border-[#FFAF0E] text-[#0F0F0F] text-[14px] leading-[16px] font-semibold"
                    >
                      Ask to chat
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
