"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../_components/Button";

const countryMap: Record<string, { name: string; prefix: string; placeholder: string; minDigits: number; maxDigits: number }> = {
  pl: { name: "Poland", prefix: "+48", placeholder: "XXX XXX XXX", minDigits: 9, maxDigits: 9 },
  de: { name: "Germany", prefix: "+49", placeholder: "XXX XXXXXXXX", minDigits: 10, maxDigits: 11 },
  nl: { name: "Netherlands", prefix: "+31", placeholder: "X XXXXXXXX", minDigits: 9, maxDigits: 9 },
  ua: { name: "Ukraine", prefix: "+380", placeholder: "XX XXX XXXX", minDigits: 9, maxDigits: 9 },
};

// Validate phone number format based on country
function isValidPhoneForCountry(phone: string, countryCode: string): boolean {
  const country = countryMap[countryCode];
  if (!country) return false;

  // Extract digits after prefix
  const digitsOnly = phone.replace(/[\s\-\(\)]/g, "").replace(/^\+\d{1,3}/, "");
  const digitCount = digitsOnly.length;

  return digitCount >= country.minDigits && digitCount <= country.maxDigits;
}

// Format phone number with spaces for display
function formatPhoneInput(value: string, prefix: string): string {
  // Keep the prefix and format the rest
  if (!value.startsWith(prefix)) {
    return prefix + " ";
  }

  // Get the part after prefix
  const afterPrefix = value.slice(prefix.length).replace(/[^\d]/g, "");

  // Format with spaces every 3 digits
  const formatted = afterPrefix.replace(/(\d{3})(?=\d)/g, "$1 ").trim();

  return prefix + " " + formatted;
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

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
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
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [country, setCountry] = useState("");

  // Update phone prefix when country changes
  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    const countryData = countryMap[newCountry];
    if (countryData) {
      // If phone is empty or only has old prefix, set new prefix
      const currentPrefix = country ? countryMap[country]?.prefix : "";
      if (!phone || phone === currentPrefix + " " || phone.trim() === currentPrefix) {
        setPhone(countryData.prefix + " ");
      } else if (currentPrefix && phone.startsWith(currentPrefix)) {
        // Replace old prefix with new one
        setPhone(countryData.prefix + phone.slice(currentPrefix.length));
      }
    }
  };

  const handlePhoneChange = (value: string) => {
    const prefix = country ? countryMap[country]?.prefix || "" : "";
    if (prefix && !value.startsWith(prefix)) {
      // Don't allow removing the prefix
      setPhone(prefix + " ");
      return;
    }
    setPhone(value);
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [policies, setPolicies] = useState({
    cookies: false,
    terms: false,
    privacy: false,
    age: false,
    auction: false,
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = isValidPhoneForCountry(phone, country);
  const phoneDigitCount = phone.replace(/[\s\-\(\)]/g, "").replace(/^\+\d{1,3}/, "").length;
  const expectedDigits = country ? countryMap[country]?.minDigits : 9;
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
      <section className="page-wrap py-[clamp(24px,5vw,64px)] flex items-stretch gap-[clamp(20px,4vw,32px)] max-lg:flex-col">
        <div className="w-full max-w-[clamp(320px,45vw,560px)] bg-white rounded-[16px] p-[clamp(20px,4vw,40px)] shadow-[0px_8px_24px_0px_rgba(15,15,15,0.06)] self-stretch">
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
            <div className="h-[clamp(2px,0.4vw,3px)] flex-1 bg-[#E5E7EB] rounded-full overflow-hidden">
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
            onSubmit={async (event) => {
              event.preventDefault();
              if (step === 1) {
                setEmailTouched(true);
                setPhoneTouched(true);
                if (!isEmailValid) {
                  toast.error("Please enter a valid email address.");
                  return;
                }
                if (!firstName.trim() || !lastName.trim() || !country) {
                  toast.error("Please fill in all required fields.");
                  return;
                }
                if (!isPhoneValid) {
                  const expected = countryMap[country]?.minDigits || 9;
                  toast.error(`Please enter a valid phone number (${expected} digits required for ${countryMap[country]?.name}).`);
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
                return;
              }

              setIsSubmitting(true);
              try {
                await register({
                  email,
                  firstName,
                  lastName,
                  phoneNumber: phone.replace(/\s/g, ""), // Remove spaces for API
                  country: countryMap[country]?.name || country,
                  password,
                });
                toast.success("Account created successfully!");
                router.push("/dashboard");
              } catch (error) {
                const message =
                  error instanceof Error ? error.message : "Registration failed";
                toast.error(message);
              } finally {
                setIsSubmitting(false);
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
                      placeholder={country ? countryMap[country]?.prefix + " " + countryMap[country]?.placeholder : "Select country first"}
                      value={phone}
                      onChange={(event) => handlePhoneChange(event.target.value)}
                      onBlur={() => setPhoneTouched(true)}
                      required
                      disabled={!country}
                      className={`h-12 rounded-[10px] bg-surface px-4 text-sm text-dark placeholder:text-muted outline-none ${
                        phoneTouched && !isPhoneValid
                          ? "border border-[#D91E1D]"
                          : "border border-transparent"
                      } ${!country ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                    {phoneTouched && !isPhoneValid && phone.length > 0 && (
                      <span className="text-xs text-[#D91E1D]">
                        {phoneDigitCount < expectedDigits
                          ? `Enter ${expectedDigits} digits (${phoneDigitCount}/${expectedDigits})`
                          : `Maximum ${countryMap[country]?.maxDigits} digits allowed`}
                      </span>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-dark">
                    Country*
                    <div className="relative">
                      <select
                        value={country}
                        onChange={(event) => handleCountryChange(event.target.value)}
                        required
                        className="h-12 w-full appearance-none rounded-[10px] bg-surface px-4 pr-10 text-sm text-dark outline-none border border-transparent"
                      >
                        <option value="" disabled>
                          Select your country
                        </option>
                        <option value="pl">Poland (+48)</option>
                        <option value="de">Germany (+49)</option>
                        <option value="nl">Netherlands (+31)</option>
                        <option value="ua">Ukraine (+380)</option>
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
                <Button type="submit" fullWidth size="md" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create account"}
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
