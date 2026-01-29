"use client";

import Image from "next/image";
import { Button } from "../../_components/Button";
import { DashboardSidebar } from "../../_components/DashboardSidebar";

const depositSummary = [
  { title: "Reserved", value: "$3,200.00", desc: "2 lots" },
  { title: "Total Deposits", value: "$58,640.00", desc: "24 transactions" },
  { title: "Total Spent", value: "$45,890.00", desc: "18 purchases" },
];

const transactions = [
  {
    title: "Deposit",
    date: "October 12, 2025",
    method: "Visa ****1234",
    amount: "+ $5,000",
    color: "text-success",
    icon: "/figma/deposit/transaction-icon-1.svg",
  },
  {
    title: "Payment for Lot #12345",
    date: "October 12, 2025",
    method: "Bank Transfer",
    amount: "- $2,000",
    color: "text-error",
    icon: "/figma/deposit/transaction-icon-2.svg",
  },
  {
    title: "Deposit",
    date: "October 13, 2025",
    method: "Visa ****1234",
    amount: "+ $500",
    color: "text-success",
    icon: "/figma/deposit/transaction-icon-3.svg",
  },
  {
    title: "Deposit",
    date: "October 14, 2025",
    method: "PayPal",
    amount: "+ $1,250",
    color: "text-success",
    icon: "/figma/deposit/transaction-icon-4.svg",
  },
  {
    title: "Deposit",
    date: "October 14, 2025",
    method: "PayPal",
    amount: "+ $1,250",
    color: "text-success",
    icon: "/figma/deposit/transaction-icon-5.svg",
  },
  {
    title: "Deposit",
    date: "October 14, 2025",
    method: "PayPal",
    amount: "+ $1,250",
    color: "text-success",
    icon: "/figma/deposit/transaction-icon-6.svg",
  },
  {
    title: "Payment for Lot #67890",
    date: "October 15, 2025",
    method: "Credit Card ****5678",
    amount: "- $750",
    color: "text-error",
    icon: "/figma/deposit/transaction-icon-7.svg",
  },
];

const amountOptions = ["$100", "$500", "$1000"];

const paymentMethods = [
  {
    name: "Credit / Debit Card",
    description: "Visa, Mastercard, American Express",
    selected: true,
    icon: "/figma/deposit/payment-radio-selected.svg",
  },
  {
    name: "Cryptocurrency",
    description: "Bitcoin, Ethereum, USDT",
    selected: false,
    icon: "/figma/deposit/payment-radio-2.svg",
  },
  {
    name: "SWIFT",
    description: "Direct transfer from your bank account",
    selected: false,
    icon: "/figma/deposit/payment-radio-3.svg",
  },
  {
    name: "Digital Wallet",
    description: "PayPal, Apple Pay, Google Pay",
    selected: false,
    icon: "/figma/deposit/payment-radio-4.svg",
  },
  {
    name: "Local EU Payments",
    description: "Przelewy24, Sofort",
    selected: false,
    icon: "/figma/deposit/payment-radio-5.svg",
  },
  {
    name: "Payment Gateways",
    description: "Stripe, Revolut Business",
    selected: false,
    icon: "/figma/deposit/payment-radio-6.svg",
  },
];

export default function AccountDepositPage() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-surface">
      <div className="max-w-[1440px] mx-auto px-[60px] pt-6 pb-10 flex flex-col gap-6 max-tablet:px-8 max-narrow:px-4">
        <div className="flex gap-4 flex-col lg:flex-row">
          <DashboardSidebar />

          <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-4">
            {/* Left column */}
            <div className="flex flex-col gap-4 w-full lg:w-[652px]">
              <section className="bg-white rounded-lg p-4 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm leading-4 font-bold text-dark">Current Deposit</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[32px] leading-[1.125] font-bold text-dark">$10,000.00</span>
                  <span className="text-sm leading-4 text-muted">Available for bidding</span>
                </div>
                <div className="h-px w-full bg-border" />
                <div className="flex items-center justify-between gap-8">
                  {depositSummary.map((item) => (
                    <div key={item.title} className="flex flex-col gap-2 min-w-[91px]">
                      <span className="text-sm leading-4 text-muted">{item.title}</span>
                      <span className="text-xl leading-6 font-bold text-dark">{item.value}</span>
                      <span className="text-sm leading-4 text-muted">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-lg p-4 flex flex-col gap-4 min-h-[616px]">
                <div className="flex items-center gap-2">
                  <span className="text-sm leading-4 font-bold text-dark">Transaction History</span>
                </div>
                <div className="flex flex-col gap-4">
                  {transactions.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="flex items-center justify-between gap-[84px] bg-surface rounded-[14px] p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Image src={item.icon} alt="" width={40} height={40} />
                        <div className="flex flex-col gap-1">
                          <span className="text-base leading-5 font-bold text-dark">{item.title}</span>
                          <span className="text-xs leading-[14px] text-dark">{item.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="text-base leading-5 text-dark">{item.method}</span>
                        <span className={`text-base leading-5 font-bold ${item.color}`}>{item.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column: Top Up Balance */}
            <section className="w-full lg:w-[476px] bg-white rounded-lg p-4 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm leading-4 font-bold text-dark">Top Up Balance</span>
                <span className="text-sm leading-4 text-muted">
                  Add funds to your account using various payment methods
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm leading-4 font-semibold text-dark">Amount (USD)</span>
                <div className="flex items-center justify-between gap-[10px] bg-surface rounded-[14px] px-6 py-2.5">
                  <span className="text-sm leading-4 text-muted">Enter amount</span>
                </div>
                <div className="flex gap-2">
                  {amountOptions.map((opt) => (
                    <div
                      key={opt}
                      className="bg-surface rounded-[14px] px-4 py-3 text-sm leading-4 font-bold text-dark"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-sm leading-4 font-semibold text-dark">Payment Method</span>
                <div className="flex flex-col gap-4">
                  {paymentMethods.map((method) => (
                    <div key={method.name} className="flex items-center gap-4 bg-surface rounded-[16px] p-4">
                      <Image src={method.icon} alt="" width={20} height={20} />
                      <div className="flex flex-col gap-1">
                        <span className="text-base leading-5 font-semibold text-dark">{method.name}</span>
                        <span className="text-sm leading-4 text-muted">{method.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button variant="primary" size="md" className="rounded-[14px] w-full">
                  Continue to Payment
                </Button>
                <p className="text-sm leading-4 text-muted m-0">
                  Minimum deposit: $10. Funds are typically available within 5-10 minutes
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
