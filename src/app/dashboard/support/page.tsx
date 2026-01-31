"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { useFaq, useSupportTickets } from "@/hooks/useSupport";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardSidebar } from "../../_components/DashboardSidebar";

function SupportContent() {
  const { user } = useAuth();
  const { faqItems, isLoading: faqLoading } = useFaq();
  const { submitTicket, isSubmitting } = useSupportTickets();

  const [openState, setOpenState] = useState<Record<string, boolean>>({});

  // Form state
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await submitTicket({ firstName, lastName, email, phone, message });
      toast.success("Support ticket submitted successfully!");
      setMessage("");
    } catch {
      toast.error("Failed to submit support ticket");
    }
  };

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="page-wrap pt-4 pb-10 flex flex-col gap-4">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />

          <div className="w-full flex-1 min-w-0">
            <div className="w-full flex flex-col items-center gap-4">
              {/* FAQ card */}
              <section className="w-full tablet:min-h-[clamp(360px,55vw,548px)] bg-white rounded-[16px] py-4 flex flex-col gap-4">
                <div className="px-4 flex items-center justify-between gap-[clamp(24px,12vw,213px)]">
                  <h2 className="m-0 text-[20px] leading-[24px] font-bold text-[#0A0A0A]">
                    Frequently Asked Questions
                  </h2>
                </div>

                {faqLoading ? (
                  <div className="flex flex-col gap-4 px-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-5 bg-surface rounded w-3/4 mb-2" />
                        <div className="h-4 bg-surface rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : faqItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted">
                    <p className="m-0">No FAQ items available at this time.</p>
                  </div>
                ) : (
                  <div className="flex flex-col w-full tablet:flex-1 tablet:overflow-y-auto">
                    {faqItems.map((item, idx) => {
                      const isOpen = openState[item.id] ?? false;
                      const isLast = idx === faqItems.length - 1;
                      return (
                        <div
                          key={item.id}
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
                                [item.id]: !p[item.id],
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
                )}
              </section>

              {/* Write to support */}
              <section className="w-full max-w-[clamp(320px,60vw,564px)] tablet:min-h-[clamp(260px,40vw,390px)] bg-white rounded-[16px] p-4 flex flex-col gap-6">
                <div className="flex items-center gap-2 min-h-[clamp(14px,2vw,16px)]">
                  <span className="text-[14px] leading-[16px] font-bold text-[#0F0F0F]">
                    Write to support
                  </span>
                </div>

                <form
                  className="flex flex-col gap-4 w-full"
                  aria-label="Write to support form"
                  onSubmit={handleSubmit}
                >
                  <div className="flex gap-4 w-full">
                    <input
                      className="w-full min-h-[clamp(36px,4.5vw,40px)] px-6 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B]"
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <input
                      className="w-full min-h-[clamp(36px,4.5vw,40px)] px-6 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B]"
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <input
                    className="w-full min-h-[clamp(36px,4.5vw,40px)] px-6 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B]"
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="w-full min-h-[clamp(36px,4.5vw,40px)] px-6 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B]"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <textarea
                    className="w-full min-h-[clamp(100px,18vw,120px)] px-6 py-4 bg-[#F5F6F8] rounded-[14px] border-0 outline-none text-[12px] leading-[14px] text-[#0F0F0F] placeholder:text-[#7B7B7B] resize-none"
                    name="message"
                    placeholder="Message *"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />

                  <div className="flex gap-4 w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 min-h-[clamp(36px,4.5vw,40px)] rounded-[14px] bg-[#FFAF0E] text-[#0F0F0F] text-[14px] leading-[16px] font-semibold disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
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

export default function DashboardSupportPage() {
  return (
    <ProtectedRoute>
      <SupportContent />
    </ProtectedRoute>
  );
}
