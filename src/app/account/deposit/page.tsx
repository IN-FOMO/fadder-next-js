"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDeposits } from "@/hooks/useDeposits";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "../../_components/Button";
import { DashboardSidebar } from "../../_components/DashboardSidebar";

const amountOptions = [100, 500, 1000];

type PaymentMethod = "bank_transfer" | "crypto" | "card";

const paymentMethods: { id: PaymentMethod; name: string; description: string; icon: string }[] = [
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: "/figma/deposit/payment-radio-selected.svg",
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    description: "Bitcoin, Ethereum, USDT",
    icon: "/figma/deposit/payment-radio-2.svg",
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer / SWIFT",
    description: "Direct transfer from your bank account",
    icon: "/figma/deposit/payment-radio-3.svg",
  },
];

function formatCurrency(amount: number | undefined): string {
  if (amount === undefined) return "$0.00";
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DepositContent() {
  const { summary, deposits, isLoading, createDeposit } = useDeposits();
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      setSelectedAmount(parsed);
    }
  };

  const handleSubmit = async () => {
    if (selectedAmount < 10) {
      toast.error("Minimum deposit is $10");
      return;
    }

    setIsSubmitting(true);
    try {
      await createDeposit(selectedAmount, selectedMethod);
      toast.success("Deposit request created successfully!");
      setCustomAmount("");
    } catch {
      toast.error("Failed to create deposit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-200px)] bg-surface">
        <div className="page-wrap pt-4 pb-10 flex flex-col gap-6">
          <div className="flex gap-4 flex-col tablet:flex-row">
            <DashboardSidebar />
            <div className="flex-1 min-w-0 flex flex-col tablet:flex-row gap-4">
              <div className="flex flex-col gap-4 w-full tablet:w-[clamp(320px,55vw,652px)]">
                <div className="bg-white rounded-lg p-4 h-[200px] animate-pulse" />
                <div className="bg-white rounded-lg p-4 h-[400px] animate-pulse" />
              </div>
              <div className="w-full tablet:w-[clamp(280px,40vw,476px)] bg-white rounded-lg p-4 h-[500px] animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-200px)] bg-surface">
      <div className="page-wrap pt-4 pb-10 flex flex-col gap-6">
        <div className="flex gap-4 flex-col tablet:flex-row">
          <DashboardSidebar />

          <div className="flex-1 min-w-0 flex flex-col tablet:flex-row gap-4">
            {/* Left column */}
            <div className="flex flex-col gap-4 w-full tablet:w-[clamp(320px,55vw,652px)]">
              <section className="bg-white rounded-lg p-4 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm leading-4 font-bold text-dark">
                    Current Deposit
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[32px] leading-[1.125] font-bold text-dark">
                    {formatCurrency(summary?.availableBalance)}
                  </span>
                  <span className="text-sm leading-4 text-muted">
                    Available for bidding
                  </span>
                </div>
                <div className="h-px w-full bg-border" />
                <div className="flex items-center justify-between gap-8">
                  <div className="flex flex-col gap-2 min-w-[clamp(80px,12vw,110px)]">
                    <span className="text-sm leading-4 text-muted">Reserved</span>
                    <span className="text-xl leading-6 font-bold text-dark">
                      {formatCurrency(summary?.reservedBalance)}
                    </span>
                    <span className="text-sm leading-4 text-muted">
                      {summary?.activeBidsCount || 0} active bids
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[clamp(80px,12vw,110px)]">
                    <span className="text-sm leading-4 text-muted">Total Deposits</span>
                    <span className="text-xl leading-6 font-bold text-dark">
                      {formatCurrency(summary?.totalDeposits)}
                    </span>
                    <span className="text-sm leading-4 text-muted">
                      {summary?.totalTransactions || 0} transactions
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[clamp(80px,12vw,110px)]">
                    <span className="text-sm leading-4 text-muted">Total Spent</span>
                    <span className="text-xl leading-6 font-bold text-dark">
                      {formatCurrency(summary?.totalSpent)}
                    </span>
                    <span className="text-sm leading-4 text-muted">
                      {summary?.totalPurchases || 0} purchases
                    </span>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg p-4 flex flex-col gap-4 min-h-[clamp(360px,50vw,616px)]">
                <div className="flex items-center gap-2">
                  <span className="text-sm leading-4 font-bold text-dark">
                    Transaction History
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  {deposits.length === 0 ? (
                    <div className="text-center py-8 text-muted">
                      No transactions yet
                    </div>
                  ) : (
                    deposits.map((deposit, index) => {
                      const isCredit = deposit.status === "approved";
                      return (
                        <div
                          key={deposit.id || index}
                          className="flex items-center justify-between gap-[84px] bg-surface rounded-[14px] p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className={isCredit ? "text-success" : "text-muted"}>
                                {isCredit ? "+" : "○"}
                              </span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-base leading-5 font-bold text-dark">
                                Deposit
                              </span>
                              <span className="text-xs leading-[14px] text-dark">
                                {formatDate(deposit.createdAt)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <span className="text-base leading-5 text-dark capitalize">
                              {deposit.paymentMethod || "N/A"}
                            </span>
                            <span className="text-sm px-2 py-1 rounded capitalize" style={{
                              backgroundColor: deposit.status === "approved" ? "#dcfce7" :
                                deposit.status === "pending" ? "#fef3c7" : "#fee2e2",
                              color: deposit.status === "approved" ? "#16a34a" :
                                deposit.status === "pending" ? "#d97706" : "#dc2626"
                            }}>
                              {deposit.status}
                            </span>
                            <span
                              className={`text-base leading-5 font-bold ${
                                deposit.status === "approved" ? "text-success" : "text-muted"
                              }`}
                            >
                              {deposit.status === "approved" ? "+" : ""}{formatCurrency(deposit.amount)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            </div>

            {/* Right column: Top Up Balance */}
            <section className="w-full tablet:w-[clamp(280px,40vw,476px)] bg-white rounded-lg p-4 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm leading-4 font-bold text-dark">
                  Top Up Balance
                </span>
                <span className="text-sm leading-4 text-muted">
                  Add funds to your account using various payment methods
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm leading-4 font-semibold text-dark">
                  Amount (USD)
                </span>
                <div className="flex items-center justify-between gap-[10px] bg-surface rounded-[14px] px-6 py-2.5">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="text-sm leading-4 text-dark bg-transparent border-0 outline-none w-full"
                    min="10"
                  />
                </div>
                <div className="flex gap-2">
                  {amountOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleAmountSelect(opt)}
                      className={`bg-surface rounded-[14px] px-4 py-3 text-sm leading-4 font-bold transition-colors ${
                        selectedAmount === opt && !customAmount
                          ? "bg-primary text-white"
                          : "text-dark hover:bg-surface/80"
                      }`}
                    >
                      ${opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-sm leading-4 font-semibold text-dark">
                  Payment Method
                </span>
                <div className="flex flex-col gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex items-center gap-4 rounded-[16px] p-4 text-left transition-colors ${
                        selectedMethod === method.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-surface border-2 border-transparent hover:bg-surface/80"
                      }`}
                    >
                      <Image src={method.icon} alt="" width={20} height={20} />
                      <div className="flex flex-col gap-1">
                        <span className="text-base leading-5 font-semibold text-dark">
                          {method.name}
                        </span>
                        <span className="text-sm leading-4 text-muted">
                          {method.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  variant="primary"
                  size="md"
                  className="rounded-[14px] w-full"
                  onClick={handleSubmit}
                  disabled={isSubmitting || selectedAmount < 10}
                >
                  {isSubmitting ? "Processing..." : "Continue to Payment"}
                </Button>
                <p className="text-sm leading-4 text-muted m-0">
                  Minimum deposit: $10. Funds are typically available within
                  5-10 minutes after approval.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AccountDepositPage() {
  return (
    <ProtectedRoute>
      <DepositContent />
    </ProtectedRoute>
  );
}
