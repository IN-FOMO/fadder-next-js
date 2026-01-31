import { redirect } from "next/navigation";

// This static demo page has been replaced.
// For lot details, use /lot/[provider]/[id] with API data.
export default function VehiclePage() {
  redirect("/search");
}
