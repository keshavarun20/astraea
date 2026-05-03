import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.gdacs.org/xml/rss.xml",
      {
        headers: { Accept: "application/rss+xml, application/xml, text/xml" },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) throw new Error("GDACS fetch failed");

    const xml = await res.text();

    // Parse XML manually — no external parser needed
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    const events = items.map((item) => {
      const get = (tag: string) =>
        item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1]?.trim() ?? "";

      const getAttr = (tag: string, attr: string) =>
        item.match(new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`))?.[1]?.trim() ?? "";

      const lat = parseFloat(getAttr("geo:point", "lat") || get("geo:lat") || getAttr("gdacs:bbox", "minlat") || "0");
      const lon = parseFloat(getAttr("geo:point", "lon") || get("geo:long") || getAttr("gdacs:bbox", "minlon") || "0");
      const alertLevel = get("gdacs:alertlevel") || getAttr("gdacs:alertlevel", "");
      const eventType = get("gdacs:eventtype");
      const country = get("gdacs:country");
      const severity = get("gdacs:severity");

      return {
        id: `GDACS_${get("gdacs:eventid") || Math.random().toString(36).slice(2)}`,
        title: get("title").replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
        description: get("description").replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
        date: get("pubDate"),
        link: get("link").replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
        lat: isNaN(lat) ? 0 : lat,
        lon: isNaN(lon) ? 0 : lon,
        alertLevel,
        eventType,
        country,
        severity,
        source: "GDACS" as const,
      };
    });

    return NextResponse.json({ events });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch GDACS data", events: [] }, { status: 500 });
  }
}