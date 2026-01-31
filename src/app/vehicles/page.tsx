import { redirect } from "next/navigation";

export default function VehiclesPage() {
  // Redirect to search page - vehicles page is deprecated
  redirect("/search");
}
