import { redirect } from "next/navigation";

// Popular page was using hardcoded data.
// Redirecting to search until API-based implementation is available.
export default function PopularPage() {
  redirect("/search");
}
