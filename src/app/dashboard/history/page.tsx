import Image from "next/image";
import Link from "next/link";
import { Button } from "../../_components/Button";
import { DashboardSidebar } from "../../_components/DashboardSidebar";

const historyTabs = [
  { label: "Active Bids", value: "active" },
  { label: "Won", value: "won" },
  { label: "Lost", value: "lost" },
  { label: "Buy Now", value: "buy-now" },
  { label: "Shipping", value: "shipping" },
] as const;

type HistoryBid = {
  title: string;
  lotId: string;
  timeRemaining: string;
  status: "Leading" | "Outbid";
  currentBid: string;
  yourBid: string;
  nextMinBid: string;
  auction: "IAAI" | "Copart";
  image: string;
};

const activeBids: HistoryBid[] = [
  {
    title: "2020 Toyota Camry XLE",
    lotId: "LOT-2024156",
    timeRemaining: "Ends in 2h 34m",
    status: "Leading",
    currentBid: "$18,500",
    yourBid: "$18,600",
    nextMinBid: "$18,700",
    auction: "IAAI",
    image: "/figma/images/vehicle-1.png",
  },
  {
    title: "2021 Honda Accord Sport",
    lotId: "LOT-2024157",
    timeRemaining: "Ends in 3h 12m",
    status: "Outbid",
    currentBid: "$22,000",
    yourBid: "$22,100",
    nextMinBid: "$22,200",
    auction: "Copart",
    image: "/figma/images/vehicle-2.png",
  },
  {
    title: "2019 Ford Mustang GT",
    lotId: "LOT-2024158",
    timeRemaining: "Ends in 4h 45m",
    status: "Leading",
    currentBid: "$30,000",
    yourBid: "$30,200",
    nextMinBid: "$30,300",
    auction: "IAAI",
    image: "/figma/images/vehicle-3.png",
  },
  {
    title: "2022 Chevrolet Malibu Premier",
    lotId: "LOT-2024159",
    timeRemaining: "Ends in 1h 15m",
    status: "Leading",
    currentBid: "$25,500",
    yourBid: "$25,600",
    nextMinBid: "$25,700",
    auction: "Copart",
    image: "/figma/images/vehicle-4.png",
  },
];

type WonBid = {
  title: string;
  orderId: string;
  finalPrice: string;
  paymentStatus: string;
  shippingStatus: string;
  purchaseDate: string;
  image: string;
};

const wonBids: WonBid[] = [
  {
    title: "2020 Toyota Camry XLE",
    orderId: "ORDER-2024156",
    finalPrice: "$18,700",
    paymentStatus: "Paid",
    shippingStatus: "In Transit",
    purchaseDate: "1/10/2025",
    image: "/figma/images/vehicle-1.png",
  },
  {
    title: "2019 Ford Fusion Titanium",
    orderId: "ORDER-2024158",
    finalPrice: "$19,300",
    paymentStatus: "Paid",
    shippingStatus: "Delivered",
    purchaseDate: "3/5/2025",
    image: "/figma/images/vehicle-3.png",
  },
  {
    title: "2022 Nissan Altima SR",
    orderId: "ORDER-2024159",
    finalPrice: "$24,000",
    paymentStatus: "Financed",
    shippingStatus: "In Transit",
    purchaseDate: "4/20/2025",
    image: "/figma/images/vehicle-4.png",
  },
];

type LostBid = {
  title: string;
  lotId: string;
  endedOn: string;
  winningBid: string;
  yourBid: string;
  difference: string;
  auction: "IAAI" | "Copart";
  image: string;
};

const lostBids: LostBid[] = [
  {
    title: "2020 Toyota Camry XLE",
    lotId: "LOT-2024156",
    endedOn: "Ended on 12.09.2025",
    winningBid: "$18,500",
    yourBid: "$18,000",
    difference: "+$700",
    auction: "IAAI",
    image: "/figma/images/vehicle-1.png",
  },
  {
    title: "2020 Toyota Camry XLE",
    lotId: "LOT-2024156",
    endedOn: "Ended on 12.09.2025",
    winningBid: "$22,200",
    yourBid: "$21,400",
    difference: "+$800",
    auction: "Copart",
    image: "/figma/images/vehicle-2.png",
  },
  {
    title: "2020 Toyota Camry XLE",
    lotId: "LOT-2024156",
    endedOn: "Ended on 12.09.2025",
    winningBid: "$19,400",
    yourBid: "$18,900",
    difference: "+$500",
    auction: "Copart",
    image: "/figma/images/vehicle-3.png",
  },
];

type BuyNowBid = {
  title: string;
  lotId: string;
  endedOn: string;
  source: "Copart" | "IAAI";
  purchasePrice: string;
  purchaseDate: string;
  processing: { label: string; tone: "success" | "info" | "warning" };
  payment: { label: string; tone: "success" | "info" | "warning" };
  delivery: { label: string; tone: "success" | "info" | "warning" };
  image: string;
};

const buyNowBids: BuyNowBid[] = [
  {
    title: "2020 Toyota Camry XLE",
    lotId: "LOT-2024156",
    endedOn: "Ended on 12.09.2025",
    source: "Copart",
    purchasePrice: "$28,900",
    purchaseDate: "11/01/2025",
    processing: { label: "Completed", tone: "success" },
    payment: { label: "Pending", tone: "info" },
    delivery: { label: "In progress", tone: "warning" },
    image: "/figma/images/vehicle-1.png",
  },
  {
    title: "2020 Toyota Camry XLE",
    lotId: "LOT-2024156",
    endedOn: "Ended on 12.09.2025",
    source: "Copart",
    purchasePrice: "$28,900",
    purchaseDate: "11/01/2025",
    processing: { label: "Completed", tone: "success" },
    payment: { label: "Completed", tone: "success" },
    delivery: { label: "In progress", tone: "warning" },
    image: "/figma/images/vehicle-2.png",
  },
  {
    title: "2020 Toyota Camry XLE",
    lotId: "LOT-2024156",
    endedOn: "Ended on 12.09.2025",
    source: "Copart",
    purchasePrice: "$28,900",
    purchaseDate: "11/01/2025",
    processing: { label: "Completed", tone: "success" },
    payment: { label: "Completed", tone: "success" },
    delivery: { label: "Delivered", tone: "success" },
    image: "/figma/images/vehicle-3.png",
  },
  {
    title: "2020 Toyota Camry XLE",
    lotId: "LOT-2024156",
    endedOn: "Ended on 12.09.2025",
    source: "Copart",
    purchasePrice: "$28,900",
    purchaseDate: "11/01/2025",
    processing: { label: "Pending", tone: "info" },
    payment: { label: "Pending", tone: "info" },
    delivery: { label: "In progress", tone: "warning" },
    image: "/figma/images/vehicle-4.png",
  },
];

type ShippingStep = {
  label: string;
  date: string;
  icon: string;
  size?: number;
};

type ShippingCard = {
  title: string;
  orderId: string;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  image: string;
  steps: ShippingStep[];
  progressWidth: number;
};

const shippingCards: ShippingCard[] = [
  {
    title: "2020 Toyota Camry XLE",
    orderId: "ORD-2024-001",
    carrier: "AutoTransport Pro",
    trackingNumber: "ATP-US-2024-8934",
    estimatedDelivery: "October 8, 2025",
    image: "/figma/images/vehicle-1.png",
    progressWidth: 358,
    steps: [
      { label: "Vehicle Picked Up", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-1.svg", size: 48 },
      { label: "At Departure Terminal", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-2.svg", size: 48 },
      { label: "International Transit", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-3.svg", size: 56 },
      { label: "EU Hub", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-4.svg", size: 48 },
      { label: "Final Delivery", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-5.svg", size: 48 },
      { label: "Delivered", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-6.svg", size: 48 },
    ],
  },
  {
    title: "2020 Toyota Camry XLE",
    orderId: "ORD-2024-001",
    carrier: "AutoTransport Pro",
    trackingNumber: "ATP-US-2024-8934",
    estimatedDelivery: "October 8, 2025",
    image: "/figma/images/vehicle-2.png",
    progressWidth: 1112,
    steps: [
      { label: "Vehicle Picked Up", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-1.svg", size: 48 },
      { label: "At Departure Terminal", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-2.svg", size: 48 },
      { label: "International Transit", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-3.svg", size: 56 },
      { label: "EU Hub", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-4.svg", size: 48 },
      { label: "Final Delivery", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-5.svg", size: 48 },
      { label: "Delivered", date: "Oct 15, 2025", icon: "/figma/shipping/shipping-step-6.svg", size: 48 },
    ],
  },
];

type DashboardHistoryPageProps = {
  searchParams?: Promise<{
    tab?: string | string[];
  }>;
};

export default async function DashboardHistoryPage({ searchParams }: DashboardHistoryPageProps) {
  const sp = searchParams ? await searchParams : undefined;
  const rawTab = Array.isArray(sp?.tab) ? sp?.tab[0] : sp?.tab;
  const activeParam = rawTab ?? "active";
  const activeTab = historyTabs.some((tab) => tab.value === activeParam) ? activeParam : "active";

  const toneClasses = {
    success: "bg-success",
    info: "bg-[#2571FF]",
    warning: "bg-[#F76500]",
  } as const;

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="max-w-[1440px] mx-auto px-[60px] pt-4 pb-10 max-tablet:px-8 max-narrow:px-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <DashboardSidebar />

          <div className="flex-1 min-w-0 flex flex-col gap-12 lg:w-[1144px]">
            {/* History tabs (Figma: 2983-61459 Menu History) */}
            <div className="inline-flex w-[666px] shrink-0 items-center gap-[4px] bg-[#FFFFFF] rounded-[16px] self-start">
              {historyTabs.map((tab) => {
                const isActive = tab.value === activeTab;
                return (
                  <Link
                    key={tab.value}
                    href={tab.value === "active" ? "/dashboard/history" : `/dashboard/history?tab=${tab.value}`}
                    className={
                      "flex items-center justify-center gap-[14px] w-[130px] px-[24px] py-[8px] rounded-[16px] text-[14px] leading-[16px] font-bold text-[#0F0F0F] border-[1.5px] box-border " +
                      (isActive ? "border-[#FFAF0E]" : "border-transparent")
                    }
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>

            {activeTab === "active" ? (
              <div className="flex flex-col gap-4 w-full">
                {activeBids.map((bid, index) => (
                  <div key={`${bid.lotId}-${index}`} className="flex items-center w-full">
                    <div className="relative w-[168px] h-[112px] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
                      <Image src={bid.image} alt="" fill sizes="168px" className="object-cover" />
                    </div>
                    <div className="flex-1 h-[112px] bg-white rounded-r-[16px] p-4 grid items-center gap-x-4 grid-cols-[339px_80px_90px_90px_100px_80px_101px]">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-[20px] leading-[24px] font-bold text-dark">{bid.title}</span>
                          <span className="text-[14px] leading-[16px] text-muted">{bid.lotId}</span>
                        </div>
                        <span className="text-[14px] leading-[16px] text-dark">{bid.timeRemaining}</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Status</span>
                        <span
                          className={
                            "inline-flex items-center justify-center rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white w-[65px] " +
                            (bid.status === "Leading" ? "bg-success" : "bg-error")
                          }
                        >
                          {bid.status}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Current Bid</span>
                        <span className="text-[16px] leading-[20px] font-bold text-dark">{bid.currentBid}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Your Bid</span>
                        <span className="text-[16px] leading-[20px] font-bold text-dark">{bid.yourBid}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Next Min Bid</span>
                        <span className="text-[16px] leading-[20px] font-bold text-dark">{bid.nextMinBid}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Auction</span>
                        <span
                          className={
                            "inline-flex w-fit rounded-[4px] px-2 py-1 text-white " +
                            (bid.auction === "IAAI"
                              ? "bg-[#D91E1D] text-[12px] leading-[14px] font-normal"
                              : "bg-[#0E5DB8] text-[14px] leading-[16px] font-bold")
                          }
                        >
                          {bid.auction}
                        </span>
                      </div>
                      <Button
                        variant="secondary"
                        size="md"
                        className="rounded-[14px] w-[101px] px-0 py-[14px] text-[14px] leading-[16px] min-h-0"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === "won" ? (
              <div className="flex flex-col gap-4 w-full">
                {wonBids.map((bid, index) => (
                  <div key={`${bid.orderId}-${index}`} className="flex items-center w-full">
                    <div className="relative w-[168px] h-[112px] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
                      <Image src={bid.image} alt="" fill sizes="168px" className="object-cover" />
                    </div>
                    <div className="flex-1 h-[112px] bg-white rounded-r-[16px] p-4 grid items-center gap-x-4 grid-cols-[339px_80px_90px_90px_100px_80px_101px]">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-[20px] leading-[24px] font-bold text-dark">{bid.title}</span>
                          <span className="text-[14px] leading-[16px] text-muted">{bid.orderId}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Final Price</span>
                        <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">{bid.finalPrice}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Payment</span>
                        <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">{bid.paymentStatus}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Shipping</span>
                        <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">{bid.shippingStatus}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Purchase Date</span>
                        <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">{bid.purchaseDate}</span>
                      </div>
                      <Button
                        variant="secondary"
                        size="md"
                        className="rounded-[14px] w-[101px] px-0 py-[14px] text-[14px] leading-[16px] min-h-0 col-start-7"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === "lost" ? (
              <div className="flex flex-col gap-4 w-full">
                {lostBids.map((bid, index) => (
                  <div key={`${bid.lotId}-${index}`} className="flex items-center w-full">
                    <div className="relative w-[168px] h-[112px] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
                      <Image src={bid.image} alt="" fill sizes="168px" className="object-cover" />
                    </div>
                    <div className="flex-1 h-[112px] bg-white rounded-r-[16px] p-4 grid items-center gap-x-4 grid-cols-[339px_80px_90px_90px_100px_80px_101px]">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-[20px] leading-[24px] font-bold text-dark">{bid.title}</span>
                          <span className="text-[14px] leading-[16px] text-muted">{bid.lotId}</span>
                        </div>
                        <span className="text-[14px] leading-[16px] text-dark">{bid.endedOn}</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Status</span>
                        <span className="inline-flex items-center justify-center rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white w-[65px] bg-error">
                          Lost
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Winning Bid</span>
                        <span className="text-[16px] leading-[20px] font-bold text-dark">{bid.winningBid}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Your Bid</span>
                        <span className="text-[16px] leading-[20px] font-bold text-dark">{bid.yourBid}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Difference</span>
                        <span className="text-[16px] leading-[20px] font-bold text-error">{bid.difference}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Auction</span>
                        <span
                          className={
                            "inline-flex w-fit rounded-[4px] px-2 py-1 text-white " +
                            (bid.auction === "IAAI"
                              ? "bg-[#D91E1D] text-[12px] leading-[14px] font-normal"
                              : "bg-[#0E5DB8] text-[14px] leading-[16px] font-bold")
                          }
                        >
                          {bid.auction}
                        </span>
                      </div>
                      <Button
                        variant="secondary"
                        size="md"
                        className="rounded-[14px] w-[101px] px-0 py-[14px] text-[14px] leading-[16px] min-h-0"
                      >
                        Find Similar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === "buy-now" ? (
              <div className="flex flex-col gap-4 w-full">
                {buyNowBids.map((bid, index) => (
                  <div key={`${bid.lotId}-${index}`} className="flex items-center w-full">
                    <div className="relative w-[168px] h-[112px] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
                      <Image src={bid.image} alt="" fill sizes="168px" className="object-cover" />
                    </div>
                    <div className="flex-1 h-[112px] bg-white rounded-r-[16px] p-4 grid items-center gap-x-4 grid-cols-[339px_80px_90px_90px_100px_80px_101px]">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-[20px] leading-[24px] font-bold text-dark">{bid.title}</span>
                          <span className="text-[14px] leading-[16px] text-muted">{bid.lotId}</span>
                        </div>
                        <span className="text-[14px] leading-[16px] text-dark">{bid.endedOn}</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Source</span>
                        <span className="inline-flex w-fit rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white bg-[#0E5DB8]">
                          {bid.source}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Purchase Price</span>
                        <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">{bid.purchasePrice}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Purchase Date</span>
                        <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">{bid.purchaseDate}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Processing</span>
                        <span
                          className={
                            "inline-flex items-center justify-center rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white w-[85px] " +
                            toneClasses[bid.processing.tone]
                          }
                        >
                          {bid.processing.label}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Payment</span>
                        <span
                          className={
                            "inline-flex items-center justify-center rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white w-[85px] " +
                            toneClasses[bid.payment.tone]
                          }
                        >
                          {bid.payment.label}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] leading-[16px] text-muted">Delivery</span>
                        <span
                          className={
                            "inline-flex items-center justify-center rounded-[4px] px-2 py-1 text-[14px] leading-[16px] font-bold text-white w-[85px] " +
                            toneClasses[bid.delivery.tone]
                          }
                        >
                          {bid.delivery.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === "shipping" ? (
              <div className="flex flex-col gap-4 w-[1144px]">
                {shippingCards.map((card, index) => {
                  return (
                    <div key={`${card.orderId}-${index}`} className="w-[1144px]">
                      {/* Product Info - layout_FO3565 */}
                      <div className="bg-white rounded-[16px_16px_0_0]">
                        <div className="flex items-center justify-between gap-[95px] pr-4 py-4 pl-0 h-[112px]">
                          <div className="flex items-center gap-4">
                            <div className="relative w-[168px] h-[112px] shrink-0 rounded-[16px_0_16px_0] overflow-hidden">
                              <Image src={card.image} alt="" fill sizes="168px" className="object-cover" />
                            </div>
                            <div className="flex flex-col justify-between gap-3 self-stretch">
                              <div className="flex flex-col gap-2">
                                <span className="text-[20px] leading-[24px] font-bold text-[#0F0F0F]">{card.title}</span>
                                <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">{card.orderId}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">Carrier</span>
                            <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">{card.carrier}</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">Tracking Number</span>
                            <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">{card.trackingNumber}</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">Estimated Delivery</span>
                            <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">{card.estimatedDelivery}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status order - layout_IWJ937 */}
                      <div className="relative bg-white rounded-[0_0_16px_16px] p-4 flex flex-col gap-[10px]">
                        {/* Divider - layout_IEC78N */}
                        <div className="absolute left-[16px] top-[38px] h-[4px] w-[1112px] pointer-events-none">
                          <div className="absolute inset-0 h-[4px] w-full rounded-[2px] bg-[#CCCCCC]" />
                          <div
                            className="absolute left-0 top-0 h-[4px] rounded-[2px] bg-[#00B333]"
                            style={{ width: card.progressWidth }}
                          />
                        </div>

                        {/* Status Steps - layout_V12HL9 */}
                        <div className="relative flex items-start justify-between gap-[10px]">
                          {card.steps.map((step, stepIndex) => (
                            <div key={`${step.label}-${stepIndex}`} className="flex flex-col items-center gap-2">
                              <Image src={step.icon} alt="" width={48} height={48} />
                              <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B] text-center">
                                {step.label}
                              </span>
                              <span className="text-[12px] leading-[14px] font-normal text-[#7B7B7B] text-center">
                                {step.date}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
