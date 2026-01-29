"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "outlineInactive" | "ghost" | "white";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-disabled disabled:text-white disabled:cursor-not-allowed text-foreground border-0 font-bold cursor-pointer",
  secondary:
    "bg-surface hover:shadow-hover active:bg-surface disabled:bg-secondary-disabled disabled:cursor-not-allowed text-foreground border-0 font-bold cursor-pointer",
  outline:
    "bg-white border-2 border-primary hover:border-primary-hover active:border-primary-pressed text-foreground font-bold cursor-pointer",
  outlineInactive:
    "bg-white border-2 border-transparent hover:border-primary active:border-primary text-foreground font-bold cursor-pointer",
  ghost:
    "bg-transparent border-0 text-foreground cursor-pointer hover:opacity-90 active:opacity-90",
  white:
    "bg-white border-0 text-foreground font-bold cursor-pointer hover:shadow-hover active:bg-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "rounded-sm py-2 px-3.5 text-xs font-semibold min-h-9",
  md: "rounded-sm py-3 px-5 text-sm font-semibold min-h-10",
  lg: "rounded-sm py-4 px-8 text-base font-bold min-h-12",
  icon: "rounded-sm p-2 min-h-10 min-w-10 inline-flex items-center justify-center",
};

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 no-underline transition-colors";
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
  const widthClass = fullWidth ? "w-full" : "";
  const combined = [base, variantClass, sizeClass, widthClass, className].filter(Boolean).join(" ");

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={combined} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonAsButton;
  return (
    <button type={type} className={combined} disabled={disabled} {...buttonRest}>
      {children}
    </button>
  );
}
