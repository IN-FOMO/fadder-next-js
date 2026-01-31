"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { use2FA } from "@/hooks/use2FA";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardSidebar } from "../../_components/DashboardSidebar";
import { Button } from "../../_components/Button";

function SecurityToggle({
  state,
  onClick,
  disabled,
}: {
  state: "active" | "disabled";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const isActive = state === "active";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        "h-[clamp(16px,3vw,20px)] w-[clamp(28px,4vw,36px)] rounded-[17.7778px] border-[1.111111px] box-border flex items-center transition-all cursor-pointer " +
        (isActive
          ? "bg-[#FFAF0E] border-[#FFAF0E] pl-[clamp(10px,2.2vw,15.6px)]"
          : "bg-[#7B7B7B] border-[#7B7B7B] pl-[clamp(2px,0.5vw,4px)]") +
        (disabled ? " opacity-50 cursor-not-allowed" : "")
      }
    >
      <div className="h-[clamp(12px,2.2vw,18px)] w-[clamp(12px,2.2vw,18px)] rounded-[17.7778px] bg-white" />
    </button>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={id}
        className="text-[14px] leading-[16px] font-bold text-[#0F0F0F]"
      >
        {label}
      </label>
      <div className="flex items-center justify-between gap-[10px] px-6 py-[10px] bg-[#F5F6F8] rounded-[14px]">
        <input
          id={id}
          type="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-0 outline-none p-0 text-[14px] leading-[16px] font-bold text-[#0F0F0F]"
        />
      </div>
    </div>
  );
}

function TwoFactorSetupModal({
  isOpen,
  onClose,
  setupData,
  onEnable,
}: {
  isOpen: boolean;
  onClose: () => void;
  setupData: { qrCodeUrl?: string; secret?: string } | null;
  onEnable: (code: string) => Promise<void>;
}) {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter the verification code");
      return;
    }

    setIsSubmitting(true);
    try {
      await onEnable(code);
      toast.success("2FA enabled successfully!");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to enable 2FA");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 flex flex-col gap-4">
        <h2 className="text-xl font-bold">Setup Two-Factor Authentication</h2>

        {setupData?.qrCodeUrl && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted text-center">
              Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
            </p>
            <Image
              src={setupData.qrCodeUrl}
              alt="2FA QR Code"
              width={200}
              height={200}
              className="border rounded-lg"
            />
          </div>
        )}

        {setupData?.secret && (
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted">Or enter this code manually:</p>
            <code className="bg-surface p-2 rounded text-sm font-mono text-center">
              {setupData.secret}
            </code>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Verification Code</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit code"
              className="bg-surface rounded-[14px] px-4 py-3 text-center text-xl font-bold tracking-widest"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting || code.length !== 6}
              className="flex-1"
            >
              {isSubmitting ? "Verifying..." : "Enable 2FA"}
            </Button>
          </div>
        </form>

        {backupCodes.length > 0 && (
          <div className="flex flex-col gap-2 p-4 bg-surface rounded-lg">
            <p className="text-sm font-bold">Backup Codes</p>
            <p className="text-xs text-muted">
              Save these codes in a safe place. You can use them to access your account if you lose your authenticator.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, i) => (
                <code key={i} className="bg-white p-1 rounded text-sm font-mono text-center">
                  {code}
                </code>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SecurityContent() {
  const { changePassword } = useAuth();
  const {
    isEnabled: is2FAEnabled,
    isLoading: is2FALoading,
    setup: setup2FA,
    enable: enable2FA,
    disable: disable2FA,
    setupData,
  } = use2FA();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [isToggling2FA, setIsToggling2FA] = useState(false);

  const isPasswordValid =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword === confirmPassword;

  const handleChangePassword = async () => {
    if (!isPasswordValid) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handle2FAToggle = async () => {
    if (is2FAEnabled) {
      // Disable 2FA
      const code = prompt("Enter your 2FA code to disable:");
      const password = prompt("Enter your password to confirm:");
      if (code && password) {
        setIsToggling2FA(true);
        try {
          await disable2FA(code, password);
          toast.success("2FA disabled");
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Failed to disable 2FA");
        } finally {
          setIsToggling2FA(false);
        }
      }
    } else {
      // Setup 2FA
      setIsToggling2FA(true);
      try {
        await setup2FA();
        setShowSetupModal(true);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to setup 2FA");
      } finally {
        setIsToggling2FA(false);
      }
    }
  };

  const handleEnable2FA = async (code: string) => {
    await enable2FA(code, true);
  };

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="page-wrap pt-4 pb-10 flex flex-col gap-4">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />

          <div className="w-full flex-1 min-w-0 flex">
            <div className="w-full max-w-[clamp(320px,60vw,700px)] mx-auto flex flex-col gap-8">
              {/* Change Password card */}
              <section className="w-full bg-white rounded-[16px] p-4 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] leading-[16px] font-bold text-[#0F0F0F]">
                    Change Password
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  <PasswordField
                    label="Current Password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    id="current-password"
                  />
                  <PasswordField
                    label="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                    id="new-password"
                  />
                  <PasswordField
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    id="confirm-new-password"
                  />
                </div>

                {newPassword && newPassword !== confirmPassword && (
                  <p className="text-sm text-error">Passwords do not match</p>
                )}

                <Button
                  variant="primary"
                  size="md"
                  disabled={!isPasswordValid || isChangingPassword}
                  onClick={handleChangePassword}
                  className={!isPasswordValid ? "bg-muted hover:bg-muted" : ""}
                >
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </Button>
              </section>

              {/* 2FA card */}
              <section className="w-full bg-white rounded-[16px] p-4 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                    Two-factor authentication (2FA)
                  </span>
                  <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">
                    Add an extra layer of protection to your account.{" "}
                    {is2FALoading
                      ? "Loading..."
                      : is2FAEnabled
                        ? "Two-factor authentication is enabled."
                        : "Two-factor authentication is disabled."}
                  </span>
                </div>
                <SecurityToggle
                  state={is2FAEnabled ? "active" : "disabled"}
                  onClick={handle2FAToggle}
                  disabled={is2FALoading || isToggling2FA}
                />
              </section>

              {/* Account deletion card */}
              <section className="w-full bg-white rounded-[16px] p-4 border-[1.5px] border-[#E61F26] flex flex-col tablet:flex-row items-stretch justify-between gap-4">
                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex flex-col gap-2">
                    <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                      Account deletion
                    </span>
                    <span className="text-[14px] leading-[16px] font-normal text-[#0F0F0F]">
                      Permanently delete your account and all associated data in
                      compliance with GDPR/RODO
                    </span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  className="bg-error hover:bg-error/90 active:bg-error/80"
                >
                  Request account deletion
                </Button>
              </section>
            </div>
          </div>
        </div>
      </div>

      <TwoFactorSetupModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        setupData={setupData}
        onEnable={handleEnable2FA}
      />
    </main>
  );
}

export default function DashboardSecurityPage() {
  return (
    <ProtectedRoute>
      <SecurityContent />
    </ProtectedRoute>
  );
}
