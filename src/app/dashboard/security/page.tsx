import { DashboardSidebar } from "../../_components/DashboardSidebar";

function SecurityToggle({ state }: { state: "active" | "disabled" }) {
  const isActive = state === "active";
  return (
    <div
      className={
        "h-[clamp(16px,3vw,20px)] w-[clamp(28px,4vw,36px)] rounded-[17.7778px] border-[1.111111px] box-border flex items-center " +
        (isActive
          ? "bg-[#FFAF0E] border-[#FFAF0E] pl-[clamp(10px,2.2vw,15.6px)]"
          : "bg-[#7B7B7B] border-[#7B7B7B] pl-[clamp(2px,0.5vw,4px)]")
      }
      aria-hidden="true"
    >
      <div className="h-[clamp(12px,2.2vw,18px)] w-[clamp(12px,2.2vw,18px)] rounded-[17.7778px] bg-white" />
    </div>
  );
}

function PasswordField({
  label,
  defaultValue,
  id,
}: {
  label: string;
  defaultValue?: string;
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
          defaultValue={defaultValue}
          className="w-full bg-transparent border-0 outline-none p-0 text-[14px] leading-[16px] font-bold text-[#0F0F0F]"
        />
      </div>
    </div>
  );
}

export default function DashboardSecurityPage() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="page-wrap pt-4 pb-10 flex flex-col gap-4">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />

          {/* Content column (Figma: 700px centered inside 1144px) */}
          <div className="w-full flex-1 min-w-0 flex">
            <div className="w-full max-w-[clamp(320px,60vw,700px)] mx-auto flex flex-col gap-8">
              {/* Change Password card (700x396, p=16, gap=24) */}
              <section className="w-full min-h-[clamp(280px,35vw,396px)] bg-white rounded-[16px] p-4 flex flex-col gap-6">
                <div className="flex items-center gap-2 min-h-[clamp(14px,2vw,16px)]">
                  <span className="text-[14px] leading-[16px] font-bold text-[#0F0F0F]">
                    Change Password
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  <PasswordField
                    label="Current Password"
                    defaultValue="*************"
                    id="current-password"
                  />
                  <PasswordField
                    label="New Password"
                    defaultValue="*************"
                    id="new-password"
                  />
                  <PasswordField
                    label="Confirm New Password"
                    defaultValue="*************"
                    id="confirm-new-password"
                  />
                </div>

                <button
                  type="button"
                  disabled
                  className="w-fit self-start bg-[#7B7B7B] text-white rounded-[14px] px-8 py-4 text-[14px] leading-[16px] font-bold cursor-not-allowed"
                >
                  Update Password
                </button>
              </section>

              {/* 2FA card */}
              <section className="w-full bg-white rounded-[16px] p-4 flex items-center justify-between gap-[95px]">
                <div className="flex flex-col gap-2 flex-1">
                  <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                    Two-factor authentication (2FA)
                  </span>
                  <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">
                    Add an extra layer of protection to your account. Two-factor
                    authentication is disabled
                  </span>
                </div>
                <SecurityToggle state="disabled" />
              </section>

              {/* Account deletion card (stroke red 1.5px) */}
              <section className="w-full bg-white rounded-[16px] p-4 border-[1.5px] border-[#E61F26] flex items-stretch justify-between gap-[95px]">
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
                <button
                  type="button"
                  className="bg-[#E61F26] text-white rounded-[14px] px-8 py-4 text-[14px] leading-[16px] font-bold"
                >
                  Request account deletion
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
