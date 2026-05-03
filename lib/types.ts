import type { EonetEvent, GdacsEvent } from "./hooks/useEonet";

export type UnifiedEvent = {
  id: string;
  title: string;
  category: string;
  categoryCode: string;
  date: string;
  lat?: number;
  lon?: number;
  source: "EONET" | "GDACS";
  alertLevel?: string;
  country?: string;
  severity?: string;
  link?: string;
  // keep originals for detail panel
  raw: EonetEvent | GdacsEvent;
};

const GDACS_TYPE_MAP: Record<string, { category: string; code: string }> = {
  FL: { category: "Floods", code: "FL" },
  TC: { category: "Severe Storms", code: "SS" },
  EQ: { category: "Earthquakes", code: "EQ" },
  VO: { category: "Volcanoes", code: "VO" },
  DR: { category: "Drought", code: "DR" },
  WF: { category: "Wildfires", code: "WF" },
  TS: { category: "Severe Storms", code: "SS" },
  CY: { category: "Severe Storms", code: "SS" },
};

export function normalizeEonet(event: EonetEvent): UnifiedEvent {
  const latest = event.geometry?.[event.geometry.length - 1];
  const lat = latest?.coordinates?.[1];
  const lon = latest?.coordinates?.[0];
  const category = event.categories?.[0]?.title ?? "Unknown";
  const categoryCode = category.slice(0, 2).toUpperCase();

  return {
    id: event.id,
    title: event.title,
    category,
    categoryCode,
    date: latest?.date ?? "",
    lat,
    lon,
    source: "EONET",
    raw: event,
  };
}

export function normalizeGdacs(event: GdacsEvent): UnifiedEvent {
  const mapped = GDACS_TYPE_MAP[event.eventType] ?? {
    category: event.eventType || "Unknown",
    code: event.eventType?.slice(0, 2) ?? "EV",
  };

  return {
    id: event.id,
    title: event.title,
    category: mapped.category,
    categoryCode: mapped.code,
    date: event.date,
    lat: event.lat || undefined,
    lon: event.lon || undefined,
    source: "GDACS",
    alertLevel: event.alertLevel,
    country: event.country,
    severity: event.severity,
    link: event.link,
    raw: event,
  };
}