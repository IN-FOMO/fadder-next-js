"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useMarketplace } from "@/hooks/useMarketplace";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";
import {
  MarketplaceClient,
  type MarketplaceVehicle,
} from "./MarketplaceClient";

export default function MarketplacePage() {
  const { countries, carModels, isLoading } = useMarketplace();

  // Use countries from API
  const markets = useMemo(() => {
    if (countries.length > 0) {
      return countries.map((c) => c.name);
    }
    return [];
  }, [countries]);

  // Convert car models to marketplace vehicles
  const vehicles = useMemo((): MarketplaceVehicle[] => {
    if (carModels.length === 0) {
      return [];
    }

    return carModels.map((model, index) => {
      const description = (model.description as unknown as string) || "";
      const countryCode = (model.countryCode as unknown as string) || "";
      const countryName = countries.find((c) => c.code === countryCode)?.name || countryCode;
      const placeholderImage = `/figma/images/vehicle-${(index % 4) + 1}.png`;

      return {
        title: model.name,
        image: placeholderImage,
        market: countryName,
        lotId: `${countryCode}-${model.id.slice(0, 5)}`,
        country: countryName,
        availability: "On request" as const,
        price: "Contact for price",
        specs: [
          { label: "Description", value: description || "N/A" },
        ],
      };
    });
  }, [carModels, countries]);

  if (isLoading) {
    return (
      <main className="page-wrap py-[clamp(16px,2vw,24px)] pb-[clamp(48px,6vw,120px)] flex flex-col gap-[clamp(16px,3vw,24px)] text-foreground">
        <Breadcrumbs
          items={[{ label: "Home page", href: "/" }, { label: "Marketplace" }]}
        />
        <PageHeader
          title="Electric and Hybrid Vehicles"
          subtitle="Curated listings from China, Japan, and Korea with verified documents"
        />
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[200px] bg-surface rounded-lg animate-pulse" />
          ))}
        </div>
      </main>
    );
  }

  if (vehicles.length === 0) {
    return (
      <main className="page-wrap py-[clamp(16px,2vw,24px)] pb-[clamp(48px,6vw,120px)] flex flex-col gap-[clamp(16px,3vw,24px)] text-foreground">
        <Breadcrumbs
          items={[{ label: "Home page", href: "/" }, { label: "Marketplace" }]}
        />
        <PageHeader
          title="Electric and Hybrid Vehicles"
          subtitle="Curated listings from China, Japan, and Korea with verified documents"
        />
        <div className="bg-white rounded-lg p-12 text-center">
          <p className="text-lg text-muted mb-4">No marketplace listings available</p>
          <Link href="/search" className="text-primary font-semibold">
            Browse auction vehicles instead
          </Link>
        </div>
        <ContactSection />
      </main>
    );
  }

  return (
    <main className="page-wrap py-[clamp(16px,2vw,24px)] pb-[clamp(48px,6vw,120px)] flex flex-col gap-[clamp(16px,3vw,24px)] text-foreground">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: "Marketplace" }]}
      />
      <PageHeader
        title="Electric and Hybrid Vehicles"
        subtitle="Curated listings from China, Japan, and Korea with verified documents"
      />

      <MarketplaceClient
        markets={markets}
        featuredLot={null}
        vehicles={vehicles}
      />

      <ContactSection />
    </main>
  );
}
