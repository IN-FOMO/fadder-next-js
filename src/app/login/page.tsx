"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../_components/Button";

import apiClient from "@/lib/api-client";

function EmailVerificationRequired({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    setIsSending(true);
    try {
      const { error } = await apiClient.POST("/api/v1/auth/verify/request", {
        body: { email },
      });
      if (error) {
        toast.error("Failed to send verification email");
      } else {
        setSent(true);
        toast.success("Verification email sent!");
      }
    } catch {
      toast.error("Failed to send verification email");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-8 text-dark m-0">
          Email Verification Required
        </h1>
        <p className="text-sm leading-5 text-muted m-0">
          Please verify your email address before logging in. We sent a verification link to <strong>{email}</strong>.
        </p>
      </div>
      <div className="bg-[#FFF3CD] border border-[#FFE69C] rounded-lg p-4">
        <p className="text-sm text-[#664D03] m-0">
          Check your inbox and spam folder for the verification email. Click the link in the email to verify your account.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {sent ? (
          <p className="text-sm text-success text-center">
            Verification email sent! Check your inbox.
          </p>
        ) : (
          <Button
            type="button"
            fullWidth
            size="md"
            onClick={handleResend}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Resend Verification Email"}
          </Button>
        )}
        <Button
          type="button"
          variant="secondary"
          fullWidth
          size="md"
          onClick={onBack}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
}

function TwoFactorForm({
  onSubmit,
  onBack,
  isSubmitting,
}: {
  onSubmit: (code: string) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
}) {
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }
    await onSubmit(code);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-8 text-dark m-0">
          Two-Factor Authentication
        </h1>
        <p className="text-sm leading-5 text-muted m-0">
          Enter the 6-digit code from your authenticator app to continue.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
          Verification Code
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="h-12 rounded-[10px] bg-surface px-4 text-center text-xl font-bold tracking-widest text-dark placeholder:text-muted outline-none border border-transparent"
            autoFocus
          />
        </label>
        <div className="flex flex-col gap-3">
          <Button type="submit" fullWidth size="md" disabled={isSubmitting || code.length !== 6}>
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            size="md"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back to Login
          </Button>
        </div>
      </form>
      <p className="text-center text-sm text-muted">
        Lost access to your authenticator?{" "}
        <Link href="/forgot-password" className="text-primary font-semibold">
          Use a backup code
        </Link>
      </p>
    </div>
  );
}

const carouselImages = [
  "/figma/images/blog-1.png",
  "/figma/images/blog-2.png",
  "/figma/images/blog-3.png",
  "/figma/images/vehicle-1.png",
];

const reviewPool = [
  {
    name: "Jurana U.",
    text: "Polecam uslugi Fadder. Wszystko odbywa sie zgodnie z opisem na stronie.",
  },
  {
    name: "Logan F.",
    text: "Great service and fast updates. Everything matched the listing.",
  },
  {
    name: "Maria K.",
    text: "Smooth experience, helpful support, and transparent process.",
  },
  {
    name: "David A.",
    text: "Easy steps, good communication, and quick delivery.",
  },
];

function buildSlides(source: typeof reviewPool) {
  return carouselImages.map((image, index) => ({
    image,
    review: source[index % source.length],
  }));
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWith2FA, isAuthenticated, pendingTwoFactor } = useAuth();
  const [show2FA, setShow2FA] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const defaultSlides = useMemo(() => buildSlides(reviewPool), []);
  const [slides, setSlides] = useState(defaultSlides);
  const [activeIndex, setActiveIndex] = useState(0);
  const pauseUntilRef = useRef(0);
  const activeSlide = slides[activeIndex];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);
  useEffect(() => {
    const shuffled = [...reviewPool].sort(() => Math.random() - 0.5);
    setSlides(buildSlides(shuffled));
    setActiveIndex(0);
  }, []);
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3500);
    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const handlePrev = () => {
    pauseUntilRef.current = Date.now() + 3000;
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    pauseUntilRef.current = Date.now() + 3000;
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <section className="page-wrap py-[clamp(24px,5vw,64px)] flex items-stretch gap-[clamp(20px,4vw,32px)] max-lg:flex-col">
        <div className="w-full max-w-[clamp(320px,45vw,560px)] bg-white rounded-[16px] p-[clamp(20px,4vw,40px)] shadow-[0px_8px_24px_0px_rgba(15,15,15,0.06)] self-stretch">
          {showEmailVerification ? (
            <EmailVerificationRequired
              email={pendingEmail}
              onBack={() => {
                setShowEmailVerification(false);
                setPassword("");
              }}
            />
          ) : show2FA ? (
            <TwoFactorForm
              onSubmit={async (code) => {
                setIsSubmitting(true);
                try {
                  await loginWith2FA(code);
                  toast.success("Login successful!");
                  router.push("/dashboard");
                } catch (error) {
                  const message =
                    error instanceof Error ? error.message : "Invalid 2FA code";
                  toast.error(message);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              onBack={() => {
                setShow2FA(false);
                setPassword("");
              }}
              isSubmitting={isSubmitting}
            />
          ) : (
          <>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold leading-8 text-dark m-0">
              Login
            </h1>
            <p className="text-sm leading-5 text-muted m-0">
              Welcome back! Please login to your account.
            </p>
          </div>
          <form
            className="mt-8 flex flex-col gap-6"
            noValidate
            onSubmit={async (event) => {
              event.preventDefault();
              setEmailTouched(true);
              if (!isEmailValid) {
                toast.error("Please enter a valid email.");
                return;
              }
              if (!password) {
                toast.error("Please enter your password.");
                return;
              }

              setIsSubmitting(true);
              try {
                const result = await login(email, password);
                if (result.requiresEmailVerification) {
                  setPendingEmail(result.email || email);
                  setShowEmailVerification(true);
                  toast.error("Please verify your email before logging in");
                } else if (result.requires2FA) {
                  setShow2FA(true);
                  toast("Please enter your 2FA code", { icon: "🔐" });
                } else if (result.success) {
                  toast.success("Login successful!");
                  router.push("/dashboard");
                }
              } catch (error) {
                const message =
                  error instanceof Error ? error.message : "Login failed";
                toast.error(message);
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
              Email
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`h-12 rounded-[10px] bg-surface px-4 text-sm text-dark placeholder:text-muted outline-none ${
                  emailTouched && !isEmailValid
                    ? "border border-[#D91E1D]"
                    : "border border-transparent"
                }`}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
              Password
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-[10px] bg-surface px-4 pr-10 text-sm text-dark placeholder:text-muted outline-none"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center text-muted"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C3.6 7.8 7.4 5 12 5C16.6 5 20.4 7.8 22 12C20.4 16.2 16.6 19 12 19C7.4 19 3.6 16.2 2 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </label>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-dark font-medium">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-[4px] border border-muted accent-primary"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-primary no-underline font-semibold"
              >
                Forgot password / Resend activation email?
              </Link>
            </div>
            <Button type="submit" fullWidth size="md" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
          </>
          )}
        </div>
        <div className="w-full max-w-[clamp(320px,55vw,640px)] relative rounded-[16px] overflow-hidden self-stretch flex flex-col">
          <div className="relative flex-1 w-full overflow-hidden">
            <div
              className="flex h-full w-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={`login-slide-${slide.image}-${index}`}
                  className="relative h-full w-full shrink-0"
                >
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="640px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>
          <div className="absolute bottom-20 left-6 right-6 text-white flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>{activeSlide.review.name}</span>
              <span aria-hidden="true">★★★★★</span>
            </div>
            <p className="text-sm leading-5 m-0">
              {activeSlide.review.text}
            </p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, index) => (
              <span
                key={`dot-${index}`}
                className={
                  "rounded-full " +
                  (index === activeIndex
                    ? "h-1.5 w-4 bg-white"
                    : "h-1.5 w-1.5 bg-white/40")
                }
              />
            ))}
          </div>
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <Button
              type="button"
              onClick={handlePrev}
              size="icon"
              className="rounded-full"
              aria-label="Previous review"
            >
              <Image
                src="/figma/icons/icon-arrow-left.svg"
                alt=""
                width={20}
                height={20}
              />
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              size="icon"
              className="rounded-full"
              aria-label="Next review"
            >
              <Image
                src="/figma/icons/icon-arrow-right.svg"
                alt=""
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
