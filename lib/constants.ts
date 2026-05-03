type CategoryMeta = {
  icon: string;
  color: string;
  code: string;
  description: string;
};

export const CATEGORY_META: Record<string, CategoryMeta> = {
  Wildfires: {
    icon: "🔥",
    color: "#FF4500",
    code: "WF",
    description: "Active fire events",
  },
  "Sea and Lake Ice": {
    icon: "🧊",
    color: "#00CFFF",
    code: "SLI",
    description: "Ice formation & melting",
  },
  "Severe Storms": {
    icon: "⚡",
    color: "#FFD700",
    code: "SS",
    description: "Hurricanes, typhoons & cyclones",
  },
  Volcanoes: {
    icon: "🌋",
    color: "#FF6B35",
    code: "VO",
    description: "Volcanic activity",
  },
  Drought: {
    icon: "☀️",
    color: "#D4A017",
    code: "DR",
    description: "Prolonged dry conditions",
  },
  Earthquakes: {
    icon: "📡",
    color: "#A78BFA",
    code: "EQ",
    description: "Seismic activity",
  },
  Floods: {
    icon: "💧",
    color: "#38BDF8",
    code: "FL",
    description: "Flooding events",
  },
  Landslides: {
    icon: "⛰️",
    color: "#78716C",
    code: "LS",
    description: "Ground movement",
  },
  Snow: {
    icon: "❄️",
    color: "#BAE6FD",
    code: "SN",
    description: "Snowfall & blizzards",
  },
  "Dust and Haze": {
    icon: "🌫️",
    color: "#D6D3D1",
    code: "DH",
    description: "Dust storms & haze",
  },
  Manmade: {
    icon: "⚠️",
    color: "#F87171",
    code: "MM",
    description: "Human-caused events",
  },
};

export const DEFAULT_META = {
  icon: "🌍",
  color: "#6EE7B7",
  code: "EV",
  description: "Natural event",
};

export const DAYS_OPTIONS = [
  { label: "1 WEEK", value: 7 },
  { label: "2 WEEKS", value: 14 },
  { label: "1 MONTH", value: 30 },
  { label: "2 MONTHS", value: 60 },
  { label: "3 MONTHS", value: 90 },
];

export const ALL_CATEGORIES = "All Events";

export function getCategoryMeta(categories: { title: string }[]) {
  for (const cat of categories) {
    if (CATEGORY_META[cat.title]) {
      return { ...CATEGORY_META[cat.title], label: cat.title };
    }
  }
  return { ...DEFAULT_META, label: "Unknown" };
}

export function formatCoord(val: number, axis: "lat" | "lon") {
  const abs = Math.abs(val);
  const dir =
    axis === "lat" ? (val >= 0 ? "N" : "S") : val >= 0 ? "E" : "W";
  return `${abs.toFixed(4)}° ${dir}`;
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}