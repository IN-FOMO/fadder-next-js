const toIcsDate = (date: Date) =>
  date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

const escapeIcsText = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startMs = Number(searchParams.get("start") ?? 0);
  const durationSeconds = Number(searchParams.get("duration") ?? 1800);
  const title = escapeIcsText(
    searchParams.get("title") ?? "Auction reminder",
  );
  const description = escapeIcsText(searchParams.get("description") ?? "");

  if (!startMs || Number.isNaN(startMs)) {
    return new Response("Missing start time", { status: 400 });
  }

  const startDate = new Date(startMs);
  const endDate = new Date(startDate.getTime() + durationSeconds * 1000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//Fadder//Vehicle Reminder//EN",
    "X-WR-CALNAME:Fadder Auctions",
    "BEGIN:VEVENT",
    `UID:${startMs}@fadder.com`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(startDate)}`,
    `DTEND:${toIcsDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    "LOCATION:Fadder",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Auction ends soon",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="fadder-auction-reminder.ics"',
    },
  });
}
