"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { Button } from "../_components/Button";
import { RequestInfoPopover } from "../_components/RequestInfoPopover";
import { VehicleCard, type VehicleCardData } from "../_components/VehicleCard";

const primarySpecs = [
  { label: "Lot Number", value: "62812505" },
  { label: "VIN", value: "123ABC456DEF789GHI" },
  { label: "Title Code", value: "NH CERT OF TITLE-SALVAGE" },
  { label: "Loss", value: "Collision" },
  { label: "Primary damage", value: "Right front" },
  { label: "Secondary Damage", value: "Rear End" },
  { label: "Odometer", value: "25 145 mi (40 467 km)" },
  { label: "Start code", value: "Starts" },
  { label: "Key", value: "Present" },
  { label: "Est. Repair Cost", value: "$10,525 USD" },
  { label: "Est. Retail Value", value: "$13,974 USD" },
];

const secondarySpecs = [
  { label: "Body Style", value: "Coupe" },
  { label: "Exterior color", value: "Black" },
  { label: "Engine", value: "5.7L, V8" },
  { label: "Transmission", value: "Automatic" },
  { label: "Fuel Type", value: "Gasoline" },
  { label: "Drive Type", value: "Rear wheel drive" },
];

const galleryImages = [
  "/figma/images/vehicle-detail-main-22d215.png",
  "/figma/images/vehicle-1.png",
  "/figma/images/vehicle-2.png",
  "/figma/images/vehicle-3.png",
  "/figma/images/vehicle-4.png",
];

const calculatorRows = [
  { label: "Lot Price", value: "$6,000" },
  { label: "Auction Fees", value: "$955" },
  { label: "Trucking to port", value: "$400" },
  { label: "Shipping to", value: "$1,595" },
  { label: "Fadder Fee (+ VAT/Tax)", value: "$450" },
];

const faqItems = [
  {
    question: "Are the vehicles new or used?",
    answer:
      "Most vehicles on the platform are new or nearly new from official dealers and verified partners. Some listings may be used—mileage and condition are always clearly stated.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We support modern international payment options, including bank transfers and crypto payments, so you can choose the most convenient and secure method.",
  },
  {
    question: "Can I pay in USD or EUR?",
    answer:
      "Yes. We accept payments in USD and EUR. The final currency depends on the seller, contract terms, and deal structure.",
  },
  {
    question: "Can I pay on behalf of a company?",
    answer:
      "Yes. Vehicles can be purchased by individuals or legal entities. All necessary invoices and commercial documents are issued accordingly.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location, destination country, and transport method. Estimated timelines are provided before payment.",
  },
  {
    question: "Which delivery options are available?",
    answer:
      "Vehicles ship from major logistics hubs and ports in China. Depending on your region, delivery can be organized by sea, rail, or road transport.",
  },
  {
    question: "Can I track the vehicle during delivery?",
    answer:
      "Yes. You will receive regular status updates and tracking information to follow the delivery step by step.",
  },
  {
    question: "Do you deliver to my country?",
    answer:
      "We deliver to most European countries, CIS regions, and selected global markets. Contact our team to confirm delivery to your country.",
  },
  {
    question: "Who is responsible for the vehicle during delivery?",
    answer:
      "Your vehicle is insured during transport. Liability, coverage, and delivery terms are confirmed before shipment, and our team provides full support.",
  },
  {
    question: "How safe is the platform?",
    answer:
      "Fadder works only with vetted sellers and reliable partners. Every deal runs through secure processes to ensure transparency and buyer protection.",
    open: true,
  },
];

const similarCards: VehicleCardData[] = [
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-1.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "IAAI",
    bid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-2.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "Copart",
    bid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-3.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "Copart",
    bid: "$725",
  },
];

export default function VehiclePage() {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [alertEmail, setAlertEmail] = useState("");
  const [bidAmount, setBidAmount] = useState(525);
  const [bidInput, setBidInput] = useState("525");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const shareDialogRef = useRef<HTMLDivElement>(null);
  const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    faqItems.forEach((item) => {
      initial[item.question] = item.open ?? false;
    });
    return initial;
  });
  const timeLeftLabel = "1 d 21 h 23 min 00 sec";
  const timeZoneLabel = "(GMT-5)";
  const countdownMs = (() => {
    const days = Number(timeLeftLabel.match(/(\d+)\s*d/)?.[1] ?? 0);
    const hours = Number(timeLeftLabel.match(/(\d+)\s*h/)?.[1] ?? 0);
    const minutes = Number(timeLeftLabel.match(/(\d+)\s*min/)?.[1] ?? 0);
    const seconds = Number(timeLeftLabel.match(/(\d+)\s*sec/)?.[1] ?? 0);
    return (
      days * 24 * 60 * 60 * 1000 +
      hours * 60 * 60 * 1000 +
      minutes * 60 * 1000 +
      seconds * 1000
    );
  })();

  const handleAddToCalendar = () => {
    if (!countdownMs) return;
    const eventStart = new Date(Date.now() + countdownMs);
    const eventEnd = new Date(eventStart.getTime() + 30 * 60 * 1000);
    const title = "Auction ends: 1982 Chevrolet Corvette";
    const description = "Reminder for auction end time.";
    const durationSeconds = Math.round(
      (eventEnd.getTime() - eventStart.getTime()) / 1000,
    );
    const calendarUrl = `${window.location.origin}/calendar?start=${eventStart.getTime()}&duration=${durationSeconds}&title=${encodeURIComponent(
      title,
    )}&description=${encodeURIComponent(description)}`;
    const webcalUrl = calendarUrl.replace(/^https?/, "webcal");

    window.location.href = webcalUrl;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!isShareOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!shareDialogRef.current) return;
      if (!shareDialogRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isShareOpen]);


  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Unable to copy. Please try again.");
    }
  };

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied.");
    } catch {
      toast.error("Unable to copy. Please try again.");
    }
  };

  const handleShareAction = (type: "whatsapp" | "x" | "gmail") => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const text = encodeURIComponent("Check this vehicle on Fadder.");
    const subject = encodeURIComponent("Vehicle listing");
    const mailBody = encodeURIComponent(
      `Check this vehicle on Fadder:\n${shareUrl}`,
    );

    const urls = {
      whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
      x: `https://x.com/intent/tweet?text=${text}%20${encodedUrl}`,
      gmail: `mailto:?subject=${subject}&body=${mailBody}`,
    };

    window.open(urls[type], "_blank", "noopener,noreferrer");
  };

  const handleFavorite = () => {
    router.push("/login");
  };

  const handleSetAlert = () => {
    const trimmed = alertEmail.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isEmailValid) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Alert saved. We'll notify you by email.");
    setAlertEmail("");
  };

  const formatBid = (value: number) => value.toLocaleString("en-US");


  return (
    <main className="page-wrap py-[clamp(16px,2vw,24px)] pb-[clamp(48px,6vw,120px)] flex flex-col gap-[clamp(24px,5vw,48px)] text-foreground">
      <Breadcrumbs
        items={[
          { label: "Home page", href: "/" },
          { label: "Сatalog", href: "/search" },
          { label: "Chevrolet" },
          { label: "1982 Chevrolet Corvette" },
        ]}
      />

      <div className="flex items-end gap-4 flex-wrap">
        <h1 className="m-0 text-[32px] leading-9 font-bold text-foreground w-full max-w-[clamp(260px,40vw,520px)]">
          1982 Chevrolet Corvette
        </h1>
        <span className="self-end bg-copart text-white rounded-lg py-1 px-2 text-xs leading-[14px] font-normal">
          Copart
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="w-full lg:w-[clamp(320px,45vw,700px)] flex flex-col gap-4">
            <div className="relative w-full h-[clamp(240px,32vw,460px)] rounded-lg overflow-hidden">
              <Image
                src={galleryImages[activeImage]}
                alt=""
                width={700}
                height={460}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                className={`absolute left-2 top-1/2 -translate-y-1/2 w-[clamp(44px,5vw,52px)] h-[clamp(44px,5vw,52px)] rounded-lg border-0 bg-white/60 inline-flex items-center justify-center p-3.5 ${
                  activeImage === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() =>
                  setActiveImage((prev) => Math.max(0, prev - 1))
                }
                disabled={activeImage === 0}
              >
                <Image
                  src="/figma/icons/icon-arrow-left.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              <button
                type="button"
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-[clamp(44px,5vw,52px)] h-[clamp(44px,5vw,52px)] rounded-lg border-0 bg-white/60 inline-flex items-center justify-center p-3.5 ${
                  activeImage === galleryImages.length - 1
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() =>
                  setActiveImage((prev) =>
                    Math.min(galleryImages.length - 1, prev + 1),
                  )
                }
                disabled={activeImage === galleryImages.length - 1}
              >
                <Image
                  src="/figma/icons/icon-arrow-right.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-2">
              {galleryImages.map((src, index) => (
                <Image
                  key={`${src}-${index}`}
                  src={src}
                  alt=""
                  width={140}
                  height={72}
                  className={`w-full h-[clamp(56px,8vw,72px)] object-cover rounded-lg border-2 cursor-pointer ${
                    index === activeImage
                      ? "border-foreground"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-4">
                <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                  Full Car History
                </h3>
                <Image
                  src="/figma/icons/icon-exclamation-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <p className="m-0 text-base leading-5 font-normal text-foreground">
                Get a comprehensive report (similar to Carfax) including
                accident history, service records, and more.
              </p>
              <RequestInfoPopover
                title="Request Full History (Carfax)"
                description="Fill out the form to request information about this vehicle:"
                submitLabel="Send Request"
                linkValue={shareUrl}
                wrapperClassName="w-full"
                popoverClassName="w-full"
                popoverAlign="left"
                trigger={
                  <Button variant="primary" size="lg" fullWidth>
                    Request Full History (Carfax)
                  </Button>
                }
              />
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-4">
                <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                  Get Alerts for Similar Vehicles
                </h3>
                <Image
                  src="/figma/icons/icon-exclamation-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col gap-4">
                <input
                  className="min-h-[clamp(44px,5vw,52px)] border-0 rounded-[14px] bg-surface py-4 px-6 text-base leading-5 text-muted placeholder:text-muted"
                  placeholder="Email"
                  value={alertEmail}
                  onChange={(event) => setAlertEmail(event.target.value)}
                />
                <div className="flex items-center gap-6">
                  <span className="text-base leading-5 font-normal text-foreground">
                    Select Frequency
                  </span>
                  <div className="flex items-center gap-8 w-full max-w-[clamp(160px,24vw,212px)]">
                    <label className="inline-flex items-center gap-2 text-base leading-5 text-foreground cursor-pointer">
                      <input
                        type="radio"
                        name="frequency"
                        value="daily"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <span className="w-5 h-5 rounded-[10px] border border-border inline-flex items-center justify-center peer-checked:border-2 peer-checked:border-radio-checked after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-transparent peer-checked:after:bg-radio-checked" />
                      <span>Daily</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-base leading-5 text-foreground cursor-pointer">
                      <input
                        type="radio"
                        name="frequency"
                        value="weekly"
                        className="sr-only peer"
                      />
                      <span className="w-5 h-5 rounded-[10px] border border-border inline-flex items-center justify-center peer-checked:border-2 peer-checked:border-radio-checked after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-transparent peer-checked:after:bg-radio-checked" />
                      <span>Weekly</span>
                    </label>
                  </div>
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                className="gap-2.5"
                onClick={handleSetAlert}
              >
                <Image
                  src="/figma/icons/icon-notification-bell.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span>Set Alert</span>
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 w-full">
              <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                Legal Import Restrictions
              </h3>
              <p className="m-0 text-base leading-5 font-normal text-danger whitespace-pre-line">
                Potential Restrictions:
                {"\n"}Vehicles older than 10 years may incur higher import
                duties in Poland.
                {"\n"}Salvage title vehicles require a mandatory technical
                inspection and re-registration process in Poland.
                {"\n"}Emissions standards apply to imported vehicles. This 2022
                Camry meets Euro 6.
              </p>
              <p className="m-0 text-base leading-5 font-normal text-foreground">
                Please consult with a local expert for definitive information.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[clamp(320px,40vw,600px)] flex flex-col gap-4">
            <div className="bg-white rounded-lg py-4 w-full">
              <div className="flex flex-col">
                {primarySpecs.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-[clamp(24px,10vw,172px)] py-3 px-4 border-b border-surface last:border-b-0"
                  >
                    <span className="text-base leading-5 font-normal text-muted">
                      {item.label}
                    </span>
                    <span className="text-base leading-5 font-bold text-foreground inline-flex items-center gap-1">
                      {item.value}
                      {item.label === "Lot Number" || item.label === "VIN" ? (
                        <button
                          type="button"
                          className="border-0 bg-transparent p-0 inline-flex items-center justify-center cursor-pointer"
                          onClick={() => handleCopy(item.value)}
                          aria-label={`Copy ${item.label}`}
                        >
                          <Image
                            src="/figma/icons/icon-copy.svg"
                            alt=""
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </button>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg py-4 w-full">
              <div className="flex flex-col">
                {secondarySpecs.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface last:border-b-0"
                  >
                    <span className="text-base leading-5 font-normal text-muted">
                      {item.label}
                    </span>
                    <span className="text-base leading-5 font-bold text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg py-4 flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between gap-2 px-4 w-full">
                <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                  Final Price Calculator
                </h3>
                <Image
                  src="/figma/icons/icon-exclamation-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col w-full">
                {calculatorRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between border-b border-surface py-3 px-4"
                  >
                    <span className="text-base leading-5 font-normal text-muted">
                      {row.label}
                    </span>
                    <span className="text-base leading-5 font-bold text-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 px-4 text-base leading-5 font-bold text-foreground">
                  <span>Subtotal</span>
                  <span>$8,950</span>
                </div>
                <p className="m-0 px-4 text-xs leading-[14px] font-normal text-foreground">
                  The calculator check location of the vehicle and shipment from
                  one of the six ports in the USA depending on the branch
                  location. Penalties and additional auction fees
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[clamp(260px,28vw,428px)] flex flex-col gap-4">
            <div className="flex items-center gap-4 w-full">
              <button
                type="button"
                className="w-[clamp(44px,5vw,52px)] h-[clamp(44px,5vw,52px)] rounded-lg bg-white border-0 inline-flex items-center justify-center p-3.5 cursor-pointer transition-colors hover:shadow-hover active:bg-surface"
                onClick={handleShare}
                aria-label="Share"
              >
                <Image
                  src="/figma/icons/icon-share.svg"
                  alt=""
                  width={28}
                  height={28}
                />
              </button>
              <button
                type="button"
                className="w-[clamp(44px,5vw,52px)] h-[clamp(44px,5vw,52px)] rounded-lg bg-white border-0 inline-flex items-center justify-center p-3.5 cursor-pointer transition-colors hover:shadow-hover active:bg-surface"
                onClick={handleFavorite}
                aria-label="Add to favorites"
              >
                <Image
                  src="/figma/icons/icon-heart.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              <RequestInfoPopover
                title="Ask Manager"
                description="Fill out the form to request information about this vehicle:"
                submitLabel="Send Request"
                linkValue={shareUrl}
                wrapperClassName="w-full"
                popoverClassName="w-full"
                trigger={
                  <button
                    type="button"
                    className="w-full bg-white border-0 rounded-lg py-4 px-12 text-sm leading-4 font-bold text-foreground cursor-pointer transition-colors hover:shadow-hover active:bg-surface"
                  >
                    Ask Manager
                  </button>
                }
              />
            </div>

            {isShareOpen ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                <div
                  ref={shareDialogRef}
                  className="w-full max-w-[clamp(320px,70vw,560px)] rounded-[14px] bg-white p-6 shadow-card-soft"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                      Share
                    </h3>
                    <button
                      type="button"
                      className="h-10 w-10 rounded-[10px] border-0 bg-surface text-xl leading-none cursor-pointer transition-colors hover:shadow-hover active:bg-white"
                      onClick={() => setIsShareOpen(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <div className="mt-5 flex flex-col gap-4">
                    <div className="rounded-[14px] border border-surface bg-white p-3">
                      <p className="m-0 text-sm font-semibold text-foreground">
                        1982 Chevrolet Corvette
                      </p>
                      <p className="m-0 text-sm text-muted">
                        {shareUrl || "https://fadder.com/vehicle"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        value={shareUrl}
                        readOnly
                        className="h-11 flex-1 rounded-[14px] border border-surface px-3 text-sm text-foreground outline-none"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="rounded-[14px]"
                        onClick={handleCopyShareLink}
                      >
                        Copy link
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="rounded-[14px] flex flex-col gap-2 py-3"
                        onClick={() => handleShareAction("whatsapp")}
                      >
                        <Image
                          src="/figma/icons/icon-whatsapp.svg"
                          alt=""
                          width={22}
                          height={22}
                          className="h-5 w-5"
                        />
                        <span>WhatsApp</span>
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="rounded-[14px] flex flex-col gap-2 py-3"
                        onClick={() => handleShareAction("x")}
                      >
                        <Image
                          src="/figma/icons/icon-x.svg"
                          alt=""
                          width={22}
                          height={22}
                          className="h-5 w-5"
                        />
                        <span>X</span>
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="rounded-[14px] flex flex-col gap-2 py-3"
                        onClick={() => handleShareAction("gmail")}
                      >
                        <Image
                          src="/figma/icons/icon-gmail.svg"
                          alt=""
                          width={22}
                          height={22}
                          className="h-5 w-5"
                        />
                        <span>Gmail</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 items-center w-full">
              <div className="w-full flex justify-between items-center gap-2.5">
                <span className="text-xl leading-6 font-bold text-foreground">
                  Time left
                </span>
                <div className="flex items-center gap-2">
                <span className="rounded-[8px] border border-surface bg-primary text-white rounded-[8px] py-1 px-2 text-xs leading-[14px] bg-copart text-nowrap">
                    {timeZoneLabel}
                  </span>
                
                  <span className="text-base leading-5 font-bold text-error">
                    {timeLeftLabel}
                  </span>
                  </div>
              </div>
              <Button
                variant="secondary"
                size="md"
                className="w-full max-w-[clamp(240px,40vw,320px)] gap-2.5"
                onClick={handleAddToCalendar}
              >
                <Image
                  src="/figma/icons/icon-reminder.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span>Add to calendar</span>
              </Button>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 items-center w-full">
              <div className="w-full flex items-center justify-between">
                <span className="text-xl leading-6 font-bold text-foreground">
                  Your bid
                </span>
                <Image
                  src="/figma/icons/icon-question.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3 py-3.5 px-4 rounded-[14px] bg-white shadow-input">
                  <button
                    type="button"
                    className={`border-0 bg-transparent p-0 transition-colors ${
                      bidAmount === 0
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer hover:opacity-80 active:opacity-60"
                    }`}
                    onClick={() =>
                      setBidAmount((prev) => {
                        const next = Math.max(0, prev - 100);
                        setBidInput(formatBid(next));
                        return next;
                      })
                    }
                    disabled={bidAmount === 0}
                    aria-label="Decrease bid by $100"
                  >
                    <Image
                      src="/figma/icons/icon-minus.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={bidInput}
                    onChange={(event) => {
                      const next = event.target.value.replace(/[^\d]/g, "");
                      setBidInput(next);
                      setBidAmount(Math.max(0, Number(next) || 0));
                    }}
                    onFocus={() =>
                      setBidInput(bidAmount ? String(bidAmount) : "")
                    }
                    onBlur={() => setBidInput(formatBid(bidAmount))}
                    className="w-24 bg-transparent text-center text-xl leading-6 font-bold text-foreground border-0 outline-none"
                    aria-label="Bid amount"
                  />
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 cursor-pointer transition-colors hover:opacity-80 active:opacity-60"
                    onClick={() =>
                      setBidAmount((prev) => {
                        const next = prev + 100;
                        setBidInput(formatBid(next));
                        return next;
                      })
                    }
                    aria-label="Increase bid by $100"
                  >
                    <Image
                      src="/figma/icons/icon-plus.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
                <p className="m-0 text-xs leading-[14px] font-normal text-muted">
                  Enter Maximum Bid ($25 Bid Increments)
                </p>
              </div>
              <button
                type="button"
                className="w-full bg-primary hover:bg-primary-hover active:bg-primary-pressed border-0 rounded-[14px] py-4 px-8 text-sm leading-4 font-bold text-foreground cursor-pointer"
              >
                Bid Now
              </button>
            </div>

            <div className="bg-white rounded-lg py-4 flex flex-col items-center w-full">
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface w-full last:border-b-0">
                <span className="text-base leading-5 font-normal text-muted">
                  Auction
                </span>
                <span className="bg-copart text-white rounded-lg py-1 px-2 text-xs leading-[14px] font-normal">
                  Copart
                </span>
              </div>
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface w-full">
                <span className="text-base leading-5 font-normal text-muted">
                  Current Bid
                </span>
                <span className="text-xl leading-6 font-bold text-success">
                  $525 USD
                </span>
              </div>
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface w-full">
                <span className="text-base leading-5 font-normal text-muted">
                  Bid Status
                </span>
                <span className="text-base leading-5 font-normal text-muted">
                  You Haven't Bid
                </span>
              </div>
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 border-b border-surface w-full">
                <span className="text-base leading-5 font-normal text-muted">
                  Sale Status
                </span>
                <span className="text-base leading-5 font-bold text-foreground">
                  On Minimum Bid
                </span>
              </div>
              <div className="flex items-center justify-between gap-[172px] py-3 px-4 w-full">
                <span className="text-base leading-5 font-normal text-muted">
                  Sellers Reserve
                </span>
                <span className="text-base leading-5 font-bold text-foreground">
                  Not yet met
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 items-center w-full">
              <div className="w-full flex items-center justify-between">
                <span className="text-xl leading-6 font-bold text-foreground">
                  Fast Buy Price
                </span>
                <Image
                  src="/figma/icons/icon-question.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-xl leading-6 font-bold text-info">
                $6,000 USD
              </span>
              <Button variant="secondary" size="lg" fullWidth>
                Buy Now
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col">
          <div className="bg-white rounded-lg py-4 w-full flex flex-col gap-4">
            <div className="px-4 flex items-center justify-between">
              <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                FAQ
              </h3>
            </div>
            <div className="flex flex-col">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="p-4 flex flex-col gap-3 border-b border-surface last:border-b-0"
                >
                  <button
                    type="button"
                    className="bg-transparent border-0 p-0 flex items-center justify-between gap-4 w-full text-left cursor-pointer"
                    aria-expanded={openState[item.question]}
                    onClick={() =>
                      setOpenState((prev) => ({
                        ...prev,
                        [item.question]: !prev[item.question],
                      }))
                    }
                  >
                    <span className="text-base leading-5 font-bold text-foreground">
                      {item.question}
                    </span>
                    <Image
                      src={
                        openState[item.question]
                          ? "/figma/icons/icon-minus.svg"
                          : "/figma/icons/icon-plus.svg"
                      }
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-[220ms] ease-[ease] ${
                      openState[item.question]
                        ? "max-h-[clamp(200px,30vw,320px)] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="m-0 text-base leading-5 font-normal text-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-[74px]">
          <div className="flex items-end justify-between gap-6">
            <h2 className="m-0 text-2xl leading-7 font-bold text-foreground">
              Similar Auctions
            </h2>
            <Button variant="white" size="md">
              View all
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1 scroll-snap-type-x-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {similarCards.map((card, index) => (
              <VehicleCard
                key={`${card.title}-${index}`}
                card={card}
                className="w-[clamp(220px,18vw,288px)] shrink-0 scroll-snap-align-start"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
