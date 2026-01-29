"use client";

import Image from "next/image";
import { Button } from "../../_components/Button";
import { DashboardSidebar } from "../../_components/DashboardSidebar";

type FieldProps = {
  label: string;
  value: string;
  icon?: string;
  iconOpacity?: number;
};

function Field({ label, value, icon, iconOpacity }: FieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-sm font-semibold text-dark">{label}</span>
      <div className="flex items-center justify-between gap-[10px] bg-surface rounded-[14px] px-6 py-2.5">
        <span className="text-sm font-bold text-dark">{value}</span>
        {icon ? (
          <Image
            src={icon}
            alt=""
            width={20}
            height={20}
            style={iconOpacity !== undefined ? { opacity: iconOpacity } : undefined}
          />
        ) : null}
      </div>
    </div>
  );
}

export default function DashboardProfilePage() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="max-w-[1440px] mx-auto px-[60px] pt-4 pb-10 flex flex-col gap-4 max-tablet:px-8 max-narrow:px-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Profile Container */}
          <section className="w-full lg:w-[1144px] min-w-0 bg-white rounded-lg p-4 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-dark">Profile Data</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-[14px] border-[1.5px] border-primary flex items-center justify-center text-[32px] font-bold text-muted">
                  JC
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold text-dark">Jane Cooper</span>
                  <span className="text-sm font-bold text-muted">michael.mitc@example.com</span>
                </div>
              </div>
              <div className="flex-1 bg-[#EFF6FF] rounded-[14px] p-4 flex flex-col gap-3">
                <span className="text-base font-semibold text-info">Impact of Country Settings:</span>
                <ul className="m-0 pl-5 text-sm text-info flex flex-col gap-2">
                  <li>Calculation of VAT, duties, and shipping costs</li>
                  <li>Default interface language</li>
                  <li>Preferred display currency for prices</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <Field label="Display Currency" value="$ US Dollar" icon="/figma/icons/icon-arrow-down.svg" />
              <Field label="Interface Language" value="English" icon="/figma/icons/icon-arrow-down.svg" />
              <Field label="Country" value="Poland" icon="/figma/icons/icon-arrow-down.svg" />
            </div>

            <div className="h-px w-full bg-border" />

            <div className="flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label="Last name" value="Cooper" icon="/figma/icons/icon-arrow-down.svg" iconOpacity={0} />
                <Field label="First name" value="Jane" icon="/figma/icons/icon-arrow-down.svg" iconOpacity={0} />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label="Phone" value="+48 123 456 789" icon="/figma/icons/icon-arrow-down.svg" iconOpacity={0} />
                <Field
                  label="Email"
                  value="michael.mitc@example.com"
                  icon="/figma/icons/icon-arrow-down.svg"
                  iconOpacity={0}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label="Telegram Notifications" value="+48 123 456 789" icon="/figma/icons/icon-checkbox-checked.svg" />
                <Field label="WhatsApp Notifications" value="+48 123 456 789" icon="/figma/icons/icon-reminder.svg" />
                <Field label="Viber Notifications" value="+48 123 456 789" icon="/figma/icons/icon-cross-small.svg" />
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="bg-muted hover:bg-muted active:bg-muted text-white w-fit rounded-[14px]"
            >
              Save Changes
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}
