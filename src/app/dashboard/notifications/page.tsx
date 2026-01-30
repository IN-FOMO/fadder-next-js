import Image from "next/image";
import { DashboardSidebar } from "../../_components/DashboardSidebar";
import { Pagination } from "../../_components/Pagination";

type FavoriteSpecRow = {
  label: string;
  value: string;
};

type FavoriteCar = {
  title: string;
  auction: "Copart" | "IAAI";
  image: string;
  specsLeft: FavoriteSpecRow[];
  specsRight: FavoriteSpecRow[];
  timeRemaining: string;
  currentBid: string;
};

const cars: FavoriteCar[] = Array.from({ length: 6 }).map(() => ({
  title: "1981 Chevrolet Corvette",
  auction: "Copart",
  image: "/figma/images/favorites-vehicle-1.png",
  specsLeft: [
    { label: "Odometer", value: "25 145 mi (40 467 km)" },
    { label: "Engine", value: "5.7L, V8" },
    { label: "Transmission", value: "Automatic" },
  ],
  specsRight: [
    { label: "Fuel Type", value: "Gasoline" },
    { label: "Drive Type", value: "Rear wheel drive" },
  ],
  timeRemaining: "1 d 21 h 23 min 00 sec",
  currentBid: "$725",
}));

function Toggle({ state }: { state: "active" | "disabled" }) {
  const isActive = state === "active";
  return (
    <div
      className={
        "w-[36px] h-[20px] rounded-[17.7778px] border-[1.111111px] box-border flex items-center " +
        (isActive
          ? "bg-[#FFAF0E] border-[#FFAF0E] pl-[15.5556px]"
          : "bg-[#7B7B7B] border-[#7B7B7B] pl-[2px]")
      }
      aria-hidden="true"
    >
      <div className="w-[17.78px] h-[17.78px] rounded-[17.7778px] bg-white" />
    </div>
  );
}

function SpecRow({
  label,
  value,
  withDivider,
}: FavoriteSpecRow & { withDivider: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-[16px] py-[8px]${
        withDivider ? " border-b border-[#F5F6F8]" : ""
      }`}
    >
      <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">
        {label}
      </span>
      <span className="text-[14px] leading-[16px] font-bold text-[#0F0F0F]">
        {value}
      </span>
    </div>
  );
}

function FavoriteCard({ car }: { car: FavoriteCar }) {
  return (
    <div className="flex w-full tablet:w-[1144px] tablet:h-[236px] max-w-[1144px]">
      <div className="relative w-[140px] sm:w-[220px] tablet:w-[340px] h-[160px] sm:h-[200px] tablet:h-[236px] shrink-0 rounded-l-[16px] overflow-hidden bg-surface">
        <Image
          src={car.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 220px, 340px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 bg-white rounded-r-[16px] p-4 flex flex-col items-end gap-[13px] min-w-0">
        <div className="flex items-center justify-between self-stretch">
          <span className="text-[20px] leading-[24px] font-bold text-[#0F0F0F] truncate">
            {car.title}
          </span>
          <span className="inline-flex items-center justify-center rounded-[8px] px-[8px] py-[4px] bg-[#0E5DB8] text-white text-[12px] leading-[14px] font-normal">
            {car.auction}
          </span>
        </div>

        <div className="flex flex-col tablet:flex-row items-stretch gap-4 self-stretch min-w-0">
          <div className="flex-1 flex flex-col gap-[3px]">
            {car.specsLeft.map((row, idx) => (
              <SpecRow
                key={row.label}
                label={row.label}
                value={row.value}
                withDivider={idx !== car.specsLeft.length - 1}
              />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-[3px]">
            {car.specsRight.map((row, idx) => (
              <SpecRow
                key={row.label}
                label={row.label}
                value={row.value}
                withDivider={idx !== car.specsRight.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between self-stretch gap-3">
          <span className="text-[16px] leading-[20px] font-normal text-[#00B333]">
            {car.timeRemaining}
          </span>
          <div className="flex items-center gap-[8px]">
            <div className="w-[52px] h-[52px] rounded-[14px] bg-[#F5F6F8] flex items-center justify-center">
              <Image
                src="/figma/icons/icon-search.svg"
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className="h-[52px] rounded-[14px] bg-[#F5F6F8] px-[32px] flex items-center justify-center gap-[10px]">
              <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                Current Bid
              </span>
              <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                {car.currentBid}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardNotificationsPage() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="max-w-[1440px] mx-auto px-[60px] pt-4 pb-10 flex flex-col gap-4 max-tablet:px-8 max-narrow:px-4">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />

          <div className="w-full tablet:w-[1144px] min-w-0 flex flex-col gap-16">
            {/* Frame 432 (layout_MD08I0): Manage filter subscriptions */}
            <div className="w-full tablet:w-[1144px] flex flex-col tablet:flex-row items-start tablet:items-end justify-between gap-6 tablet:gap-[378px]">
              <div className="w-full tablet:w-[415px] flex flex-col gap-2">
                <span className="text-[20px] leading-[24px] font-bold text-[#0A0A0A]">
                  Manage filter subscriptions
                </span>
                <span className="text-[14px] leading-[16px] font-normal text-[#717182]">
                  Receive notifications about new cars that match your search
                  criteria
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                {[
                  { label: "E-mail", state: "active" as const },
                  { label: "Telegram", state: "active" as const },
                  { label: "WhatsApp", state: "active" as const },
                  { label: "Viber", state: "active" as const },
                  { label: "SMS", state: "disabled" as const },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">
                      {c.label}
                    </span>
                    <Toggle state={c.state} />
                  </div>
                ))}
              </div>
            </div>

            {/* Car List Container (layout_4YOMXP + layout_8SWV5N) */}
            <section className="w-full tablet:w-[1144px] flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {cars.map((car, idx) => (
                  <FavoriteCard key={`${car.title}-${idx}`} car={car} />
                ))}
              </div>
              <Pagination pages={[1, 2, 3, 4, 5, "...", 24]} current={2} />
            </section>

            {/* Notification Settings (layout_IEGAE9): centered 700px inside 1144 */}
            <section className="w-full tablet:w-[700px] mx-auto flex flex-col gap-4">
              {[
                {
                  title: "Marketing notifications",
                  description:
                    "Get information about special auctions, promotions, and exclusive offers",
                  enabled: true,
                },
                {
                  title: "News and updates",
                  description:
                    "Learn about new auction platforms, changes in bidding rules, and platform updates",
                  enabled: true,
                },
              ].map((row) => (
                <div
                  key={row.title}
                  className="w-full bg-white rounded-[16px] p-4 flex items-center justify-between gap-[95px]"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                      {row.title}
                    </span>
                    <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">
                      {row.description}
                    </span>
                  </div>
                  <Toggle state={row.enabled ? "active" : "disabled"} />
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
