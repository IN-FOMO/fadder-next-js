"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "../../_components/Button";
import { DashboardSidebar } from "../../_components/DashboardSidebar";

type FieldProps = {
  label: string;
  value: string;
  icon?: string;
  iconOpacity?: number;
  editable?: boolean;
  onChange?: (value: string) => void;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "UAH", label: "UAH - Ukrainian Hryvnia" },
  { value: "RUB", label: "RUB - Russian Ruble" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "ru", label: "Russian" },
  { value: "uk", label: "Ukrainian" },
];

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Poland", label: "Poland" },
  { value: "Germany", label: "Germany" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Kingdom", label: "United Kingdom" },
];

function Field({ label, value, icon, iconOpacity, editable, onChange }: FieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-sm font-semibold text-dark">{label}</span>
      <div className="flex items-center justify-between gap-[10px] bg-surface rounded-[14px] px-6 py-2.5">
        {editable ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="text-sm font-bold text-dark bg-transparent border-0 outline-none w-full"
          />
        ) : (
          <span className="text-sm font-bold text-dark">{value}</span>
        )}
        {icon ? (
          <Image
            src={icon}
            alt=""
            width={20}
            height={20}
            style={
              iconOpacity !== undefined ? { opacity: iconOpacity } : undefined
            }
          />
        ) : null}
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-sm font-semibold text-dark">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-surface rounded-[14px] px-6 py-2.5 pr-10 text-sm font-bold text-dark border-0 outline-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Image
          src="/figma/icons/icon-arrow-down.svg"
          alt=""
          width={20}
          height={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </div>
  );
}

function ProfileContent() {
  const { user, refreshUser } = useAuth();
  const { profile, uploadAvatar, updateProfile, isLoading: profileLoading } = useProfile();

  // Cast fields that have incorrect types in the generated API types
  const avatarUrl = profile?.avatarUrl as unknown as string | undefined;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [displayCurrency, setDisplayCurrency] = useState(profile?.displayCurrency || "USD");
  const [interfaceLanguage, setInterfaceLanguage] = useState(profile?.interfaceLanguage || "en");
  const [profileCountry, setProfileCountry] = useState(profile?.country || "");

  // Update form state when profile loads
  useEffect(() => {
    if (profile) {
      setDisplayCurrency(profile.displayCurrency || "USD");
      setInterfaceLanguage(profile.interfaceLanguage || "en");
      setProfileCountry(profile.country || "");
    }
  }, [profile]);

  // Update user fields when user loads
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  const initials = user
    ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`
    : "U";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";
  const email = user?.email || "user@example.com";

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      await uploadAvatar(file);
      toast.success("Avatar updated successfully!");
      await refreshUser();
    } catch {
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        firstName,
        lastName,
        phoneNumber,
        displayCurrency: displayCurrency as "USD" | "EUR" | "GBP" | "UAH" | "RUB",
        interfaceLanguage: interfaceLanguage as "en" | "ru" | "uk",
        country: profileCountry,
      });
      toast.success("Profile updated successfully!");
      await refreshUser();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="page-wrap pt-4 pb-10 flex flex-col gap-4">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />

          <section className="w-full flex-1 min-w-0 bg-white rounded-lg p-4 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-dark">Profile Data</span>
            </div>

            <div className="flex flex-col tablet:flex-row gap-6">
              <div className="flex items-center gap-4">
                {/* Avatar with upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                  className="relative w-20 h-20 rounded-[14px] border-[1.5px] border-primary overflow-hidden group cursor-pointer"
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[32px] font-bold text-muted">
                      {initials}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {isUploading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Image
                        src="/figma/icons/icon-camera.svg"
                        alt="Upload"
                        width={24}
                        height={24}
                        className="invert"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>
                </button>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold text-dark">
                    {fullName}
                  </span>
                  <span className="text-sm font-bold text-muted">
                    {email}
                  </span>
                  <button
                    onClick={handleAvatarClick}
                    disabled={isUploading}
                    className="text-sm text-primary font-semibold hover:underline text-left"
                  >
                    {isUploading ? "Uploading..." : "Change avatar"}
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-[#EFF6FF] rounded-[14px] p-4 flex flex-col gap-3">
                <span className="text-base font-semibold text-info">
                  Impact of Country Settings:
                </span>
                <ul className="m-0 pl-5 text-sm text-info flex flex-col gap-2">
                  <li>Calculation of VAT, duties, and shipping costs</li>
                  <li>Default interface language</li>
                  <li>Preferred display currency for prices</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col tablet:flex-row gap-4">
              <SelectField
                label="Display Currency"
                value={displayCurrency}
                options={currencyOptions}
                onChange={setDisplayCurrency}
              />
              <SelectField
                label="Interface Language"
                value={interfaceLanguage}
                options={languageOptions}
                onChange={setInterfaceLanguage}
              />
              <SelectField
                label="Country"
                value={profileCountry}
                options={countryOptions}
                onChange={setProfileCountry}
              />
            </div>

            <div className="h-px w-full bg-border" />

            <div className="flex flex-col gap-6">
              <div className="flex flex-col tablet:flex-row gap-6">
                <Field
                  label="Last name"
                  value={lastName}
                  editable
                  onChange={setLastName}
                />
                <Field
                  label="First name"
                  value={firstName}
                  editable
                  onChange={setFirstName}
                />
              </div>
              <div className="flex flex-col tablet:flex-row gap-6">
                <Field
                  label="Phone"
                  value={phoneNumber}
                  editable
                  onChange={setPhoneNumber}
                />
                <Field
                  label="Email"
                  value={user?.email || "N/A"}
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-fit rounded-[14px]"
              onClick={handleSaveChanges}
              disabled={isSaving || profileLoading}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function DashboardProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
