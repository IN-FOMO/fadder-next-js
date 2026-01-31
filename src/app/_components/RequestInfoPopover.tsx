"use client";

import type { ReactElement, ReactNode } from "react";
import { cloneElement, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./Button";

type RequestInfoPopoverProps = {
  trigger: ReactElement;
  title: string;
  description: string;
  submitLabel?: string;
  linkValue: string;
  wrapperClassName?: string;
  popoverClassName?: string;
  popoverAlign?: "left" | "right";
  children?: ReactNode;
};

export function RequestInfoPopover({
  trigger,
  title,
  description,
  submitLabel = "Send Request",
  linkValue,
  wrapperClassName = "",
  popoverClassName = "w-[360px]",
  popoverAlign = "right",
}: RequestInfoPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!popoverRef.current) return;
      if (!popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowErrors(true);
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    const isPhoneValid =
      trimmedPhone.replace(/[^\d]/g, "").length >= 7 &&
      /^[+()\d\s-]+$/.test(trimmedPhone);

    if (!trimmedName || !trimmedPhone || !trimmedEmail || !trimmedMessage) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!isEmailValid) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!isPhoneValid) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    toast.success("Request sent. Our manager will contact you.");
    setIsOpen(false);
    setShowErrors(false);
  };

  const triggerElement = cloneElement(trigger, {
    onClick: (event: React.MouseEvent) => {
      trigger.props.onClick?.(event);
      if (event.defaultPrevented) return;
      setIsOpen((prev) => !prev);
    },
    "aria-expanded": isOpen,
  });

  return (
    <div ref={popoverRef} className={`relative ${wrapperClassName}`.trim()}>
      {triggerElement}
      <div
        className={`absolute top-[calc(100%+12px)] ${
          popoverAlign === "left"
            ? "left-0 origin-top-left"
            : "right-0 origin-top-right"
        } transform-gpu transition-all duration-300 ease-out ${popoverClassName} ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "pointer-events-none scale-95 opacity-0 -translate-y-2"
        }`}
      >
        <div className="bg-white rounded-[14px] p-5 shadow-card-soft border border-surface">
          <h4 className="m-0 text-base font-bold text-foreground">{title}</h4>
          <p className="mt-2 text-sm text-muted">{description}</p>
          <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              value={linkValue}
              disabled
              className="h-11 w-full rounded-[14px] border border-surface bg-surface px-3 text-sm text-muted outline-none"
            />
            <input
              type="text"
              className={`h-11 w-full rounded-[14px] border px-3 text-sm text-foreground outline-none ${
                showErrors && !name.trim()
                  ? "border-[#D91E1D]"
                  : "border-surface"
              }`}
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="tel"
              className={`h-11 w-full rounded-[14px] border px-3 text-sm text-foreground outline-none ${
                showErrors &&
                (!phone.trim() ||
                  phone.replace(/[^\d]/g, "").length < 7 ||
                  !/^[+()\d\s-]+$/.test(phone))
                  ? "border-[#D91E1D]"
                  : "border-surface"
              }`}
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <input
              type="email"
              className={`h-11 w-full rounded-[14px] border px-3 text-sm text-foreground outline-none ${
                showErrors &&
                (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                  ? "border-[#D91E1D]"
                  : "border-surface"
              }`}
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <textarea
              rows={3}
              className={`w-full rounded-[14px] border px-3 py-2 text-sm text-foreground outline-none ${
                showErrors && !message.trim()
                  ? "border-[#D91E1D]"
                  : "border-surface"
              }`}
              placeholder="Massage"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <Button type="submit" variant="primary" size="md" fullWidth>
              {submitLabel}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
