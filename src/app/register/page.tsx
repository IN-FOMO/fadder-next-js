"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../_components/Button";

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

export default function RegisterPage() {
  const defaultSlides = useMemo(() => buildSlides(reviewPool), []);
  const [slides, setSlides] = useState(defaultSlides);
  const [activeIndex, setActiveIndex] = useState(0);
  const pauseUntilRef = useRef(0);
  const activeSlide = slides[activeIndex];
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [policies, setPolicies] = useState({
    cookies: false,
    terms: false,
    privacy: false,
    age: false,
    auction: false,
  });

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isPasswordValid =
    hasMinLength && hasUppercase && hasLowercase && hasSymbol;
  const allPoliciesAccepted = Object.values(policies).every(Boolean);

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
      <section className="max-w-[1240px] mx-auto px-6 py-16 flex items-stretch gap-8 max-lg:flex-col">
        <div className="w-full max-w-[560px] bg-white rounded-[16px] p-10 shadow-[0px_8px_24px_0px_rgba(15,15,15,0.06)] self-stretch">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold leading-8 text-dark m-0">
              Register
            </h1>
            <p className="text-sm leading-5 text-muted m-0">
              Set up your account and begin making your first bids!
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-muted">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                1
              </span>
              <span className="text-dark">Account</span>
            </div>
            <div className="h-[2px] flex-1 bg-[#E5E7EB] rounded-full overflow-hidden">
              <span
                className={`block h-full bg-primary ${
                  step === 2 ? "w-full" : "w-1/2"
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  step === 2
                    ? "bg-primary text-white"
                    : "bg-[#F1F3F5] text-muted"
                }`}
              >
                2
              </span>
              <span className={step === 2 ? "text-dark" : undefined}>
                Password
              </span>
            </div>
          </div>

          <form
            className="mt-6 flex flex-col gap-6"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (step === 1) {
                setEmailTouched(true);
              if (!isEmailValid) {
                  toast.error("Please enter a valid email address.");
                  return;
                }
              if (
                !firstName.trim() ||
                !lastName.trim() ||
                !phone.trim() ||
                !country
              ) {
                toast.error("Please fill in all required fields.");
                return;
              }
                setStep(2);
                return;
              }

              if (!isPasswordValid) {
                toast.error(
                  "Password must be at least 8 characters, include uppercase, lowercase, and a symbol.",
                );
                return;
              }
              if (password !== confirmPassword) {
                toast.error("Passwords do not match.");
                return;
              }
              if (!allPoliciesAccepted) {
                toast.error("Please accept all required policies to continue.");
              }
            }}
          >
            {step === 1 ? (
              <>
                <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
                  Email*
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className={`h-12 rounded-[10px] bg-surface px-4 text-sm text-dark placeholder:text-muted outline-none ${
                      emailTouched && !isEmailValid
                        ? "border border-[#D91E1D]"
                        : "border border-transparent"
                    }`}
                  />
                </label>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
                    First Name*
                    <input
                      type="text"
                      placeholder="Enter your First Name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                      className="h-12 rounded-[10px] bg-surface px-4 text-sm text-dark placeholder:text-muted outline-none border border-transparent"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
                    Last Name*
                    <input
                      type="text"
                      placeholder="Enter your Last Name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      required
                      className="h-12 rounded-[10px] bg-surface px-4 text-sm text-dark placeholder:text-muted outline-none border border-transparent"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
                    Phone*
                    <input
                      type="tel"
                      placeholder="Enter your Phone Number"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      className="h-12 rounded-[10px] bg-surface px-4 text-sm text-dark placeholder:text-muted outline-none border border-transparent"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
                    Country*
                    <div className="relative">
                      <select
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        required
                        className="h-12 w-full appearance-none rounded-[10px] bg-surface px-4 pr-10 text-sm text-dark outline-none border border-transparent"
                      >
                        <option value="" disabled>
                          Select your country
                        </option>
                        <option value="pl">Poland</option>
                        <option value="de">Germany</option>
                        <option value="nl">Netherlands</option>
                        <option value="ua">Ukraine</option>
                      </select>
                      <svg
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
                <Button type="submit" fullWidth size="md">
                  Continue
                </Button>
              </>
            ) : (
              <>
                <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
                  Password*
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      className="h-12 w-full rounded-[10px] bg-surface px-4 pr-10 text-sm text-dark placeholder:text-muted outline-none border border-transparent"
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
                <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
                  Confirm Password*
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                      className="h-12 w-full rounded-[10px] bg-surface px-4 pr-10 text-sm text-dark placeholder:text-muted outline-none border border-transparent"
                    />
                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
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
                <div className="flex flex-col gap-3 text-sm text-dark">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded-[4px] border border-muted accent-primary"
                      checked={policies.cookies}
                      onChange={(event) =>
                        setPolicies((prev) => ({
                          ...prev,
                          cookies: event.target.checked,
                        }))
                      }
                    />
                    <span>I agree to the Cookie Policy.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded-[4px] border border-muted accent-primary"
                      checked={policies.terms}
                      onChange={(event) =>
                        setPolicies((prev) => ({
                          ...prev,
                          terms: event.target.checked,
                        }))
                      }
                    />
                    <span>I agree to the Website Terms of Use.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded-[4px] border border-muted accent-primary"
                      checked={policies.privacy}
                      onChange={(event) =>
                        setPolicies((prev) => ({
                          ...prev,
                          privacy: event.target.checked,
                        }))
                      }
                    />
                    <span>I agree to the Privacy Policy.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded-[4px] border border-muted accent-primary"
                      checked={policies.age}
                      onChange={(event) =>
                        setPolicies((prev) => ({
                          ...prev,
                          age: event.target.checked,
                        }))
                      }
                    />
                    <span>I confirm I am 18+ and eligible to bid.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded-[4px] border border-muted accent-primary"
                      checked={policies.auction}
                      onChange={(event) =>
                        setPolicies((prev) => ({
                          ...prev,
                          auction: event.target.checked,
                        }))
                      }
                    />
                    <span>
                      I agree to the Auction Aggregator Rules and Fees.
                    </span>
                  </label>
                </div>
                <Button type="submit" fullWidth size="md">
                  Create account
                </Button>
              </>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>

        <div className="w-full max-w-[640px] relative rounded-[16px] overflow-hidden self-stretch flex flex-col">
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
            <p className="text-sm leading-5 m-0">{activeSlide.review.text}</p>
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
