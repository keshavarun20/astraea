import { useQuery } from "@tanstack/react-query";

export type EonetCategory = {
  id: string;
  title: string;
};

export type EonetGeometry = {
  date: string;
  type: string;
  coordinates: number[];
  magnitudeValue?: number;
  magnitudeUnit?: string;
};

export type EonetSource = {
  id: string;
  url: string;
};

export type EonetEvent = {
  id: string;
  title: string;
  categories: EonetCategory[];
  sources: EonetSource[];
  geometry: EonetGeometry[];
};

export type EonetResponse = {
  title: string;
  description: string;
  link: string;
  events: EonetEvent[];
};

async function fetchEonet(days: number, limit: number): Promise<EonetResponse> {
  const res = await fetch(`/api/eonet?days=${days}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export function useEonet(days: number = 30, limit: number = 100) {
  return useQuery({
    queryKey: ["eonet", days, limit],
    queryFn: () => fetchEonet(days, limit),
  });
}

export type LocationResult = {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  displayName: string;
};

async function fetchLocation(lat: number, lon: number): Promise<LocationResult> {
  const res = await fetch(`/api/location?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Location lookup failed");
  return res.json();
}

export function useLocation(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ["location", lat, lon],
    queryFn: () => fetchLocation(lat!, lon!),
    enabled: lat != null && lon != null,
    staleTime: 1000 * 60 * 60 * 24, // 24hr cache
  });
}

export type GdacsEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  link: string;
  lat: number;
  lon: number;
  alertLevel: string;
  eventType: string;
  country: string;
  severity: string;
  source: "GDACS";
};

async function fetchGdacs(): Promise<{ events: GdacsEvent[] }> {
  const res = await fetch("/api/gdacs");
  if (!res.ok) throw new Error("Failed to fetch GDACS");
  return res.json();
}

export function useGdacs() {
  return useQuery({
    queryKey: ["gdacs"],
    queryFn: fetchGdacs,
    staleTime: 1000 * 60 * 5,
  });
}